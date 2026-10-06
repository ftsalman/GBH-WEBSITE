import { features } from "../../constants/homeData";
import { FeatureCard } from "./FeatureCard";

export const Features = () => (
  <section className="section reveal py-14 md:py-20" id="features">
    <div className="section-heading"><div><span className="eyebrow">WHY GBH</span><h2>Everything your business needs to move forward</h2></div></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{features.map((item, index) => <FeatureCard key={item.title} item={item} index={index} />)}</div>
  </section>
);
