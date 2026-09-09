const links = [
  { href: '#home', label: 'Home' },
  { href: '#premise', label: 'Features' },
  { href: '#hero', label: 'Overview' },
];

function handleAnchorClick(event, href) {
  if (!href || !href.startsWith('#')) return;

  event.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.hash = href;
  }
}

export default function Nav({ scrolled, menuOpen, onToggleMenu, onNavigate }) {
  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="navin wrap">
        <a
          className="brand"
          href="#home"
          aria-label="Cleats home"
          onClick={(event) => {
            if (onNavigate) onNavigate(event);
            handleAnchorClick(event, '#home');
          }}
        >
          <span className="brandmark" aria-hidden="true" />
          <span>CLEATS</span>
        </a>
        <nav className="navlinks" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                if (onNavigate) onNavigate(event);
                handleAnchorClick(event, link.href);
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            className="reserve"
            href="#system"
            onClick={(event) => {
              if (onNavigate) onNavigate(event);
              handleAnchorClick(event, '#system');
            }}
          >
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
