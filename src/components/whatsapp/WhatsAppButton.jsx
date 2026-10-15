import React, { useState } from "react";

export const WhatsAppButton = ({
  phoneNumber = "971548881820",
  message = "Hello GBH, I would like to inquire about business setup in Dubai.",
  companyName = "GBH Dubai",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip / Prompt bubble */}
      <div
        className={`mb-2 origin-bottom-right transition-all duration-300 ease-out pointer-events-none ${
          isHovered
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95"
        }`}
        aria-hidden={!isHovered}
      >
        <div className="relative flex items-center gap-2.5 rounded-2xl bg-white/95 px-4 py-2.5 text-xs text-[#1f3024] shadow-xl backdrop-blur-md border border-[#e8ede6]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]"></span>
          </span>
          <div>
            <p className="font-semibold text-[13px] text-[#1f3024] leading-tight">
              Chat on WhatsApp
            </p>
            <p className="text-[11px] text-[#657263] leading-tight mt-0.5">
              Instant business consultation
            </p>
          </div>
          <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white border-r border-b border-[#e8ede6]" />
        </div>
      </div>

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${companyName} on WhatsApp`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 ease-out hover:scale-110 hover:bg-[#20ba59] hover:shadow-xl hover:shadow-[#25D366]/50 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        {/* Soft pulsing halo ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 blur-sm animate-pulse group-hover:opacity-60 transition-opacity" />

        {/* Outer subtle radar wave */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg
          className="relative h-8 w-8 fill-current drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.877-2.056-.977-.275-.1-.476-.15-.676.15-.2.301-.776.977-.951 1.177-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.587-.492-.507-.676-.516-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.11.15.2 2.12 3.238 5.136 4.542.717.31 1.278.495 1.714.633.72.229 1.376.197 1.895.12.578-.086 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.276-.201-.577-.352zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.405A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.634 0-3.15-.494-4.417-1.343l-.317-.214-3.238.913.92-3.158-.235-.33A8.134 8.134 0 0 1 3.833 12c0-4.502 3.665-8.167 8.167-8.167 4.502 0 8.167 3.665 8.167 8.167 0 4.502-3.665 8.167-8.167 8.167z" />
        </svg>

        {/* Online Indicator Badge on the button */}
        <span className="absolute top-1 right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-400"></span>
        </span>
      </a>
    </div>
  );
};
