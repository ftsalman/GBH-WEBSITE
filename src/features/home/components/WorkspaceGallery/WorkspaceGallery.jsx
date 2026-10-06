import { useRef, useState } from "react";

const views = [
  { name: "Boardroom", image: "/images/hero-office.jpg", note: "Bright meeting space" },
  { name: "Private office", image: "/images/workspace.jpg", note: "Ready-to-work setup" },
  { name: "Meeting suite", image: "/images/meeting.jpg", note: "Built for collaboration" },
];

export const WorkspaceGallery = () => {
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stage = useRef(null);

  const move = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = stage.current.getBoundingClientRect();
    setTilt({ x: ((event.clientY - box.top) / box.height - 0.5) * -7, y: ((event.clientX - box.left) / box.width - 0.5) * 9 });
  };

  return (
    <section className="section reveal py-14 md:py-20" id="office-tour">
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><span className="eyebrow">STEP INSIDE A GBH WORKSPACE</span><h2>A 3D-style office tour</h2></div>
        <p className="max-w-md text-sm leading-6 text-[#788075]">Move across the space, then choose a room to explore the atmosphere of a GBH business centre.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_240px]">
        <div ref={stage} onMouseMove={move} onMouseLeave={() => setTilt({ x: 0, y: 0 })} className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[#14221d] [perspective:1200px] md:min-h-[520px]">
          {views.map((view, index) => <img key={view.name} src={view.image} alt={`${view.name}, illustrative GBH office tour view`} className={`absolute inset-[-3%] h-[106%] w-[106%] object-cover transition-[opacity,transform] duration-700 ease-out ${active === index ? "opacity-100" : "opacity-0"}`} style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.08)` }} />)}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
          <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-black/20 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">INTERACTIVE OFFICE TOUR</div>
          <div className="absolute bottom-6 left-6 text-white md:bottom-9 md:left-9"><span className="text-xs text-white/70">0{active + 1} / 03</span><h3 className="mt-2 text-3xl font-medium md:text-5xl">{views[active].name}</h3><p className="mt-2 text-sm text-white/70">{views[active].note}</p></div>
          <span className="absolute right-[24%] top-[35%] h-4 w-4 animate-ping rounded-full bg-[#c9efa9] motion-reduce:animate-none" /><span className="absolute right-[24%] top-[35%] h-4 w-4 rounded-full border-4 border-white bg-[#78a357]" />
        </div>
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {views.map((view, index) => <button key={view.name} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`group overflow-hidden rounded-xl border p-2 text-left transition-all duration-300 ${active === index ? "border-[#6b8f52] bg-[#eff5e8]" : "border-[#e5e9e1] hover:border-[#a8b99c]"}`}><img src={view.image} alt="" className="aspect-[4/3] w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><span className="mt-2 block px-1 text-xs font-semibold md:text-sm">{view.name}</span></button>)}
        </div>
      </div>
    </section>
  );
};
