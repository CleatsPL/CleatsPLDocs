export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <a className="brand" href="#top">
          <span className="brandmark" aria-hidden="true" />
          <span>ECHO/01</span>
        </a>
        <nav>
          <a href="#">Privacy</a>
          <a href="#">Materials</a>
          <a href="#">Press</a>
          <span>
            © <b id="year">{new Date().getFullYear()}</b> ECHO Object Co.
          </span>
        </nav>
      </div>
    </footer>
  );
}
