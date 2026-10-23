// lib/trackLead.js
// Google Ads conversion tracking for the Al Muteena landing page (ads.gbhgroup.ae)

const CONVERSION_SEND_TO = "AW-18516779859/qGB4COXN8qYdENPGvv1E";

// Converts "050 123 4567", "+971501234567", "00971..." to E.164 (+971501234567)
const toE164 = (raw = "") => {
  const trimmed = String(raw).trim();
  let digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  if (trimmed.startsWith("+")) return "+" + digits; // already international
  if (digits.startsWith("00")) return "+" + digits.slice(2);
  if (digits.startsWith("971")) return "+" + digits;
  if (digits.startsWith("0")) digits = digits.slice(1); // local UAE format
  return "+971" + digits;
};

/**
 * Fire the Google Ads lead conversion.
 * Call ONLY after the form was saved successfully on the server.
 */
export function trackLeadConversion({ email, phone } = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;

  // Enhanced Conversions: Google hashes this data before using it
  const userData = {};
  if (email) userData.email = String(email).trim().toLowerCase();
  const e164 = toE164(phone);
  if (e164) userData.phone_number = e164;
  if (Object.keys(userData).length) window.gtag("set", "user_data", userData);

  window.gtag("event", "conversion", { send_to: CONVERSION_SEND_TO });
}

// ---- Ad click parameters (gclid / UTM) ----
// Saved when the visitor lands from an ad, so they can be sent with the lead.

const AD_KEYS = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
];

export function captureAdParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  AD_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      try {
        sessionStorage.setItem(key, value);
      } catch (e) {
        /* storage blocked: ignore */
      }
    }
  });
}

export function getAdParams() {
  const out = {};
  if (typeof window === "undefined") return out;
  AD_KEYS.forEach((key) => {
    try {
      const value = sessionStorage.getItem(key);
      if (value) out[key] = value;
    } catch (e) {
      /* storage blocked: ignore */
    }
  });
  return out;
}
