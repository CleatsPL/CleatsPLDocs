import { useEffect, useRef, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Premise from './components/Premise.jsx';
import System from './components/System.jsx';
import Final from './components/Home.jsx';

import Footer from './components/Footer.jsx';


export default function App() {
  const shellRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Reveal-on-scroll for .reveal blocks (they start at opacity 0 in CSS).
  useEffect(() => {
    const root = shellRef.current;
    if (!root) return undefined;

    const targets = root.querySelectorAll('.reveal');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('on'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Nav switches to its solid "scrolled" treatment once the page moves.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu locks the page behind it.
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <main className="app-shell" ref={shellRef}>
      <Nav
        scrolled={scrolled}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />
      <Final />
      <System />
      <Premise />
      <Hero />
      <Footer />
    </main>
  );
}
