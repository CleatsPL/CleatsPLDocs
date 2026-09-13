import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BorderGlow from '../reactbits/BorderGlow.jsx';
import { docsLinks, comingSoon } from '../data/site.js';
import { FaBookOpen, FaBolt, FaCompactDisc, FaRobot } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';

const ICONS = {
  book: FaBookOpen,
  bolt: FaBolt,
  disc: FaCompactDisc,
  robot: FaRobot,
};

/* Logo marks drifting behind the UI — gold only (per brief). */
const FLOATERS = [
  { left: '6%', top: '16%', size: 84, dur: 17, delay: 0, op: 0.22, blur: 0, rot: 12, fx: 20, fy: -34 },
  { left: '86%', top: '12%', size: 56, dur: 13, delay: -4, op: 0.26, blur: 0, rot: -10, fx: -18, fy: 26 },
  { left: '74%', top: '64%', size: 116, dur: 19, delay: -8, op: 0.14, blur: 3, rot: 16, fx: 26, fy: -22 },
  { left: '10%', top: '70%', size: 46, dur: 12, delay: -2, op: 0.28, blur: 0, rot: -14, fx: 14, fy: 20 },
  { left: '42%', top: '7%', size: 38, dur: 11, delay: -6, op: 0.2, blur: 1, rot: 8, fx: -12, fy: 22 },
  { left: '60%', top: '82%', size: 64, dur: 15, delay: -10, op: 0.16, blur: 2, rot: -8, fx: -20, fy: -26 },
  { left: '28%', top: '38%', size: 30, dur: 10, delay: -3, op: 0.16, blur: 2, rot: 20, fx: 10, fy: -16 },
  { left: '92%', top: '42%', size: 40, dur: 14, delay: -7, op: 0.2, blur: 1, rot: -18, fx: -14, fy: 18 },
  { left: '18%', top: '88%', size: 34, dur: 12, delay: -5, op: 0.14, blur: 2, rot: 10, fx: 12, fy: -14 },
  { left: '70%', top: '30%', size: 26, dur: 9, delay: -1, op: 0.14, blur: 2, rot: -12, fx: 8, fy: 14 },
  { left: '48%', top: '56%', size: 22, dur: 8, delay: -4, op: 0.12, blur: 2, rot: 16, fx: -8, fy: 12 },
];

function WordReveal({ children, baseDelay = 0 }) {
  // children: array of [word, isAccent]
  return (
    <>
      {children.map(([word, accent], i) => (
        <span
          key={`${word}-${i}`}
          className={`hs-word${accent ? ' hs-word-accent' : ''}`}
          style={{ '--word-delay': `${baseDelay + i * 0.07}s` }}
        >
          {word}
          {i < children.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </>
  );
}

export default function GetStartedPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setLoaded(true)));
    return () => cancelAnimationFrame(raf);
  }, []);

  // kept for parity with the previous road background (now on the final CTA)
  const options = useMemo(() => ({}), []);

  return (
    <div className={`hs-page${loaded ? ' loaded' : ''}`}>
      {/* Pedro-Pathing-style background: deep black, red top glow, hairline grid, drifting orbs */}
      <div className="hs-bg" aria-hidden="true">
        <span className="hs-orb hs-orb-red" />
        <span className="hs-orb hs-orb-gold" />
      </div>

      {/* gold logo marks floating behind the UI */}
      <div className="floaters" aria-hidden="true">
        {FLOATERS.map((f, i) => (
          <span
            key={i}
            className="floater tint-gold"
            style={{
              left: f.left,
              top: f.top,
              width: f.size,
              height: f.size,
              '--fdur': `${f.dur}s`,
              '--fdelay': `${f.delay}s`,
              '--fop': f.op,
              '--fblur': `${f.blur}px`,
              '--frot': `${f.rot}deg`,
              '--fx': `${f.fx}px`,
              '--fy': `${f.fy}px`,
            }}
          >
            <img src="/assets/logo.svg" alt="" draggable={false} />
          </span>
        ))}
      </div>

      <div className="hs-content">
        <div className="section-tag mono hs-rise" style={{ '--rise-delay': '0.05s' }}>
          Docs / Quick Links
        </div>
        <h1 className="hs-title" aria-label="Get started with the code.">
          <WordReveal baseDelay={0.15}>
            {[['Get', false], ['started', false], ['with', false], ['the', true], ['code.', true]]}
          </WordReveal>
        </h1>
        <p className="hs-sub hs-rise" style={{ '--rise-delay': '0.55s' }}>
          The full documentation set is landing soon. These four doors are open right now —
          everything else is on the way down the road.
        </p>

        <div className="bubbles">
          {docsLinks.map((link, i) => {
            const Icon = ICONS[link.icon] ?? FaBookOpen;
            const inner = (
              <>
                <span className="bubble-top">
                  <span className="bubble-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="bubble-tag">{link.tag}</span>
                </span>
                <h3>{link.name}</h3>
                <p>{link.desc}</p>
                <span className="bubble-go">
                  Open <GoArrowUpRight aria-hidden="true" />
                </span>
              </>
            );

            return (
              <div
                key={link.id}
                className="bubble-cell"
                style={{ '--bubble-delay': `${0.25 + i * 0.12}s` }}
              >
                <BorderGlow
                  backgroundColor="#0d0d10"
                  borderRadius={24}
                  glowColor="8 74% 42%"
                  glowRadius={36}
                  glowIntensity={0.9}
                  edgeSensitivity={26}
                  coneSpread={28}
                  animated
                  colors={['#c1121f', '#d4af37', '#7a0c13']}
                >
                  {link.to ? (
                    <Link to={link.to} className="bubble">
                      {inner}
                    </Link>
                  ) : (
                    <a href={link.href} target="_blank" rel="noreferrer" className="bubble">
                      {inner}
                    </a>
                  )}
                </BorderGlow>
              </div>
            );
          })}
        </div>

        <div className="coming-row hs-rise" style={{ '--rise-delay': '0.95s' }}>
          <span className="mono">Coming soon — the doc pages</span>
          <div className="coming-chips">
            {comingSoon.map((c) => (
              <span className="coming-chip" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="hs-footnote hs-rise" style={{ '--rise-delay': '1.1s' }}>
        Cleats · Dribble · PlayMaker — one garage, one philosophy: never slower than the hardware.
      </p>
    </div>
  );
}
