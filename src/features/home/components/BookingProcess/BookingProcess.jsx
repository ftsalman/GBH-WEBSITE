import { bookingSteps } from "../../constants/homeData";

export const BookingProcess = () => (
  <section className="section reveal py-14 md:py-20" id="process">
    <div className="section-heading">
      <div>
        <span className="eyebrow">HOW IT WORKS</span>
        <h2>Four steps to your next chapter</h2>
      </div>
    </div>
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {bookingSteps.map((item) => (
        <article
          key={item.step}
          className="rounded-2xl border border-[#e1e7dd] bg-white p-6 md:p-7"
        >
          <span className="font-[Manrope] text-4xl font-light text-[#8bad77]">
            {item.step}
          </span>
          <h3 className="mt-7 text-lg font-semibold">{item.title}</h3>
          <p className="mt-3 text-xs leading-6 text-[#738071]">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  </section>
);
