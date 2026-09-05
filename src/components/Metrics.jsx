export default function Metrics() {
  return (
    <section className="metrics wrap">
      <div className="metrics-head">
        <span className="section-tag mono">08 / Measured restraint</span>
        <span className="mono">Production intent / Rev C</span>
      </div>
      <div className="metrics-grid">
        <article className="metric">
          <small>Far-field listening radius</small>
          <div className="metric-value">
            <span data-count="6">0</span>m
          </div>
          <p>A six-microphone array hears a conversational voice without raising the room. Beamforming stays on-device.</p>
        </article>
        <article className="metric amber">
          <small>Response onset</small>
          <div className="metric-value">
            <span data-count="800">0</span>ms
          </div>
          <p>Fast enough to feel present, slow enough to feel considered.</p>
        </article>
        <article className="metric">
          <small>Idle power</small>
          <div className="metric-value">
            <span data-count="2">0</span>.4w
          </div>
          <p>Below a night light, including local awareness.</p>
        </article>
        <article className="metric">
          <small>Cloud dependency</small>
          <div className="metric-value">
            <span data-count="0">0</span>%
          </div>
          <p>Core voice, routines and controls continue offline.</p>
        </article>
        <article className="metric">
          <small>Replaceable mass</small>
          <div className="metric-value">
            <span data-count="97">0</span>%
          </div>
          <p>Designed for disassembly with common tools.</p>
        </article>
      </div>
    </section>
  );
}
