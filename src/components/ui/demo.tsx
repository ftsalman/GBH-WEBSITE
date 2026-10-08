"use client";

import { SqueezeCarousel, type SqueezeSlide } from "./carousel-squeeze";
import { Camera, Layers, Zap, BookOpen, Monitor, UserPlus, Map } from "lucide-react";

export const settings = {
    height: 320,
    gap: 16,
    slatGap: 8,
    slatWidth: 8,
    radius: 6,
    duration: 1000,
    hoverGrow: true,
    autoplay: false,
    interval: 6000,
    controls: true,
};

type DemoProps = Partial<typeof settings>;

const mark = (text: string, IconComponent: any) => (
    <span className="flex items-center gap-2 text-sm font-medium tracking-tight text-white bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg">
        {IconComponent && <IconComponent size={16} />}
        {text}
    </span>
);

const slides: SqueezeSlide[] = [
    {
        id: "grid",
        title: "A layout engine that finally respects the fold.",
        description: "Grid 2.0 measures the viewport before it paints, so the first screen lands in one frame on any device.",
        action: "Read the notes",
        overlay: mark("Grid 2.0", Layers),
        image: "https://images.unsplash.com/photo-1544256718-3b6102d1d220?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "A glass office facade at dusk, its windows in a strict grid",
    },
    {
        id: "studio",
        title: "Design tokens now sync both ways.",
        description: "Change a colour in the editor and the repo follows; change it in the repo and the editor catches up on the next pull.",
        action: "See how it works",
        overlay: mark("Studio", Camera),
        image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "A desk from above with paper colour chips fanned out in morning light",
    },
    {
        id: "edge",
        title: "Cold starts are down to 11 milliseconds.",
        description: "A rewritten scheduler keeps a warm pool near every region, so the first request costs about what the tenth does.",
        action: "Read the benchmark",
        overlay: mark("Edge runtime", Zap),
        image: "https://images.unsplash.com/photo-1502899576159-f224dc2349fa?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "A motorway interchange at night, traffic drawn out into ribbons of light",
    },
    {
        id: "release",
        title: "Ninety-four changes in one release.",
        description: "Charts, forms, and the whole command palette were rebuilt this quarter. Here is everything that moved.",
        action: "Browse the changelog",
        overlay: mark("Summer release", Map),
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Layered mountain ridges fading into haze at golden hour",
    },
    {
        id: "insights",
        title: "Every query, traced end to end.",
        description: "Follow one request from the browser through the queue and into the database, with the slow step marked for you.",
        action: "Open a demo trace",
        overlay: mark("Insights", Monitor),
        image: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Fibre optic strands fanning out in the dark, each tip glowing",
    },
    {
        id: "handbook",
        title: "How we run a team of forty without standups.",
        description: "Written decisions, one weekly review, and a shared calendar. Our handbook is open, so take what works.",
        action: "Read the handbook",
        overlay: mark("Handbook", BookOpen),
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Three colleagues talking around a table by a window in a bright office",
    },
    {
        id: "craft",
        title: "The tools we make are the ones we use.",
        description: "Every part of the platform is built by the people who run on it, and shipped only once they trust it themselves.",
        action: "Meet the team",
        overlay: mark("Workshop", UserPlus),
        image: "https://images.unsplash.com/photo-1512686139450-482245c0d2eb?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Hands raising wet clay on a potter's wheel in a sunlit workshop",
    },
];

export default function SqueezeCarouselDemo(props: DemoProps) {
    const options = { ...settings, ...props };

    return (
        <div className="bg-background w-full px-6 py-10">
            <SqueezeCarousel slides={slides} label="What we shipped" {...options} />
        </div>
    );
}
