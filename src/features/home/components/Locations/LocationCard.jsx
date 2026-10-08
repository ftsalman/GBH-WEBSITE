import { Icon } from "../Icon";
import { WEBSITE } from "../../constants/homeData";

export const LocationCard = ({ item, index }) => (
  <a
    href={`${WEBSITE}/office-space`}
    className="group relative overflow-hidden p-6 md:p-7"
  >
    {/* Background image */}
    <img
      src={item.image}
      alt={item.name}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    {/* Dark gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/55" />

    {/* Content */}
    <div className="relative z-10">
      <div className="mb-12 flex items-start justify-between">
        <span className="text-[10px] tracking-[0.15em] text-white/70">
          DUBAI · 0{index + 1}
        </span>
        <Icon name="diagonal" size={17} className="text-white/70" />
      </div>
      <Icon name="pin" size={21} className="text-white" />
      <h3 className="mt-4 text-xl font-medium text-white">{item.name}</h3>
      <p className="mt-1 text-xs text-white/60">{item.centre}</p>
      <p className="mt-5 border-t border-white/20 pt-4 text-[11px] leading-5 text-white/70">
        {item.description}
      </p>
    </div>
  </a>
);
