import cors from "cors";
import express from "express";
import { Resend } from "resend";

const { RESEND_API_KEY, MAIL_FROM, CONTACT_TO, PORT = 3001, CORS_ORIGIN } =
  process.env;

if (!RESEND_API_KEY || !MAIL_FROM || !CONTACT_TO) {
  console.error("Missing RESEND_API_KEY, MAIL_FROM or CONTACT_TO in .env");
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);
const app = express();

app.use(express.json({ limit: "20kb" }));
if (CORS_ORIGIN) app.use(cors({ origin: CORS_ORIGIN.split(",") }));

const timeframes = ["Within 10 days", "Within 10–15 days", "Within 15–25 days"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

const clean = (value, max) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

app.post("/api/contact", async (req, res) => {
  const body = req.body ?? {};

  // Honeypot: real users never fill the hidden "website" field.
  if (body.website) return res.json({ ok: true });

  const form = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    timeframe: clean(body.timeframe, 40),
    message: clean(body.message, 5000),
  };

  if (!form.name || !form.phone || !emailPattern.test(form.email)) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }
  if (!timeframes.includes(form.timeframe)) {
    return res.status(400).json({ error: "Please select a timeframe." });
  }

  const rows = [
    ["Full name", form.name],
    ["Email address", form.email],
    ["Mobile number", form.phone],
    ["Planned start", form.timeframe],
    ["Message", form.message || "—"],
  ];

  const { error } = await resend.emails.send({
    from: MAIL_FROM,
    to: CONTACT_TO.split(",").map((email) => email.trim()).filter(Boolean),
    replyTo: form.email,
    subject: `GBH website enquiry from ${form.name}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<table cellpadding="6">${rows
      .map(
        ([label, value]) =>
          `<tr><td valign="top"><strong>${label}</strong></td><td style="white-space:pre-wrap">${escape(value)}</td></tr>`,
      )
      .join("")}</table>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return res
      .status(502)
      .json({ error: "We couldn't send your enquiry. Please try again." });
  }

  res.json({ ok: true });
});

app.listen(PORT, "0.0.0.0", () => console.log(`Contact API listening on :${PORT}`));
