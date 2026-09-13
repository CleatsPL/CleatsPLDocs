import Topography from '../reactbits/Topography.jsx';
import { features } from '../data/site.js';

export default function Features() {
  return (
    <section className="features" id="features">
      {/* subtle red/gold topo behind the grid — cards are opaque, so text never competes */}
      <div className="features-topo" aria-hidden="true">
        <Topography
          lowColor="#4a0a10"
          midColor="#6b5420"
          highColor="#8a6d2f"
          speed={0.24}
          morphAmount={3.6}
          morphSpeed={0.035}
          bands={2.6}
          thickness={0.008}
          scale={1.15}
          glow={0.4}
          colorMode="elevation"
          contrast={3.4}
          brightness={0.85}
          grain
          grainIntensity={0.04}
          mouseInteraction={false}
        />
      </div>

      <div className="wrap features-inner">
        <div className="features-head" data-reveal>
          <div>
            <div className="section-tag mono">03 / Highlights</div>
            <h2 className="features-title">
              <span className="line-mask">
                <span>Nothing is left</span>
              </span>
              <span className="line-mask" style={{ '--line-delay': '0.12s' }}>
                <span>
                  on the <em>table.</em>
                </span>
              </span>
            </h2>
          </div>
          <span className="mono">09 systems / 01 library</span>
        </div>

        <div className="feature-grid">
          {features.map((f, i) => (
            <article
              className="feature"
              key={f.title}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 0.07}s` }}
            >
              <span className="num mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
