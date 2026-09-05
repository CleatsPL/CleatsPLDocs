const cards = [
  {
    no: '01 / LISTEN',
    title: 'Near',
    copy: 'For questions, cooking, planning and the soft logistics of an ordinary day.',
  },
  {
    no: '02 / FOCUS',
    title: 'With',
    copy: 'For shared work, deep listening and keeping a room in a single rhythm.',
  },
  {
    no: '03 / VANISH',
    title: 'Away',
    copy: 'Microphones close. Light disappears. The object becomes only an object again.',
  },
];

export default function Modes() {
  return (
    <section className="modes wrap" id="modes">
      <div className="modes-title">
        <div>
          <div className="section-tag mono reveal" style={{ marginBottom: 28 }}>
            07 / States
          </div>
          <h2 className="reveal">
            Three ways
            <br />
            to be there.
          </h2>
        </div>
        <p className="reveal">
          Not an app store. Not a list of skills. Just three legible states for the moments a home actually has.
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
