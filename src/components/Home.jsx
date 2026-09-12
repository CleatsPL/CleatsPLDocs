import GhostFibers from './GhostFibers.jsx';

export default function Home() {
  return (
    <section className="home-hero" id="home">
      <div className="home-fibers">
        <GhostFibers />
      </div>
      <div className="home-veil" aria-hidden="true" />
      <h1 className="home-title">
        <span className="title-main">Cleats Pathing Library</span>
        <span className="title-sub">Where Doubt Doesn&rsquo;t Exist</span>
      </h1>
    </section>
  );
}
