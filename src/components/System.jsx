const modules = [
  {
    num: 'A.01',
    title: 'Spatial hearing',
    copy: 'Six directional microphones isolate the voice that matters while letting the rest of the room remain a room.',
  },
  {
    num: 'A.02',
    title: 'Local understanding',
    copy: 'Daily language, routines and automations are processed on-device. The cloud is optional, visible and off by default.',
  },
  {
    num: 'A.03',
    title: 'Ambient expression',
    copy: 'A single line of warm light communicates acknowledgement, thinking and rest. It never asks to be watched.',
  },
  {
    num: 'A.04',
    title: 'Material memory',
    copy: 'A ceramic shell, recycled aluminum core and repairable acoustic layer are made to age with the spaces they inhabit.',
  },
];

export default function System() {
  return (
    <section className="system" id="system">
      <div className="wrap system-grid">
        <div className="system-head reveal">
          <div className="section-tag mono">03 / How it thinks</div>
          <h2>A room-scale nervous system.</h2>
          <p>
            ECHO reads the shape, rhythm and tone of a space—not the identity of the people inside it. Its intelligence
            begins and ends at your walls.
          </p>
        </div>
        <div className="module-list">
          {modules.map((item) => (
            <article className="module reveal" key={item.num}>
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
