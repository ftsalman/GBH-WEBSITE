const logos = [
  { name: "Vertex", mark: "spark", word: "VERTEX" },
  { name: "Northstar", mark: "orbit", word: "NORTHSTAR" },
  { name: "Monument", mark: "blocks", word: "MONUMENT" },
  { name: "Halo", mark: "halo", word: "halo" },
  { name: "Altura", mark: "peak", word: "ALTURA" },
  { name: "Nexa", mark: "nexa", word: "NEXA" },
];

const LogoMark = ({ type }) => {
  if (type === "spark")
    return (
      <svg viewBox="0 0 30 30" aria-hidden="true">
        <path d="M15 2l3.2 9.8L28 15l-9.8 3.2L15 28l-3.2-9.8L2 15l9.8-3.2L15 2Z" />
      </svg>
    );
  if (type === "orbit")
    return (
      <svg viewBox="0 0 30 30" aria-hidden="true">
        <circle cx="15" cy="15" r="5" />
        <path
          d="M4 15c0-6 5-11 11-11s11 5 11 11-5 11-11 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    );
  if (type === "blocks")
    return (
      <svg viewBox="0 0 30 30" aria-hidden="true">
        <path d="M3 4h10v10H3zM17 4h10v10H17zM3 18h10v8H3zM17 18h10v8H17z" />
      </svg>
    );
  if (type === "halo")
    return (
      <svg viewBox="0 0 30 30" aria-hidden="true">
        <circle
          cx="15"
          cy="15"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <circle cx="15" cy="15" r="3" />
      </svg>
    );
  if (type === "peak")
    return (
      <svg viewBox="0 0 30 30" aria-hidden="true">
        <path d="M2 25 12 5l5 10 3-6 8 16h-7l-4-8-4 8H2Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <path d="M3 25V5l12 13V5h12v20L15 12v13H3Z" />
    </svg>
  );
};

export const ClientsMarquee = () => (
  <section
    className="client-community section reveal"
    aria-label="GBH client community"
  >
    <div className="client-community-label">
      TRUSTED BY AMBITIOUS BUSINESSES
    </div>
    <div className="client-logo-grid">
      {logos.map((logo) => (
        <div
          className="client-logo"
          key={logo.name}
          aria-label={`${logo.name} placeholder logo`}
        >
          <LogoMark type={logo.mark} />
          <span>{logo.word}</span>
        </div>
      ))}
    </div>
  </section>
);
