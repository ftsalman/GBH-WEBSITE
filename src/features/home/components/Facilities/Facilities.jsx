import { facilityCards, WEBSITE } from "../../constants/homeData";
import { FacilityCard } from "./FacilityCard";
import { Icon } from "../Icon";

export const Facilities = ({ setConsultation }) => (
  <section
    className="section reveal rounded-2xl bg-[#eff5e9] px-5 py-12 md:px-10 md:py-16"
    id="spaces"
  >
    <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
      <div>
        <span className="eyebrow">WORKSPACE FACILITIES</span>
        <h2>Office space with room to grow.</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#687564]">
          Explore GBH business centres, furnished offices and the everyday
          essentials that support your team.
        </p>
      </div>
      <img
        src="https://i.pinimg.com/736x/ae/eb/b7/aeebb7649026f75fc9b5e7fe8e73a80b.jpg"
        alt="Illustrative office interior"
        loading="lazy"
        className="aspect-[2.3] w-full rounded-xl object-cover md:w-72"
      />
    </div>
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {facilityCards.map((item) => (
        <FacilityCard key={item.title} item={item} />
      ))}
    </div>
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        className="button primary"
        onClick={() => setConsultation("Office space")}
      >
        Book now <Icon name="arrow" size={17} />
      </button>
      <a href={`${WEBSITE}/contact`} className="button secondary">
        Contact now <Icon name="diagonal" size={17} />
      </a>
    </div>
  </section>
);
