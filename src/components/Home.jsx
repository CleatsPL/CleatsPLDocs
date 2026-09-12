import GhostFibers from './GhostFibers.jsx';

export default function Home() {
  return (
    <section className="home-hero" id="home">
      <div className="home-fibers">
        <GhostFibers />
      </div>
      <div className="home-veil" aria-hidden="true" />
      <h1 className="home-title">
        <span>Cleats</span>
        <span className="accent">Pathing</span>
        <span>Library</span>
      </h1>
    </section>
  );
}
