import { serviceCards } from "../../constants/homeData";
import { ServiceCard } from "./ServiceCard";

export const Services = ({ setConsultation }) => (
  <section className="section reveal py-14 md:py-20" id="offers">
    <div className="section-heading">
      <div>
        <span className="eyebrow">WHAT WE OFFER</span>
        <h2>Services for every stage of business</h2>
      </div>
      <span className="hidden text-xs text-[#788075] md:block">
        One ecosystem. Many possibilities.
      </span>
    </div>
    <div className="services-layout">
      <div className="services-grid">
        {serviceCards.map((item, index) => (
          <ServiceCard
            key={item.title}
            item={item}
            index={index}
            onEnquire={setConsultation}
          />
        ))}
      </div>
      <div className="services-image">
        <img
          src="https://i.pinimg.com/736x/0e/0d/a4/0e0da42ad19528b9d251e3944a99529c.jpg"
          alt="Business workspace"
          loading="lazy"
          data-parallax="0.08"
        />
      </div>
    </div>
  </section>
);
