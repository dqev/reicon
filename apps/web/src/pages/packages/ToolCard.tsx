import { Link } from 'react-router-dom';
import { ToolItem } from './data';

export default function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <div className="relative flex flex-col justify-between gap-5 p-7 sm:p-8 rounded-[24px] bg-[#1a1a1a] min-h-[260px] transition-all hover:bg-[#202020] card-inset">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link to={tool.guideUrl} className="w-12 h-12 flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-200">
            {tool.icon}
          </Link>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="chip"
              style={{
                backgroundColor: `${tool.badge.color}24`,
                color: tool.badge.color,
              }}
            >
              {tool.badge.label}
            </span>
            <span className="chip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.8)' }}>
              {tool.version}
            </span>
          </div>
        </div>

        <h3 className="text-[#ededed] font-medium text-[18px] sm:text-[19px] tracking-[-0.01em] mb-2">
          <Link to={tool.guideUrl} className="hover:underline">
            {tool.name}
          </Link>
        </h3>

        <p className="text-[#c9c9c9] text-[14px] sm:text-[15px] leading-[1.6] m-0">
          {tool.description}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2 flex-wrap">
        <Link
          to={tool.guideUrl}
          className="bg-[#9B8AFB] hover:bg-[#8B78FA] text-white text-[13px] font-medium px-4 h-8.5 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center border-0"
        >
          Guide
        </Link>
        <a
          href={tool.primaryAction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/[0.06] hover:bg-white/10 text-white/80 hover:text-white text-[13px] font-medium px-4 h-8.5 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center border-0"
        >
          {tool.primaryAction.label}
        </a>
        <a
          href={tool.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/[0.06] hover:bg-white/10 text-white/80 hover:text-white text-[13px] font-medium px-4 h-8.5 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center border-0"
        >
          Source
        </a>
      </div>
    </div>
  );
}
