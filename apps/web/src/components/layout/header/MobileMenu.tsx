import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  stars?: number | null;
}

export default function MobileMenu({ stars }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.remove('menu-closing');
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else if (isClosing) {
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      document.body.classList.add('menu-closing');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      const timer = setTimeout(() => {
        document.body.classList.remove('menu-closing');
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove('menu-open', 'menu-closing');
      document.documentElement.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('menu-open', 'menu-closing');
      document.documentElement.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen, isClosing]);

  // Lock touchmove, wheel, and arrow keys to completely prevent background body scroll
  useEffect(() => {
    if (!menuOpen) return;

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      const menu = document.getElementById('mobile-menu');
      if (menu && menu.contains(target)) {
        // Allow scrolling inside menu only if its content overflows
        if (menu.scrollHeight > menu.clientHeight) {
          return;
        }
      }
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      const menu = document.getElementById('mobile-menu');
      if (menu && menu.contains(target) && menu.scrollHeight > menu.clientHeight) {
        return;
      }
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        const target = e.target as HTMLElement | null;
        const menu = document.getElementById('mobile-menu');
        if (!menu || !menu.contains(target) || menu.scrollHeight <= menu.clientHeight) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 639) {
        setMenuOpen(false);
        setIsClosing(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openMenu = () => {
    setIsClosing(false);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    if (!menuOpen) return;
    setMenuOpen(false);
    setIsClosing(true);
  };

  return (
    <>
      <button
        type="button"
        className="icon-btn nav-burger"
        id="nav-burger"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => (menuOpen ? closeMenu() : openMenu())}
      >
        <span className="nav-burger-box" aria-hidden="true">
          <span className="nav-burger-line nav-burger-line--top"></span>
          <span className="nav-burger-line nav-burger-line--bottom"></span>
        </span>
      </button>

      {(menuOpen || isClosing) &&
        createPortal(
          <>
            <div
              className="mobile-menu-backdrop"
              id="mobile-menu-backdrop"
              onClick={closeMenu}
              onTouchMove={(e) => {
                if (e.cancelable) e.preventDefault();
              }}
            />
            <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile">
              <ul className="mobile-menu-list">
                <li>
                  <Link className="mobile-menu-link mobile-menu-link--1" to="/icons" onClick={closeMenu}>
                    Icons
                  </Link>
                </li>
                <li>
                  <Link className="mobile-menu-link mobile-menu-link--2" to="/docs" onClick={closeMenu}>
                    Docs
                  </Link>
                </li>
                <li>
                  <Link className="mobile-menu-link mobile-menu-link--3" to="/packages" onClick={closeMenu}>
                    Packages
                  </Link>
                </li>
                <li>
                  <Link className="mobile-menu-link mobile-menu-link--4" to="/support" onClick={closeMenu}>
                    Support
                  </Link>
                </li>
                <li>
                  <a
                    className="mobile-menu-link mobile-menu-link--5 mobile-menu-link--pro"
                    href="https://github.com/dqev/reicon"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    GitHub ({stars ? (stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars) : '-'}★)
                  </a>
                </li>
              </ul>
              <Link className="mobile-menu-cta" id="mobile-browse" to="/icons" onClick={closeMenu}>
                Browse Icons
              </Link>
            </nav>
          </>,
          document.body
        )}
    </>
  );
}

