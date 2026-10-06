import { useState, useEffect, useRef, forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  className?: string;
}

const CACHE_KEY = 'reicon:gh-stars';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6h - avoid refetching the full repo payload on every navigation

function getCachedStars(): number | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { value, at } = JSON.parse(raw) as { value: number; at: number };
    if (typeof value !== 'number' || Date.now() - at > CACHE_TTL) return null;
    return value;
  } catch {
    return null;
  }
}

function formatStars(stars: number): string {
  return stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : `${stars}`;
}

const Header = forwardRef<HTMLElement, HeaderProps>(function Header({ className = '' }, ref) {
  const { pathname } = useLocation();
  const [stars, setStars] = useState<number | null>(() => getCachedStars());
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GitHub REST has no ?fields= filter, so we still hit the same endpoint
    // but extract ONLY stargazers_count and discard the rest, then cache it.
    // Revalidate in background so the header paints instantly ("-" or cached value).
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const run = () => {
      fetch('https://api.github.com/repos/dqev/reicon', {
        signal: controller.signal,
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (cancelled || !data || typeof data.stargazers_count !== 'number') return;
          setStars(data.stargazers_count);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ value: data.stargazers_count, at: Date.now() }));
          } catch {
            /* storage unavailable - ignore */
          }
        })
        .catch(() => {
          /* keep cached value or "-" - no fake default */
        })
        .finally(() => clearTimeout(timeout));
    };

    // Don't block first paint: fetch after idle (or immediately if cache is stale/missing)
    if ('requestIdleCallback' in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(run);
      return () => {
        cancelled = true;
        clearTimeout(timeout);
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
        controller.abort();
      };
    }
    run();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header ref={ref} className={`site-nav ${className}`}>
      <div className="site-nav-inner max-w-[1240px] mx-auto px-5 md:px-10">
        <div className="site-nav-left">
          {/* Brand Logo & Mascot Mark */}
          <Link to="/" className="brand">
            <span className="brand-mark">
              <img src="/favicon/favicon.svg" alt="Reicon logo" width="16" height="16" />
            </span>
            <span className="brand-word">
              <span className="brand-word-strong">Reicon</span>
              <span className="brand-word-dim">.dev</span>
            </span>
          </Link>

          {/* Desktop Nav Pills */}
          <nav className="site-nav-menu">
            <Link to="/icons" className={`nav-pill ${pathname === '/icons' ? 'nav-pill--active' : ''}`}>Icons</Link>
            <Link to="/docs" className={`nav-pill ${pathname.startsWith('/docs') ? 'nav-pill--active' : ''}`}>Docs</Link>
            <Link to="/packages" className={`nav-pill ${pathname === '/packages' ? 'nav-pill--active' : ''}`}>Packages</Link>
          </nav>
        </div>

        <div className="site-nav-right">
          {/* Desktop Sponsor Button */}
          <Link to="/support" className="sponsor-btn-desktop hidden md:inline-flex">
            Support
          </Link>

          {/* GitHub Stars Count Pill */}
          <a className="icon-btn-pill" id="gh-stars-btn" href="https://github.com/dqev/reicon" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>{stars !== null ? formatStars(stars) : '-'}</span>
          </a>

          {/* 3-Dots Dropdown */}
          <div className="pm-anchor hidden sm:inline-flex" id="more-anchor" ref={moreRef}>
            <button
              type="button"
              className="icon-btn"
              id="more-btn"
              aria-label="More options"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              onClick={(e) => {
                e.stopPropagation();
                setMoreOpen(!moreOpen);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.66667 8C6.66667 7.26362 7.26362 6.66667 8 6.66667C8.73638 6.66667 9.33333 7.26362 9.33333 8C9.33333 8.73638 8.73638 9.33333 8 9.33333C7.26362 9.33333 6.66667 8.73638 6.66667 8Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M6.66667 3.33333C6.66667 2.59695 7.26362 2 8 2C8.73638 2 9.33333 2.59695 9.33333 3.33333C9.33333 4.06971 8.73638 4.66667 8 4.66667C7.26362 4.66667 6.66667 4.06971 6.66667 3.33333Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M6.66667 12.6667C6.66667 11.9303 7.26362 11.3333 8 11.3333C8.73638 11.3333 9.33333 11.9303 9.33333 12.6667C9.33333 13.403 8.73638 14 8 14C7.26362 14 6.66667 13.403 6.66667 12.6667Z" fill="currentColor" />
              </svg>
            </button>

            <div className={`tl-menu t-dropdown ${moreOpen ? 'is-open' : ''}`} id="more-menu" role="menu">
              <Link className="tl-menu-item" to="/faq" role="menuitem" onClick={() => setMoreOpen(false)}>
                <span>FAQ</span>
              </Link>
              <Link className="tl-menu-item" to="/terms" role="menuitem" onClick={() => setMoreOpen(false)}>
                <span>Terms of Service</span>
              </Link>
              <Link className="tl-menu-item" to="/privacy" role="menuitem" onClick={() => setMoreOpen(false)}>
                <span>Privacy Policy</span>
              </Link>
              <Link className="tl-menu-item" to="/license" role="menuitem" onClick={() => setMoreOpen(false)}>
                <span>License</span>
              </Link>
              <Link className="tl-menu-item" to="/support" role="menuitem" onClick={() => setMoreOpen(false)}>
                <span>Support</span>
              </Link>
            </div>
          </div>

          <MobileMenu stars={stars} />
        </div>
      </div>
    </header>
  );
});

export default Header;

