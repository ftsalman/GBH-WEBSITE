// Uploads dist/ to Hostinger over FTP(S), sending only files changed since the last deploy.
// Replaces SamKirkland/FTP-Deploy-Action, whose bundled basic-ftp cannot resume the TLS session
// on data connections under Node.js 24.17+, so Hostinger drops every transfer (ECONNRESET).
// The override to basic-ftp 6.2.3 in package.json is the fix; keep it until ftp-deploy ships it.
// Usage: FTP_SERVER=… FTP_USERNAME=… FTP_PASSWORD=… node scripts/ftp-deploy/deploy.mjs
import { deploy, excludeDefaults } from "@samkirkland/ftp-deploy";

const env = process.env;

const missing = ["FTP_SERVER", "FTP_USERNAME", "FTP_PASSWORD"].filter((name) => !env[name]?.trim());
if (missing.length) {
  console.error(`Missing FTP settings: ${missing.join(", ")}.`);
  process.exit(1);
}

const port = Number(env.FTP_PORT || 21);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("FTP_PORT must be a valid port number.");
  process.exit(1);
}

// FTP_EXCLUDE: extra glob patterns, one per line. Excluded files are neither uploaded nor deleted.
const extraExcludes = (env.FTP_EXCLUDE || "").split("\n").map((line) => line.trim()).filter(Boolean);

try {
  await deploy({
    server: env.FTP_SERVER.trim(),
    username: env.FTP_USERNAME,
    password: env.FTP_PASSWORD,
    port,
    protocol: env.FTP_PROTOCOL || "ftps",
    "local-dir": env.FTP_LOCAL_DIR || "./dist/",
    "server-dir": env.FTP_SERVER_DIR || "public_html/ads/",
    "dangerous-clean-slate": false,
    exclude: [...excludeDefaults, ...extraExcludes],
    "log-level": "standard",
  });
} catch {
  // ftp-deploy has already printed the error with hints.
  process.exit(1);
}
