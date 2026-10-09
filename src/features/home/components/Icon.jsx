export function Icon({ name, size = 20, ...props }) {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    diagonal: <path d="M6 18 18 6M6 6h12v12" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    building: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M10 21v-3h4v3" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="3" />
        <path d="M8 7V4h8v3M3 12a25 25 0 0 0 18 0M12 12v3" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    chart: <path d="M4 3v18h17M8 16v-4m5 4V8m5 8V5" />,
    code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20" />,
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    phone: (
      <path d="m7 3 3 5-3 2c1 3 4 6 7 7l2-3 5 3-1 4C10 23 1 14 3 4l4-1Z" />
    ),
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5v2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    pause: <path d="M9 5v14M15 5v14" />,
    play: <path d="m8 5 11 7-11 7V5Z" />,
    pantry: (
      <>
        <path d="M6 2v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2" />
        <path d="M6 8h12l-1.5 10.5a2 2 0 0 1-2 1.5h-5a2 2 0 0 1-2-1.5L6 8Z" />
        <path d="M10 12h4" />
      </>
    ),
    prayer: (
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
