const cards = [
  {
    kicker: 'Heading / Decoupled',
    title: 'Not geometry.',
    copy: 'Hold it constant, interpolate it linearly or exponentially, aim it permanently at a field point, take it deliberately the long way around, or leave it tangent to the path.',
  },
  {
    kicker: 'Convergence / Both axes',
    title: 'Finished means finished.',
    copy: 'A movement is not complete until position and heading have both converged. The robot will rotate in place to close out a turn rather than ending a path pointed the wrong way.',
  },
  {
    kicker: 'Recovery / Live replan',
    title: 'Replan live.',
    copy: 'Splines can be told to replan themselves live, rebuilding from the robot’s actual pose the moment it strays beyond a per-path tolerance.',
  },
];

export default function Spatial() {
  return (
    <section className="spatial" id="spatial">
      <div className="spatial-stage">
        <div className="spatial-head">
          <div>
            <div className="section-tag mono">06 / Heading</div>
            <h2>Point anywhere.</h2>
          </div>
          <p>
            Where the robot faces is a separate problem from where the robot goes — and Cleats refuses to let one
            compromise the other.
          </p>
        </div>
        <div className="spatial-world">
          <i className="spatial-axis" aria-hidden="true" />
          {cards.map((card) => (
            <article className="space-card" key={card.kicker}>
              <div className="mono">{card.kicker}</div>
              <div className="space-visual" aria-hidden="true">
                <span />
              </div>
              <div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
