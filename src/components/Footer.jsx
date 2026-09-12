import Brand from './Brand.jsx';

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <a className="brand" href="/">
          <Brand />
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
