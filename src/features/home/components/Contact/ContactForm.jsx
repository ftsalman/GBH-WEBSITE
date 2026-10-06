import { useState } from "react";

const services = [
  "Business Setup",
  "Business Centers",
  "Trade License",
  "Visa Services",
  "Financial Consulting",
  "Legal Services",
  "Other enquiry",
];

const emirates = [
  "Abu Dhabi",
  "Ajman",
  "Dubai",
  "Fujairah",
  "Ras Al Khaimah",
  "Sharjah",
  "Umm Al Quwain",
];

const timeframes = ["Within 10 days", "Within 10–15 days", "Within 15–25 days"];

const fieldClass =
  "mt-2 w-full min-w-0 rounded-lg border border-[#dce5d8] bg-[#f8faf6] px-4 py-3 outline-none focus:border-[#5e9154]";

export const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    emirate: "",
    timeframe: "",
    service: services[0],
    message: "",
  });

  const change = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`GBH website enquiry: ${form.service}`);
    const body = encodeURIComponent(
      [
        `Full name: ${form.name}`,
        `Email address: ${form.email}`,
        `Mobile number: ${form.phone}`,
        `Emirate: ${form.emirate}`,
        `Planned start: ${form.timeframe}`,
        `Service: ${form.service}`,
        form.message && `Message: ${form.message}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:Info@gbhgroup.ae?subject=${subject}&body=${body}`;
  };

  return (
    <form
      onSubmit={submit}
      className="grid min-w-0 gap-4 rounded-2xl bg-white p-6 shadow-xl shadow-[#263e31]/5 sm:grid-cols-2 md:p-8"
    >
      <div className="sm:col-span-2">
        <span className="eyebrow">SEND AN ENQUIRY</span>
        <h3 className="text-xl font-semibold">Tell us what you have in mind.</h3>
      </div>
      <label className="min-w-0 text-xs font-medium">
        Full name
        <input required name="name" autoComplete="name" value={form.name} onChange={change} className={fieldClass} />
      </label>
      <label className="min-w-0 text-xs font-medium">
        Email address
        <input required type="email" name="email" autoComplete="email" value={form.email} onChange={change} className={fieldClass} />
      </label>
      <label className="min-w-0 text-xs font-medium">
        Mobile number
        <input required type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={change} className={fieldClass} />
      </label>
      <label className="min-w-0 text-xs font-medium">
        Emirate
        <select required name="emirate" value={form.emirate} onChange={change} className={fieldClass}>
          <option value="" disabled>Select emirate</option>
          {emirates.map((emirate) => <option key={emirate}>{emirate}</option>)}
        </select>
      </label>
      <label className="min-w-0 text-xs font-medium">
        When do you plan to start?
        <select required name="timeframe" value={form.timeframe} onChange={change} className={fieldClass}>
          <option value="" disabled>Select timeframe</option>
          {timeframes.map((timeframe) => <option key={timeframe}>{timeframe}</option>)}
        </select>
      </label>
      <label className="min-w-0 text-xs font-medium">
        Service
        <select name="service" value={form.service} onChange={change} className={fieldClass}>
          {services.map((service) => <option key={service}>{service}</option>)}
        </select>
      </label>
      <label className="min-w-0 text-xs font-medium sm:col-span-2">
        Message <span className="font-normal text-[#748071]">(optional)</span>
        <textarea name="message" rows="4" value={form.message} onChange={change} className={`${fieldClass} resize-y`} />
      </label>
      <p className="self-center text-[11px] leading-5 text-[#748071] sm:col-span-2">
        Submitting opens your email app with the enquiry ready to send.
      </p>
      <button type="submit" className="button primary sm:col-span-2">
        Prepare email to GBH →
      </button>
    </form>
  );
};
