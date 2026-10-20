import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icon";

const VIDEO_ID = "SRbVZWBKWQY";
const photos = Array.from({ length: 11 }, (_, i) => ({
  src: `/offices/MUTEENA/${i + 1}.jpg`,
  alt: `Al Muteena office, photo ${i + 1} of 11`,
}));

// A native modal dialog: Escape and the backdrop close it, focus returns afterwards.
function Modal({ label, onClose, className = "", onKeyDown, children }) {
  const dialog = useRef(null);
  useEffect(() => {
    const current = dialog.current;
    current.showModal();
    return () => current.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`lp-dialog ${className}`}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className="lp-round-btn lp-dialog-close"
        onClick={onClose}
        aria-label="Close"
      >
        <Icon name="close" size={18} />
      </button>
      {children}
    </dialog>
  );
}

function Lightbox({ start, onClose }) {
  const [index, setIndex] = useState(start);
  const step = (delta) =>
    setIndex((current) => (current + delta + photos.length) % photos.length);
  return (
    <Modal
      label="Office photos"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
    >
      <div className="lp-lightbox">
        <img src={photos[index].src} alt={photos[index].alt} />
        <div className="lp-lightbox-bar">
          <button
            type="button"
            className="lp-round-btn"
            onClick={() => step(-1)}
            aria-label="Previous photo"
          >
            <Icon name="arrow" size={18} style={{ transform: "rotate(180deg)" }} />
          </button>
          <span aria-live="polite">
            {index + 1} / {photos.length}
          </span>
          <button
            type="button"
            className="lp-round-btn"
            onClick={() => step(1)}
            aria-label="Next photo"
          >
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </Modal>
  );
}

const Tile = ({ photo, className, onOpen, delay }) => (
  <button
    type="button"
    className={`lp-tile ${className}`}
    data-reveal
    style={{ "--reveal-delay": `${delay}ms` }}
    onClick={onOpen}
    aria-label={`View ${photo.alt}`}
  >
    <img src={photo.src} alt="" loading="lazy" />
  </button>
);

export const Gallery = () => {
  const [photo, setPhoto] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="lp-container lp-section" id="gallery">
      <div className="lp-heading-row" style={{ marginBottom: 24 }} data-reveal>
        <div className="lp-heading">
          <span className="lp-eyebrow">Our expertise</span>
          <h2 className="lp-h2">Explore Our Office Spaces</h2>
        </div>
        <button
          type="button"
          className="lp-btn lp-btn-outline lp-btn-sm"
          onClick={() => setPhoto(0)}
        >
          View all {photos.length} photos
        </button>
      </div>
      <div className="lp-gallery">
        <button
          type="button"
          className="lp-tile lp-tile-large"
          data-reveal
          onClick={() => setVideoOpen(true)}
          aria-label="Play the GBH video"
        >
          <img src="/images/hero2.jpg" alt="" />
          <span className="lp-play" aria-hidden="true">
            <span>
              <Icon name="play" size={28} fill="currentColor" />
            </span>
          </span>
          <span className="lp-tile-label">Watch the video</span>
        </button>
        <Tile photo={photos[0]} className="lp-tile-a" delay={100} onOpen={() => setPhoto(0)} />
        <Tile photo={photos[1]} className="lp-tile-b" delay={200} onOpen={() => setPhoto(1)} />
        <Tile photo={photos[2]} className="lp-tile-c" delay={300} onOpen={() => setPhoto(2)} />
      </div>

      {photo !== null && (
        <Lightbox start={photo} onClose={() => setPhoto(null)} />
      )}
      {videoOpen && (
        <Modal label="GBH video" onClose={() => setVideoOpen(false)}>
          <div className="lp-dialog-video">
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="CEO Message Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Modal>
      )}
    </section>
  );
};
