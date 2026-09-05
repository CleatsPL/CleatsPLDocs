import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Chrome from './components/Chrome.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Ticker from './components/Ticker.jsx';
import Premise from './components/Premise.jsx';
import Story from './components/Story.jsx';
import Quiet from './components/Quiet.jsx';
import System from './components/System.jsx';
import Field from './components/Field.jsx';
import Spatial from './components/Spatial.jsx';
import Presence from './components/Presence.jsx';
import Lab from './components/Lab.jsx';
import Kinetic from './components/Kinetic.jsx';
import Modes from './components/Modes.jsx';
import Metrics from './components/Metrics.jsx';
import Quote from './components/Quote.jsx';
import Final from './components/Final.jsx';
import Footer from './components/Footer.jsx';
import { useEchoMotion } from './hooks/useEchoMotion.js';

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const rootRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState('warm');

  useEchoMotion(rootRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const onLight = useCallback((mode) => {
    setLight(mode);
    const hero = document.querySelector('.hero');
    if (hero) {
      ['--lx', '--ly', '--title-x', '--title-y'].forEach((v) => hero.style.removeProperty(v));
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      '.hero-char',
      { y: -3, filter: 'brightness(1.9)' },
      { y: 0, filter: 'brightness(1)', duration: 0.55, stagger: 0.012, ease: 'power2.out' }
    );
  }, []);

  const onHeroMove = useCallback(
    (event) => {
      if (reduced || window.innerWidth < 701 || light === 'off') return;
      const hero = event.currentTarget;
      const r = hero.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - r.left) / r.width));
      const y = Math.max(0, Math.min(1, (event.clientY - r.top) / r.height));
      hero.style.setProperty('--lx', `${(x * 100).toFixed(1)}%`);
      hero.style.setProperty('--ly', `${(y * 92).toFixed(1)}%`);
      hero.style.setProperty('--title-x', `${((0.5 - x) * 20).toFixed(1)}px`);
      hero.style.setProperty('--title-y', `${((0.5 - y) * 18).toFixed(1)}px`);
    },
    [light]
  );

  const onHeroLeave = useCallback((event) => {
    ['--lx', '--ly', '--title-x', '--title-y'].forEach((v) => event.currentTarget.style.removeProperty(v));
  }, []);

  return (
    <div ref={rootRef}>
      <Chrome />
      <Nav
        scrolled={scrolled}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />
      <main id="top">
        <Hero light={light} onLight={onLight} onPointerMove={onHeroMove} onPointerLeave={onHeroLeave} />
        <Ticker />
        <Premise />
        <Story />
        <Quiet />
        <System />
        <Field />
        <Spatial />
        <Presence />
        <Lab />
        <Kinetic />
        <Modes />
        <Metrics />
        <Quote />
        <Final />
      </main>
      <Footer />
    </div>
  );
}
