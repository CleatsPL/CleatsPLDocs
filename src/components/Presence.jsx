import { useState } from 'react';
import gsap from 'gsap';

const modes = [
  { mode: 'TANGENT', value: 'Heading follows the spline', glow: '.22', level: '48', label: 'Tangent' },
  { mode: 'POINT-AT', value: 'Locked to a field coordinate', glow: '.42', level: '74', label: 'Point at' },
  { mode: 'REPLAN', value: 'Regenerating from actual pose', glow: '.7', level: '100', label: 'Replan' },
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
        <img src="/assets/echo01-detail.jpg" alt="Close view of a mecanum drivetrain under load" loading="lazy" />
      </div>
      <div className="presence-ui reveal">
        <div className="section-tag mono">07 / Heading engine</div>
        <h2>Decoupled from the path.</h2>
        <p>Heading is its own controller. Change how the robot faces without touching how the robot travels.</p>
        <div className="signal">
          <div className="signal-readout">
            <div className="signal-live mono">
              <i />
              Live mode
            </div>
            <b id="modeName">{active.mode}</b>
            <span id="modeValue">{active.value}</span>
            <div className="signal-meter">
              <i id="signalMeter" style={{ width: `${active.level}%` }} />
            </div>
          </div>
        </div>
        <div className="mode-buttons" role="group" aria-label="Heading mode">
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
