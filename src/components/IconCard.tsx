import { memo } from 'react';
import { Link } from 'react-router-dom';

interface IconCardProps {
  name: string;
  weight?: string;
  size?: number;
}

function IconCard({ name, weight = 'outline', size = 32 }: IconCardProps) {
  // Carry the clicked weight so the detail page opens on the same weight.
  const to = weight === 'filled' ? `/icon/${name}?weight=filled` : `/icon/${name}`;
  return (
    <Link
      to={to}
      className="cv-auto group flex items-center justify-center aspect-square bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.08] hover:border-white/[0.12] transition-all cursor-pointer"
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

/**
 * Memoized: props are primitives (name/weight/size), so a card only re-renders
 * when its own props change — not when the parent IconsPage re-renders for an
 * unrelated reason (e.g. a search keystroke). Critical for the 2,700+ grid.
 */
export default memo(IconCard);

/**
 * Loading placeholder that mirrors IconCard's exact frame, with a pulsing
 * block where the glyph would render. Used while the CDN icon runtime loads.
 */
export const IconCardSkeleton = memo(function IconCardSkeleton({ size = 32 }: { size?: number }) {
  return (
    <div
      className="cv-auto flex items-center justify-center aspect-square bg-white/[0.03] border border-white/[0.06] rounded-xl"
      aria-hidden="true"
    >
      <div
        className="rounded-md bg-white/[0.07] animate-pulse"
        style={{ width: size, height: size }}
      />
    </div>
  );
});
