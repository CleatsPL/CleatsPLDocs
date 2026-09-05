export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <a className="brand" href="/">
          <span className="brandmark" aria-hidden="true" />
          <span>CLEATS</span>
        </a>
        <nav>
          <span>
            © <b id="year" className="copyright">{new Date().getFullYear()}</b> Cleats Path Library
          </span>
        </nav>
      </div>
    </footer>
  );
}
