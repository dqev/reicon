import { useState } from 'react';
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

  if (pathname === '/notice' || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* storage unavailable - the bar will show again on reload */
    }
  };

  return (
    <div className="notice-bar" role="region" aria-label="Site notice">
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
