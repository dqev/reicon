import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const STORAGE_KEY = 'reicon:notice-bar-dismissed';

function readDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export default function NoticeBanner() {
  const { pathname } = useLocation();
  const [dismissed, setDismissed] = useState(readDismissed);
  const barRef = useRef<HTMLDivElement>(null);
  const hidden = pathname !== '/notice' || dismissed;

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (hidden) {
      root.style.setProperty('--reicon-notice-height', '0px');
      return;
    }

    const el = barRef.current;
    if (!el) return;

    const syncHeight = () => {
      root.style.setProperty('--reicon-notice-height', `${el.getBoundingClientRect().height}px`);
    };
    syncHeight();

    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.setProperty('--reicon-notice-height', '0px');
    };
  }, [hidden]);

  if (hidden) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* storage unavailable - the bar will show again on reload */
    }
  };

  return (
    <div ref={barRef} className="notice-bar" role="region" aria-label="Site notice">
      <div className="notice-bar-inner">
        <p className="notice-bar-text">
          <span className="hidden sm:inline">Reicon may shut down in the next one or two months. </span>
          <span className="sm:hidden">Reicon may shut down. </span>
          <Link to="/notice">Read the notice</Link>
        </p>
        <button type="button" className="notice-bar-close" onClick={dismiss} aria-label="Dismiss notice">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
