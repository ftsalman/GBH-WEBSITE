import { clientNames } from "../../constants/homeData";

export const ClientsMarquee = () => (
  <section className="section reveal overflow-hidden border-b border-[#e6ebe2] py-8" aria-label="GBH client community">
    <div className="mb-5 text-center text-[10px] font-semibold tracking-[.2em] text-[#7a8475]">FROM THE GBH CLIENT COMMUNITY</div>
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-12 motion-reduce:animate-none">
        {[...clientNames, ...clientNames].map((name, index) => <span key={`${name}-${index}`} className="whitespace-nowrap font-[Manrope] text-lg font-semibold tracking-tight text-[#61755b]">{name}<span className="mx-12 text-[#c3d4b9]">✳</span></span>)}
      </div>
    </div>
  </section>
);
