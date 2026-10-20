import { createApp } from "./app.js";
import { createMailer } from "./mail.js";

const { MAIL_FROM, CONTACT_TO, PORT = 3001, CORS_ORIGIN } =
  process.env;

if (!MAIL_FROM || !CONTACT_TO?.split(",").some((email) => email.trim())) {
  console.error("Set MAIL_FROM and CONTACT_TO in .env before starting the contact API.");
  process.exit(1);
}

let mailer;
try {
  mailer = createMailer(process.env);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
if (mailer.provider === "resend" && /@resend\.dev\b/i.test(MAIL_FROM)) {
  console.warn(
    "MAIL_FROM uses Resend's test domain, which only sends to your Resend account email. Verify a domain in Resend and update MAIL_FROM to send enquiries to CONTACT_TO.",
  );
}
const app = createApp({
  sendEmail: mailer.sendEmail,
  mailFrom: MAIL_FROM,
  contactTo: CONTACT_TO,
  corsOrigin: CORS_ORIGIN,
});

app.listen(PORT, "0.0.0.0", (error) => {
  if (error) {
    console.error(`Could not start the contact API on port ${PORT}: ${error.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Contact API listening on :${PORT} using ${mailer.provider}`);
});
