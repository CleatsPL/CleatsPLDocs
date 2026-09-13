import { useEffect } from 'react';

/**
 * Generic scroll-reveal for pages that use [data-reveal]
 * without the full GSAP intro pipeline.
 */
export function useReveals() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );
    const els = document.querySelectorAll('[data-reveal]:not(.on)');
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
