import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import { createApp } from "../server/app.js";
import { submitContact } from "../src/lib/contactApi.js";
import { timeframes } from "../src/features/home/components/Contact/contactFormConfig.js";

const enquiry = {
  name: "Test Visitor",
  email: "visitor@example.com",
  phone: "+971 50 123 4567",
  timeframe: timeframes[0],
  message: "Please contact me.",
  website: "",
};

async function startApi(t, sendEmail) {
  const app = createApp({
    sendEmail,
    mailFrom: "Website <website@example.com>",
    contactTo: " enquiries@example.com, second@example.com ",
    corsOrigin: "https://example.com, https://www.example.com",
  });
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
    server.closeAllConnections();
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

test("both forms' shared client can submit all offered timeframes", async (t) => {
  const messages = [];
  const baseUrl = await startApi(t, async (message) => {
    messages.push(message);
    return { data: { id: "test-email" }, error: null };
  });
  for (const timeframe of timeframes) {
    await submitContact({ ...enquiry, timeframe, name: "  Visitor <test>  " }, {
      baseUrl: `${baseUrl}/`,
    });
  }
  assert.equal(messages.length, timeframes.length);
  assert.deepEqual(messages[0].to, ["enquiries@example.com", "second@example.com"]);
  assert.equal(messages[0].replyTo, enquiry.email);
  assert.match(messages[0].html, /Visitor &lt;test&gt;/);
  assert.match(messages[0].text, /Full name: Visitor <test>/);
});

test("invalid fields and honeypot do not send emails", async (t) => {
  let calls = 0;
  const baseUrl = await startApi(t, async () => { calls++; });
  for (const patch of [{ name: " " }, { email: "bad" }, { phone: "" }, { timeframe: "invalid" }]) {
    await assert.rejects(submitContact({ ...enquiry, ...patch }, { baseUrl }), /Please/);
  }
  await submitContact({ ...enquiry, website: "spam.example" }, { baseUrl });
  assert.equal(calls, 0);
});

test("provider rejections, exceptions and missing delivery IDs fail visibly", async (t) => {
  for (const sendEmail of [
    async () => ({ data: null, error: { message: "Invalid sender" } }),
    async () => { throw new Error("Network unavailable"); },
    async () => ({ data: null, error: null }),
  ]) {
    const baseUrl = await startApi(t, sendEmail);
    await assert.rejects(submitContact(enquiry, { baseUrl }), /couldn't send your enquiry/);
  }
});

test("API responds with JSON to malformed requests and unknown routes", async (t) => {
  const baseUrl = await startApi(t, async () => assert.fail("Must not send"));
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /Invalid enquiry/);
  const missing = await fetch(`${baseUrl}/api/missing`);
  assert.equal(missing.status, 404);
  assert.equal((await missing.json()).error, "API endpoint not found.");
});

test("CORS supports origins separated by commas and spaces", async (t) => {
  const baseUrl = await startApi(t, async () => assert.fail("Must not send"));
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "OPTIONS",
    headers: {
      Origin: "https://www.example.com",
      "Access-Control-Request-Method": "POST",
    },
  });
  assert.equal(response.headers.get("access-control-allow-origin"), "https://www.example.com");
});

test("client rejects HTML fallback pages and unconfirmed JSON success", async (t) => {
  for (const body of ["<!doctype html><html>Website</html>", "{}", '{"ok":false}']) {
    t.mock.method(globalThis, "fetch", async () => new Response(body, { status: 200 }));
    await assert.rejects(submitContact(enquiry), /couldn't send your enquiry/);
    t.mock.restoreAll();
  }
});

test("client times out and reports network errors", async (t) => {
  t.mock.method(globalThis, "fetch", (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  }));
  await assert.rejects(submitContact(enquiry, { timeoutMs: 10 }), /couldn't confirm your enquiry in time/);
  t.mock.restoreAll();
  t.mock.method(globalThis, "fetch", async () => { throw new TypeError("Failed to fetch"); });
  await assert.rejects(submitContact(enquiry), /email Info@gbhgroup.ae/);
});
