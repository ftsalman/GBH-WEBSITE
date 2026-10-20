import cors from "cors";
import express from "express";
import { timeframes } from "../src/features/home/components/Contact/contactFormConfig.js";

export function createApp({ sendEmail, mailFrom, contactTo, corsOrigin }) {
  const app = express();

  app.use(express.json({ limit: "20kb" }));
  if (corsOrigin) {
    app.use(cors({ origin: corsOrigin.split(",").map((origin) => origin.trim()).filter(Boolean) }));
  }

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

    try {
      const { data, error } = await sendEmail({
        from: mailFrom,
        to: contactTo.split(",").map((email) => email.trim()).filter(Boolean),
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

      if (error) throw error;
      if (!data?.id) {
        throw new Error("Email provider did not accept the enquiry.");
      }

      res.json({ ok: true });
    } catch (error) {
      console.error("Contact enquiry delivery failed:", error.message);
      res.status(502).json({
        error: "We couldn't send your enquiry. Please try again or email Info@gbhgroup.ae.",
      });
    }
  });

  // Never return the website HTML for an unknown API route.
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "API endpoint not found." });
  });

  app.use((error, _req, res, _next) => {
    const status = error.status === 413 ? 413 : error.status === 400 ? 400 : 500;
    res.status(status).json({
      error: status === 413
        ? "Your enquiry is too long. Please shorten your message."
        : status === 400
          ? "Invalid enquiry. Please check your details and try again."
          : "We couldn't send your enquiry. Please try again.",
    });
  });

  return app;
}
