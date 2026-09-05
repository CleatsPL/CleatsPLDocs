const beats = [
  {
    kicker: 'Premise 01 / The lag',
    title: (
      <>
        A PID loop always chases a <em>moving setpoint.</em>
      </>
    ),
    copy: 'Conventional followers hand a setpoint to a feedback loop and, by construction, trail behind it forever. The error never reaches zero because the target never stops moving.',
  },
  {
    kicker: 'Premise 02 / The reframe',
    title: (
      <>
        Following is a <em>time-optimal</em> control problem.
      </>
    ),
    copy: 'Cleats does not chase. It solves for the fastest legal trajectory directly, so the drivetrain is either at its acceleration limit or its deceleration limit — and effectively nowhere in between.',
  },
  {
    kicker: 'Premise 03 / The result',
    title: (
      <>
        The hardware becomes the <em>only limit.</em>
      </>
    ),
    copy: 'Every constraint the robot obeys is a measured physical one: traction, acceleration envelope, braking distance. Nothing is left on the table by a tuning constant.',
  },
];

export default function Premise() {
  return (
    <section className="intro" id="premise">
      <div className="premise-stage">
        <div className="premise-top">
          <div className="section-tag mono">01 / Premise</div>
          <span className="premise-step mono" id="premiseStep">
            01 — The lag
          </span>
        </div>
        <div className="premise-word" aria-hidden="true">
          FAST
        </div>
        <div className="premise-signal" aria-hidden="true">
          <i />
          <i />
          <i />
          <b />
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
          <strong>100%</strong>
          Throttle held until the exact
          <br />
          instant braking becomes required.
        </div>
        <div className="premise-progress" aria-hidden="true">
          <i id="premiseMeter" />
        </div>
      </div>
    </section>
  );
}
