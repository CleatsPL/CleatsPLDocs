import { useState } from 'react';
import gsap from 'gsap';

const modes = [
  { mode: 'HUSH', value: '18 dB / 2700 K', glow: '.22', label: 'Hush' },
  { mode: 'BALANCE', value: '34 dB / 3000 K', glow: '.42', label: 'Balance' },
  { mode: 'OPEN', value: '48 dB / 3400 K', glow: '.7', label: 'Open' },
];

export default function Presence() {
  const [active, setActive] = useState(modes[0]);

  const onMode = (item) => {
    setActive(item);
    const dial = document.getElementById('dial');
    if (dial) dial.style.boxShadow = `0 0 120px rgba(231,169,74,${item.glow})`;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo('.dial-core', { scale: 0.88 }, { scale: 1, duration: 0.65, ease: 'back.out(1.8)' });
  };

  return (
    <section className="presence" id="presence">
      <div className="presence-photo">
        <img src="/assets/echo01-detail.jpg" alt="Close view of ECHO/01 ceramic shell and amber light seam" loading="lazy" />
      </div>
      <div className="presence-ui reveal">
        <div className="section-tag mono">05 / Presence engine</div>
        <h2>Set the room's frequency.</h2>
        <p>Choose how much presence you want. ECHO changes its voice, response speed and light—not its personality.</p>
        <div className="dial" id="dial">
          <div className="dial-core">
            <div>
              <b id="modeName">{active.mode}</b>
              <span id="modeValue">{active.value}</span>
            </div>
          </div>
        </div>
        <div className="mode-buttons" role="group" aria-label="Presence mode">
          {modes.map((item) => (
            <button
              key={item.mode}
              className={item.mode === active.mode ? 'active' : ''}
              data-mode={item.mode}
              data-value={item.value}
              data-glow={item.glow}
              type="button"
              onClick={() => onMode(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
