import { useEffect, useState } from 'react';
import CardNav from '../reactbits/CardNav.jsx';
import { navItems } from '../data/site.js';
import { useLocation } from 'react-router-dom';

/**
 * Fixed shell around the React Bits CardNav so the card nav
 * appears on every page. CTA context changes per route.
 */
export default function CardNavShell() {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const cta =
    pathname === '/get-started'
      ? { label: 'Intro', to: '/' }
      : { label: 'Get Started', to: '/get-started' };

  return (
    <div className="fixed inset-x-0 top-0 z-[99] pointer-events-none">
      {ready && (
        <CardNav
          logo="/assets/logo.svg"
          logoAlt="Cleats logo"
          items={navItems}
          baseColor="rgba(10, 10, 12, 0.92)"
          menuColor="#f4f2ee"
          buttonBgColor="#c1121f"
          buttonTextColor="#f4f2ee"
          ease="power3.out"
          ctaLabel={cta.label}
          ctaTo={cta.to}
        />
      )}
    </div>
  );
}
