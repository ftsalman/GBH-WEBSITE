import assert from "node:assert/strict";
import { test } from "node:test";
import { validateDestination, verifyDestination } from "../scripts/ftp-deploy/destination.mjs";

const destination = validateDestination("ads/", "https://ads.example.com");

function ftpFixture() {
  const calls = [];
  const files = new Map();
  return {
    calls,
    files,
    client: {
      async cd(path) { calls.push(["cd", path]); },
      async pwd() { return "/public_html/ads"; },
      async uploadFrom(stream, name) {
        let body = "";
        for await (const chunk of stream) body += chunk;
        files.set(name, body);
        calls.push(["upload", name]);
      },
      async remove(name) { files.delete(name); calls.push(["remove", name]); },
    },
  };
}

test("rejects the failed run's absolute /ads/ path and traversal before connecting", () => {
  for (const path of ["/ads/", "/public_html/ads/", "../ads/", "ads/../", "ads", "", "ads\\/", "ads\n/"]) {
    assert.throws(() => validateDestination(path, "https://ads.example.com"), /relative/);
  }
  assert.equal(validateDestination("./", "https://ads.example.com").directory, "./");
  assert.equal(validateDestination(" ads/ ", "https://ads.example.com").directory, "ads/");
  for (const url of ["ftp://example.com", "https://user:pass@example.com", "https://example.com?x=1", "https://example.com/#x"]) {
    assert.throws(() => validateDestination("ads/", url), /SITE_URL/);
  }
});

test("verifies the served directory and returns an absolute path for the upload connection", async () => {
  const { client, files, calls } = ftpFixture();
  const result = await verifyDestination(client, destination, {
    log() {},
    async request(url, options) {
      assert.equal(url.origin, "https://ads.example.com");
      assert.equal(options.redirect, "error");
      assert.match(options.headers["Cache-Control"], /no-cache/);
      return new Response(files.get(url.pathname.slice(1)));
    },
  });
  assert.equal(result, "/public_html/ads/");
  assert.deepEqual(calls[0], ["cd", "ads/"]);
  assert.equal(files.size, 0);
  assert.equal(calls.at(-1)[0], "remove");
});

test("rejects a 200 SPA fallback from the wrong site and cleans up the probe", async () => {
  const { client, files } = ftpFixture();
  await assert.rejects(verifyDestination(client, destination, {
    log() {}, sleep: async () => {},
    request: async () => new Response("<html>old build</html>"),
  }), /No website files were deployed/);
  assert.equal(files.size, 0);
});

test("retries transient HTTP and network failures before succeeding", async () => {
  const { client, files } = ftpFixture();
  let attempts = 0;
  const waits = [];
  await verifyDestination(client, destination, {
    log() {}, sleep: async (ms) => waits.push(ms),
    async request(url) {
      attempts++;
      if (attempts === 1) throw new Error("connection reset");
      if (attempts === 2) return new Response("unavailable", { status: 503 });
      return new Response(files.get(url.pathname.slice(1)));
    },
  });
  assert.equal(attempts, 3);
  assert.deepEqual(waits, [3000, 3000]);
  assert.equal(files.size, 0);
});

test("stops after persistent connection failures and removes the probe", async () => {
  const { client, files } = ftpFixture();
  await assert.rejects(verifyDestination(client, destination, {
    log() {}, sleep: async () => {},
    request: async () => { throw new Error("connection refused"); },
  }), /connection refused/);
  assert.equal(files.size, 0);
});

test("a nonexistent destination fails without creating folders or uploading files", async () => {
  const { client, calls } = ftpFixture();
  client.cd = async () => { throw new Error("550 directory does not exist"); };
  await assert.rejects(verifyDestination(client, destination), /550/);
  assert.deepEqual(calls, []);
});
