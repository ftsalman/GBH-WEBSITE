import { locations } from "../../constants/homeData";
import { LocationCard } from "./LocationCard";

export const Locations = () => (
  <section className="section reveal py-14 md:py-20" id="locations">
    <div className="section-heading"><div><span className="eyebrow">ACROSS DUBAI</span><h2>Closer to your next opportunity</h2></div></div>
    <div className="grid gap-px overflow-hidden rounded-2xl bg-[#dfe5da] sm:grid-cols-2 lg:grid-cols-4">{locations.map((item, index) => <LocationCard key={item.name} item={item} index={index} />)}</div>
  </section>
);
