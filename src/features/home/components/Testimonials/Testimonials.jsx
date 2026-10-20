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

export const Testimonials = () => {
  const scrollRef = useRef(null);
  // Scroll by one card (plus the 16px gap) so cards stay aligned.
  const scroll = (direction) => {
    const row = scrollRef.current;
    const card = row?.firstElementChild;
    if (card) row.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <section className="lp-band-wash" id="testimonials">
      <div
        className="lp-container lp-section"
        style={{ display: "flex", flexDirection: "column", gap: 32 }}
      >
        <div className="lp-heading-row" data-reveal>
          <div className="lp-heading">
            <span className="lp-eyebrow">Our reviews</span>
            <h2 className="lp-h2">What Our Clients Say</h2>
          </div>
          <div className="lp-review-nav">
            <button
              type="button"
              className="lp-round-btn"
              onClick={() => scroll(-1)}
              aria-label="Previous reviews"
            >
              <Icon name="arrow" size={18} style={{ transform: "rotate(180deg)" }} />
            </button>
            <button
              type="button"
              className="lp-round-btn"
              onClick={() => scroll(1)}
              aria-label="Next reviews"
            >
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="lp-reviews">
          {testimonialsData.map((t, index) => (
            <figure
              key={t.name}
              className="lp-review"
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index, 3) * 90}ms` }}
            >
              <div className="lp-stars" role="img" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="star" size={18} fill="currentColor" />
                ))}
              </div>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                {t.name} <span>· {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
