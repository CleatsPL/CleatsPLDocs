const LIGHTS = [
  { id: 'off', label: 'Off' },
  { id: 'warm', label: 'Warm' },
  { id: 'focus', label: 'Focus' },
];

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

export default function Hero({ light, onLight, onPointerMove, onPointerLeave }) {
  return (
    <section
      className="hero"
      data-light={light}
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
      <div className="hero-data mono">
        <span>Field</span>
        <span>43.67 N</span>
        <span>State</span>
        <span>Listening</span>
        <span>Light</span>
        <span>06:42</span>
      </div>
      <div className="light-console" aria-label="Room lighting controls">
        <div className="light-console-top mono">
          <span>Room light</span>
          <span id="lightStatus" aria-live="polite">
            {LIGHTS.find((item) => item.id === light)?.label}
          </span>
        </div>
        <div className="light-scenes" role="group" aria-label="Choose hero lighting">
          {LIGHTS.map((item) => (
            <button
              key={item.id}
              type="button"
              data-light={item.id}
              className={light === item.id ? 'active' : ''}
              aria-pressed={light === item.id}
              onClick={() => onLight(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
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
