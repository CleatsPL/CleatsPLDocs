const items = ['Six-mic spatial array', 'Local by default', 'Zero visual notifications', 'Twenty-four hour calm'];

export default function Ticker() {
  const loop = [...items, ...items];
  return (
    <div className="ticker" aria-label="Product highlights">
      <div className="ticker-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
