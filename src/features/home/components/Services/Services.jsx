import { serviceCards } from "../../constants/homeData";
import { ServiceCard } from "./ServiceCard";

export const Services = ({ setConsultation }) => (
  <section className="section reveal py-14 md:py-20" id="offers">
    <div className="section-heading"><div><span className="eyebrow">WHAT WE OFFER</span><h2>Services for every stage of business</h2></div><span className="hidden text-xs text-[#788075] md:block">One ecosystem. Many possibilities.</span></div>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{serviceCards.map((item, index) => <ServiceCard key={item.title} item={item} index={index} onEnquire={setConsultation} />)}</div>
  </section>
);
