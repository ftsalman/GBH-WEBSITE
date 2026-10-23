import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, CircleAlert, X } from "lucide-react";
import { timeframes } from "./contactFormConfig";
import { submitContact } from "../../../../lib/contactApi";
import {
  trackLeadConversion,
  captureAdParams,
  getAdParams,
} from "../../../../lib/trackLead";
import { CONTACT } from "../../constants/homeData";

// Set to true ONLY after the backend (submitContact API) accepts the extra
// fields gclid, utm_source, utm_medium, utm_campaign, utm_term.
// If the backend rejects unknown fields, keeping this false avoids form errors.
const SEND_AD_PARAMS = false;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  timeframe: "",
  message: "",
  website: "", // honeypot: real users never fill this
};

export const ContactForm = () => {
  const submitting = useRef(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  // toast content is kept after closing so it can fade out
  const [toast, setToast] = useState({ open: false, type: "success", title: "", message: "" });

  // Save gclid / UTM from the ad click URL
  useEffect(() => {
    captureAdParams();
  }, []);

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => {
        setToast((current) => ({ ...current, open: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const closeToast = () => setToast((current) => ({ ...current, open: false }));
  const isError = toast.type === "error";

  const change = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const send = async (payload) => {
    if (submitting.current) return;
    submitting.current = true;
    setStatus("sending");
    closeToast();
    try {
      await submitContact(payload);

      // Google Ads conversion: only after a successful save, and never for bots
      if (!payload.website) {
        trackLeadConversion({ email: payload.email, phone: payload.phone });
      }

      setForm(emptyForm);
      setStatus("sent");
      setToast({
        open: true,
        type: "success",
        title: "Enquiry sent",
        message:
          "Thank you. Our Al Muteena team will contact you shortly with today’s price and viewing times.",
      });
    } catch (err) {
      setStatus("error");
      setToast({
        open: true,
        type: "error",
        title: "Enquiry not sent",
        message:
          err.message ||
          "Your enquiry could not be sent. Check your connection and try again, or WhatsApp us.",
      });
    } finally {
      submitting.current = false;
    }
  };

  const submit = (event) => {
    event.preventDefault();
    send(SEND_AD_PARAMS ? { ...form, ...getAdParams() } : form);
  };

  const sending = status === "sending";

  return (
    <form onSubmit={submit} className="lp-form">
      <div className="lp-form-title lp-form-wide">
        <span className="lp-eyebrow">Send an enquiry</span>
        <h3>Get today’s price and book a free viewing.</h3>
      </div>
      <label className="lp-field">
        Full name
        <input
          required
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={form.name}
          onChange={change}
        />
      </label>
      <label className="lp-field">
        <span>
          Email address <span className="lp-optional">(optional)</span>
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={change}
        />
      </label>
      <label className="lp-field">
        Mobile number
        <input
          required
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+971 50 123 4567"
          value={form.phone}
          onChange={change}
        />
      </label>

      <label className="lp-field">
        When do you plan to start?
        <select
          required
          name="timeframe"
          value={form.timeframe}
          onChange={change}
        >
          <option value="" disabled>
            Select timeframe
          </option>
          {timeframes.map((timeframe) => (
            <option key={timeframe}>{timeframe}</option>
          ))}
        </select>
      </label>

      <label className="lp-field lp-form-wide">
        <span>
          Message <span className="lp-optional">(optional)</span>
        </span>
        <textarea
          name="message"
          rows="3"
          value={form.message}
          onChange={change}
        />
      </label>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.website}
        onChange={change}
        className="hidden"
      />
      {status === "sent" && (
        <p role="status" className="lp-form-status is-sent lp-form-wide">
          Thank you. Your enquiry has been sent and our team will contact you soon.
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="lp-btn lp-btn-accent lp-form-submit lp-form-wide"
      >
        {sending ? "Sending…" : status === "error" ? "Try again" : "Get Price & Book Viewing"}
      </button>
      <p className="lp-form-note lp-form-wide">
        Prefer to talk? WhatsApp or call{" "}
        <a href={CONTACT.tel}>{CONTACT.phone}</a>
      </p>

      {/* Floating Toast (Top Center) — portalled to body so no transformed ancestor can offset it */}
      {createPortal(
        <div
          role={isError ? "alert" : "status"}
          aria-live={isError ? "assertive" : "polite"}
          className={`fixed top-6 left-1/2 z-1000 w-full max-w-md -translate-x-1/2 px-4 transition-all duration-300 ease-out ${
            toast.open
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-6 opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`flex w-full items-start gap-3 rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur-md ${
              isError ? "border-[#fecaca]" : "border-[#e5e5e5]"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                isError ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#f5f5f5] text-black"
              }`}
            >
              {isError ? (
                <CircleAlert className="h-5 w-5" />
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 pt-0.5">
              <h4
                className={`text-sm font-semibold ${
                  isError ? "text-[#b91c1c]" : "text-black"
                }`}
              >
                {toast.title}
              </h4>
              <p className="mt-0.5 text-xs text-[#666666]">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={closeToast}
              aria-label="Close notification"
              className="rounded-lg p-1 text-[#666666] transition hover:bg-[#f5f5f5] hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>,
        document.body,
      )}
    </form>
  );
};