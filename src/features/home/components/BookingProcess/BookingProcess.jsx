import { bookingSteps } from "../../constants/homeData";

export const BookingProcess = () => (
  <section className="lp-band-white" id="process">
    <div
      className="lp-container lp-section"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      <div className="lp-heading" data-reveal>
        <span className="lp-eyebrow">How it works</span>
        <h2 className="lp-h2">Four steps to your next chapter</h2>
      </div>
      <ol className="lp-steps">
        {bookingSteps.map((item, index) => (
          <li key={item.step} data-reveal style={{ "--reveal-delay": `${index * 110}ms` }}>
            <span className="lp-step-number" aria-hidden="true">
              {item.step}
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
