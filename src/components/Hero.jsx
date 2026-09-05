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
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero-media">
        <img src="/assets/echo01-hero.jpg" alt="ECHO/01 sculptural ambient intelligence object on a stone plinth" />
      </div>
      <div className="hero-night" aria-hidden="true" />
      <div className="hero-beam" aria-hidden="true" />
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-cast" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow mono">
          <i className="pulse" /> Ambient intelligence / first edition
        </div>
        <h1 aria-label="Less screen. More sense.">
          <HeroLine text="Less screen." />
          <HeroLine text="More sense." accent />
        </h1>
        <div className="hero-bottom">
          <p>ECHO/01 is a quiet intelligence for the home—present when invited, invisible when it is not.</p>
          <a className="hero-cta" href="#system">
            Meet the object <b>↘</b>
          </a>
        </div>
      </div>
    </section>
  );
}
