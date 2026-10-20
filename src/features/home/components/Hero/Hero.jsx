import { Icon } from "../Icon";
import { ContactForm } from "../Contact/ContactForm";
import { pricing } from "../../constants/pricing";

const highlights = [
  "Furnished office spaces",
  "Meeting rooms",
  "High-speed Wi-Fi",
  "DEWA included",
];

export const Hero = ({ setConsultation }) => (
  <section className="lp-hero-wrap" aria-labelledby="hero-title">
    <div className="lp-hero-media" data-parallax="0.12" aria-hidden="true">
      <img src="/offices/MUTEENA/10.jpg" alt="" fetchPriority="high" />
    </div>
    <div className="lp-container lp-hero">
      <div className="lp-hero-copy">
        <span className="lp-eyebrow">Al Muteena · Deira · Dubai</span>
        <h1 id="hero-title">Find Your Ideal Office Space in Al Muteena</h1>
        <p className="lp-hero-text">
          Discover professional office spaces in Al Muteena, Dubai, designed for
          businesses looking for a convenient and productive working
          environment. Explore available offices, facilities and flexible
          options that suit your business needs.
        </p>
        {pricing.startingPrice && (
          <div className="lp-price-badge">
            <span>Offices from</span>
            <strong>AED {pricing.startingPrice}</strong>
            <span>/ month</span>
          </div>
        )}
        <ul className="lp-checks">
          {highlights.map((item) => (
            <li key={item}>
              <Icon name="check" size={18} strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
        <div className="lp-actions">
          <button
            type="button"
            className="lp-btn lp-btn-light"
            onClick={() => setConsultation("Let's Visit")}
          >
            Schedule a Viewing
          </button>
          <a href="#contact" className="lp-btn lp-btn-outline-light">
            Contact Now
          </a>
        </div>
        {pricing.officesLeft && (
          <p className="lp-availability">
            Only {pricing.officesLeft}{" "}
            {pricing.officesLeft === 1 ? "office" : "offices"} available this
            month
          </p>
        )}
      </div>
      <div className="lp-form-card">
        <ContactForm />
      </div>
    </div>
  </section>
);
