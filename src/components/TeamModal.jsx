import { useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';

/**
 * Popup with the full story for a team member.
 * Closes on backdrop click, X, or Escape. Locks body scroll while open.
 */
export default function TeamModal({ member, onClose }) {
  const backdropRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // allow the transition to run
    const raf = requestAnimationFrame(() => {
      const el = backdropRef.current;
      if (el) el.classList.add('open');
    });

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
    };
  }, [onClose]);

  if (!member) return null;

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} — profile`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel">
        <div className="modal-photo">
          <img src={member.photo} alt={member.name} />
        </div>
        <div className="modal-body">
          <div className="modal-kicker">
            <span className="mono">Member {member.index} / Team</span>
            <button type="button" className="modal-close" onClick={onClose} aria-label="Close profile">
              ✕
            </button>
          </div>
          <h2>{member.name}</h2>
          <p className="modal-role">{member.role}</p>
          <p className="modal-bio">{member.bio}</p>

          <ul className="modal-contribs" aria-label="Contributions">
            {member.contributions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          <div className="modal-links">
            <a
              href={member.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ height: '2.6rem', padding: '0 1.2rem', fontSize: '0.875rem' }}
            >
              <FaGithub aria-hidden="true" /> GitHub
            </a>
            <span className="mono" style={{ alignSelf: 'center', color: 'var(--mute)' }}>
              @{member.handle} · {member.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
