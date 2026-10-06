import { Icon } from "../../features/home/components/Icon";
import { Brand } from "../../features/home/components/Brand";
import { WEBSITE } from "../../features/home/constants/homeData";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => (
  <footer className="footer section">
    <div className="footer-main">
      <div className="footer-brand">
        <Brand />
        <p>
          A business ecosystem designed for
          <br />
          entrepreneurs, startups and established companies.
        </p>
      </div>
      <div>
        <span className="footer-label">EXPLORE</span>
        <a href="#about">About us</a>
        <a href="#features">Why GBH</a>
        <a href="#offers">What we offer</a>
        <a href="#spaces">Office spaces</a>
      </div>
      <div>
        <span className="footer-label">LET’S CONNECT</span>
        <a href="mailto:Info@gbhgroup.ae">
          Info@gbhgroup.ae <Icon name="diagonal" size={14} />
        </a>
        <a href="tel:+971548881820">+971 54 888 1820</a>
        <a href={`${WEBSITE}/contact`}>
          White Swan Building, Offices 105–106
          <br />
          Sheikh Zayed Road, Dubai, UAE
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {CURRENT_YEAR} GBH Group. All rights reserved.</span>
      <span>Local insight. Global vision.</span>
      <a href="#home">Back to top ↑</a>
    </div>
  </footer>
);
