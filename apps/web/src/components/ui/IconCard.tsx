import { memo } from 'react';
import { Link } from 'react-router-dom';
import { HighlightItem } from './Highlight';
import { IconTooltipTrigger } from './IconTooltip';

interface IconCardProps {
  name: string;
  weight?: string;
  size?: number;
}

function IconCard({ name, weight = 'outline', size = 32 }: IconCardProps) {
  return (
    <HighlightItem value={`${name}-${weight}`}>
      <IconTooltipTrigger label={name} side="bottom" sideOffset={14}>
        <Link
          to={`/icon/${name}${weight ? `?weight=${weight}` : ''}`}
          className="cv-auto group flex items-center justify-center w-full h-full aspect-square bg-text-base/3 border border-text-base/6 rounded-xl transition-all cursor-pointer"
          title={name}
        >
          <re-icon
            icon={name}
            weight={weight}
            size={size}
            color="currentColor"
            className="text-text-base/70 group-hover:text-text-base transition-colors duration-150"
          />
        </Link>
      </IconTooltipTrigger>
    </HighlightItem>
  );
}

export default memo(IconCard);

export const IconCardSkeleton = memo(function IconCardSkeleton({ size = 32 }: { size?: number }) {
  return (
    <div
      className="cv-auto flex items-center justify-center aspect-square bg-text-base/3 border border-text-base/6 rounded-xl"
      aria-hidden="true"
    >
      <div
        className="rounded-md bg-text-base/7 animate-pulse"
        style={{ width: size, height: size }}
      />
    </div>
  );
});
