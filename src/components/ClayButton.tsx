import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'accent';

interface ClayButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export default function ClayButton({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  onClick,
  size = 'md',
}: ClayButtonProps) {
  const base = `clay-btn clay-${variant} ${size === 'sm' ? 'clay-sm' : ''} ${className}`;

  if (to) {
    return <Link to={to} className={base} onClick={onClick}>{children}</Link>;
  }
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={base} onClick={onClick}>{children}</a>;
  }
  return <button className={base} onClick={onClick}>{children}</button>;
}
