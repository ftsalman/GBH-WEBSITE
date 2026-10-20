import { useEffect, useState } from "react";
import { Brand } from "../Brand";
import { Icon } from "../Icon";
import { CONTACT } from "../../constants/homeData";
import { pricedPlans } from "../../constants/pricing";

const links = [
  ["Gallery", "#gallery"],
  ["Facilities", "#facilities"],
  ...(pricedPlans.length ? [["Offices & Prices", "#pricing"]] : []),
  ["Locations", "#locations"],
  ["Testimonials", "#testimonials"],
  ["Contact", "#contact"],
];

// Transparent over the hero; turns solid once the page scrolls or the menu opens.
export const Header = ({ menuOpen, setMenuOpen, setConsultation }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`lp-header${scrolled || menuOpen ? " is-scrolled" : ""}`}
      id="home"
    >
      <div className="lp-container lp-header-inner">
        <Brand />
        <nav
          id="main-navigation"
          className={`lp-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map(([name, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {name}
            </a>
          ))}
        </nav>
        <div className="lp-header-actions">
          <a className="lp-header-phone" href={CONTACT.tel}>
            {CONTACT.phone}
          </a>
          <button
            type="button"
            className="lp-btn lp-btn-light lp-btn-sm lp-header-cta"
            onClick={() => setConsultation("Let's Visit")}
          >
            Let's Visit
          </button>
          <a
            className="lp-icon-btn"
            href={CONTACT.tel}
            aria-label={`Call ${CONTACT.phone}`}
          >
            <Icon name="phone" size={18} />
          </a>
          <button
            type="button"
            className="lp-icon-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
