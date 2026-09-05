export default function Metrics() {
  return (
    <section className="metrics wrap">
      <div className="metrics-head">
        <span className="section-tag mono">11 / What it removes</span>
        <span className="mono">Measured, not guessed</span>
      </div>
      <div className="metrics-grid">
        <article className="metric">
          <small>Lookahead distance to tune</small>
          <div className="metric-value">
            <span data-count="0">0</span>
          </div>
          <p>Cleats projects onto the nearest point of the spline instead of chasing a carrot. No corner cutting, no accuracy traded for smoothness.</p>
          <i className="metric-orbit" aria-hidden="true" />
        </article>
        <article className="metric amber">
          <small>Weeks of guess-and-check tuning</small>
          <div className="metric-value">
            <span data-count="0">0</span>
          </div>
          <p>Automated characterization runs derive the constants from your robot’s real physics.</p>
        </article>
        <article className="metric">
          <small>Acceleration limits modelled</small>
          <div className="metric-value">
            <span data-count="360">0</span>°
          </div>
          <p>A superellipse in the robot frame gives a true limit for every heading.</p>
        </article>
        <article className="metric">
          <small>Converged axes required to finish</small>
          <div className="metric-value">
            <span data-count="2">0</span>
          </div>
          <p>Position and heading both. The robot rotates in place rather than ending a path pointed wrong.</p>
        </article>
        <article className="metric">
          <small>Throttle held until braking</small>
          <div className="metric-value">
            <span data-count="100">0</span>%
          </div>
          <p>A true kinematic braking model computes the exact stopping distance every loop.</p>
        </article>
      </div>
    </section>
  );
}
