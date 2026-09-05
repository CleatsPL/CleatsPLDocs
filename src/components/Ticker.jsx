const items = [
  'Quintic Hermite splines',
  'Zero lookahead',
  'Superelliptical acceleration envelope',
  'Per-wheel slip prevention',
  'LQR endgame',
  'Self-tuning from measured physics',
];
const set = [...items, ...items, ...items, ...items];

export default function Ticker() {
  const loop = [...set, ...set];
  return (
    <div className="ticker" aria-label="Cleats feature highlights">
      <div className="ticker-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
