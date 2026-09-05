export default function Quote() {
  return (
    <section className="quote">
      <div className="quote-line" id="line1">
        It tunes itself.
      </div>
      <div className="quote-line ghost" id="line2">
        To your machine.
      </div>
      <div className="wrap quote-copy">
        <p className="reveal">
          “A robot should never travel slower than its hardware physically permits — and you should never spend three
          weeks proving it.”
        </p>
        <p className="reveal">
          Cleats ships with a suite of automated tuning routines that drive the robot through characterization runs,
          measure its actual acceleration, deceleration, angular limits and settling behaviour, then derive the
          controller constants from that measured physics. The library tunes itself to the machine it is installed on.
        </p>
      </div>
    </section>
  );
}
