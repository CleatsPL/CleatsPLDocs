import { useState } from 'react';
import gsap from 'gsap';

const modes = [
  { mode: 'HUSH', value: '18 dB / 2700 K', glow: '.22', level: '30', label: 'Hush' },
  { mode: 'BALANCE', value: '34 dB / 3000 K', glow: '.42', level: '62', label: 'Balance' },
  { mode: 'OPEN', value: '48 dB / 3400 K', glow: '.7', level: '100', label: 'Open' },
];

export default function Presence() {
  const [active, setActive] = useState(modes[0]);

  const onMode = (item) => {
    setActive(item);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo('#modeName', { y: -4, opacity: 0.7 }, { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' });
  };

  return (
    <section className="presence" id="presence">
      <div className="presence-photo">
        <img src="/assets/echo01-detail.jpg" alt="Close view of ECHO/01 ceramic shell and amber light seam" loading="lazy" />
      </div>
      <div className="presence-ui reveal">
        <div className="section-tag mono">05 / Presence engine</div>
        <h2>Set the room's frequency.</h2>
        <p>ECHO changes its voice, response speed and status—not its personality.</p>
        <div className="signal">
          <div className="signal-readout">
            <div className="signal-live mono">
              <i />
              Live output
            </div>
            <b id="modeName">{active.mode}</b>
            <span id="modeValue">{active.value}</span>
            <div className="signal-meter">
              <i id="signalMeter" style={{ width: `${active.level}%` }} />
            </div>
          </div>
        </div>
        <div className="mode-buttons" role="group" aria-label="Presence mode">
          {modes.map((item) => (
            <button
              key={item.mode}
              className={item.mode === active.mode ? 'active' : ''}
              data-mode={item.mode}
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
