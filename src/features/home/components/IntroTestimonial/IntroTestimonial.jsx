import { WEBSITE } from "../../constants/homeData";

export const IntroTestimonial = () => (
  <section className="section reveal my-14 overflow-hidden rounded-2xl bg-[#263e31] px-7 py-12 text-white md:my-20 md:px-16 md:py-16">
    <div className="grid items-end gap-10 md:grid-cols-[.7fr_1.3fr]">
      <div><span className="text-[10px] tracking-[.22em] text-[#c7efa4]">A WORD FROM OUR CLIENTS</span><h2 className="mt-4 text-3xl leading-tight text-white md:text-4xl">Support that moves business forward.</h2></div>
      <figure><blockquote className="font-[Manrope] text-xl leading-relaxed tracking-tight md:text-2xl">“GBH provides excellent support. They helped me set up my company fast.”</blockquote><figcaption className="mt-6 text-xs text-[#c8dbbf]">Awais Ashraf · GBH customer · <a className="underline underline-offset-4" href={WEBSITE}>Read on GBH</a></figcaption></figure>
    </div>
  </section>
);
