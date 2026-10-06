import { useEffect, useRef, useState } from "react";
import { Consultation } from "../components/Consultation";
import { Hero } from "../components/Hero/Hero";
import { AboutIntro } from "../components/AboutIntro/AboutIntro";
import { Features } from "../components/Features/Features";
import { IntroTestimonial } from "../components/IntroTestimonial/IntroTestimonial";
import { ClientsMarquee } from "../components/ClientsMarquee/ClientsMarquee";
import { Services } from "../components/Services/Services";
import { Facilities } from "../components/Facilities/Facilities";
import { ScrollEffects } from "../components/ScrollEffects/ScrollEffects";
import { Locations } from "../components/Locations/Locations";
import { BookingProcess } from "../components/BookingProcess/BookingProcess";
import { Testimonials } from "../components/Testimonials/Testimonials";
import { Contact } from "../components/Contact/Contact";
import { FinalCTA } from "../components/FinalCTA/FinalCTA";
import { Footer } from "../../../components/footer/Footer";
import { services } from "../constants/homeData";
import "./home.css";
import "./luxury.css";

export const Homepage = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [consultation, setConsultation] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const page = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event) => setReducedMotion(event.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || consultation) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setActive((current) => (current + 1) % services.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, consultation]);

  function changeService(index) {
    setActive(index);
    setPaused(true);
  }

  return (
    <div className="landing-page luxury-page" ref={page}>
      <ScrollEffects pageRef={page} reducedMotion={reducedMotion} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Hero
        active={active}
        paused={paused}
        reducedMotion={reducedMotion}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        changeService={changeService}
        setConsultation={setConsultation}
        setPaused={setPaused}
      />
      <main id="main">
        <ClientsMarquee />
        <AboutIntro />
        <Features />
        <Services setConsultation={setConsultation} />
        <Facilities setConsultation={setConsultation} />
        <IntroTestimonial />
        <Locations />
        <Testimonials />
        <BookingProcess />
        <Contact />
        <FinalCTA
          onBook={() => setConsultation("Free business consultation")}
        />
      </main>
      <Footer />
      {consultation && (
        <Consultation
          service={consultation}
          onClose={() => setConsultation(null)}
        />
      )}
    </div>
  );
};
