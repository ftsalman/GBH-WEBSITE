import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { setTimeout as delay } from "node:timers/promises";

export function validateDestination(directory, siteUrl) {
  const path = directory?.trim();
  if (!path || !path.endsWith("/") || path.startsWith("/") ||
      /[\\:\r\n]/.test(path) || path.split("/").includes("..")) {
    throw new Error("FTP_SERVER_DIR must be relative to the FTP login folder and end with /: use ads/, not /ads/, when the login folder is /public_html. Use ./ only for an account rooted at the subdomain itself.");
  }
  const url = new URL(siteUrl);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new Error("SITE_URL must be an HTTP(S) site URL without credentials, a query or a fragment.");
  }
  return { directory: path, siteUrl: `${url.href.replace(/\/$/, "")}/` };
}

// Prove that this FTP directory is served by SITE_URL before touching the build or sync state.
// A random filename/body also distinguishes a real response from cached HTML or an SPA fallback.
export async function verifyDestination(client, destination, {
  request = fetch,
  sleep = delay,
  attempts = 3,
  log = console.log,
} = {}) {
  await client.cd(destination.directory); // Do not silently create a mistyped document root.
  const resolved = await client.pwd();
  log(`Resolved FTP destination: ${resolved}`);
  const filename = `gbh-deploy-probe-${randomUUID()}.txt`;
  const token = randomUUID();
  let verified = false;
  let lastResult = "no response";
  try {
    await client.uploadFrom(Readable.from([token]), filename);
    for (let attempt = 0; attempt < attempts; attempt++) {
      try {
        const response = await request(new URL(filename, destination.siteUrl), {
          headers: { "Cache-Control": "no-cache, no-store" },
          signal: AbortSignal.timeout(15000),
          redirect: "error",
        });
        if (response.status === 200 && await response.text() === token) {
          verified = true;
          break;
        }
        lastResult = `HTTP ${response.status} or unexpected content`;
      } catch (error) {
        lastResult = error.message;
      }
      if (attempt + 1 < attempts) await sleep(3000);
    }
  } finally {
    await client.remove(filename);
  }
  if (!verified) {
    throw new Error(`FTP destination ${resolved} could not be verified at ${destination.siteUrl} (${lastResult}). No website files were deployed. Check the subdomain document root in hPanel, FTP_SERVER_DIR, the FTP account and SITE_URL. See docs/deployment.md.`);
  }
  log("FTP destination verified through the public site.");
  return `${resolved.replace(/\/$/, "")}/`;
}
