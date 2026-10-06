import { Icon } from "../Icon";
import { WEBSITE } from "../../constants/homeData";

export const Testimonials = () => {
  return (
    <section className="section testimonial reveal">
      <div className="review-intro">
        <span className="eyebrow">GREAT BUSINESSES. REAL PEOPLE.</span>
        <h2>
          Built on trust.
          <br />
          Backed by experience.
        </h2>
        <a className="text-link" href={WEBSITE}>
          Meet the GBH community <Icon name="arrow" size={17} />
        </a>
      </div>
      <div className="review-quote">
        <span className="eyebrow">WHAT OUR CUSTOMERS SAY</span>
        <blockquote>
          “They made the entire company formation process simple and stress-free.”
        </blockquote>
        <div className="review-person">
          <span className="avatar">MS</span>
          <div>
            <strong>Mohammed Shafeer</strong>
            <span>GBH customer</span>
          </div>
          <a href={WEBSITE} className="review-source">
            From our community <Icon name="diagonal" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
