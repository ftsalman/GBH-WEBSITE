import { useState, useEffect } from "react";
import { Icon } from "../Icon";
import { Brand } from "../Brand";

const VIDEO_ID = "AnE_i7bzTPE";

export const Hero = ({ menuOpen, setMenuOpen, setConsultation }) => {
  const [videoOpen, setVideoOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    if (videoOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [videoOpen]);

  return (
    <div
      className="relative min-h-screen bg-[#fcfaf5] overflow-hidden font-sans"
      id="home"
    >
      {/* Decorative background elements removed from here to be placed relative to the video */}

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 max-w-[1400px] mx-auto">
        <Brand />
        <nav
          id="main-navigation"
          className={`${menuOpen ? "flex" : "hidden"} md:flex absolute md:static top-full left-0 w-full md:w-auto bg-[#fcfaf5] md:bg-transparent flex-col md:flex-row items-center gap-6 md:gap-10 py-6 md:py-0 border-b md:border-none border-gray-200 z-50 text-[15px] font-medium text-gray-800`}
          aria-label="Main navigation"
        >
          {[
            ["Facilities", "#facilities"],
            ["Features", "#features"],
            ["Locations", "#locations"],
            ["Testimonials", "#testimonials"],
          ].map(([name, href]) => (
            <a
              key={href}
              href={href}
              className="hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setConsultation("Let's Visit")}
            className="hidden md:inline-flex rounded-full text-sm font-semibold transition-colors"
            style={{ background: "#000", color: "#fff", padding: "10px 24px" }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#333")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#000")}
          >
            Let's Visit
          </button>
          <button
            className="md:hidden p-2 text-gray-800"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-8 md:pt-16 pb-20 px-6 max-w-[1000px] mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1f3024] tracking-tight leading-[1.1] mb-6">
          Find{" "}
          <span className="relative inline-block">
            Your Ideal Office Space
            {/* Hand-drawn ellipse approximation */}
            <svg
              className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] text-[#d2e0ff] pointer-events-none"
              viewBox="0 0 200 60"
              preserveAspectRatio="none"
            >
              <path
                d="M100,5 C150,2 195,15 190,35 C185,55 120,58 60,52 C10,46 5,25 30,12 C50,2 90,5 100,5 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          in Al Muteena
        </h1>

        <p className="text-base md:text-lg text-gray-600 max-w-[600px] mb-10 leading-relaxed font-medium">
          Discover professional office spaces in Al Muteena, Dubai, designed for
          businesses looking for a convenient and productive working
          environment. Explore available offices, facilities and flexible
          options that suit your business needs.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
          <button
            onClick={() => setConsultation("Let's Visit")}
            style={{
              background: "#000",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#222")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#000")}
          >
            Schedule a Viewing
          </button>
          <a
            href="#contact"
            style={{
              padding: "14px 32px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "14px",
              border: "2px solid #000",
              color: "#000",
              textDecoration: "none",
              transition: "background 0.2s",
              display: "inline-block",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#f3f4f6")}
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Contcat Now
          </a>
        </div>

        {/* Video Section */}
        <div id="video" className="relative w-full max-w-[900px] mx-auto mt-8">
          {/* Top connecting line */}
          <svg
            className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-16 text-black -z-10"
            viewBox="0 0 20 60"
            preserveAspectRatio="none"
          >
            <path
              d="M10,2 Q18,30 10,58"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* Bottom left curve */}
          <svg
            className="hidden md:block absolute -bottom-32 -left-32 w-[350px] h-[350px] text-black -z-10"
            viewBox="0 0 100 100"
            overflow="visible"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
          </svg>

          {/* Bottom right curve */}
          <svg
            className="hidden md:block absolute -bottom-48 -right-48 w-[500px] h-[500px] text-black -z-10"
            viewBox="0 0 100 100"
            overflow="visible"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <div
            className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border-[8px] border-white/50"
            onClick={() => setVideoOpen(true)}
            role="button"
            aria-label="Play CEO video"
          >
            {/* Placeholder for video thumbnail */}
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
              alt="CEO Message Video"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white group-hover:bg-white/30 transition-colors shadow-lg">
                <svg
                  className="w-10 h-10 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Video Controls Mockup */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <div className="px-2 py-1 bg-black/50 backdrop-blur-md rounded text-white text-[10px] flex items-center gap-2">
                <Icon name="play" size={12} />
                <span>0:00 / 2:34</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="CEO Message Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <button
            onClick={() => setVideoOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Close video"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
