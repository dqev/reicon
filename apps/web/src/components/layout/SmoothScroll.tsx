'use client';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

function isScrollablePage(pathname: string) {
  const noScroll = ['/icons', '/faq', '/docs', '/packages', '/pack', '/terms', '/privacy', '/license'];
  return !noScroll.some(p => pathname === p || pathname.startsWith(p + '/'));
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isScrollablePage(pathname) || window.innerWidth < 768) return;

    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;

    let idle = false;

    function startLoop() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      idle = false;

      function raf(time: number) {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
      rafRef.current = requestAnimationFrame(raf);
    }

    function stopLoop() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      idle = true;
    }

    function onIdleReset() {
      if (idleRef.current) clearTimeout(idleRef.current);
      if (idle) startLoop();
      idleRef.current = setTimeout(() => stopLoop(), 3000);
    }

    startLoop();

    window.addEventListener('scroll', onIdleReset, { passive: true });
    window.addEventListener('wheel', onIdleReset, { passive: true });
    window.addEventListener('touchstart', onIdleReset, { passive: true });

    return () => {
      stopLoop();
      lenis.destroy();
      window.removeEventListener('scroll', onIdleReset);
      window.removeEventListener('wheel', onIdleReset);
      window.removeEventListener('touchstart', onIdleReset);
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [pathname]);

  return <>{children}</>;
}
