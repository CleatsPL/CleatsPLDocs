import Topography from '../reactbits/Topography.jsx';
import { premiseBeats } from '../data/site.js';

function BeatTitle({ title, accent }) {
  if (!accent || !title.includes(accent)) return <>{title}</>;
  const i = title.indexOf(accent);
  return (
    <>
      {title.slice(0, i)}
      <em>{accent}</em>
      {title.slice(i + accent.length)}
    </>
  );
}

export default function Premise() {
  return (
    <section className="premise" id="premise">
      <div className="premise-sticky">
        <div className="premise-topo" aria-hidden="true">
          <Topography
            lowColor="#8a1a22"
            midColor="#b08a2e"
            highColor="#f0d060"
            speed={0.32}
            morphAmount={3.2}
            morphSpeed={0.045}
            bands={2.2}
            thickness={0.009}
            scale={1.05}
            glow={0.5}
            colorMode="elevation"
            contrast={3.0}
            brightness={1.0}
            grain
            grainIntensity={0.04}
            mouseInteraction
            mouseRadius={0.34}
            mouseStrength={0.5}
          />
        </div>

        <div className="premise-word" aria-hidden="true">
          FAST
        </div>

        <div className="premise-frame wrap">
          <div className="premise-top">
            <div className="section-tag mono">01 / Premise</div>
            <span className="premise-step mono" id="premiseStep">
              01 — The lag
            </span>
          </div>

          <div className="premise-stage">
            <div className="premise-beats">
              {premiseBeats.map((beat, i) => (
                <article className="premise-beat" key={beat.kicker} style={{ zIndex: i + 1 }}>
                  <span className="mono">{beat.kicker}</span>
                  <h2>
                    <BeatTitle title={beat.title} accent={beat.titleAccent} />
                  </h2>
                  <p>{beat.copy}</p>
                </article>
              ))}
            </div>

            <div className="premise-stat" data-reveal>
              <strong>100%</strong>
              <span>
                Throttle held until the exact
                <br />
                instant braking becomes required.
              </span>
            </div>
          </div>

          <div className="premise-progress" aria-hidden="true">
            <i id="premiseMeter" />
          </div>
        </div>
      </div>
    </section>
  );
}
