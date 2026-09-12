export default function System() {
  return (
    <section className="system" id="system">
      <div className="wrap">
        <div className="system-head reveal">
          <div className="section-tag mono">04 / How it works</div>
          <h2>Set up the auto, let Cleats do the talking</h2>
        </div>
        <div className="system-links reveal">
          <div className="links-head mono">Quick Access Documentation Links</div>
          <p className="links-note">
            Every layer of Cleats exists to remove a reason the robot might travel slower than its hardware allows —
            geometry that forces a slowdown, a gain that guesses, a limit that is too conservative to be true.
          </p>
          <div className="blank-grid">
            {Array.from({ length: 6 }, (_, index) => (
              <div className="blank-box" key={index} aria-hidden="true" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
