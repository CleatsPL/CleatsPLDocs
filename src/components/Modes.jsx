const cards = [
  {
    no: '01 / TRANSIT',
    title: 'Sprint',
    copy: 'Time-optimal solver at the wheel. At the acceleration limit or the deceleration limit, and effectively nowhere in between.',
  },
  {
    no: '02 / SETTLE',
    title: 'Land',
    copy: 'A Linear Quadratic Regulator takes the handoff, treating position, strafe and heading as one coupled system and driving residual error continuously to zero.',
  },
  {
    no: '03 / RECOVER',
    title: 'Reclaim',
    copy: 'Hysteresis thresholds instantly return full transit authority the moment the robot is bumped or displaced.',
  },
];

export default function Modes() {
  return (
    <section className="modes wrap" id="modes">
      <div className="modes-title">
        <div>
          <div className="section-tag mono reveal" style={{ marginBottom: 28 }}>
            10 / Controller states
          </div>
          <h2 className="reveal">
            Three states.
            <br />
            One handoff.
          </h2>
        </div>
        <p className="reveal">
          Cleats does not use one controller for the whole move. It uses the right one for the phase the robot is
          actually in, and switches the instant the physics change.
        </p>
      </div>
      <div className="cards">
        {cards.map((card) => (
          <article className="card reveal" key={card.no}>
            <span className="card-no">{card.no}</span>
            <div className="glyph">
              <i />
            </div>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
