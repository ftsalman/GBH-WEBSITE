import { useRef } from "react";
import { serviceCards } from "../../constants/homeData";
import { Icon } from "../Icon";

export const Carousel = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="section reveal py-14 md:py-20 overflow-hidden" id="carousel">
      <div className="section-heading mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="eyebrow">OUR EXPERTISE</span>
          <h2>Tailored solutions for your business</h2>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={scrollLeft}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e0e6dc] text-[#536f49] transition-all duration-300 hover:border-[#b4c8a6] hover:bg-[#536f49] hover:text-white"
            aria-label="Previous slide"
          >
            <div className="rotate-180 flex items-center justify-center">
              <Icon name="arrow" size={20} />
            </div>
          </button>
          <button 
            onClick={scrollRight}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e0e6dc] text-[#536f49] transition-all duration-300 hover:border-[#b4c8a6] hover:bg-[#536f49] hover:text-white"
            aria-label="Next slide"
          >
            <Icon name="arrow" size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          #carousel .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}} />
        {serviceCards.map((card, index) => (
          <article 
            key={index}
            className="group luxury-feature relative flex min-w-[85vw] sm:min-w-[320px] md:min-w-[380px] snap-start flex-col overflow-hidden rounded-2xl border border-[#e0e6dc] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#b4c8a6] hover:shadow-2xl hover:shadow-[#263e31]/10 cursor-pointer"
          >
            <div className="h-56 overflow-hidden relative">
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#263e31]/80 via-[#263e31]/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-[#536f49] shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Icon name={card.icon} size={22} />
              </div>
            </div>
            <div className="flex flex-col p-6 md:p-8 flex-grow justify-between">
              <div>
                <span className="mb-4 block text-[10px] tracking-widest text-[#9ba698] font-medium">0{index + 1}</span>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-[#263e31]">{card.title}</h3>
                <p className="text-sm leading-6 text-[#72806f]">{card.description}</p>
              </div>
              <div className="mt-8 flex items-center text-xs font-semibold uppercase tracking-wider text-[#536f49] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explore service <Icon name="arrow" size={14} className="ml-2" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
