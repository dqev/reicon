import { Link } from 'react-router-dom';
import { SiGithub, SiNpm, SiBluesky } from 'react-icons/si';
import { BsLinkedin } from 'react-icons/bs';
import { useTheme } from './ThemeContext';

const socials = [
  { href: 'https://github.com/dqev/reicon', label: 'GitHub', icon: SiGithub },
  { href: 'https://www.linkedin.com/company/reicon-dev', label: 'LinkedIn', icon: BsLinkedin },
  { href: 'https://www.npmjs.com/package/reicon-react', label: 'npm', icon: SiNpm },
  { href: 'https://bsky.app/profile/reicondev.bsky.social', label: 'Bluesky', icon: SiBluesky },
];

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative z-10 mt-auto overflow-hidden text-text-base" role="contentinfo">

      {/* Links + info */}
      <div className="px-6 pb-8">
        <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — logo + attribution */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-1">
              <img src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'} alt="Reicon" className="w-4 h-4" />
              <span className="text-text-base font-medium text-sm">Reicon</span>
            </Link>
            <span className="text-[11.5px] text-text-base/60">
              Designed & developed by{' '}
              <a href="https://devchauhan.in" target="_blank" rel="noopener noreferrer" className="text-text-base/80 hover:text-text-base transition-colors cursor-pointer">
                @devchauhan
              </a>
            </span>
          </div>

          {/* Center — nav */}
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px]">
            <Link to="/icons" className="text-text-base/70 hover:text-text-base transition-colors">Icons</Link>
            <Link to="/usage" className="text-text-base/70 hover:text-text-base transition-colors">Usage</Link>
            <Link to="/faq" className="text-text-base/70 hover:text-text-base transition-colors">FAQ</Link>
            <Link to="/terms" className="text-text-base/70 hover:text-text-base transition-colors">Terms</Link>
            <Link to="/privacy" className="text-text-base/70 hover:text-text-base transition-colors">Privacy</Link>
            <Link to="/license" className="text-text-base/70 hover:text-text-base transition-colors">License</Link>
            <a href="mailto:hello@reicon.dev" className="text-text-base/70 hover:text-text-base transition-colors cursor-pointer">Contact</a>
          </nav>

          {/* Right — copyright + socials */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-text-base/40 hover:text-text-base transition-colors cursor-pointer"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <div className="text-[11px] text-text-base/50">
              © {new Date().getFullYear()} Reicon. MIT License.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
