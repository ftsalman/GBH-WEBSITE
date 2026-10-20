import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Mail, MapPin, PhoneCall, X } from "lucide-react";
import { submitContact } from "../../lib/contactApi";
import {
  fieldClass,
  timeframes,
} from "../../features/home/components/Contact/contactFormConfig";

// The popup shows on every page load (including refreshes), SHOW_AFTER_MS after the
// page opens, and hides itself VISIBLE_FOR_MS later unless the visitor starts using it.
const SHOW_AFTER_MS = 5000;
const VISIBLE_FOR_MS = 10000;
const FORM_ID = "contact-popup-form";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  timeframe: "",
  message: "",
  website: "", // honeypot, must stay empty
};

const labelClass = "min-w-0 text-xs font-medium text-black";

export const ContactPopup = () => {
  const submitting = useRef(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  // Set once the visitor clicks, types or tabs inside the popup, so it never vanishes mid-entry.
  const [engaged, setEngaged] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open || engaged) return;
    const timer = setTimeout(close, VISIBLE_FOR_MS);
    return () => clearTimeout(timer);
  }, [open, engaged, close]);

  const engage = () => setEngaged(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    firstFieldRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const change = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const submit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setEngaged(true);
    setStatus("sending");
    setError("");
    try {
      await submitContact(form);
      setForm(emptyForm);
      setStatus("sent");
    } catch (err) {
      setError(err.message || "Could not send your message. Please try again.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  if (!open) return null;

  const sending = status === "sending";

  return (
    <div
      className="contact-popup-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        onPointerDown={engage}
        onKeyDown={engage}
        onInput={engage}
        aria-modal="true"
        aria-labelledby="contact-popup-title"
        className="contact-popup-panel relative flex max-h-[calc(100dvh-2rem)] w-full max-w-[800px] flex-col overflow-y-auto rounded-2xl bg-white shadow-2xl shadow-black/20 md:flex-row md:overflow-hidden"
      >
        {/* Left: form */}
        <div className="flex-1 p-6 md:p-8">
          <span className="block text-[9px] font-medium tracking-[1.6px] text-[#666666]">
            SEND AN ENQUIRY
          </span>
          <h2
            id="contact-popup-title"
            className="mt-2 pr-8 text-xl font-semibold text-black md:pr-0"
          >
            Tell us what you have in mind.
          </h2>
          <p className="mt-1 text-[13px] text-[#666666]">
            Get in touch with GBH for guidance on setting up and growing your
            business in the UAE.
          </p>

          {status === "sent" ? (
            <div
              role="status"
              className="mt-8 flex items-start gap-3 rounded-lg bg-[#f5f5f5] p-4 text-sm text-black"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>
                Thank you! Your enquiry has been sent. We will be in touch soon.
              </span>
            </div>
          ) : (
            <form
              id={FORM_ID}
              onSubmit={submit}
              className="mt-5 grid gap-4 sm:grid-cols-2"
            >
              <label className={labelClass}>
                Full name
                <input
                  ref={firstFieldRef}
                  required
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={change}
                  className={fieldClass}
                />
              </label>
              <label className={labelClass}>
                <span>
                  Email address{" "}
                  <span className="font-normal text-[#666666]">(optional)</span>
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={change}
                  className={fieldClass}
                />
              </label>
              <label className={labelClass}>
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
              <label className={labelClass}>
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
              <label className={`${labelClass} sm:col-span-2`}>
                Message{" "}
                <span className="font-normal text-[#666666]">(optional)</span>
                <textarea
                  name="message"
                  rows="2"
                  value={form.message}
                  onChange={change}
                  className={`${fieldClass} resize-none`}
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
              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-700 sm:col-span-2"
                >
                  {error}
                </p>
              )}
            </form>
          )}
        </div>

        {/* Right: contact information */}
        <aside className="flex flex-col bg-black p-6 text-white md:w-[250px] md:p-7">
          <h3 className="text-lg font-semibold md:pr-8">Contact Information</h3>
          <ul className="mt-6 space-y-6 text-[13px] leading-snug">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#bdbdbd]" />
              <span>Al Rasheed Rd, Al Muteena, Deira, Dubai, UAE</span>
            </li>
            <li>
              <a href="tel:+971543053038" className="flex gap-3 hover:text-[#bdbdbd]">
                <PhoneCall className="h-4 w-4 shrink-0 text-[#bdbdbd]" />
                +971 54 305 3038
              </a>
            </li>
            <li>
              <a
                href="mailto:Info@gbhgroup.ae"
                className="flex gap-3 hover:text-[#bdbdbd]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#bdbdbd]" />
                Info@gbhgroup.ae
              </a>
            </li>
          </ul>
          {status !== "sent" && (
            <button
              type="submit"
              form={FORM_ID}
              disabled={sending}
              className="mt-8 rounded-[28px] bg-black px-6 py-3 text-sm font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#242424] disabled:opacity-60 md:mt-auto"
            >
              {sending ? "Sending…" : status === "error" ? "Try again" : "Submit"}
            </button>
          )}
        </aside>

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-lg p-1 text-[#666666] transition hover:bg-[#f5f5f5] hover:text-black md:text-white md:hover:bg-white/15 md:hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
