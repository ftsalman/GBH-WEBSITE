import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, CircleAlert, X } from "lucide-react";
import { timeframes } from "./contactFormConfig";
import { submitContact } from "../../../../lib/contactApi";
import { CONTACT } from "../../constants/homeData";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  timeframe: "",
  message: "",
  website: "",
};

export const ContactForm = () => {
  const submitting = useRef(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [lastSent, setLastSent] = useState(null);
  // toast content is kept after closing so it can fade out
  const [toast, setToast] = useState({ open: false, type: "success", title: "", message: "" });

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
      setLastSent(payload);
      setForm(emptyForm);
      setStatus("sent");
      setToast({
        open: true,
        type: "success",
        title: "Enquiry Sent Successfully!",
        message:
          "Thank you for reaching out. We have received your message and will be in touch shortly.",
      });
    } catch (err) {
      setStatus("error");
      setToast({
        open: true,
        type: "error",
        title: "Enquiry Not Sent",
        message:
          err.message || "Could not send your enquiry. Please try again.",
      });
    } finally {
      submitting.current = false;
    }
  };

  const submit = (event) => {
    event.preventDefault();
    send(form);
  };

  const resend = () => send(lastSent);

  const sending = status === "sending";

  return (
    <form onSubmit={submit} className="lp-form">
      <div className="lp-form-title lp-form-wide">
        <span className="lp-eyebrow">Send an enquiry</span>
        <h3>Tell us what you have in mind.</h3>
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
          Thank you! Your enquiry has been sent. We'll be in touch soon.
          <button type="button" onClick={resend}>
            Didn't go through? Resend
          </button>
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="lp-btn lp-btn-accent lp-form-submit lp-form-wide"
      >
        {sending ? "Sending…" : status === "error" ? "Try again" : "Submit"}
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
