import { locations } from "../../constants/homeData";
import { LocationCard } from "./LocationCard";

const alMuteena = locations.find((item) => item.mapEmbed);

export const Locations = () => (
  <section className="lp-container lp-section lp-location" id="locations">
    <div className="lp-map" data-reveal>
      <iframe
        src={alMuteena.mapEmbed}
        title="Map of the GBH Al Muteena business center"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
    <div className="lp-location-info" data-reveal style={{ "--reveal-delay": "150ms" }}>
      <span className="lp-eyebrow">Our business centers</span>
      <h2 className="lp-h2">Find Us Across Dubai</h2>
      <p className="lp-lead">
        Explore our business centers across Dubai and connect directly with the
        location that best suits your business requirements.
      </p>
      <ul className="lp-centres">
        {locations.map((item) => (
          <LocationCard key={item.name} item={item} />
        ))}
      </ul>
      <div className="lp-actions">
        <a
          href={alMuteena.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="lp-btn lp-btn-dark lp-btn-sm"
        >
          Get directions
        </a>
        <a href="#contact" className="lp-btn lp-btn-outline lp-btn-sm">
          Book now
        </a>
      </div>
    </div>
  </section>
);
