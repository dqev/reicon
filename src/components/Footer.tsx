import { Link } from 'react-router-dom';
import { SiGithub, SiNpm, SiBluesky } from 'react-icons/si';
import Logo from '../components/Logo';
import { BsLinkedin } from 'react-icons/bs';

const socials = [
  { href: 'https://github.com/dqev/reicon', label: 'GitHub', icon: SiGithub },
  { href: 'https://www.linkedin.com/company/reicon-dev', label: 'LinkedIn', icon: BsLinkedin },
  { href: 'https://www.npmjs.com/package/reicon-react', label: 'npm', icon: SiNpm },
  { href: 'https://bsky.app/profile/reicondev.bsky.social', label: 'Bluesky', icon: SiBluesky },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto overflow-hidden" role="contentinfo">

      {/* Links + info */}
      <div className="px-6 pb-8">
        <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — logo + attribution */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-1">
              <img src="/reicon.png" alt="Reicon" className="w-4 h-4" />
              <span className="text-white font-medium text-sm">Reicon</span>
            </Link>
            <span className="text-[11.5px] text-white/60">
              Designed & developed by{' '}
              <a href="https://devchauhan.in" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                @devchauhan
              </a>
            </span>
          </div>

          {/* Center — nav */}
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px]">
            <Link to="/icons" className="text-white/70 hover:text-white transition-colors">Icons</Link>
            <Link to="/usage" className="text-white/70 hover:text-white transition-colors">Usage</Link>
            <Link to="/faq" className="text-white/70 hover:text-white transition-colors">FAQ</Link>
            <Link to="/terms" className="text-white/70 hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy</Link>
            <Link to="/license" className="text-white/70 hover:text-white transition-colors">License</Link>
            <a href="mailto:hello@reicon.dev" className="text-white/70 hover:text-white transition-colors">Contact</a>
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
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <div className="text-[11px] text-white/50">
              © {new Date().getFullYear()} Reicon. MIT License.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
