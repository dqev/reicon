import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HighlightItem } from './Highlight';
import { IconTooltipTrigger } from './IconTooltip';

interface DuotoneIconCardProps {
  name: string;
  code: string;
  size?: number;
}

function DuotoneIconCard({ name, code, size = 32 }: DuotoneIconCardProps) {
  const svgInnerHtml = useMemo(() => {
    if (!code) return '';
    return code
      .replace(/fill="#[A-Fa-f0-9]{3,6}"/gi, 'fill="currentColor"')
      .replace(/stroke="#[A-Fa-f0-9]{3,6}"/gi, 'stroke="currentColor"');
  }, [code]);

  return (
    <HighlightItem value={`${name}-duotone`}>
      <IconTooltipTrigger label={`${name} (Duotone)`} side="bottom" sideOffset={14}>
        <Link
          to={`/icon/${name}?weight=duotone`}
          className="cv-auto group flex items-center justify-center w-full h-full aspect-square bg-text-base/3 border border-text-base/6 rounded-xl transition-all cursor-pointer relative"
          title={`${name} (Duotone)`}
        >
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className="text-text-base/70 group-hover:text-text-base transition-colors duration-150"
            dangerouslySetInnerHTML={{ __html: svgInnerHtml }}
          />
        </Link>
      </IconTooltipTrigger>
    </HighlightItem>
  );
}

export default memo(DuotoneIconCard);
