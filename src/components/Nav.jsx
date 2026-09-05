const links = [
  { href: '/features', label: 'Features' },
  { href: '/overview', label: 'Overview' },
  { href: '/anatomy', label: 'Anatomy' },
];

export default function Nav({ scrolled, menuOpen, onToggleMenu, onNavigate }) {
  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="navin wrap">
        <a className="brand" href="/" aria-label="Cleats home" onClick={onNavigate}>
          <span className="brandmark" aria-hidden="true" />
          <span>CLEATS</span>
        </a>
        <nav className="navlinks" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={onNavigate}>
              {link.label}
            </a>
          ))}
          <a className="reserve" href="/start" onClick={onNavigate}>
            Get started <i />
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
