// Writes the PHP contact endpoint's mail settings from environment variables.
// Used by the deploy workflow, so the SMTP password lives in GitHub secrets, not in git.
// Usage: node scripts/write-php-config.mjs [output path]
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const out = process.argv[2] || "dist/api/contact-config.php";
const env = process.env;

const missing = ["MAIL_FROM", "CONTACT_TO", "SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter(
  (name) => !env[name]?.trim(),
);
if (missing.length) {
  console.error(`Missing mail settings: ${missing.join(", ")}. Add them in GitHub → Settings → Secrets and variables → Actions.`);
  process.exit(1);
}

const port = Number(env.SMTP_PORT || 465);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("SMTP_PORT must be a valid port number.");
  process.exit(1);
}

// Single-quoted PHP strings only interpret \\ and \', so escaping those two is enough.
const php = (value) => `'${String(value).trim().replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  `<?php
// Written by scripts/write-php-config.mjs during deploy. Do not commit.
return [
    'mail_from' => ${php(env.MAIL_FROM)},
    'contact_to' => ${php(env.CONTACT_TO)},
    'smtp_host' => ${php(env.SMTP_HOST)},
    'smtp_port' => ${port},
    'smtp_user' => ${php(env.SMTP_USER)},
    'smtp_pass' => ${php(env.SMTP_PASS)},
];
`,
);
console.log(`Wrote ${out}`);
