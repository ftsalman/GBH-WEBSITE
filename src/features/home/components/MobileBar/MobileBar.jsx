import { CONTACT } from "../../constants/homeData";

// Fixed quick-contact bar, shown on phones only (see landing.css).
export const MobileBar = () => (
  <nav className="lp-mobile-bar" aria-label="Quick contact">
    <a href={CONTACT.tel} className="lp-btn lp-btn-outline">
      Call
    </a>
    <a href={CONTACT.whatsapp} className="lp-btn lp-btn-whatsapp">
      WhatsApp
    </a>
    <a href="#contact" className="lp-btn lp-btn-accent">
      Contact Now
    </a>
  </nav>
);
