import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Motion for the introduction page:
 *  - character-by-character hero intro (ready for a video drop to play under it)
 *  - hero scroll fade
 *  - premise scrub: 3 beats across a sticky viewport
 */
export function useIntroMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    root.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

    if (reduced) {
      return () => io.disconnect();
    }

    const ctx = gsap.context(() => {
      // ---- hero intro timeline -------------------------------------
      const heroIntro = gsap.timeline({ delay: 0.12 });
      heroIntro
        .from('.hero .eyebrow', { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out' })
        .from(
          '.hero-char',
          { yPercent: 125, rotateX: -95, opacity: 0, duration: 0.62, stagger: 0.016, ease: 'power4.out' },
          '-=0.26'
        )
        .from('.hero-sub', { y: 18, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.34')
        .from('.hero-ctas > *', { y: 18, opacity: 0, duration: 0.5, stagger: 0.09, ease: 'power3.out' }, '-=0.34')
        .from('.hero-hud, .hero-scrollcue', { opacity: 0, duration: 0.9 }, '-=0.3');

      gsap.to('.hero-copy', {
        yPercent: -22,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '18% top', end: 'bottom top', scrub: 0.25 },
      });

      // ---- premise scrub --------------------------------------------
      const beats = gsap.utils.toArray('.premise-beat');
      const step = document.getElementById('premiseStep');
      const meter = document.getElementById('premiseMeter');
      const labels = ['01 — The lag', '02 — The reframe', '03 — The result'];
      let idx = 0;
      if (beats.length) {
        gsap.set(beats.slice(1), { opacity: 0, y: 48, rotateX: -10 });

        gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '#premise',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.28,
            onUpdate: (self) => {
              if (meter) meter.style.transform = `scaleY(${self.progress})`;
              const n = Math.min(2, Math.floor(self.progress * 3));
              if (n !== idx) {
                idx = n;
                if (step) step.textContent = labels[n];
              }
            },
          },
        })
          .to('.premise-word', { xPercent: 14, letterSpacing: '-.04em', duration: 3 }, 0)
          .to(beats[0], { opacity: 0, y: -40, rotateX: 10, duration: 0.22 }, 0.72)
          .to(beats[1], { opacity: 1, y: 0, rotateX: 0, duration: 0.32, ease: 'power3.out' }, 0.82)
          .to(beats[1], { opacity: 0, y: -40, rotateX: 10, duration: 0.22 }, 1.72)
          .to(beats[2], { opacity: 1, y: 0, rotateX: 0, duration: 0.32, ease: 'power3.out' }, 1.82);
      }

      // ---- final CTA: word-stagger over the speed road ------------------
      gsap.from(
        '.final-word',
        {
          yPercent: 115,
          opacity: 0,
          rotateX: -50,
          duration: 0.85,
          stagger: 0.085,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.final-top',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
        root
      );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    const raf = requestAnimationFrame(() => requestAnimationFrame(refresh));
    const later = window.setTimeout(refresh, 300);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(later);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [rootRef]);
}
