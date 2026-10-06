import { Icon } from "../Icon";
import { Brand } from "../Brand";
import { services, stats } from "../../constants/homeData";

export const Hero = ({
  active,
  paused,
  reducedMotion,
  menuOpen,
  setMenuOpen,
  changeService,
  setConsultation,
  setPaused,
}) => {
  const service = services[active];

  return (
    <div className="hero-shell" id="home">
      <header className="header">
        <Brand />
        <nav
          id="main-navigation"
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {[
            ["About us", "#about"],
            ["Why GBH", "#features"],
            ["What we offer", "#offers"],
            ["Office spaces", "#spaces"],
          ].map(([name, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {name}
            </a>
          ))}
          <a
            className="mobile-contact"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </a>
        </nav>
        <a className="header-contact" href="#contact">
          Let’s talk <Icon name="diagonal" size={16} />
        </a>
        <button
          className="menu-toggle icon-button"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </header>

      <section
        className={`hero ${paused || reducedMotion ? "motion-paused" : ""}`}
        aria-label="GBH business services"
      >
        <div className="hero-scenes" data-parallax="0.18" aria-hidden="true">
          {services.map((item, index) => (
            <div
              key={item.name}
              className={`hero-scene scene-${index} ${index === active ? "active" : ""}`}
            >
              <img
                src={item.image}
                alt=""
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </div>
          ))}
        </div>
        <div className="hero-shade" />

        <div className="hero-content">
          <div className="hero-kicker">
            <span /> BUSINESS SETUP IN UAE
          </div>
          <div className="hero-copy" key={active}>
            <h1>
              <span>{service.title}</span>
              <span>{service.line}</span>
            </h1>
            <p>{service.detail}</p>
          </div>
          <div className="hero-actions mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="button primary"
              onClick={() => setConsultation("Business consultation")}
            >
              Book consultation <Icon name="arrow" size={17} />
            </button>
            <a
              className="button border border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              href="#offers"
            >
              Explore services <Icon name="diagonal" size={17} />
            </a>
          </div>
          <div className="hero-signature" aria-hidden="true">
            <img src="/images/hero-office.jpg" alt="" />
            <div>
              <span>GBH</span>
              <p>
                Local insight.
                <br />
                Global vision.
              </p>
              <Icon name="diagonal" size={22} />
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span>
            <Icon name="pin" size={14} /> DUBAI, UNITED ARAB EMIRATES
          </span>
          <div className="scene-controls">
            <span>
              0{active + 1}
              <span className="scene-total"> / 04</span>
            </span>
            <div className="scene-dots">
              {services.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`Show ${item.name}`}
                  aria-pressed={active === index}
                  onClick={() => changeService(index)}
                  className={active === index ? "active" : ""}
                />
              ))}
            </div>
            <button
              type="button"
              className="motion-toggle"
              aria-label={
                paused ? "Play hero slideshow" : "Pause hero slideshow"
              }
              onClick={() => setPaused(!paused)}
            >
              <Icon name={paused ? "play" : "pause"} size={14} />
            </button>
          </div>
          <a className="discover" href="#features">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
        </div>
        <div className="hero-stats">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
