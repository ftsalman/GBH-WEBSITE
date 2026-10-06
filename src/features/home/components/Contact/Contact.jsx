import { Icon } from "../Icon";
import { ContactForm } from "./ContactForm";

export const Contact = () => (
  <section
    className="section reveal my-14 grid gap-10 rounded-2xl bg-[#eff5e9] px-5 py-10 md:my-20 md:px-10 md:py-14 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-start"
    id="contact"
  >
    <div>
      <span className="eyebrow">LET’S TALK BUSINESS</span>
      <h2 className="max-w-md text-3xl font-semibold md:text-4xl">
        Your next chapter starts with a conversation.
      </h2>
      <p className="mt-5 max-w-sm text-sm leading-7 text-[#657263]">
        Get in touch with GBH for guidance on setting up and growing your
        business in the UAE.
      </p>
      <div className="mt-9 space-y-5 text-sm">
        <a
          className="flex items-center gap-3 hover:text-[#1377ee]"
          href="tel:+971548881820"
        >
          <Icon name="phone" size={19} /> +971 54 888 1820
        </a>
        <a
          className="flex items-center gap-3 hover:text-[#1377ee]"
          href="mailto:Info@gbhgroup.ae"
        >
          <Icon name="mail" size={19} /> Info@gbhgroup.ae
        </a>
        <div className="flex items-start gap-3">
          <Icon name="pin" size={19} />
          <span>
            White Swan Building, Offices 105–106
            <br />
            Sheikh Zayed Road, Dubai, UAE
          </span>
        </div>
      </div>
    </div>
    <ContactForm />
  </section>
);
