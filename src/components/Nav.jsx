const links = [
  { href: '#story', label: 'Story' },
  { href: '#field', label: 'Signal' },
  { href: '#lab', label: 'Lab' },
  { href: '#modes', label: 'Modes' },
];

export default function Nav({ scrolled, menuOpen, onToggleMenu, onNavigate }) {
  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="navin wrap">
        <a className="brand" href="#top" aria-label="ECHO home" onClick={onNavigate}>
          <span className="brandmark" aria-hidden="true" />
          <span>ECHO/01</span>
        </a>
        <nav className="navlinks" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={onNavigate}>
              {link.label}
            </a>
          ))}
          <a className="reserve" href="#reserve" onClick={onNavigate}>
            Request access <i />
          </a>
        </nav>
        <button
          className="menubtn"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
        >
          <span />
        </button>
      </div>
    </header>
  );
}
