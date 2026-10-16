import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { fieldClass, timeframes } from "./contactFormConfig";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  timeframe: "",
  message: "",
  website: "",
};

const CONTACT_ENDPOINT = (import.meta.env.VITE_API_URL ?? "") + "/api/contact";

export const ContactForm = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [lastSent, setLastSent] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const change = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const send = async (payload) => {
    setStatus("sending");
    setError("");
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `Server error (${response.status})`);
      }
      setLastSent(payload);
      setForm(emptyForm);
      setStatus("sent");
      setShowToast(true);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the server. Please ensure the backend is running.",
      );
      setStatus("error");
    }
  };

  const submit = (event) => {
    event.preventDefault();
    send(form);
  };

  const resend = () => send(lastSent);

  const sending = status === "sending";

  return (
    <form
      onSubmit={submit}
      className="grid min-w-0 gap-4 rounded-2xl bg-white p-6 shadow-xl shadow-[#263e31]/5 sm:grid-cols-2 md:p-8"
    >
      <div className="sm:col-span-2">
        <span className="eyebrow">SEND AN ENQUIRY</span>
        <h3 className="text-xl font-semibold">
          Tell us what you have in mind.
        </h3>
      </div>
      <label className="min-w-0 text-xs font-medium">
        Full name
        <input
          required
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={change}
          className={fieldClass}
        />
      </label>
      <label className="min-w-0 text-xs font-medium">
        Email address
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={change}
          className={fieldClass}
        />
      </label>
      <label className="min-w-0 text-xs font-medium">
        Mobile number
        <input
          required
          type="tel"
          name="phone"
          autoComplete="tel"
          value={form.phone}
          onChange={change}
          className={fieldClass}
        />
      </label>

      <label className="min-w-0 text-xs font-medium">
        When do you plan to start?
        <select
          required
          name="timeframe"
          value={form.timeframe}
          onChange={change}
          className={fieldClass}
        >
          <option value="" disabled>
            Select timeframe
          </option>
          {timeframes.map((timeframe) => (
            <option key={timeframe}>{timeframe}</option>
          ))}
        </select>
      </label>

      <label className="min-w-0 text-xs font-medium sm:col-span-2">
        Message <span className="font-normal text-[#748071]">(optional)</span>
        <textarea
          name="message"
          rows="4"
          value={form.message}
          onChange={change}
          className={`${fieldClass} resize-y`}
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
        <p
          role="status"
          className="flex flex-wrap items-center gap-x-2 rounded-lg bg-[#eff5e9] px-4 py-3 text-xs text-[#3f6b37] sm:col-span-2"
        >
          Thank you! Your enquiry has been sent. We'll be in touch soon.
          <button
            type="button"
            onClick={resend}
            className="font-semibold underline hover:text-[#1377ee]"
          >
            Didn't go through? Resend
          </button>
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-700 sm:col-span-2"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="button primary disabled:opacity-60 sm:col-span-2"
      >
        {sending ? "Sending…" : status === "error" ? "Try again" : "Submit"}
      </button>

      {/* Floating Success Toast (Top Center) */}
      <div
        aria-live="polite"
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 transition-all duration-300 ease-out ${
          showToast
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex w-full items-start gap-3 rounded-2xl border border-[#d2e4cb] bg-white/95 p-4 shadow-xl backdrop-blur-md">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef7ec] text-[#3f6b37]">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-sm font-semibold text-[#1f2b23]">
              Enquiry Sent Successfully!
            </h4>
            <p className="mt-0.5 text-xs text-[#5a6b5e]">
              Thank you for reaching out. We have received your message and will be in touch shortly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            aria-label="Close notification"
            className="rounded-lg p-1 text-[#8b998a] transition hover:bg-[#f3f6f1] hover:text-[#1f2b23]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
};
