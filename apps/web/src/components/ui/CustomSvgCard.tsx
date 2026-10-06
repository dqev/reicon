import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HighlightItem } from './Highlight';
import { IconTooltipTrigger } from './IconTooltip';
import IconRenderer from '@/lib/IconRenderer';

export interface CustomSvgIcon {
  name: string;
  svg?: string;
  rawCode?: string;
  tags?: string;
  url?: string;
}

interface CustomSvgCardProps {
  icon: CustomSvgIcon;
  size?: number;
  setType?: 'brand' | 'flag' | 'glass';
  color?: string;
  onClick?: () => void;
  onSelect?: (name: string) => void;
}

function formatIconName(name: string): string {
  if (!name) return '';
  if (name.includes('-') || name.includes('_')) {
    return name
      .split(/[-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getIconSlug(name: string): string {
  return encodeURIComponent(
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
  );
}

function CustomSvgCard({ icon, size = 40, setType = 'brand', color, onClick, onSelect }: CustomSvgCardProps) {
  const displayName = useMemo(() => formatIconName(icon.name), [icon.name]);
  const slug = useMemo(() => getIconSlug(icon.name), [icon.name]);
  const toPath =
    setType === 'flag'
      ? `/flags/${slug}`
      : setType === 'glass'
      ? `/glass/${slug}`
      : `/brands/${slug}`;

  const isGlass = setType === 'glass';
  const renderSize = size;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <HighlightItem
      value={icon.name}
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 180px' }}
    >
      <IconTooltipTrigger label={displayName} side="bottom" sideOffset={14}>
        <Link
          to={toPath}
          onClick={handleClick}
          className="cv-auto group flex items-center justify-center w-full h-full aspect-square bg-[#181818] hover:bg-[#1c1c1c] active:scale-95 border border-white/[0.06] rounded-2xl sm:rounded-[18px] transition-all duration-150 cursor-pointer relative"
          aria-label={`${displayName} icon`}
        >
          <div
            className="flex items-center justify-center pointer-events-none transition-transform duration-150 group-hover:scale-105"
            style={{ width: renderSize, height: renderSize }}
          >
            {isGlass ? (
              <IconRenderer
                name={icon.name}
                code={icon.rawCode}
                size={renderSize}
                color={color}
                lazy={true}
              />
            ) : (
              <div
                className="reicon-custom-svg w-full h-full flex items-center justify-center text-[#ededed]"
                dangerouslySetInnerHTML={{ __html: icon.svg || '' }}
              />
            )}
          </div>
        </Link>
      </IconTooltipTrigger>
    </HighlightItem>
  );
}

export default memo(CustomSvgCard);
