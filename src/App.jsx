import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Chrome from './components/Chrome.jsx';
import CardNavShell from './components/CardNavShell.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Heavy pages (WebGL backgrounds) are split out of the initial bundle.
const IntroPage = lazy(() => import('./pages/IntroPage.jsx'));
const GetStartedPage = lazy(() => import('./pages/GetStartedPage.jsx'));
const TeamPage = lazy(() => import('./pages/TeamPage.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // 'instant' overrides the global smooth scroll-behavior for route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function PageFallback() {
  return (
    <div className="page-fallback" aria-hidden="true">
      <img src="/assets/logo.svg" alt="" className="fallback-mark" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Chrome />
      <CardNavShell />
      <Suspense fallback={<PageFallback />}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="*" element={<IntroPage />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
