import { Icon } from "../Icon";

export const FacilityCard = ({ item, delay }) => (
  <article className="lp-facility" data-reveal style={{ "--reveal-delay": `${delay}ms` }}>
    <span className="lp-facility-icon" aria-hidden="true">
      <Icon name={item.icon} size={22} />
    </span>
    <h3>{item.title}</h3>
    <p>{item.detail}</p>
  </article>
);
