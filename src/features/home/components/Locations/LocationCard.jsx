import { Icon } from "../Icon";
import { WEBSITE } from "../../constants/homeData";

export const LocationCard = ({ item, index }) => {
  const gradients = [
    "from-[#24535b] via-[#24535b]/90", // Teal
    "from-[#2a3441] via-[#2a3441]/90", // Slate/Blue
    "from-[#3a2822] via-[#3a2822]/90", // Brown
    "from-[#2b3935] via-[#2b3935]/90", // Dark Green
  ];

  const currentGradient = gradients[index % gradients.length];

  return (
    <div className="group relative overflow-hidden flex flex-col h-full rounded-[24px] min-h-[420px] w-full border border-white/10 shadow-lg">
      {/* Card background / Map Link */}
      <a 
        href={item.mapLink || `${WEBSITE}/office-space`}
        target={item.mapLink ? "_blank" : undefined}
        rel={item.mapLink ? "noopener noreferrer" : undefined}
        className="absolute inset-0 z-0"
      >
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark gradient overlay matching the solid color look at the bottom */}
        <div className={`absolute inset-0 bg-gradient-to-t ${currentGradient} to-transparent`} />
      </a>

    {/* Bookmark Icon */}
    <div className="absolute top-4 right-4 z-20">
      <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors pointer-events-auto">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
    </div>

    {/* Content */}
    <div className="relative z-10 flex flex-col flex-grow p-6 pt-[50%] pointer-events-none">
      
      {/* Title and Price Row */}
      <div className="flex items-center justify-between mb-2 mt-auto">
        <h3 className="text-xl font-bold text-white tracking-tight">{item.name}</h3>
        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-semibold text-white">
          View
        </div>
      </div>
      
      {/* Description */}
      <p className="text-[13px] leading-relaxed text-white/70 mb-4 line-clamp-2">
        {item.description || item.address}
      </p>
      
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
        <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1.5 rounded-full text-[11px] text-white/90 font-medium">
          <Icon name="pin" size={12} className="text-white shrink-0" />
          <span className="truncate max-w-[100px]">{item.centre}</span>
        </div>
        <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1.5 rounded-full text-[11px] text-white/90 font-medium">
          <Icon name="phone" size={12} className="text-white shrink-0" />
          <a href={`tel:${item.phone}`} className="hover:text-white transition-colors !bg-transparent !p-0">{item.phone}</a>
        </div>
        <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1.5 rounded-full text-[11px] text-white/90 font-medium">
          <Icon name="mail" size={12} className="text-white shrink-0" />
          <a href={`mailto:${item.email}`} className="truncate max-w-[100px] hover:text-white transition-colors !bg-transparent !p-0">{item.email}</a>
        </div>
      </div>
      
      {/* CTA Button */}
      <a 
        href="#contact"
        className="pointer-events-auto !bg-white !p-0 w-full flex items-center justify-center text-[#1c2321] font-bold rounded-full text-[16px] hover:!bg-gray-200 transition-colors"
        style={{ padding: "18px 0" }} // Ensure global styles don't override padding
      >
        Book now
      </a>
    </div>
  </div>
  );
};
