import { Icon } from "../Icon";
import { WEBSITE } from "../../constants/homeData";

export const LocationCard = ({ item, index }) => (
  <a href={`${WEBSITE}/office-space`} className="group bg-[#f3f6ef] p-6 transition-colors hover:bg-[#dff0cf] md:p-7">
    <div className="mb-12 flex items-start justify-between"><span className="text-[10px] tracking-[0.15em] text-[#7b8475]">DUBAI · 0{index + 1}</span><Icon name="diagonal" size={17} /></div>
    <Icon name="pin" size={21} /><h3 className="mt-4 text-xl font-medium">{item.name}</h3><p className="mt-1 text-xs text-[#6e776a]">{item.centre}</p><p className="mt-5 border-t border-[#d7dfd1] pt-4 text-[11px] leading-5 text-[#788075]">{item.description}</p>
  </a>
);
