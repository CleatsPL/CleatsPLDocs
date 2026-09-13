import { systemModules } from '../data/site.js';

export default function System() {
  return (
    <section className="system" id="system">
      <div className="wrap system-grid">
        <div className="system-head" data-reveal>
          <div className="section-tag mono">04 / How it works</div>
          <h2>Speed is a control problem.</h2>
          <p>
            Every layer of Cleats exists to remove a reason the robot might travel slower than its
            hardware allows — geometry that forces a slowdown, a gain that guesses, a limit that is
            too conservative to be true.
          </p>
        </div>

        <div className="module-list">
          {systemModules.map((item, i) => (
            <article
              className="module"
              key={item.num}
              data-reveal
              style={{ '--reveal-delay': `${i * 0.08}s` }}
            >
              <span className="num mono">{item.num}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
