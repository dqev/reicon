import { memo } from 'react';
import { Link } from 'react-router-dom';
import { HighlightItem } from './Highlight';
import { IconTooltipTrigger } from './IconTooltip';

interface IconCardProps {
  name: string;
  weight?: string;
  size?: number;
}

function IconCard({ name, weight = 'outline', size = 40 }: IconCardProps) {
  return (
    <HighlightItem
      value={`${name}-${weight}`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 180px' }}
    >
      <IconTooltipTrigger label={name} side="bottom" sideOffset={14}>
        <Link
          to={`/icon/${name}${weight ? `?weight=${weight}` : ''}`}
          className="cv-auto group flex items-center justify-center w-full h-full aspect-square bg-[#181818] hover:bg-[#1c1c1c] border border-white/[0.06] rounded-2xl sm:rounded-[18px] transition-all duration-150 cursor-pointer"
          aria-label={name}
        >
          <re-icon
            icon={name}
            weight={weight}
            size={size}
            color="currentColor"
            className="text-[#ededed] group-hover:text-[#9B8AFB] transition-colors duration-150"
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
