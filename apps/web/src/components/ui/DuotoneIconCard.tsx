import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HighlightItem } from './Highlight';
import { IconTooltipTrigger } from './IconTooltip';

interface DuotoneIconCardProps {
  name: string;
  code: string;
  size?: number;
}

function DuotoneIconCard({ name, code, size = 40 }: DuotoneIconCardProps) {
  const svgInnerHtml = useMemo(() => {
    if (!code) return '';
    return code
      .replace(/fill="#[A-Fa-f0-9]{3,6}"/gi, 'fill="currentColor"')
      .replace(/stroke="#[A-Fa-f0-9]{3,6}"/gi, 'stroke="currentColor"');
  }, [code]);

  return (
    <HighlightItem
      value={`${name}-duotone`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 180px' }}
    >
      <IconTooltipTrigger label={`${name} (Duotone)`} side="bottom" sideOffset={14}>
        <Link
          to={`/icon/${name}?weight=duotone`}
          className="cv-auto group flex items-center justify-center w-full h-full aspect-square bg-[#181818] hover:bg-[#1c1c1c] border border-white/[0.06] rounded-2xl sm:rounded-[18px] transition-all duration-150 cursor-pointer relative"
          aria-label={`${name} (Duotone)`}
        >
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className="text-[#ededed] group-hover:text-[#9B8AFB] transition-colors duration-150"
            dangerouslySetInnerHTML={{ __html: svgInnerHtml }}
          />
        </Link>
      </IconTooltipTrigger>
    </HighlightItem>
  );
}

export default memo(DuotoneIconCard);
