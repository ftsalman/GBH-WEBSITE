import { SqueezeCarousel } from "@/components/ui/carousel-squeeze";

/** Wordmark badge shown in the corner of the open panel */
const mark = (text) => (
  <span className={/* "text-sm font-semibold" */ "tracking-tight text-white"}>
    {text}
  </span>
);

const slides = [
  // {
  //   id: "img-0",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/1.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-1",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/10.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-2",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/11.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-3",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/12.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-4",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/13.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-5",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/14.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-6",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/15.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-7",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/16.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-8",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/17.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-9",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/18.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-10",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/19.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-11",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/2.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-12",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/20.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-13",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/21.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-14",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/22.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-15",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/3.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-16",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/4.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-17",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/5.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-18",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/6.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-19",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/7.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-20",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/8.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },
  // {
  //   id: "img-21",
  //   href: "#locations",
  //   overlay: mark("CLOVER BAY TOWER"),
  //   image: "/offices/CLOVER BAY TOWER/9.jpg",
  //   imageAlt: "CLOVER BAY TOWER office"
  // },

  {
    id: "img-35",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/1.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-36",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/2.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-37",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/3.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-38",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/4.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-39",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/5.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-40",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/6.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-41",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/7.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-42",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/8.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-43",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/9.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-44",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/10.jpg",
    imageAlt: "MUTEENA office",
  },
  {
    id: "img-45",
    href: "#locations",
    overlay: mark("MUTEENA"),
    image: "/offices/MUTEENA/11.jpg",
    imageAlt: "MUTEENA office",
  },
  // {
  //   id: "img-46",
  //   href: "#locations",
  //   overlay: mark("RASAL KHOR SAEED SUHAIL"),
  //   image: "/offices/RASAL KHOR SAEED SUHAIL/10.jpg",
  //   imageAlt: "RASAL KHOR SAEED SUHAIL office"
  // },
  // {
  //   id: "img-47",
  //   href: "#locations",
  //   overlay: mark("RASAL KHOR SAEED SUHAIL"),
  //   image: "/offices/RASAL KHOR SAEED SUHAIL/11.jpg",
  //   imageAlt: "RASAL KHOR SAEED SUHAIL office"
  // },
  // {
  //   id: "img-48",
  //   href: "#locations",
  //   overlay: mark("RASAL KHOR SAEED SUHAIL"),
  //   image: "/offices/RASAL KHOR SAEED SUHAIL/3.jpeg",
  //   imageAlt: "RASAL KHOR SAEED SUHAIL office"
  // },
  // {
  //   id: "img-49",
  //   href: "#locations",
  //   overlay: mark("RASAL KHOR SAEED SUHAIL"),
  //   image: "/offices/RASAL KHOR SAEED SUHAIL/4.jpeg",
  //   imageAlt: "RASAL KHOR SAEED SUHAIL office"
  // },
  // {
  //   id: "img-50",
  //   href: "#locations",
  //   overlay: mark("RASAL KHOR SAEED SUHAIL"),
  //   image: "/offices/RASAL KHOR SAEED SUHAIL/5.jpeg",
  //   imageAlt: "RASAL KHOR SAEED SUHAIL office"
  // },
  // {
  //   id: "img-51",
  //   href: "#locations",
  //   overlay: mark("RASAL KHOR SAEED SUHAIL"),
  //   image: "/offices/RASAL KHOR SAEED SUHAIL/6.jpeg",
  //   imageAlt: "RASAL KHOR SAEED SUHAIL office"
  // },
  // {
  //   id: "img-52",
  //   href: "#locations",
  //   overlay: mark("RASAL KHOR SAEED SUHAIL"),
  //   image: "/offices/RASAL KHOR SAEED SUHAIL/7.jpeg",
  //   imageAlt: "RASAL KHOR SAEED SUHAIL office"
  // },
  // {
  //   id: "img-53",
  //   href: "#locations",
  //   overlay: mark("RASAL KHOR SAEED SUHAIL"),
  //   image: "/offices/RASAL KHOR SAEED SUHAIL/8.jpeg",
  //   imageAlt: "RASAL KHOR SAEED SUHAIL office"
  // },
  // {
  //   id: "img-54",
  //   href: "#locations",
  //   overlay: mark("RASAL KHOR SAEED SUHAIL"),
  //   image: "/offices/RASAL KHOR SAEED SUHAIL/9.jpeg",
  //   imageAlt: "RASAL KHOR SAEED SUHAIL office"
  // },
  // {
  //   id: "img-55",
  //   href: "#locations",
  //   overlay: mark("SAEED TOWER"),
  //   image: "/offices/SAEED TOWER/1.jpg",
  //   imageAlt: "SAEED TOWER office"
  // },
  // {
  //   id: "img-56",
  //   href: "#locations",
  //   overlay: mark("SAEED TOWER"),
  //   image: "/offices/SAEED TOWER/20240606_165445.jpg",
  //   imageAlt: "SAEED TOWER office"
  // },
  // {
  //   id: "img-57",
  //   href: "#locations",
  //   overlay: mark("SAEED TOWER"),
  //   image: "/offices/SAEED TOWER/20240622_151306.jpg",
  //   imageAlt: "SAEED TOWER office"
  // },
  // {
  //   id: "img-58",
  //   href: "#locations",
  //   overlay: mark("SAEED TOWER"),
  //   image: "/offices/SAEED TOWER/6.jpg",
  //   imageAlt: "SAEED TOWER office"
  // },
  // {
  //   id: "img-59",
  //   href: "#locations",
  //   overlay: mark("SAEED TOWER"),
  //   image: "/offices/SAEED TOWER/8.jpg",
  //   imageAlt: "SAEED TOWER office"
  // },
  // {
  //   id: "img-60",
  //   href: "#locations",
  //   overlay: mark("SAEED TOWER"),
  //   image: "/offices/SAEED TOWER/b.jpg",
  //   imageAlt: "SAEED TOWER office"
  // },
  // {
  //   id: "img-61",
  //   href: "#locations",
  //   overlay: mark("SAEED TOWER"),
  //   image: "/offices/SAEED TOWER/c.jpg",
  //   imageAlt: "SAEED TOWER office"
  // },
  // {
  //   id: "img-62",
  //   href: "#locations",
  //   overlay: mark("SAEED TOWER"),
  //   image: "/offices/SAEED TOWER/h.jpg",
  //   imageAlt: "SAEED TOWER office"
  // },
  // {
  //   id: "img-63",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC05951.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-64",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC05959.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-65",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC05970.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-66",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC05973.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-67",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC05995.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-68",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC06015.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-69",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC06051.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-70",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC06140.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-71",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC06153.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-72",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC06195.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
  // {
  //   id: "img-73",
  //   href: "#locations",
  //   overlay: mark("WHITE SWAN"),
  //   image: "/offices/WHITE SWAN/DSC06270.jpg",
  //   imageAlt: "WHITE SWAN office"
  // },
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
