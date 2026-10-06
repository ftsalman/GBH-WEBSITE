import { Icon } from "../Icon";

export const FinalCTA = ({ onBook }) => (
  <section className="final-cta section reveal relative my-14 overflow-hidden rounded-2xl bg-[#263e31] px-7 py-16 text-white md:my-20 md:px-16 md:py-20">
    <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border border-[#a9d486]/30" /><div className="pointer-events-none absolute -right-8 -top-10 h-56 w-56 rounded-full border border-[#a9d486]/30" />
    <div className="relative max-w-2xl"><span className="text-[10px] tracking-[.22em] text-[#c7efa4]">LET’S GET STARTED</span><h2 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">Ready to start your business?</h2><p className="mt-5 text-sm leading-7 text-[#d0dfcb]">Tell us your plans. A GBH consultant can help you find the right path forward.</p><button type="button" onClick={onBook} className="button primary mt-8">Book free consultation <Icon name="arrow" size={18} /></button></div>
  </section>
);
