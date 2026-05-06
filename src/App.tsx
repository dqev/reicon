import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import IconsPage from './pages/Icons';
import IconDetail from './pages/IconDetail';
import UsagePage from './pages/Usage';
import PackagesPage from './pages/Packages';
import NotFound from './pages/NotFound';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import LicensePage from './pages/LicensePage';
import SmoothScroll from './components/SmoothScroll';

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
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/icons" element={<IconsPage />} />
          <Route path="/icon/:name" element={<IconDetail />} />
          <Route path="/usage" element={<UsagePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/license" element={<LicensePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
