import { pricedPlans } from "../../constants/pricing";

// Hidden until a price is filled in, in constants/pricing.js.
export const Pricing = () =>
  pricedPlans.length > 0 && (
    <section
      className="lp-container lp-section"
      id="pricing"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      <div className="lp-heading" data-reveal>
        <span className="lp-eyebrow">Offices &amp; prices</span>
        <h2 className="lp-h2">Choose your office</h2>
        <p className="lp-lead">Transparent monthly pricing. No hidden charges.</p>
      </div>
      <div className="lp-cards">
        {pricedPlans.map((plan, index) => (
          <article
            key={plan.name}
            data-reveal
            style={{ "--reveal-delay": `${index * 90}ms` }}
            className={`lp-plan${plan.popular ? " is-popular" : ""}`}
          >
            <div className="lp-plan-top">
              <h3>{plan.name}</h3>
              {plan.popular && <span className="lp-plan-badge">Most popular</span>}
            </div>
            <div className="lp-plan-price">
              AED {plan.price}
              <span> / month</span>
            </div>
            <p>{plan.description}</p>
            <a
              href="#contact"
              className={`lp-btn lp-btn-sm ${plan.popular ? "lp-btn-accent" : "lp-btn-outline"}`}
            >
              Check availability
            </a>
          </article>
        ))}
      </div>
    </section>
  );
