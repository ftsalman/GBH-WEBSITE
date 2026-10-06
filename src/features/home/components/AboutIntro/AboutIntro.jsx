import { Icon } from "../Icon";
import { WEBSITE } from "../../constants/homeData";

export const AboutIntro = () => (
  <section className="section reveal py-16 md:py-24" id="about">
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
      <div className="about-image relative overflow-hidden rounded-2xl bg-[#263e31]">
        <img
          src="/images/dubai.png"
          alt="Dubai skyline"
          loading="lazy"
          data-parallax="0.12"
          className="aspect-[5/4] h-full w-full object-cover"
        />
        <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-5 py-3 text-xs font-semibold text-[#263e31] backdrop-blur-md">
          Building businesses in the UAE
        </span>
      </div>
      <div>
        <span className="eyebrow">ABOUT GBH</span>
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
          An ecosystem built for your ambitions.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-[#657063]">
          GBH brings business setup, legal, accounting, compliance, marketing
          and operational support together under one roof. We help
          entrepreneurs, startups and established companies grow with confidence
          in the UAE.
        </p>
        <a href={`${WEBSITE}/about`} className="text-link mt-6">
          More about GBH <Icon name="arrow" size={17} />
        </a>
      </div>
    </div>
  </section>
);
