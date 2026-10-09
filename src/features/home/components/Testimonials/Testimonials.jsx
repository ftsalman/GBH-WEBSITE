import { useRef } from "react";
import { Icon } from "../Icon";

const testimonialsData = [
  {
    name: "Denis Slavska",
    role: "CTO, Ailitic",
    location: "New York City, New York",
    quote: "They tailor their solutions to our specific needs and goals.",
    company: "Ailitic",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    name: "Jahan Melad",
    role: "Project Manager, Buildwave",
    location: "New York City, New York",
    quote: "They organized their work and internal management was outstanding.",
    company: "BUILDWAVE",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    name: "Jim Halpert",
    role: "Lead Engineering, Inhive Space",
    location: "New York City, New York",
    quote: "Working with them was a great experience.",
    company: "InHive",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    name: "Mohammed Shafeer",
    role: "GBH customer",
    location: "Dubai, UAE",
    quote: "They made the entire company formation process simple and stress-free.",
    company: "GBH",
    avatar: "https://i.pravatar.cc/150?u=ms",
  },
  {
    name: "Sarah Jenkins",
    role: "Operations Director",
    location: "London, UK",
    quote: "Professional from start to finish. Highly recommend their corporate services.",
    company: "Nexus Ltd",
    avatar: "https://i.pravatar.cc/150?u=sj",
  },
];

export const Testimonials = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="section py-20 reveal" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 px-3">
          <div>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-gray-500 mb-4 block">
              OUR REVIEWS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-medium tracking-tight text-black leading-tight">
              What Our <span className="text-gray-400">Clients</span> Say
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button onClick={scrollLeft} className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-md" aria-label="Previous">
              <span className="rotate-180">
                <Icon name="arrow" size={18} />
              </span>
            </button>
            <button onClick={scrollRight} className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-md" aria-label="Next">
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox/IE
        >
          {/* Hide scrollbar for Chrome/Safari */}
          <style dangerouslySetInnerHTML={{__html: `
            div::-webkit-scrollbar { display: none; }
          `}} />

          {testimonialsData.map((t, i) => (
            <div 
              key={i} 
              className="w-[90vw] sm:w-[60vw] md:w-1/3 flex-none snap-start px-3"
            >
              <div className="bg-gray-50 rounded-[32px] p-8 md:p-10 flex flex-col h-full border border-gray-100 shadow-sm">
                
                {/* Top Row: Avatar and Badge */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="border border-gray-200 rounded-full px-4 py-2 flex items-center gap-2 bg-white shadow-sm">
                    <Icon name="briefcase" size={14} className="text-gray-600" />
                    <span className="font-semibold text-sm text-gray-900">{t.company}</span>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="text-blue-400 text-5xl font-serif leading-none mb-4">“</div>

                {/* Quote Text */}
                <p className="text-2xl lg:text-[26px] font-medium leading-[1.2] tracking-tight text-gray-900 mb-12 flex-grow">
                  {t.quote}
                </p>

                {/* Client Details */}
                <div className="border-l-2 border-gray-300 pl-4 mt-auto">
                  <div className="font-medium text-gray-900 text-sm md:text-[15px]">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-1.5 leading-tight">{t.role}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-tight">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
