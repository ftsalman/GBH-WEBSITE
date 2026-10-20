import { WEBSITE } from "../../constants/homeData";

export const LocationCard = ({ item }) => (
  <li className="lp-centre">
    <img src={item.image} alt="" loading="lazy" />
    <div>
      <a
        href={item.mapLink || `${WEBSITE}/office-space`}
        target={item.mapLink ? "_blank" : undefined}
        rel={item.mapLink ? "noopener noreferrer" : undefined}
      >
        {item.name}
      </a>
      <p>{item.description}</p>
      <p>
        {item.centre} · <a href={`tel:${item.phone}`}>{item.phone}</a>
      </p>
    </div>
  </li>
);
