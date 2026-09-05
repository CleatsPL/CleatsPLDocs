const modules = [
  {
    num: 'A.01',
    title: 'Time-optimal solver',
    copy: 'Following is treated as a time-optimal control problem and solved directly. The drivetrain sits at its acceleration limit or its deceleration limit and effectively nowhere in between.',
  },
  {
    num: 'A.02',
    title: 'Projection, not pursuit',
    copy: 'The robot is projected onto the nearest point of the spline every loop. Tangential drive is blended with a perpendicular correction proportional to real cross-track error — so error is annihilated, not averaged away.',
  },
  {
    num: 'A.03',
    title: 'Directional acceleration envelope',
    copy: 'A mecanum drivetrain pushes far harder forward than sideways. Cleats models the achievable envelope as a smooth superellipse in the robot frame and looks up the true limit for whatever direction it is moving.',
  },
  {
    num: 'A.04',
    title: 'Per-wheel slip prevention',
    copy: 'Commanded torque is rate-shaped so each tire stays just inside the traction limit. Wheels that break loose are both slower and poison the odometry — preventing slip is a speed feature, not just a safety one.',
  },
];

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
