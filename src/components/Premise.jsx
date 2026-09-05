const beats = [
  {
    kicker: 'Signal 01 / Restraint',
    title: (
      <>
        Technology should know when <em>not</em> to speak.
      </>
    ),
    copy: 'ECHO begins with a refusal: no glowing rectangle, no feed, no new reason to look away from the room.',
  },
  {
    kicker: 'Signal 02 / Context',
    title: (
      <>
        It senses the room—<em>never the person.</em>
      </>
    ),
    copy: 'Shape, rhythm and tone become useful context. Identity never enters the system, and raw signals disappear in milliseconds.',
  },
  {
    kicker: 'Signal 03 / Absence',
    title: (
      <>
        Then it gives your <em>attention back.</em>
      </>
    ),
    copy: 'A response arrives in 0.8 seconds. The aperture closes, the amber seam cools, and the interface leaves with the request.',
  },
];

export default function Premise() {
  return (
    <section className="intro" id="premise">
      <div className="premise-stage">
        <div className="premise-top">
          <div className="section-tag mono">01 / Premise</div>
          <span className="premise-step mono" id="premiseStep">
            01 — Listen
          </span>
        </div>
        <div className="premise-word" aria-hidden="true">
          LESS
        </div>
        <div className="premise-object" aria-hidden="true">
          <div className="premise-object-shell" />
          <div className="premise-seam">
            <i />
          </div>
          <span className="premise-object-label mono">Seam / 2700 K</span>
        </div>
        <div className="premise-copy">
          {beats.map((beat) => (
            <article className="premise-beat" key={beat.kicker}>
              <span className="mono">{beat.kicker}</span>
              <h2>{beat.title}</h2>
              <p>{beat.copy}</p>
            </article>
          ))}
        </div>
        <div className="premise-stat">
          <strong>0.8 s</strong>
          Average response onset.
          <br />
          No wake screen. No dashboard.
        </div>
        <div className="premise-progress" aria-hidden="true">
          <i id="premiseMeter" />
        </div>
      </div>
    </section>
  );
}
