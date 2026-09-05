export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <a className="brand" href="#top">
          <span className="brandmark" aria-hidden="true" />
          <span>CLEATS</span>
        </a>
        <nav>
          <a href="#system">Docs</a>
          <a href="#lab">Internals</a>
          <a href="#modes">Controllers</a>
          <span>
            © <b id="year">{new Date().getFullYear()}</b> Cleats Path Library
          </span>
        </nav>
      </div>
    </footer>
  );
}
