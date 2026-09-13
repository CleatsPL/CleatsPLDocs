import { useEffect, useRef } from 'react';

/**
 * Global chrome: film grain, red→gold scroll progress bar,
 * and a soft red/gold cursor orb (fine pointers only).
 */
export default function Chrome() {
  const fillRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    let onScroll = null;
    let onMove = null;
    let onLeave = null;
    let raf = 0;

    onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const orb = orbRef.current;
    if (orb && window.matchMedia('(pointer: fine)').matches) {
      let tx = window.innerWidth / 2;
      let ty = window.innerHeight / 2;
      let cx = tx;
      let cy = ty;
      let active = false;

      const loop = () => {
        cx += (tx - cx) * 0.14;
        cy += (ty - cy) * 0.14;
        orb.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
        if (Math.hypot(tx - cx, ty - cy) > 0.4) {
          raf = requestAnimationFrame(loop);
        } else {
          active = false;
        }
      };
      onMove = (e) => {
        tx = e.clientX;
        ty = e.clientY;
        orb.style.opacity = '1';
        if (!active) {
          active = true;
          raf = requestAnimationFrame(loop);
        }
      };
      onLeave = () => {
        orb.style.opacity = '0';
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (onMove) window.removeEventListener('pointermove', onMove);
      if (onLeave) document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true">
        <i ref={fillRef} />
      </div>
      <div className="cursor-orb" ref={orbRef} aria-hidden="true" />
    </>
  );
}
