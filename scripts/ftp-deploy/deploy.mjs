// Uploads dist/ to Hostinger over FTP(S), sending only files changed since the last deploy.
// Replaces SamKirkland/FTP-Deploy-Action, whose bundled basic-ftp predates the fix for resuming
// FTPS sessions on data connections under Node.js 24.17+. package.json overrides basic-ftp for it.
// Usage: FTP_SERVER=… FTP_USERNAME=… FTP_PASSWORD=… node scripts/ftp-deploy/deploy.mjs
import { Readable } from "node:stream";
import { Client } from "basic-ftp";
import { deploy, excludeDefaults } from "@samkirkland/ftp-deploy";
import { currentSyncFileVersion, syncFileDescription } from "@samkirkland/ftp-deploy/dist/types.js";

const env = process.env;
const STATE_NAME = ".ftp-deploy-sync-state.json";

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

const settings = {
  server: env.FTP_SERVER.trim(),
  username: env.FTP_USERNAME,
  password: env.FTP_PASSWORD,
  port,
  protocol: env.FTP_PROTOCOL || "ftps",
  "local-dir": env.FTP_LOCAL_DIR || "./dist/",
  "server-dir": env.FTP_SERVER_DIR || "public_html/ads/",
  "state-name": STATE_NAME,
};

// ftp-deploy treats a missing state file as a first deploy, but Hostinger's ProFTPD resets the
// data connection of that failed download, which leaves ftp-deploy's client closed and every
// later command fails with "Client is closed because read ECONNRESET (data socket)".
// Seeding an empty state file makes the first deploy a normal full upload.
async function seedStateFile() {
  const client = new Client();
  try {
    await client.access({
      host: settings.server,
      user: settings.username,
      password: settings.password,
      port: settings.port,
      secure: { ftps: true, "ftps-legacy": "implicit" }[settings.protocol] ?? false,
      // Same as ftp-deploy's default "loose" security: Hostinger's certificate is for *.hstgr.io.
      secureOptions: { rejectUnauthorized: false },
    });
    await client.ensureDir(settings["server-dir"]);
    try {
      await client.size(STATE_NAME);
      return;
    } catch (err) {
      if (err.code !== 550) throw err;
    }
    console.log(`No ${STATE_NAME} on the server yet: creating an empty one, so every file is uploaded.`);
    const state = {
      description: syncFileDescription,
      version: currentSyncFileVersion,
      generatedTime: Date.now(),
      data: [],
    };
    await client.uploadFrom(Readable.from([JSON.stringify(state, undefined, 4)]), STATE_NAME);
  } finally {
    client.close();
  }
}

// FTP_EXCLUDE: extra glob patterns, one per line. Excluded files are neither uploaded nor deleted.
const extraExcludes = (env.FTP_EXCLUDE || "").split("\n").map((line) => line.trim()).filter(Boolean);

try {
  await seedStateFile();
} catch (err) {
  console.error(`Could not prepare ${settings["server-dir"]}${STATE_NAME} on the FTP server:`, err);
  process.exit(1);
}

try {
  await deploy({
    ...settings,
    "dangerous-clean-slate": false,
    exclude: [...excludeDefaults, ...extraExcludes],
    // Set FTP_LOG_LEVEL=verbose to log the full FTP conversation (passwords are masked).
    "log-level": env.FTP_LOG_LEVEL || "standard",
  });
} catch {
  // ftp-deploy has already printed the error with hints.
  process.exit(1);
}
