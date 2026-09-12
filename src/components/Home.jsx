export default function Home() {
  return (
    <section className="final" id="home">
      <div className="wrap final-top" id="reserve">
        <span className="mono">Cleats / FTC path following</span>
      </div>
      <h2 className="wrap" id="lagging">
        Stop lagging.{' '}
        <span id="solve">Start solving.</span>
      </h2>
      <div className="wrap final-bottom">
        <p>
          Install Cleats, run the characterization routines,
          <br />
          and let the library find your robot’s real limits.
        </p>
        <a className="final-start" href="#system">
          Get started <b>↘</b>
        </a>
      </div>
    </section>
  );
}
