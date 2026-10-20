import { Icon } from "../Icon";
import { ContactForm } from "./ContactForm";
import { CONTACT } from "../../constants/homeData";

export const Contact = () => (
  <section className="lp-band-dark" id="contact">
    <div className="lp-container lp-section lp-contact">
      <div className="lp-contact-copy" data-reveal>
        <span className="lp-eyebrow">Let’s talk business</span>
        <h2>Your next chapter starts with a conversation.</h2>
        <p>
          Get in touch with GBH for guidance on setting up and growing your
          business in the UAE.
        </p>
        <div className="lp-actions">
          <a href={CONTACT.whatsapp} className="lp-btn lp-btn-whatsapp">
            <Icon name="whatsapp" size={20} strokeWidth={2} />
            WhatsApp<span className="lp-hide-phone"> {CONTACT.phone}</span>
          </a>
          <a href={CONTACT.tel} className="lp-btn lp-btn-outline-light">
            Call now
          </a>
        </div>
        <ul className="lp-contact-lines">
          <li>
            <Icon name="mail" size={19} />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>
            <Icon name="pin" size={19} />
            <span>{CONTACT.address}</span>
          </li>
        </ul>
      </div>
      <div className="lp-form-card" data-reveal style={{ "--reveal-delay": "150ms" }}>
        <ContactForm />
      </div>
    </div>
  </section>
);
