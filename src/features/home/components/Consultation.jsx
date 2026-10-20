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
        <Icon name="mail" /> <span>Book a visit</span>
      </a>
      <p className="contact-note">
        White Swan Building, 1st Floor, Offices 105–106,
        <br />
        Sheikh Zayed Road, Dubai, UAE.
      </p>
    </dialog>
  );
}
