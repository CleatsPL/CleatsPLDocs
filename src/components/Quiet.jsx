const shots = [
  {
    src: '/assets/echo01-quiet-morning.jpg',
    alt: 'Acceleration phase of a Cleats trajectory',
    kicker: 'Phase / Accelerate',
    title: 'Straight to the ceiling.',
    copy: 'From the first loop the drivetrain is commanded at its real acceleration limit for the direction it is actually travelling — not a conservative scalar that fits every heading badly.',
  },
  {
    src: '/assets/echo01-quiet-midday.jpg',
    alt: 'Cruise phase held at the traction limit',
    kicker: 'Phase / Sustain',
    title: 'Full throttle, held.',
    copy: 'Cleats computes the exact distance required to stop on every single loop and refuses to lift until that instant arrives. There is no coast, no taper, no early surrender.',
  },
  {
    src: '/assets/echo01-quiet-night.jpg',
    alt: 'Braking phase into the LQR handoff',
    kicker: 'Phase / Brake',
    title: 'A true kinematic stop.',
    copy: 'Deceleration is derived from measured physics rather than a guessed gain, so the robot arrives at the endpoint at zero velocity — not past it, and not creeping toward it.',
  },
];

export default function Quiet() {
  return (
    <section className="quiet" id="quiet">
      <div className="quiet-stage">
        <div className="quiet-shots">
          {shots.map((shot) => (
            <figure className="quiet-shot" key={shot.src}>
              <img src={shot.src} alt={shot.alt} loading="lazy" />
            </figure>
          ))}
        </div>
        <div className="quiet-shade" />
        <div className="quiet-badge mono">Either accelerating or braking. Never drifting.</div>
        <div className="quiet-head">
          <div className="section-tag mono">03 / The velocity profile</div>
          <span className="quiet-time mono" id="quietTime">
            ACCEL
          </span>
        </div>
        <div className="quiet-copy">
          {shots.map((shot) => (
            <article className="quiet-beat" key={shot.kicker}>
              <span className="mono">{shot.kicker}</span>
              <h2>{shot.title}</h2>
              <p>{shot.copy}</p>
            </article>
          ))}
        </div>
        <div className="quiet-rail" aria-hidden="true">
          <i id="quietMeter" />
        </div>
      </div>
    </section>
  );
}
