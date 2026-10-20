import { useEffect, useRef, useState } from "react";
import { Consultation } from "../components/Consultation";
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import { Gallery } from "../components/Gallery/Gallery";
import { Facilities } from "../components/Facilities/Facilities";
import { Pricing } from "../components/Pricing/Pricing";
import { BookingProcess } from "../components/BookingProcess/BookingProcess";
import { Locations } from "../components/Locations/Locations";
import { Testimonials } from "../components/Testimonials/Testimonials";
import { Contact } from "../components/Contact/Contact";
import { MobileBar } from "../components/MobileBar/MobileBar";
import { ScrollEffects } from "../components/ScrollEffects/ScrollEffects";
import { Footer } from "../../../components/footer/Footer";
import "./landing.css";

export const Homepage = () => {
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

  return (
    <div className="lp" ref={page}>
      <ScrollEffects pageRef={page} reducedMotion={reducedMotion} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setConsultation={setConsultation}
      />
      <main id="main">
        <Hero setConsultation={setConsultation} />
        <Gallery />
        <Facilities setConsultation={setConsultation} />
        <Pricing />
        <BookingProcess />
        <Locations />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
      {consultation && (
        <Consultation
          service={consultation}
          onClose={() => setConsultation(null)}
        />
      )}
    </div>
  );
};
