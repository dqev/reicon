import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import SmoothScroll from './components/layout/SmoothScroll';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ThemeProvider } from './components/layout/ThemeContext';
import { lazyWithRetry } from './lib/lazyWithRetry';
import HomePage from './pages/home/Home';

const IconsPage = lazyWithRetry(() => import('./pages/icons/IconsPage'));
const IconDetail = lazyWithRetry(() => import('./pages/icon/IconDetail'));
const BrandDetail = lazyWithRetry(() => import('./pages/custom-icon/BrandDetail'));
const FlagDetail = lazyWithRetry(() => import('./pages/custom-icon/FlagDetail'));
const GlassDetail = lazyWithRetry(() => import('./pages/custom-icon/GlassDetail'));

const DocsPage = lazyWithRetry(() => import('./pages/docs/DocsPage'));
const PackagesPage = lazyWithRetry(() => import('./pages/packages/PackagesPage'));
const FaqPage = lazyWithRetry(() => import('./pages/faq/FaqPage'));
const SupportPage = lazyWithRetry(() => import('./pages/support/SupportPage'));
const NotFound = lazyWithRetry(() => import('./pages/not-found/NotFound'));
const Terms = lazyWithRetry(() => import('./pages/terms/Terms'));
const Privacy = lazyWithRetry(() => import('./pages/privacy/Privacy'));
const LicensePage = lazyWithRetry(() => import('./pages/license/LicensePage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const VALID_ROUTES = [
  '/', '/icons', '/packages', '/faq', '/support', '/terms', '/privacy', '/license',
  '/flags', '/brands', '/glass'
];

function isKnownRoute(pathname: string) {
  if (VALID_ROUTES.includes(pathname)) return true;
  if (pathname === '/sponsor' || pathname === '/donate') return true;
  if (
    pathname.startsWith('/icon/') ||
    pathname.startsWith('/brands/') ||
    pathname.startsWith('/flags/') ||
    pathname.startsWith('/glass/') ||
    pathname.startsWith('/docs')
  ) {
    return true;
  }
  return false;
}

function Layout() {
  const { pathname } = useLocation();
  const is404 = !isKnownRoute(pathname);
  const hideFooter =
    is404 ||
    pathname === '/icons' ||
    pathname === '/flags' ||
    pathname === '/brands' ||
    pathname === '/glass' ||
    pathname.startsWith('/docs') ||
    pathname === '/faq';

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<div className="flex-1" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/icons" element={<IconsPage />} />
            <Route path="/flags" element={<IconsPage />} />
            <Route path="/brands" element={<IconsPage />} />
            <Route path="/glass" element={<IconsPage />} />
            <Route path="/icon/:name" element={<IconDetail />} />
            <Route path="/brands/:name" element={<BrandDetail />} />
            <Route path="/flags/:name" element={<FlagDetail />} />
            <Route path="/glass/:name" element={<GlassDetail />} />

            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/:framework" element={<DocsPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/sponsor" element={<Navigate to="/support" replace />} />
            <Route path="/donate" element={<Navigate to="/support" replace />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/license" element={<LicensePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {!hideFooter && <Footer />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <Layout />
          <SpeedInsights />
        </SmoothScroll>
      </BrowserRouter>
    </ThemeProvider>
  );
}
