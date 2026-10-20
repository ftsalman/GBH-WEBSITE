import { facilityCards, WEBSITE } from "../../constants/homeData";
import { FacilityCard } from "./FacilityCard";

export const Facilities = ({ setConsultation }) => (
  <section className="lp-band-wash" id="facilities">
    <div
      className="lp-container lp-section"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      <div className="lp-heading-row lp-facilities-head" data-reveal>
        <div className="lp-heading">
          <span className="lp-eyebrow">Workspace facilities</span>
          <h2 className="lp-h2">Everything You Need for Your Workday</h2>
          <p className="lp-lead">
            Enjoy essential workplace facilities designed to make your day more
            comfortable, convenient and productive.
          </p>
        </div>
        <img
          src="https://i.pinimg.com/736x/ae/eb/b7/aeebb7649026f75fc9b5e7fe8e73a80b.jpg"
          alt="Illustrative office interior"
          loading="lazy"
        />
      </div>
      <div className="lp-cards">
        {facilityCards.map((item, index) => (
          <FacilityCard key={item.title} item={item} delay={index * 70} />
        ))}
      </div>
      <div className="lp-actions">
        <button
          type="button"
          className="lp-btn lp-btn-accent"
          onClick={() => setConsultation("Schedule a Viewing")}
        >
          Schedule a Viewing
        </button>
        <a href={`${WEBSITE}/contact`} className="lp-btn lp-btn-outline">
          Contact Now
        </a>
      </div>
    </div>
  </section>
);
