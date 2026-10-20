import { Brand } from "../../features/home/components/Brand";
import { CONTACT, WEBSITE } from "../../features/home/constants/homeData";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => (
  <footer className="lp-footer">
    <div className="lp-container lp-footer-main">
      <div className="lp-footer-brand">
        <Brand />
        <p>
          A business ecosystem designed for entrepreneurs, startups and
          established companies.
        </p>
      </div>
      <div className="lp-footer-col">
        <span className="lp-footer-label">EXPLORE</span>
        <a href="#gallery">Office spaces</a>
        <a href="#facilities">Facilities</a>
        <a href="#locations">Locations</a>
        <a href="#testimonials">Testimonials</a>
      </div>
      <div className="lp-footer-col">
        <span className="lp-footer-label">LET’S CONNECT</span>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <a href={CONTACT.tel}>{CONTACT.phone}</a>
        <a href={`${WEBSITE}/contact`}>
          White Swan Building, Offices 105–106
          <br />
          Sheikh Zayed Road, Dubai, UAE
        </a>
      </div>
    </div>
    <div className="lp-container lp-footer-bottom">
      <span>© {CURRENT_YEAR} GBH Group. All rights reserved.</span>
      <span>Local insight. Global vision.</span>
      <a href="#home">Back to top ↑</a>
    </div>
  </footer>
);
