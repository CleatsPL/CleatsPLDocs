const links = [
  {
    title: 'Cleats',
    href: 'https://github.com/CleatsPL/Cleats',
    description: 'Cleats - Pathing Algorithm',
  },
  {
    title: 'Dribble',
    href: 'https://github.com/CleatsPL/Dribble',
    description: 'Dribble - A command-based framework in-built with Cleats.',
  },
  {
    title: 'PlayMaker',
    href: 'https://github.com/CleatsPL/Playmaker',
    description: 'Playmaker - GUI interface for developing optimized autos.',
  },
];

export default function System() {
  return (
    <section className="system" id="system">
      <div className="wrap">
        <div className="system-head reveal">
          <div className="section-tag mono">04 / How it works</div>
          <h2>Quick Access Documentation Links</h2>
        </div>
        <div className="system-links reveal">
          <div className="links-head">Set up the auto, let Cleats do the talking</div>
          <p className="links-note">
            Every layer of Cleats exists to remove a reason the robot might travel slower than its hardware allows —
            geometry that forces a slowdown, a gain that guesses, a limit that is too conservative to be true.
          </p>
          <div className="blank-grid">
            {Array.from({ length: 3 }, (_, index) => (
              <div className="blank-box" key={index} aria-hidden="true" />
            ))}
            {links.map((link) => (
              <a
                className="blank-box link-box"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.title}
              >
                <span className="box-top">
                  <span className="box-title">{link.title}</span>
                  <span className="box-arrow" aria-hidden="true">↗</span>
                </span>
                <span className="box-desc">{link.description}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
