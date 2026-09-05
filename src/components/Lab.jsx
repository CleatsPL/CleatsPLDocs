export default function Lab() {
  return (
    <section className="lab" id="lab">
      <div className="wrap lab-head">
        <div>
          <div className="section-tag mono">08 / Under the hood</div>
          <h2>
            Built on
            <br />
            measured physics.
          </h2>
        </div>
        <p>Four layers between the path you draw and the torque that reaches the floor — none of them guessing.</p>
      </div>
      <div className="lab-track" id="labTrack">
        <article className="lab-card">
          <div className="lab-card-top mono">
            <span>Layer 01</span>
            <span>Geometry</span>
          </div>
          <div className="lab-card-content">
            <div className="lab-copy">
              <h3>Quintic splines.</h3>
              <p>The lowest-order curve that matches position, tangent and curvature at every waypoint — so acceleration never jumps at a boundary and no speed is shed for a kink in the route.</p>
            </div>
            <div className="lab-visual">
              <div className="acoustic-rings" />
            </div>
          </div>
        </article>
        <article className="lab-card dark">
          <div className="lab-card-top mono">
            <span>Layer 02</span>
            <span>Envelope</span>
          </div>
          <div className="lab-card-content">
            <div className="lab-copy">
              <h3>A superelliptical limit.</h3>
              <p>Acceleration capability is modelled as a smooth superellipse in the robot’s own frame, so the true limit is looked up per direction instead of collapsed into one conservative scalar.</p>
            </div>
            <div className="lab-visual">
              <div className="core-stack">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </article>
        <article className="lab-card amber">
          <div className="lab-card-top mono">
            <span>Layer 03</span>
            <span>Traction</span>
          </div>
          <div className="lab-card-content">
            <div className="lab-copy">
              <h3>Slip is slow.</h3>
              <p>Per-wheel torque rate shaping keeps every tire just inside the traction limit. Wheels that break loose lose time and corrupt odometry, so slip prevention is a speed feature.</p>
            </div>
            <div className="lab-visual">
              <div className="material-bars">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </article>
        <article className="lab-card">
          <div className="lab-card-top mono">
            <span>Layer 04</span>
            <span>Localization</span>
          </div>
          <div className="lab-card-content">
            <div className="lab-copy">
              <h3>True arcs.</h3>
              <p>Odometry is integrated along true arcs of motion rather than straight-line approximations, filtered with outlier rejection so one bad encoder read never corrupts the estimate.</p>
            </div>
            <div className="lab-visual">
              <div className="spec-disc">
                <b>0</b>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="wrap swipe-hint mono">Four layers / one trajectory</div>
    </section>
  );
}
