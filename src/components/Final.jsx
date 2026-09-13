import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Hyperspeed from '../reactbits/Hyperspeed.jsx';

/* Red + gold Hyperspeed road — the climactic "full throttle" moment.
   Hold (press & hold) anywhere on the road to boost. */
const HS_FINAL = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x0a0a0a,
    islandColor: 0x0d0d10,
    background: 0x000000,
    shoulderLines: 0xd4af37,
    brokenLines: 0x8a6d2f,
    leftCars: [0xc1121f, 0xd4af37, 0x8f0e18],
    rightCars: [0xd4af37, 0xc1121f, 0xa8842c],
    sticks: 0xd4af37,
  },
};

const TITLE_LINES = [
  [
    { text: 'Stop', accent: false },
    { text: 'lagging.', accent: false },
  ],
  [
    { text: 'Start', accent: true },
    { text: 'solving.', accent: true },
  ],
];

export default function Final() {
  const effectOptions = useMemo(() => HS_FINAL, []);

  return (
    <section className="final" id="final">
      <div className="final-road" aria-hidden="true">
        <Hyperspeed effectOptions={effectOptions} />
      </div>
      <div className="final-scrim" aria-hidden="true" />

      <span className="final-hint mono" aria-hidden="true">
        <i className="pulse" /> Hold to boost
      </span>

      <div className="wrap final-top">
        <span className="mono">Cleats / FTC path following</span>
        <h2 className="final-title" aria-label="Stop lagging. Start solving.">
          {TITLE_LINES.map((line, li) => (
            <span key={li} className={`final-line${line[0].accent ? ' final-line-accent' : ''}`}>
              {line.map((w, wi) => (
                <span key={w.text} className={`final-word${w.accent ? ' final-word-accent' : ''}`}>
                  {w.text}
                  {wi < line.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>

      <div className="wrap final-bottom" data-reveal>
        <p>
          Install Cleats, run the characterization routines,
          <br className="hidden md:block" /> and let the library find your robot&rsquo;s real limits.
        </p>
        <div className="final-ctas">
          <Link to="/get-started" className="btn btn-gold">
            Get started <b>↗</b>
          </Link>
          <a
            href="https://github.com/CleatsPL/Cleats"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            GitHub <b>↗</b>
          </a>
        </div>
      </div>
    </section>
  );
}
