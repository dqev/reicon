import { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Sun, Moon } from 'reicon-react';
import ClayButton from '../components/ClayButton';
import { useTheme } from './ThemeContext';

interface HeaderProps {
  className?: string;
}

const Header = forwardRef<HTMLElement, HeaderProps>(function Header({ className = '' }, ref) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isHeroHeader = className.includes('hero-header');
  // On mobile hero header the background is inverted vs the theme, so logo must also invert.
  // Light theme → dark header bg → need light logo. Dark theme → light header bg → need dark logo.
  // Regular header: Light theme → light bg → dark logo. Dark theme → dark bg → light logo.
  const isInverted = isHeroHeader && isMobile;
  const logoSrc = isInverted
    ? (theme === 'light' ? '/icon-light.webp' : '/icon-dark.webp')
    : (theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp');

  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e: MouseEvent) => {
      const header = ref && 'current' in ref ? ref.current : null;
      if (header && !header.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => setMenuOpen(false);

    document.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen, ref]);

  return (
    <header
      ref={ref}
      className={`fixed z-50 transition-all duration-300
        /* Default style */
        top-0 left-0 right-0 bg-[var(--header-bg)] backdrop-blur-xl border-b border-text-base/6
        [&.hero-header]:top-[10px] [&.hero-header]:left-[18px] [&.hero-header]:right-[18px] [&.hero-header]:rounded-[12px] [&.hero-header]:bg-white/5 [&.hero-header]:border [&.hero-header]:border-white/15 [&.hero-header]:shadow-lg [&.hero-header]:overflow-hidden
        /* Reset floating card style on desktop */
        sm:[&.hero-header]:top-0 sm:[&.hero-header]:left-0 sm:[&.hero-header]:right-0 sm:[&.hero-header]:rounded-none sm:[&.hero-header]:bg-[var(--header-bg)] sm:[&.hero-header]:border-none sm:[&.hero-header]:border-b sm:[&.hero-header]:border-text-base/6 sm:[&.hero-header]:shadow-none
        ${className}`}
    >
      <div className="flex items-center justify-between h-14 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <img src={logoSrc} alt="Reicon" className="w-4 h-4" />
          <span className="text-text-base font-semibold text-base">Reicon</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-2">
          <Link to="/icons" className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5">
            Icons
          </Link>
          <Link to="/usage" className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5">
            Usage
          </Link>
          <Link to="/packages" className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5">
            Packages
          </Link>
          <Link to="/faq" className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5">
            FAQ
          </Link>
          <a
            href="https://github.com/dqev/reicon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5 mr-2"
          >
            GitHub
          </a>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-text-base/8 text-text-base/80 hover:text-text-base transition-all duration-150 cursor-pointer mr-1"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} color="currentColor" /> : <Moon size={15} color="currentColor" />}
          </button>
          <ClayButton to="/icons" variant="accent" size="sm">
            <Star size={14} color="currentColor" />
            Browse Icons
          </ClayButton>
        </div>
 
        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-text-base/8 text-text-base/85 hover:text-text-base transition-all duration-150 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} color="currentColor" /> : <Moon size={17} color="currentColor" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center text-text-base/85 hover:text-text-base transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-center gap-[5px]">
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[3.25px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[3.25px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden mobile-dropdown bg-[var(--dropdown-bg)] backdrop-blur-xl px-4 pb-4 pt-2 flex flex-col gap-1 transition-colors duration-300">
          <Link
            to="/icons"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            Icons
          </Link>
          <Link
            to="/usage"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            Usage
          </Link>
          <Link
            to="/packages"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            Packages
          </Link>
          <Link
            to="/faq"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            FAQ
          </Link>
          <a
            href="https://github.com/dqev/reicon"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            GitHub
          </a>
 
          <ClayButton to="/icons" variant="accent" size="sm" onClick={() => setMenuOpen(false)} className="w-full justify-center mt-1">
            <Star size={14} color="currentColor" />
            Browse Icons
          </ClayButton>
        </div>
      )}
    </header>
  );
});

export default Header;
