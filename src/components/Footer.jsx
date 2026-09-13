import { Link } from 'react-router-dom';
import { GITHUB_ORG } from '../data/site.js';

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <Link to="/" className="brand" aria-label="Cleats home">
          <img src="/assets/logo.svg" alt="" className="brandmark" />
          <span>CLEATS</span>
        </Link>
        <nav aria-label="Footer">
          <Link to="/">Introduction</Link>
          <Link to="/get-started">Quick links</Link>
          <Link to="/team">Team</Link>
          <a href={GITHUB_ORG} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span className="copyright">
            © {new Date().getFullYear()} Cleats Path Library
          </span>
        </nav>
      </div>
    </footer>
  );
}
