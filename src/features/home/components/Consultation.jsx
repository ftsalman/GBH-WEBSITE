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
      if (trigger instanceof HTMLElement) trigger.focus();
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
        className="dialog-close icon-button"
        onClick={onClose}
        aria-label="Close consultation"
      >
        <Icon name="close" />
      </button>
      <span className="eyebrow">LET’S JUMP START</span>
      <h2 id="consultation-title">
        Let’s build your
        <br />
        next chapter.
      </h2>
      <p>
        Speak with the GBH team about <strong>{service}</strong>. Get
        personalized guidance for your business.
      </p>
      <a className="button primary" href="tel:+971548881820">
        <Icon name="phone" /> <span>+971 54 888 1820</span> <Icon name="diagonal" />
      </a>
      <a
        className="button secondary"
        href={`mailto:Info@gbhgroup.ae?subject=${encodeURIComponent(`Enquiry: ${service}`)}`}
      >
        <Icon name="mail" /> <span>Email our team</span> <Icon name="diagonal" />
      </a>
      <p className="contact-note">
        White Swan Building, 1st Floor, Offices 105–106,
        <br />
        Sheikh Zayed Road, Dubai, UAE.
      </p>
    </dialog>
  );
}
