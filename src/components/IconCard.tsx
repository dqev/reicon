import { Link } from 'react-router-dom';

interface IconCardProps {
  name: string;
  weight?: string;
  size?: number;
}

export default function IconCard({ name, weight = 'outline', size = 32 }: IconCardProps) {
  return (
    <Link
      to={`/icon/${name}`}
      className="group flex items-center justify-center aspect-square bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.08] hover:border-white/[0.12] transition-all cursor-pointer"
      title={name}
    >
      <re-icon
        icon={name}
        weight={weight}
        size={size}
        color="currentColor"
        className="text-white/80 group-hover:text-white transition-colors"
      />
    </Link>
  );
}
