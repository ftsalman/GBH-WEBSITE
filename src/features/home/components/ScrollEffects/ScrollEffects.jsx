import { useEffect, useRef } from "react";

export const ScrollEffects = ({ pageRef, reducedMotion }) => {
  const progress = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reveals = [...page.querySelectorAll(".reveal, [data-reveal]")];
    const layers = [...page.querySelectorAll("[data-parallax]")];
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    if (!reducedMotion) {
      page.dataset.motionReady = "true";
      reveals.forEach((element) => observer.observe(element));
    } else {
      reveals.forEach((element) => element.classList.add("is-visible"));
    }

    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const scrollable = document.documentElement.scrollHeight - height;
      const fraction = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${Math.min(1, Math.max(0, fraction))})`;

      layers.forEach((layer) => {
        if (reducedMotion || !desktop.matches) {
          layer.style.removeProperty("--parallax-y");
          return;
        }
        const bounds = layer.parentElement.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > height) return;
        const speed = Number(layer.dataset.parallax) || 0.08;
        const offset = (height / 2 - bounds.top - bounds.height / 2) * speed;
        const limit = bounds.height * 0.06;
        layer.style.setProperty("--parallax-y", `${Math.max(-limit, Math.min(limit, offset))}px`);
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      delete page.dataset.motionReady;
      layers.forEach((layer) => layer.style.removeProperty("--parallax-y"));
    };
  }, [pageRef, reducedMotion]);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
};
