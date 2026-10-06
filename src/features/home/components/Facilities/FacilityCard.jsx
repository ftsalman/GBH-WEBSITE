import { Icon } from "../Icon";

export const FacilityCard = ({ item }) => (
  <article className="rounded-xl border border-[#dfebd8] bg-white/80 p-5 transition-transform duration-300 hover:-translate-y-1">
    <Icon name={item.icon} size={24} className="text-[#507848]" />
    <h3 className="mt-6 text-base font-semibold">{item.title}</h3>
    <p className="mt-2 text-xs leading-5 text-[#788075]">{item.detail}</p>
  </article>
);
