import { SqueezeCarousel } from "@/components/ui/carousel-squeeze";

/** Wordmark badge shown in the corner of the open panel */
const mark = (text) => (
  <span className={/* "text-sm font-semibold" */ "tracking-tight text-white"}>
    {text}
  </span>
);

const slides = [
  {
    id: "business-setup",
    // title: "Your business, established in the UAE.",
    // description:
    //   "Mainland, free zone or offshore — GBH guides you through company formation, licensing and every step between.",
    // action: "Start your setup",
    href: "#contact",
    overlay: mark("Business Setup"),
    image: "/images/dubai.png",
    imageAlt: "Dubai skyline at dusk",
  },
  {
    id: "office-spaces",
    // title: "Office space built for serious work.",
    // description:
    //   "Furnished offices, meeting rooms, high-speed Wi-Fi and reception — across nine business centres in Dubai.",
    // action: "Explore offices",
    href: "#locations",
    overlay: mark("Business Centres"),
    image: "/images/hero-office.jpg",
    imageAlt: "Modern office interior",
  },
  {
    id: "trade-license",
    // title: "Trade licensing, done right the first time.",
    // description:
    //   "GBH handles the paperwork, approvals and follow-ups so your licence arrives without the headaches.",
    // action: "Get your licence",
    // href: "#contact",
    overlay: mark("Trade License"),
    image: "/images/workspace.jpg",
    imageAlt: "Professional workspace",
  },
  {
    id: "visa-services",
    // title: "Visa support for you and your team.",
    // description:
    //   "Employment, investor and residency visas — processed efficiently with full government liaison from GBH.",
    // action: "Visa enquiry",
    // href: "#contact",
    overlay: mark("Visa Services"),
    image: "/images/dubai.png",
    imageAlt: "Dubai international hub",
  },
  {
    id: "financial",
    // title: "Accounts, compliance and financial clarity.",
    // description:
    //   "From bookkeeping to VAT filing, GBH's financial team keeps your business on track and fully compliant.",
    // action: "Talk to an advisor",
    // href: "#contact",
    overlay: mark("Financial Consulting"),
    image: "/images/meeting.jpg",
    imageAlt: "Business meeting",
  },
  {
    id: "legal",
    // description:
    //   "Contract drafting, document attestation and PRO services — handled by GBH so you can focus on growing.",
    // action: "Legal enquiry",
    // href: "#contact",
    overlay: mark("Legal Services"),
    image: "/images/workspace.jpg",
    imageAlt: "Professional workspace",
  },
];

export const Carousel = () => {
  return (
    <section
      className="section reveal py-14 md:py-20 overflow-hidden"
      id="carousel"
      style={{
        marginLeft: "96px",
        marginRight: "-16px",
        paddingLeft: "16px",
        paddingRight: "6px",
      }}
    >
      <div className="section-heading mb-10 flex flex-col gap-2">
        <span className="eyebrow">OUR EXPERTISE</span>
        <h2>Explore Our Office Spaces</h2>
      </div>

      <SqueezeCarousel
        slides={slides}
        label="GBH services"
        height="clamp(200px, 36cqi, 380px)"
        gap={16}
        slatGap={8}
        slatWidth={8}
        radius={12}
        duration={900}
        hoverGrow={true}
        autoplay={false}
        controls={true}
        accent="#263e31"
        accentForeground="#ffffff"
      />
    </section>
  );
};
