const panels = [
  {
    kicker: 'Stage 01 / Geometry',
    title: 'Quintic Hermite splines.',
    copy: 'The lowest-order curve that can match position, tangent and curvature at every waypoint. Acceleration never jumps across a segment boundary, so the robot is never forced to shed speed for a kink in the geometry.',
  },
  {
    kicker: 'Stage 02 / Tracking',
    title: 'No lookahead. None.',
    copy: 'A lookahead distance is a tunable fudge factor that cuts corners and trades accuracy for smoothness. Cleats projects the robot onto the nearest point of the spline instead — tangential drive blended with a perpendicular correction that scales with actual cross-track error.',
  },
  {
    kicker: 'Stage 03 / Arrival',
    title: 'Then the LQR takes over.',
    copy: 'Time-optimal transit hands off to an optimal state-feedback controller that treats position, strafe and heading as one coupled system, driving residual error continuously to zero rather than oscillating around it.',
  },
];

export default function Story() {
  return (
    <section className="story" id="story">
      <div className="story-stage">
        <div className="story-media">
          <img src="/assets/echo01-story-rain.jpg" alt="A robot tracking a spline path across the field" loading="lazy" />
        </div>
        <div className="story-top">
          <div className="section-tag mono">02 / Anatomy of a move</div>
          <div className="story-index">
            <span>STAGE</span>
            <b id="storyIndex">01</b>
          </div>
        </div>
        <div className="story-panels">
          {panels.map((panel, index) => (
            <article className={`story-panel${index === 0 ? ' active' : ''}`} key={panel.kicker}>
              <span className="mono">{panel.kicker}</span>
              <h2>{panel.title}</h2>
              <p>{panel.copy}</p>
            </article>
          ))}
        </div>
        <div className="story-meter" aria-hidden="true">
          <i id="storyMeter" />
        </div>
      </div>
    </section>
  );
}
