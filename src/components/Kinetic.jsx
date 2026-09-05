export default function Kinetic() {
  return (
    <section className="kinetic" id="language">
      <div className="kinetic-stage">
        <div className="kinetic-meta">
          <div className="section-tag mono">09 / The loop</div>
          <span className="mono">Project / Solve / Commit</span>
        </div>
        <div className="kinetic-words" aria-label="Project. Solve. Commit.">
          <div className="kinetic-word">PROJECT</div>
          <div className="kinetic-word">SOLVE</div>
          <div className="kinetic-word">COMMIT</div>
        </div>
        <i className="kinetic-beam" aria-hidden="true" />
        <div className="kinetic-caption">
          <p>Project onto the spline, solve for the time-optimal command, commit at the traction limit — every loop.</p>
          <span className="kinetic-step" id="kineticStep">
            01 / 03
          </span>
        </div>
      </div>
    </section>
  );
}
