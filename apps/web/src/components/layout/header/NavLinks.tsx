import { Link } from 'react-router-dom';

const navItems = [
  { to: '/icons', label: 'Icons' },
  { to: '/docs', label: 'Docs' },
  { to: '/packages', label: 'Packages' },
  { to: '/faq', label: 'FAQ' },
];

interface NavLinksProps {
  variant?: 'desktop' | 'mobile';
  onClick?: () => void;
}

export default function NavLinks({ variant = 'desktop', onClick }: NavLinksProps) {
  if (variant === 'mobile') {
    return (
      <>
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={onClick}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5"
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
