import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import SmoothScroll from './components/SmoothScroll';
import CookieConsent from './components/CookieConsent';

// Route-level code splitting — each page ships as its own chunk, shrinking the
// initial bundle (the Usage page alone pulls in 10+ sub-sections + react-icons).
const Landing = lazy(() => import('./pages/Landing'));
const IconsPage = lazy(() => import('./pages/Icons'));
const IconDetail = lazy(() => import('./pages/IconDetail'));
const UsagePage = lazy(() => import('./pages/Usage'));
const PackagesPage = lazy(() => import('./pages/Packages'));
const FaqPage = lazy(() => import('./pages/Faq'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const LicensePage = lazy(() => import('./pages/LicensePage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/icons" element={<IconsPage />} />
            <Route path="/icon/:name" element={<IconDetail />} />
            <Route path="/usage" element={<UsagePage />} />
            <Route path="/usage/:framework" element={<UsagePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/license" element={<LicensePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </SmoothScroll>
    </BrowserRouter>
  );
}
