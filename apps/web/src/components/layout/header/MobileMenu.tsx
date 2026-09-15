import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Star, Sun, Moon, Heart } from 'reicon-react';
import ClayButton from '../../ui/Button';
import { openSponsorCheckout } from '@/lib/sponsor';

interface MobileMenuProps {
  stars: number | null;
  theme: string;
  toggleTheme: () => void;
}

const navItems = [
  { to: '/icons', label: 'Icons' },
  { to: '/docs', label: 'Docs' },
  { to: '/packages', label: 'Packages' },
  { to: '/faq', label: 'FAQ' },
];

export default function MobileMenu({ stars, theme, toggleTheme }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className="md:hidden flex items-center gap-2">
      {/* Separate Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-text-base/[0.04] backdrop-blur-lg hover:bg-text-base/10 text-text-base/80 hover:text-text-base transition-colors cursor-pointer shadow-2xs"
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {isDark ? <Sun size={15} color="currentColor" /> : <Moon size={15} color="currentColor" />}
      </button>

      {/* Mobile Bar: Single pill button containing GitHub icon + Hamburger menu button */}
      <div className="h-[34px] flex items-center gap-0.5 bg-text-base/[0.04] backdrop-blur-lg rounded-full px-1 shadow-2xs">
        <a
          href="https://github.com/dqev/reicon"
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-text-base/10 text-text-base/80 hover:text-text-base transition-colors cursor-pointer"
          aria-label="GitHub Repository"
          title="GitHub"
        >
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor"/>
          </svg>
        </a>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-text-base/10 text-text-base/80 hover:text-text-base transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="w-4 h-3 flex flex-col justify-center gap-[3.5px]">
            <span
              className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                menuOpen ? 'translate-y-[2.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                menuOpen ? '-translate-y-[2.5px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* 100% Opaque Solid Full-screen menu overlay rendered directly to document.body */}
      {menuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] flex flex-col justify-between p-6 sm:p-8 transition-colors duration-150"
            style={{
              backgroundColor: isDark ? '#0c0c0e' : '#fcfbf9',
              color: isDark ? '#ffffff' : '#111111',
            }}
          >
            {/* Top Bar inside overlay */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 font-semibold text-[15px]"
                style={{ color: isDark ? '#ffffff' : '#111111' }}
              >
                <img src="/favicon/favicon.svg" alt="Reicon" loading="lazy" className="w-4.5 h-4.5 shrink-0 relative top-[-0.1px]" />
                <span>Reicon</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    color: isDark ? '#ffffff' : '#111111',
                  }}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    color: isDark ? '#ffffff' : '#111111',
                  }}
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Navigation Links (Harvard Style) */}
            <div className="flex flex-col gap-2 my-auto py-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-[clamp(34px,9vw,52px)] font-normal leading-[1.2] transition-colors py-1.5 opacity-90 hover:opacity-100"
                  style={{ color: isDark ? '#ffffff' : '#111111' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Bottom Actions Bar */}
            <div
              className="pt-6 flex flex-col gap-4"
              style={{ borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openSponsorCheckout();
                  }}
                  className="text-[14px] flex items-center gap-2 font-medium opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ color: isDark ? '#ffffff' : '#111111' }}
                >
                  <Heart size={16} className="text-rose-500 fill-rose-500/20" />
                  Sponsor
                </button>

                <a
                  href="https://github.com/dqev/reicon"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="text-[14px] flex items-center gap-1.5 font-medium opacity-80 hover:opacity-100 transition-opacity"
                  style={{ color: isDark ? '#ffffff' : '#111111' }}
                >
                  GitHub
                  {stars !== null && (
                    <span
                      className="flex items-center gap-0.5 text-[11px] font-medium pl-1.5"
                      style={{ borderLeft: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)', opacity: 0.6 }}
                    >
                      <Star size={11} weight="Filled" color="#eab308" className="shrink-0 relative -top-[0.5px]" />
                      {stars}
                    </span>
                  )}
                </a>
              </div>

              <ClayButton to="/icons" variant="accent" size="sm" onClick={() => setMenuOpen(false)} className="w-full justify-center py-2.5">
                <Star size={15} />
                Browse Icons
              </ClayButton>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
