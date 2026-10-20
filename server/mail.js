import nodemailer from "nodemailer";
import { Resend } from "resend";

export function createMailer(env, { createTransport = nodemailer.createTransport } = {}) {
  const provider = (env.MAIL_PROVIDER || (env.SMTP_HOST ? "smtp" : "resend")).trim().toLowerCase();
  if (provider === "resend") {
    if (!env.RESEND_API_KEY) throw new Error("Set RESEND_API_KEY in .env.");
    const resend = new Resend(env.RESEND_API_KEY);
    return { provider, sendEmail: (message) => resend.emails.send(message) };
  }
  if (provider !== "smtp") throw new Error("MAIL_PROVIDER must be smtp or resend.");
  if (!env.SMTP_HOST?.trim() || !env.SMTP_USER?.trim() || !env.SMTP_PASS) {
    throw new Error("Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.");
  }

  const port = Number(env.SMTP_PORT || 465);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number.");
  }
  const transport = createTransport({
    host: env.SMTP_HOST.trim().replace(/\/+$/, ""),
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: env.SMTP_USER.trim(), pass: env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    dnsTimeout: 10000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  return {
    provider,
    verify: () => transport.verify(),
    async sendEmail(message) {
      const result = await transport.sendMail(message);
      // A message ID alone does not mean the SMTP server accepted a recipient.
      if (!result.messageId || !result.accepted?.length || result.rejected?.length) {
        throw new Error("SMTP server did not accept all enquiry recipients.");
      }
      return { data: { id: result.messageId }, error: null };
    },
  };
}
