function HeroLine({ text, accent }) {
  return (
    <span className={`hero-line${accent ? ' accent' : ''}`}>
      {[...text].map((letter, index) => (
        <span key={`${letter}-${index}`} className="hero-char">
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ onPointerMove, onPointerLeave }) {
  return (
    <section
      className="hero"
      id="hero"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero-media">
        <img src="/assets/echo01-hero.jpg" alt="An FTC robot tracking a spline at full throttle" />
      </div>
      <div className="hero-night" aria-hidden="true" />
      <div className="hero-beam" aria-hidden="true" />
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-cast" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow mono">
          <i className="pulse" /> FTC path following / time-optimal control
        </div>
        <h1 aria-label="No lag. Just limits.">
          <HeroLine text="No lag." />
          <HeroLine text="Just limits." accent />
        </h1>
        <div className="hero-bottom">
          <p>
            Cleats is built on one principle: a robot should never travel slower than its hardware physically permits.
            Full throttle until the brakes are mandatory.
          </p>

        </div>
      </div>
    </section>
  );
}
