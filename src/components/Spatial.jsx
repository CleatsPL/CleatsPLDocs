const cards = [
  {
    kicker: 'Z + 01 / Geometry',
    title: 'Edges become context.',
    copy: 'Reflections reveal distance and orientation without creating a camera image.',
  },
  {
    kicker: 'Z + 02 / Rhythm',
    title: 'Motion without identity.',
    copy: 'Patterns exist for milliseconds—long enough to understand, never long enough to profile.',
  },
  {
    kicker: 'Z + 03 / Intent',
    title: 'The useful layer remains.',
    copy: 'A simple signal survives: occupied, calm, asking, done.',
  },
];

export default function Spatial() {
  return (
    <section className="spatial" id="spatial">
      <div className="spatial-stage">
        <div className="spatial-head">
          <div>
            <div className="section-tag mono">05 / Spatial memory</div>
            <h2>A room with depth.</h2>
          </div>
          <p>
            Scroll through the invisible layers ECHO uses to understand space. Each plane is local, temporary and
            designed to dissolve.
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
