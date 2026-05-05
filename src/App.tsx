import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import IconsPage from './pages/Icons';
import IconDetail from './pages/IconDetail';
import UsagePage from './pages/Usage';
import PackagesPage from './pages/Packages';
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
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
