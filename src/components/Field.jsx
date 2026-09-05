import { useEffect, useRef } from 'react';
import { fieldState } from '../fieldState.js';

export default function Field() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return undefined;

    const ctx = canvas.getContext('2d');
    let fieldVisible = true;
    let frame = 0;

    const sizeCanvas = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * d));
      canvas.height = Math.max(1, Math.floor(r.height * d));
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    sizeCanvas();
    const resize = new ResizeObserver(sizeCanvas);
    resize.observe(canvas);

    const onMove = (event) => {
      const r = canvas.getBoundingClientRect();
      fieldState.x = (event.clientX - r.left) / r.width;
      fieldState.y = (event.clientY - r.top) / r.height;
    };

    section.addEventListener('pointermove', onMove);
    const io = new IntersectionObserver(([entry]) => {
      fieldVisible = entry.isIntersecting;
    }, { rootMargin: '100px' });
    io.observe(canvas);

    const drawField = (t) => {
      if (fieldVisible) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < 26; i += 1) {
          const y = (h * (i + 1)) / 27;
          ctx.beginPath();
          for (let x = 0; x <= w + 8; x += 8) {
            const pull = Math.exp(-Math.abs(x / w - fieldState.x) * 7) * (fieldState.y - 0.5) * 100;
            const wave =
              Math.sin(x * 0.011 + t * 0.0007 + i * 0.42) * (6 + fieldState.energy * 18) +
              Math.cos(x * 0.004 - t * 0.0004 + i) * 5;
            ctx.lineTo(x, y + wave + pull);
          }
          const gold = i % 9 === 0;
          const red = !gold && i % 3 === 1;
          ctx.strokeStyle = gold
            ? `rgba(242,217,138,${0.22 + fieldState.energy * 0.26})`
            : red
              ? `rgba(193,18,31,${0.16 + fieldState.energy * 0.34})`
              : `rgba(244,242,238,${0.035 + fieldState.energy * 0.055})`;
          ctx.lineWidth = gold ? 1.3 : red ? 1.1 : 0.7;
          ctx.stroke();
        }
      }
      frame = requestAnimationFrame(drawField);
    };

    frame = requestAnimationFrame(drawField);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      io.disconnect();
      section.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section className="field" id="field" ref={sectionRef}>
      <canvas id="signalCanvas" ref={canvasRef} aria-hidden="true" />
      <div className="field-corners mono">
        <span className="live-dot">Live solve</span>
        <span>
          Cross-track error
          <br />
          Annihilated
        </span>
        <span>
          Lookahead
          <br />
          None
        </span>
        <span>
          Odometry
          <br />
          True arcs
        </span>
      </div>
      <div className="field-copy reveal">
        <div className="section-tag mono" style={{ justifyContent: 'center' }}>
          05 / The control field
        </div>
        <h2>The field it actually solves.</h2>
        <p>Every loop: project onto the spline, read the directional acceleration limit, command the maximum the tires will hold.</p>
      </div>
    </section>
  );
}
