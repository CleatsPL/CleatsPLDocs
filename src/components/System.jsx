export default function System() {
  return (
    <section className="system" id="system">
      <div className="wrap system-grid">
        <div className="system-head reveal">
          <div className="section-tag mono">04 / How it works</div>
          <h2>Speed is a control problem.</h2>
          <p>
            Every layer of Cleats exists to remove a reason the robot might travel slower than its hardware allows —
            geometry that forces a slowdown, a gain that guesses, a limit that is too conservative to be true.
          </p>
        </div>
        <div className="blank-grid reveal">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="blank-box" key={index} aria-hidden="true" />
          ))}
        </div>
      </div>
    </section>
  );
}
