import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { hero } from '../data/site.js';

/* ------------------------------------------------------------------
   VIDEO-READY MEDIA LAYER
   To drop in a video later, change this to:
     const HERO_MEDIA = { type: 'video', src: '/assets/intro.mp4', poster: '/assets/echo01-hero.jpg' };
   The text will still animate in over it, and the parallax layer
   applies to both <img> and <video>.
------------------------------------------------------------------- */
const HERO_MEDIA = {
  type: 'image',
  src: '/assets/echo01-hero.jpg',
  alt: 'An FTC robot tracking a spline at full throttle',
};

function HeroLine({ text, accent }) {
  return (
    <span className={`hero-line${accent ? ' accent' : ''}`}>
      {[...text].map((letter, index) => (
        <span key={`${letter}-${index}`} className="hero-char">
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
}

/** Small magnetic effect: the element eases toward the cursor. */
function useMagnetic(strength = 0.16) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let active = false;

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.hypot(tx - cx, ty - cy) > 0.25) {
        raf = requestAnimationFrame(loop);
      } else {
        active = false;
      }
    };
    const kick = () => {
      if (!active) {
        active = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const innerRef = useRef(null); // inner wrap — parallax target (keeps GSAP's .hero-copy scrub clean)
  const ctaRef = useMagnetic(0.18);

  // Pointer parallax on the media + copy layers (lerped, cheap, desktop-only).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let active = false;

    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (mediaRef.current) {
        mediaRef.current.style.transform = `scale(1.07) translate3d(${(-cx * 26).toFixed(2)}px, ${(-cy * 18).toFixed(2)}px, 0)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${(cx * 10).toFixed(2)}px, ${(cy * 8).toFixed(2)}px, 0)`;
      }
      if (Math.abs(tx - cx) > 0.0015 || Math.abs(ty - cy) > 0.0015 || Math.abs(tx) > 0.0015 || Math.abs(ty) > 0.0015) {
        raf = requestAnimationFrame(loop);
      } else {
        active = false;
      }
    };
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      if (r.bottom < 0) return;
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!active) {
        active = true;
        raf = requestAnimationFrame(loop);
      }
    };

    section.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      section.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-media" ref={mediaRef} aria-hidden="true">
        {HERO_MEDIA.type === 'video' ? (
          <video src={HERO_MEDIA.src} poster={HERO_MEDIA.poster} autoPlay muted loop playsInline />
        ) : (
          <img src={HERO_MEDIA.src} alt={HERO_MEDIA.alt} />
        )}
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* speed streaks — thin red/gold lines that flash across, like tire marks */}
      <div className="hero-streaks" aria-hidden="true">
        <span className="hero-streak s1" />
        <span className="hero-streak s2" />
        <span className="hero-streak s3" />
      </div>

      <div className="hero-copy">
        <div className="wrap" ref={innerRef}>
          <div className="eyebrow mono">
            <i className="pulse" aria-hidden="true" /> {hero.eyebrow}
          </div>
          <h1 className="hero-title" aria-label="No lag. Just limits.">
            <HeroLine text={hero.titleLine1} />
            <HeroLine text={hero.titleLine2} accent />
          </h1>
          <p className="hero-sub">{hero.copy}</p>
          <div className="hero-ctas">
            <Link to="/get-started" className="btn btn-primary" ref={ctaRef}>
              Get started <b>↗</b>
            </Link>
            <a href="#system" className="btn btn-ghost">
              See the system <b>↘</b>
            </a>
          </div>
        </div>
      </div>

      <span className="hero-hud hero-hud-tl mono" aria-hidden="true">
        Cleats / 01
      </span>
      <span className="hero-hud hero-hud-tr mono" aria-hidden="true">
        Time-optimal
        <br />
        Control
      </span>
      <span className="hero-hud hero-hud-bl mono" aria-hidden="true">
        FTC Path Following
      </span>
      <div className="hero-scrollcue mono" aria-hidden="true">
        <span>Scroll</span>
        <span className="track" />
      </div>
    </section>
  );
}
