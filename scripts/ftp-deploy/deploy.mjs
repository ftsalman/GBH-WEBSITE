// Uploads dist/ to Hostinger over FTP(S), sending only files changed since the last deploy.
// Replaces SamKirkland/FTP-Deploy-Action, whose bundled basic-ftp predates the fix for resuming
// FTPS sessions on data connections under Node.js 24.17+. package.json overrides basic-ftp for it.
// Usage: FTP_SERVER=… FTP_USERNAME=… FTP_PASSWORD=… FTP_SERVER_DIR=… node scripts/ftp-deploy/deploy.mjs
import { Readable, Writable } from "node:stream";
import { Client } from "basic-ftp";
import { deploy, excludeDefaults } from "@samkirkland/ftp-deploy";
import { currentSyncFileVersion, syncFileDescription } from "@samkirkland/ftp-deploy/dist/types.js";
import { validateDestination, verifyDestination } from "./destination.mjs";

const env = process.env;
const STATE_NAME = ".ftp-deploy-sync-state.json";

const missing = ["FTP_SERVER", "FTP_USERNAME", "FTP_PASSWORD", "FTP_SERVER_DIR", "SITE_URL"].filter((name) => !env[name]?.trim());
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
  "server-dir": env.FTP_SERVER_DIR.trim(),
  "state-name": STATE_NAME,
};

let destination;
try {
  destination = validateDestination(settings["server-dir"], env.SITE_URL);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

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
    // FTP_SERVER_DIR is relative to this folder; logging its contents shows where the account starts.
    const entries = (await client.list()).map((entry) => entry.name + (entry.isDirectory ? "/" : ""));
    console.log(`FTP login folder ${await client.pwd()} contains: ${entries.join(", ") || "(empty)"}`);
    console.log(`Uploading to: ${settings["server-dir"]}`);
    // Pin both connections to the same verified absolute path, regardless of the login directory.
    settings["server-dir"] = await verifyDestination(client, destination);
    try {
      await client.size(STATE_NAME);
      await forgetBrokenFiles(client);
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

// ftp-deploy only compares local files with the state file, never with the server. A file that is
// missing or truncated there (an interrupted upload, a manual delete) stays broken on every deploy.
// Drop such files from the state file, so this deploy uploads them again.
async function forgetBrokenFiles(client) {
  const chunks = [];
  const sink = new Writable({
    write(chunk, _encoding, done) {
      chunks.push(chunk);
      done();
    },
  });
  await client.downloadTo(sink, STATE_NAME);
  const state = JSON.parse(Buffer.concat(chunks).toString("utf8"));

  const broken = [];
  for (const record of state.data) {
    if (record.type !== "file" || record.name === STATE_NAME) continue;
    const size = await client.size(record.name).catch((err) => {
      if (err.code === 550) return undefined;
      throw err;
    });
    if (size !== record.size) broken.push(record.name);
  }
  if (!broken.length) return;

  console.log(`Missing or incomplete on the server, uploading again: ${broken.join(", ")}`);
  state.data = state.data.filter((record) => !broken.includes(record.name));
  await client.uploadFrom(Readable.from([JSON.stringify(state, undefined, 4)]), STATE_NAME);
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
