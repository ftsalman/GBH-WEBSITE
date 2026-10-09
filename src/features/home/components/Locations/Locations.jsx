import { locations } from "../../constants/homeData";
import { LocationCard } from "./LocationCard";

export const Locations = () => (
  <section className="section reveal py-14 md:py-20" id="locations">
    <div className="section-heading">
      <div>
        <span className="eyebrow">OUR BUSINESS CENTERS</span>
        <h2>Find Us Across Dubai</h2>

        <p className="mt-3 text-md leading-6 text-[#72806f]">
          Explore our business centers across Dubai and connect directly with
          the location that best suits your business requirements.
        </p>
      </div>
    </div>
    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {locations.map((item, index) => (
        <LocationCard key={item.name} item={item} index={index} />
      ))}
    </div>
  </section>
);
