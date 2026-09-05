const modes = [
  { mode: 'HUSH', value: '18 dB / 2700 K', glow: '.22', level: '30', label: 'Hush' },
  { mode: 'BALANCE', value: '34 dB / 3000 K', glow: '.42', level: '62', label: 'Balance' },
  { mode: 'OPEN', value: '48 dB / 3400 K', glow: '.7', level: '100', label: 'Open' },
];

export default function Presence({ active, onMode }) {
  const current = modes.find((item) => item.mode === active) ?? modes[0];

  return (
    <section className="presence" id="presence">
      <div className="presence-photo">
        <img src="/assets/echo01-detail.jpg" alt="Close view of ECHO/01 ceramic shell and amber light seam" loading="lazy" />
      </div>
      <div className="presence-ui reveal">
        <div className="section-tag mono">05 / Presence engine</div>
        <h2>Set the room's frequency.</h2>
        <p>Choose how much presence you want. ECHO changes its voice, response speed and light—not its personality.</p>
        <div className="signal">
          <div
            className="signal-orb"
            id="signalOrb"
            aria-hidden="true"
            style={{
              boxShadow: `0 0 90px rgba(231,169,74,${current.glow}),0 0 220px rgba(231,169,74,${current.glow})`,
            }}
          />
          <div className="signal-readout">
            <div className="signal-live mono">
              <i />
              Live output
            </div>
            <b id="modeName">{current.mode}</b>
            <span id="modeValue">{current.value}</span>
            <div className="signal-meter">
              <i id="signalMeter" style={{ width: `${current.level}%` }} />
            </div>
          </div>
        </div>
        <div className="mode-buttons" role="group" aria-label="Presence mode">
          {modes.map((item) => (
            <button
              key={item.mode}
              className={item.mode === active ? 'active' : ''}
              data-mode={item.mode}
              type="button"
              onClick={() => onMode(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
