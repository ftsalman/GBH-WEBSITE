import { useRef } from "react";
import { Icon } from "../Icon";

const testimonialsData = [
  {
    name: "Mohammed Shafeer",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "They made the entire company formation process simple and stress-free. Quick response, clear communication, and extremely knowledgeable team.",
    avatar: null,
  },
  {
    name: "M Ramzan Jutt",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Very neat and clean business center. Meeting room, pantry, and rooftop sitting area are a great plus. A very professional and comfortable environment.",
    avatar: null,
  },
  {
    name: "Mishab Ali",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Great experience processing my family visa. The team was professional, supportive, and guided me through the entire process smoothly without any delays.",
    avatar: null,
  },
  {
    name: "Abdul Basit",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "I applied for my family's UAE residence visas for the first time and the experience was excellent from start to finish. Very cooperative, professional, and polite.",
    avatar: null,
  },
  {
    name: "Mubashir Mohiuddin",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Starting our business in Dubai was very smooth with their support. From approvals and visa processing to office space setup, everything was handled professionally.",
    avatar: null,
  },
  {
    name: "Mowjooth Fowmy",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Great first impression with a modern and professional office setup. Prime location on Sheikh Zayed Road at White Swan Building.",
    avatar: null,
  },
  {
    name: "Rukn Al Taqdeer Typing",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "They handled my work so quickly and efficiently — everything was done perfectly. The team is very professional, responsive, and easy to deal with.",
    avatar: null,
  },
  {
    name: "Awais Ashraf",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "GBH provides excellent support. They helped me set up my company fast. Highly satisfied with their professionalism.",
    avatar: null,
  },
  {
    name: "P Kumar",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "One of the best professional business centres, well maintained and ideally located on the most signature road of Dubai with a friendly staff.",
    avatar: null,
  },
  {
    name: "Qazi Ubaid",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Great experience at GBH Business Centre — smooth setup process and supportive management. Perfect location too.",
    avatar: null,
  },
  {
    name: "Rajesh Nalli",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Very quick and best team. Thanks for the assistance through my visa process inside the country. I appreciate everyone.",
    avatar: null,
  },
  {
    name: "Muhammadu Fasri",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "The overall service experience was professional and well-handled by a friendly team.",
    avatar: null,
  },
  {
    name: "Sakhawat Ali Ghumman",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Excellent business solutions provider. Fast response and great coordination. GBH deserves five stars!",
    avatar: null,
  },
  {
    name: "Shohak Bangla",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Everything went perfectly smooth. The GBH team handled everything quickly. Highly recommended for startups.",
    avatar: null,
  },
  {
    name: "Md Monir Munir",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Professional support and great results. The GBH team made everything easy. I'm fully satisfied!",
    avatar: null,
  },
  {
    name: "Rome",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Everything is managed perfectly. Staff is well-trained and polite. Highly recommended business center.",
    avatar: null,
  },
  {
    name: "Mahammad Amir",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Professional office help and trusted business services at GBH.",
    avatar: null,
  },
  {
    name: "Rana Qasim121",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote:
      "Staff is well-trained and polite. Highly recommended business center.",
    avatar: null,
  },
  {
    name: "Andrei Alipio",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote: "Friendly staff and a positive atmosphere.",
    avatar: null,
  },
  {
    name: "Malik Adnan",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote: "Best business center and friendly staff.",
    avatar: null,
  },
  {
    name: "Carlos Pazos",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote: "Amazing company, professional staff.",
    avatar: null,
  },
  {
    name: "Shoukat Hussain",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote: "Best support I've ever received.",
    avatar: null,
  },
  {
    name: "Nouman Khalid",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote: "GBH makes business setup easy.",
    avatar: null,
  },
  {
    name: "M Danish",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote: "This team's work is good.",
    avatar: null,
  },
  {
    name: "Lekin Q",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote: "A perfect solution for all business needs.",
    avatar: null,
  },
  {
    name: "Adnan Pawar",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote: "Top-class business center!",
    avatar: null,
  },
  {
    name: "Shrey Soni",
    role: "GBH Client",
    location: "Dubai, UAE",
    quote: "All are good.",
    avatar: null,
  },
];

const avatarGradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)",
  "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
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
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-md"
              aria-label="Previous"
            >
              <span className="rotate-180">
                <Icon name="arrow" size={18} />
              </span>
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-md"
              aria-label="Next"
            >
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox/IE
        >
          {/* Hide scrollbar for Chrome/Safari */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            div::-webkit-scrollbar { display: none; }
          `,
            }}
          />

          {testimonialsData.map((t, i) => (
            <div
              key={i}
              className="w-[90vw] sm:w-[60vw] md:w-1/3 flex-none snap-start px-3"
            >
              <div className="bg-gray-50 rounded-[32px] p-8 md:p-10 flex flex-col h-full border border-gray-100 shadow-sm">
                {/* Top Row: Avatar and Badge */}
                <div className="flex justify-between items-start mb-8">
                  {/* Avatar: photo if available, else first-letter initial */}
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white font-bold text-xl"
                        style={{
                          background:
                            avatarGradients[i % avatarGradients.length],
                        }}
                      >
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Google 5-star badge */}
                  <div className="border border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-1 bg-white shadow-sm">
                    {[...Array(5)].map((_, si) => (
                      <svg
                        key={si}
                        className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="text-blue-400 text-5xl font-serif leading-none mb-4">
                  “
                </div>

                {/* Quote Text */}
                <p className="text-2xl lg:text-[26px] font-medium leading-[1.2] tracking-tight text-gray-900 mb-12 flex-grow">
                  {t.quote}
                </p>

                {/* Client Details */}
                <div className="border-l-2 border-gray-300 pl-4 mt-auto">
                  <div className="font-medium text-gray-900 text-sm md:text-[15px]">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1.5 leading-tight">
                    {t.role}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-tight">
                    {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
