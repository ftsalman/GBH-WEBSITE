import { useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icon";
import { Brand } from "../components/Brand";
import { Consultation } from "../components/Consultation";
import "./home.css";

const WEBSITE = "https://www.gbhgroup.ae";
const services = [
  {
    name: "Business setup",
    icon: "briefcase",
    image: "/images/dubai.png",
    title: "A business that thrives,",
    line: "Not far away.",
    detail:
      "Mainland, free zone or offshore — let’s bring your business to life.",
    options: ["Mainland company", "Free zone company", "Offshore business"],
    label: "Company formation",
    location: "United Arab Emirates",
  },
  {
    name: "Office spaces",
    icon: "building",
    image: "/images/hero-office.jpg",
    title: "Space to connect.",
    line: "Room to grow.",
    detail: "Explore office spaces that suit your business needs.",
    options: [
      "White Swan",
      "Business Bay · Clover Bay Tower",
      "Saeed Tower",
      "Al Muteena",
      "Ras Al Khor",
    ],
    label: "Your preferred centre",
    location: "Dubai, UAE",
  },
  {
    name: "Visa services",
    icon: "globe",
    image: "/images/workspace.jpg",
    title: "The world is waiting.",
    line: "Let’s get you there.",
    detail: "Visa support for your professional travel and stay.",
    options: ["Visa services", "Global visa services"],
    label: "How can we help?",
    location: "United Arab Emirates",
  },
  {
    name: "Financial consulting",
    icon: "chart",
    image: "/images/meeting.jpg",
    title: "Build with confidence.",
    line: "Grow with GBH.",
    detail: "Accounting, compliance and operational support, under one roof.",
    options: [
      "Financial consulting",
      "Accounts management",
      "Compliance support",
    ],
    label: "Your business needs",
    location: "United Arab Emirates",
  },
];
const ecosystem = [
  {
    name: "Business Centers",
    sub: "Your space to grow",
    icon: "building",
    image: "/images/hero-office.jpg",
    href: "/office-space",
  },
  {
    name: "Business Setup",
    sub: "Start your next chapter",
    icon: "briefcase",
    image: "/images/dubai.jpg",
    href: "/what-we-do",
  },
  {
    name: "Financial Consulting",
    sub: "Build with confidence",
    icon: "chart",
    image: "/images/meeting.jpg",
    href: "/what-we-do",
  },
  {
    name: "Software Development",
    sub: "Technology for tomorrow",
    icon: "code",
    image: "/images/workspace.jpg",
    href: "/what-we-do",
  },
  {
    name: "Legal Services",
    sub: "Support at every step",
    icon: "shield",
    image: "/images/meeting.jpg",
    href: "/what-we-do",
  },
  {
    name: "Global Visa Services",
    sub: "A world of opportunity",
    icon: "globe",
    image: "/images/dubai.jpg",
  },
];

const bookingSteps = [
  { step: "01", title: "Assess your needs", desc: "We understand your business requirements to find the perfect fit." },
  { step: "02", title: "Quoting & Proposal", desc: "Receive a tailored, transparent proposal with flexible terms." },
  { step: "03", title: "Finalise your move", desc: "Sign your agreement and seamlessly transition into your new space." }
];

const faqs = [
  { q: "How soon can I move in?", a: "You can move in immediately after finalising the paperwork and payment." },
  { q: "Can I upgrade my contract later?", a: "Yes, our flexible plans allow you to scale up as your business grows." },
  { q: "Are utilities included in the cost?", a: "Yes, all our serviced offices include high-speed internet, electricity, and water." },
  { q: "Do you assist with business registration?", a: "Absolutely. Our expert consultants handle mainland, free zone, and offshore company formation." }
];

const clients = [
  "Microsoft", "Amazon", "Google", "Oracle", "IBM", "Salesforce"
];

const blogPosts = [
  { title: "Navigating the future of work in the UAE", category: "Business Setup", date: "Oct 2026", image: "/images/workspace.jpg" },
  { title: "A complete guide to Ejari registration and renewal", category: "Compliance", date: "Sep 2026", image: "/images/hero-office.jpg" },
  { title: "How workspace design impacts team productivity", category: "Insights", date: "Aug 2026", image: "/images/meeting.jpg" }
];

export const Hompage = () => {
  const [active, setActive] = useState(0);
  const [selection, setSelection] = useState(services[0].options[0]);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [consultation, setConsultation] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const page = useRef(null);
  const service = services[active];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event) => setReducedMotion(event.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || interacting || consultation) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setActive((current) => (current + 1) % services.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, interacting, consultation]);

  useEffect(() => {
    setSelection(services[active].options[0]);
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    page.current
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function changeService(index) {
    setActive(index);
    setPaused(true);
  }

  return (
    <div className="landing-page" ref={page}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <section
        className={`hero ${paused || interacting || reducedMotion ? "motion-paused" : ""}`}
        id="home"
        aria-label="GBH business services"
      >
        <div className="hero-scenes" aria-hidden="true">
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
        <header className="header">
          <Brand />
          <nav
            className={menuOpen ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            {[
              ["About us", "#about"],
              ["The GBH ecosystem", "#ecosystem"],
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
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </header>
        <div className="hero-content">
          <div className="hero-kicker">
            <span /> YOUR BUSINESS. OUR ECOSYSTEM.
          </div>
          <div className="hero-copy" key={active}>
            <h1>
              <span>{service.title}</span>
              <span>{service.line}</span>
            </h1>
            <p>{service.detail}</p>
          </div>
          <div
            className="service-finder"
            onMouseEnter={() => setInteracting(true)}
            onMouseLeave={() => setInteracting(false)}
            onFocus={() => setInteracting(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setInteracting(false);
            }}
          >
            <div
              className="service-tabs"
              role="tablist"
              aria-label="Explore our services"
            >
              <span
                className="tab-indicator"
                style={{ "--active-tab": active }}
              />
              {services.map((item, index) => (
                <button
                  key={item.name}
                  id={`service-tab-${index}`}
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="service-panel"
                  tabIndex={active === index ? 0 : -1}
                  className={active === index ? "selected" : ""}
                  onClick={() => changeService(index)}
                  onKeyDown={(event) => {
                    let next;
                    if (event.key === "ArrowRight")
                      next = (index + 1) % services.length;
                    if (event.key === "ArrowLeft")
                      next = (index + services.length - 1) % services.length;
                    if (event.key === "Home") next = 0;
                    if (event.key === "End") next = services.length - 1;
                    if (next !== undefined) {
                      event.preventDefault();
                      changeService(next);
                      document.getElementById(`service-tab-${next}`).focus();
                    }
                  }}
                >
                  <Icon name={item.icon} size={17} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
            <div
              className="finder-card"
              id="service-panel"
              role="tabpanel"
              aria-labelledby={`service-tab-${active}`}
            >
              <form
                className="finder-fields"
                onSubmit={(event) => {
                  event.preventDefault();
                  setConsultation(selection);
                }}
              >
                <div className="finder-field select-field">
                  <Icon name={service.icon} />
                  <label htmlFor="service-choice">
                    <span>{service.label}</span>
                    <select
                      id="service-choice"
                      value={selection}
                      onChange={(event) => {
                        setSelection(event.target.value);
                        setPaused(true);
                      }}
                    >
                      {service.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <Icon name="chevron" size={16} />
                </div>
                <div className="finder-field location-field">
                  <Icon name="pin" />
                  <div>
                    <span>Where opportunity begins</span>
                    <strong>{service.location}</strong>
                  </div>
                </div>
                <div className="finder-field specialist-field">
                  <Icon name="people" />
                  <div>
                    <span>By your side</span>
                    <strong>Expert consultants</strong>
                  </div>
                </div>
                <button type="submit" className="button primary">
                  Let’s get started <Icon name="arrow" size={18} />
                </button>
              </form>
              <div className="finder-benefits">
                <span>
                  <Icon name="shield" size={15} /> 15+ years of experience
                </span>
                <span>
                  <Icon name="check" size={15} /> All-in-one business support
                </span>
                <span>
                  <Icon name="people" size={15} /> 20+ expert consultants
                </span>
                <span>
                  <Icon name="globe" size={15} /> Local insight. Global vision.
                </span>
              </div>
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
                  aria-label={`Show ${item.name}`}
                  aria-pressed={active === index}
                  onClick={() => changeService(index)}
                  className={active === index ? "active" : ""}
                />
              ))}
            </div>
            <button
              className="motion-toggle"
              aria-label={
                paused ? "Play hero slideshow" : "Pause hero slideshow"
              }
              onClick={() => setPaused(!paused)}
            >
              <Icon name={paused ? "play" : "pause"} size={14} />
            </button>
          </div>
          <a className="discover" href="#ecosystem">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
        </div>
      </section>
      <main id="main">
        <section className="section ecosystem reveal" id="ecosystem">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ONE PARTNER. EVERY POSSIBILITY.</span>
              <h2>Discover the GBH ecosystem</h2>
            </div>
            <a className="text-link" href={`${WEBSITE}/what-we-do`}>
              Explore all <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="ecosystem-grid">
            {ecosystem.map((item, index) => (
              <a
                className={`ecosystem-card ecosystem-card-${index}`}
                href={`${WEBSITE}${item.href}`}
                key={item.name}
              >
                <img src={item.image} alt="" loading="lazy" />
                <span className="card-top">
                  <Icon name={item.icon} size={21} />
                  <Icon name="diagonal" size={17} />
                </span>
                <span className="card-bottom">
                  <span>{item.sub}</span>
                  <h3>{item.name}</h3>
                </span>
              </a>
            ))}
          </div>
        </section>
        <section className="about-banner section reveal" id="about">
          <img
            className="banner-image"
            src="/images/dubai.jpg"
            alt="Dubai skyline and Sheikh Zayed Road"
            loading="lazy"
          />
          <div className="about-content">
            <span className="outline-tag">THE GBH WAY</span>
            <h2>
              Let’s build up.
              <br />
              With care.
            </h2>
            <p>
              Business setup, legal, accounting, compliance, marketing and
              operational support. Everything you need to grow, under one roof.
            </p>
            <a className="button light" href={`${WEBSITE}/about`}>
              Get to know us <Icon name="diagonal" size={18} />
            </a>
          </div>
          <div className="about-side">
            <span className="about-years">
              15<span>+</span>
            </span>
            <span>
              years of building
              <br />
              businesses and possibilities.
            </span>
          </div>
        </section>
        <section className="stats section reveal" aria-label="GBH in numbers">
          {[
            ["2,000+", "Clients who trust us"],
            ["9+", "Business centers"],
            ["98.9%", "Client satisfaction"],
            ["10K+", "Business establishments"],
          ].map(([number, label]) => (
            <div key={label}>
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>
        <section className="section clients reveal" aria-label="Our Corporate Partners">
          <div className="review-intro" style={{textAlign: "center", marginBottom: "3rem"}}>
            <span className="eyebrow">CONSIDERING TO JOIN? YOU'RE IN GOOD COMPANY</span>
            <h2>Trusted by global enterprises</h2>
          </div>
          <div className="clients-marquee" style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap", opacity: 0.6 }}>
            {clients.map(client => (
              <span key={client} style={{ fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" }}>{client}</span>
            ))}
          </div>
        </section>
        <section className="section offers reveal" id="offers">
          <div className="section-heading">
            <div>
              <span className="eyebrow">BUILT AROUND YOUR AMBITIONS</span>
              <h2>Your next step starts here</h2>
            </div>
            <a className="text-link" href={`${WEBSITE}/what-we-offer`}>
              All services <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="offer-grid">
            <article className="offer-card offer-green">
              <div className="offer-text">
                <span className="offer-label">BUSINESS SETUP</span>
                <h3>
                  A strong start.
                  <br />A thriving future.
                </h3>
                <p>
                  Mainland, free zone and offshore company formation, with
                  expert guidance.
                </p>
                <button
                  className="round-link"
                  onClick={() => setConsultation("Business setup packages")}
                  aria-label="Enquire about business setup"
                >
                  <Icon name="diagonal" />
                </button>
              </div>
              <div className="offer-illustration" aria-hidden="true">
                <div className="document">
                  <span className="document-icon">
                    <Icon name="briefcase" size={29} />
                  </span>
                  <b>
                    YOUR NEXT
                    <br />
                    BIG IDEA.
                  </b>
                  <span className="document-line" />
                  <span className="document-line short" />
                  <span className="document-approved">
                    <Icon name="check" size={13} /> STARTS WITH GBH
                  </span>
                </div>
              </div>
            </article>
            <article className="offer-card offer-peach">
              <div className="offer-text">
                <span className="offer-label">GLOBAL VISA SERVICES</span>
                <h3>
                  New horizons.
                  <br />
                  Made possible.
                </h3>
                <p>
                  Get set for your professional travel and stay, with GBH by
                  your side.
                </p>
                <button
                  className="round-link"
                  onClick={() => setConsultation("Global visa services")}
                  aria-label="Enquire about visa services"
                >
                  <Icon name="diagonal" />
                </button>
              </div>
              <div className="offer-illustration" aria-hidden="true">
                <div className="passport">
                  <Icon name="globe" size={66} />
                  <span>
                    GLOBAL
                    <br />
                    POSSIBILITIES
                  </span>
                  <div className="passport-chip" />
                </div>
              </div>
            </article>
            <article className="offer-card offer-blue">
              <div className="offer-text">
                <span className="offer-label">FINANCIAL CONSULTING</span>
                <h3>
                  Your business.
                  <br />
                  In good hands.
                </h3>
                <p>
                  Accounts management and compliance support to move your
                  business forward.
                </p>
                <button
                  className="round-link"
                  onClick={() => setConsultation("Financial consulting")}
                  aria-label="Enquire about financial consulting"
                >
                  <Icon name="diagonal" />
                </button>
              </div>
              <div
                className="offer-illustration chart-illustration"
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
                <Icon name="diagonal" size={75} />
              </div>
            </article>
          </div>
        </section>
        <section className="section spaces reveal" id="spaces">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A PLACE FOR YOUR POSSIBILITIES</span>
              <h2>Find your business a home</h2>
            </div>
            <a className="text-link" href={`${WEBSITE}/office-space`}>
              View office spaces <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="spaces-grid">
            {[
              {
                name: "White Swan",
                location: "Sheikh Zayed Road, Dubai",
                image: "/images/hero-office.jpg",
                amenities: "Reception · Pantry · Refreshments",
              },
              {
                name: "Clover Bay Tower",
                location: "Business Bay, Dubai",
                image: "/images/workspace.jpg",
                amenities: "Furnished offices · Wi-Fi · Meeting room",
              },
              {
                name: "Saeed Tower",
                location: "Dubai, UAE",
                image: "/images/meeting.jpg",
                amenities: "Reception · Access card · Pantry",
              },
            ].map((office, index) => (
              <a
                className="space-card"
                href={`${WEBSITE}/office-space`}
                key={office.name}
              >
                <div className="space-image">
                  <img
                    src={office.image}
                    alt={`Illustrative ${index === 2 ? "meeting room" : "office interior"}`}
                    loading="lazy"
                  />
                  <span>BUSINESS CENTER</span>
                  <span className="image-disclosure">
                    Illustrative interior
                  </span>
                  <span className="space-arrow">
                    <Icon name="diagonal" size={19} />
                  </span>
                </div>
                <div className="space-title">
                  <h3>{office.name}</h3>
                  <Icon name="arrow" size={19} />
                </div>
                <p>
                  <Icon name="pin" size={14} /> {office.location}
                </p>
                <div className="space-amenities">{office.amenities}</div>
              </a>
            ))}
          </div>
        </section>
        <section className="section process reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">GETTING STARTED</span>
              <h2>Fast and simple booking</h2>
            </div>
          </div>
          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
            {bookingSteps.map((item) => (
              <div key={item.step} className="process-step" style={{ padding: "2rem", background: "var(--brand-light, #f9f9f9)", border: "1px solid var(--border-color, #eaeaea)", borderRadius: "12px" }}>
                <span style={{ fontSize: "3rem", fontWeight: "300", color: "var(--brand-primary, #ccc)" }}>{item.step}</span>
                <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary, #666)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section testimonial reveal">
          <div className="review-intro">
            <span className="eyebrow">GREAT BUSINESSES. REAL PEOPLE.</span>
            <h2>
              Built on trust.
              <br />
              Backed by experience.
            </h2>
            <a className="text-link" href={WEBSITE}>
              Meet the GBH community <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="review-quote">
            <span className="eyebrow">WHAT OUR CUSTOMERS SAY</span>
            <blockquote>
              “GBH provides excellent support. They helped me set up my company
              fast. Highly satisfied with their professionalism.”
            </blockquote>
            <div className="review-person">
              <span className="avatar">AA</span>
              <div>
                <strong>Awais Ashraf</strong>
                <span>GBH customer</span>
              </div>
              <a href={WEBSITE} className="review-source">
                From our community <Icon name="diagonal" size={14} />
              </a>
            </div>
          </div>
        </section>
        <section className="section blog reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">NAVIGATING THE FUTURE OF WORK</span>
              <h2>Latest insights & guides</h2>
            </div>
            <a className="text-link" href={`${WEBSITE}/blog`}>
              View all articles <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
            {blogPosts.map((post) => (
              <a href={`${WEBSITE}/blog`} key={post.title} className="blog-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "16/9", marginBottom: "1.5rem" }}>
                  <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem", marginBottom: "0.75rem", color: "var(--text-secondary, #666)", fontWeight: "500", textTransform: "uppercase" }}>
                  <span>{post.category}</span>
                  <span>&middot;</span>
                  <span>{post.date}</span>
                </div>
                <h3 style={{ fontSize: "1.25rem", lineHeight: "1.4" }}>{post.title}</h3>
              </a>
            ))}
          </div>
        </section>
        <section className="section faq reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SERVICE CLARIFICATIONS</span>
              <h2>Frequently asked questions</h2>
            </div>
          </div>
          <div className="faq-list" style={{ maxWidth: "800px", margin: "3rem auto 0" }}>
            {faqs.map((faq, index) => (
              <details key={index} style={{ borderBottom: "1px solid var(--border-color, #eaeaea)", padding: "1.5rem 0", cursor: "pointer" }}>
                <summary style={{ fontSize: "1.25rem", fontWeight: "600", outline: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {faq.q}
                </summary>
                <p style={{ marginTop: "1rem", color: "var(--text-secondary, #666)", lineHeight: "1.6" }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="section contact-section reveal" id="contact">
          <div>
            <span className="eyebrow">
              YOUR NEXT CHAPTER STARTS WITH A CONVERSATION
            </span>
            <h2>
              Big ambitions?
              <br />
              Let’s make them happen.
            </h2>
            <p>
              Contact us to elevate your business to new heights.
              <br />
              We can take you where you want to be.
            </p>
            <button
              className="button primary"
              onClick={() => setConsultation("Starting or growing my business")}
            >
              Connect with GBH <Icon name="diagonal" size={18} />
            </button>
          </div>
          <div className="contact-orbit" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-center">
              gbh<span>LET’S GROW TOGETHER</span>
            </div>
            <span className="orbit-dot dot-one">
              <Icon name="briefcase" size={24} />
            </span>
            <span className="orbit-dot dot-two">
              <Icon name="globe" size={27} />
            </span>
            <span className="orbit-dot dot-three">
              <Icon name="building" size={24} />
            </span>
          </div>
        </section>
      </main>
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
            <a href="#ecosystem">The GBH ecosystem</a>
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
          <span>
            © {new Date().getFullYear()} GBH Group. All rights reserved.
          </span>
          <span>Local insight. Global vision.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
      {consultation && (
        <Consultation
          service={consultation}
          onClose={() => setConsultation(null)}
        />
      )}
    </div>
  );
};
