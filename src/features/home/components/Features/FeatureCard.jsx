import { Icon } from "../Icon";

export const FeatureCard = ({ item, index }) => (
  <article data-reveal style={{ "--reveal-delay": `${index * 70}ms` }} className="luxury-feature group rounded-2xl border border-[#e0e6dc] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#b4c8a6] hover:shadow-xl hover:shadow-[#263e31]/5 md:p-8">
    <span className="mb-14 flex items-start justify-between text-[#536f49]"><Icon name={item.icon} size={27} /><span className="text-[10px] tracking-widest text-[#9ba698]">0{index + 1}</span></span>
    <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
    <p className="mt-3 text-xs leading-6 text-[#72806f]">{item.description}</p>
  </article>
);
