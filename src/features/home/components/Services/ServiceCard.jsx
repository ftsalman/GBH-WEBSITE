import { Icon } from "../Icon";

export const ServiceCard = ({ item, index, onEnquire }) => (
  <article data-reveal style={{ "--reveal-delay": `${(index % 3) * 70}ms` }} className="luxury-service group overflow-hidden rounded-2xl border border-[#e1e7dd] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#263e31]/10">
    <div className="relative aspect-[1.9] overflow-hidden bg-[#e8eee3]"><img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#3f6847]"><Icon name={item.icon} size={20} /></span></div>
    <div className="p-6"><h3 className="text-xl font-semibold tracking-tight">{item.title}</h3><p className="mt-2 min-h-12 text-xs leading-6 text-[#738071]">{item.description}</p><button type="button" onClick={() => onEnquire(item.title)} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#1b75d9] hover:underline">Enquire now <Icon name="arrow" size={16} /></button></div>
  </article>
);
