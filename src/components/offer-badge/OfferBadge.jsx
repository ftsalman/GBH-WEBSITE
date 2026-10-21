import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { OPEN_CONTACT_POPUP } from "../contact-popup/ContactPopup";

// The badge pops in SHOW_AFTER_MS after the page opens and stays until dismissed.
const SHOW_AFTER_MS = 2000;

export const OfferBadge = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="offer-badge fixed bottom-23 right-4 z-50 md:bottom-36 md:right-6">
      <div className="offer-badge-float relative">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_CONTACT_POPUP))}
          aria-label="Offices from AED 23,999 per year. Send an enquiry"
          className="group relative flex flex-col items-start rounded-[28px] bg-black! px-6 py-4 text-left text-white! shadow-2xl shadow-black/40 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-[#242424]! md:px-8 md:py-5"
        >
          <span className="absolute -inset-1 -z-10 rounded-4xl bg-black/40 blur-md animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-[1.6px] text-[#bdbdbd] md:text-sm">
            Offices from
          </span>
          <span className="mt-1 flex items-baseline gap-1.5 font-['Manrope'] leading-none">
            <span className="text-3xl font-extrabold md:text-5xl">AED 23,999</span>
            <span className="text-base font-semibold text-[#bdbdbd] md:text-xl">/Year</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide offer"
          className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white! text-black! shadow-md ring-1 ring-black/10 transition hover:bg-[#e5e5e5]!"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
