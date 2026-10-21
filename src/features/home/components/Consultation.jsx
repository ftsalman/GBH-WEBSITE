import { useEffect, useRef } from "react";
import { Icon } from "./Icon";

export function Consultation({ service, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const currentDialog = dialog.current;
    const trigger = document.activeElement;
    currentDialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      currentDialog.close();
      document.body.style.overflow = previous;
      if (trigger instanceof HTMLElement) trigger.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="consultation"
      aria-labelledby="consultation-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="lp-round-btn lp-dialog-close"
        onClick={onClose}
        aria-label="Close consultation"
      >
        <Icon name="close" />
      </button>
      <span className="lp-eyebrow">LET’S JUMP START</span>
      <h2 id="consultation-title">
        Let’s build your
        <br />
        next chapter.
      </h2>
      <p>
        Speak with the GBH team about <strong>{service}</strong>. Get
        personalized guidance for your business.
      </p>
      <a className="lp-btn lp-btn-accent" href="tel:+971543053038">
        <Icon name="phone" /> <span>+971 54 305 3038</span>
      </a>
      <a
        className="lp-btn lp-btn-outline"
        href="#contact"
        onClick={(event) => {
          event.preventDefault();
          onClose();
          // Scroll once the dialog has closed and page scrolling is restored.
          requestAnimationFrame(() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" }),
          );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 -960 960 960"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M509-269q-29-29-29-71t29-71q29-29 71-29t71 29q29 29 29 71t-29 71q-29 29-71 29t-71-29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
        </svg>
        <span>Book a visit</span>
      </a>
      <p className="contact-note">
        White Swan Building, 1st Floor, Offices 105–106,
        <br />
        Sheikh Zayed Road, Dubai, UAE.
      </p>
    </dialog>
  );
}
