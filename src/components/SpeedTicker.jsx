/* Marquee band of the library's highlight terms (all existing copy).
   Pauses on hover. The second row is a hidden duplicate for a seamless loop. */
const TERMS = [
  'Quintic Hermite splines',
  'No lookahead',
  'Superelliptical acceleration envelope',
  'Per-wheel slip prevention',
  'LQR endgame',
  'Decoupled heading',
  'Live replanning',
  'Arc-based localization',
  'Self-tuning',
  'Time-optimal control',
];

function Row({ hidden }) {
  return (
    <div className="ticker-row" aria-hidden={hidden || undefined}>
      {TERMS.map((t) => (
        <span className="ticker-item" key={t}>
          <i aria-hidden="true" />
          {t}
        </span>
      ))}
    </div>
  );
}

export default function SpeedTicker() {
  return (
    <div className="ticker" aria-label="Cleats highlights">
      <div className="ticker-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
