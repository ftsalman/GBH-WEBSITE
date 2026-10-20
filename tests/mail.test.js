import assert from "node:assert/strict";
import { test } from "node:test";
import { createMailer } from "../server/mail.js";

const env = {
  MAIL_PROVIDER: "smtp",
  SMTP_HOST: "premium312.web-hosting.com/",
  SMTP_PORT: "465",
  SMTP_USER: "info@gbhgroup.ae",
  SMTP_PASS: "test-password",
};

test("SMTP uses authenticated TLS and preserves the enquiry and reply address", async () => {
  const message = {
    from: "GBH Website <info@gbhgroup.ae>",
    to: ["info@gbhgroup.ae"],
    replyTo: "visitor@example.com",
    subject: "Website enquiry",
    text: "Full name: Visitor",
    html: "<p>Full name: Visitor</p>",
  };
  let options;
  let delivered;
  const mailer = createMailer(env, {
    createTransport(config) {
      options = config;
      return {
        async sendMail(payload) {
          delivered = payload;
          return { messageId: "smtp-id", accepted: message.to, rejected: [] };
        },
      };
    },
  });
  assert.deepEqual(await mailer.sendEmail(message), { data: { id: "smtp-id" }, error: null });
  assert.deepEqual(delivered, message);
  assert.equal(options.host, "premium312.web-hosting.com");
  assert.equal(options.port, 465);
  assert.equal(options.secure, true);
  assert.deepEqual(options.auth, { user: env.SMTP_USER, pass: env.SMTP_PASS });
});

test("SMTP rejects missing credentials, invalid ports and unknown providers", () => {
  for (const patch of [{ SMTP_PASS: "" }, { SMTP_USER: "" }, { SMTP_HOST: " " }, { SMTP_PORT: "abc" }, { MAIL_PROVIDER: "unknown" }]) {
    assert.throws(() => createMailer({ ...env, ...patch }));
  }
});

test("SMTP failures and rejected recipients cannot produce a success result", async () => {
  for (const result of [
    { messageId: "id", accepted: [], rejected: ["info@gbhgroup.ae"] },
    { messageId: "id", accepted: ["info@gbhgroup.ae"], rejected: ["second@example.com"] },
    { accepted: ["info@gbhgroup.ae"], rejected: [] },
    new Error("Authentication failed"),
  ]) {
    const mailer = createMailer(env, {
      createTransport: () => ({
        async sendMail() {
          if (result instanceof Error) throw result;
          return result;
        },
      }),
    });
    await assert.rejects(mailer.sendEmail({}), /SMTP server|Authentication failed/);
  }
});
