import { Link } from 'react-router-dom';
import { ToolItem } from './data';

export default function ToolCard({ tool }: { tool: ToolItem }) {
    return (
        <div className="bg-text-base/3 rounded-2xl p-6 flex flex-col transition-all hover:bg-text-base/4">
            <Link to={tool.guideUrl} className="w-16 h-16 flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-200">
                {tool.icon}
            </Link>
            <h3 className="text-text-base font-semibold text-lg mb-2">{tool.name}</h3>
            <div className="flex items-center gap-2 flex-wrap mb-4">
                <span
                    className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                    style={{
                        backgroundColor: `${tool.badge.color}1A`,
                        color: tool.badge.color,
                        borderColor: `${tool.badge.color}33`,
                    }}
                >
                    {tool.badge.label}
                </span>
                <span className="bg-text-base/10 text-text-base/60 border border-text-base/10 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {tool.version}
                </span>
            </div>
            <p className="text-text-base/50 text-[14px] leading-relaxed mb-6 flex-1">{tool.description}</p>
            <div className="flex items-center gap-2">
                <Link to={tool.guideUrl} className="bg-[#9B8AFB] hover:bg-[#8B7AFB] text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    Guide
                </Link>
                <a href={tool.primaryAction.href} target="_blank" rel="noopener noreferrer" className="bg-text-base/6 hover:bg-text-base/10 text-text-base/70 hover:text-text-base text-[13px] font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    {tool.primaryAction.label}
                </a>
                <a href={tool.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-text-base/6 hover:bg-text-base/10 text-text-base/70 hover:text-text-base text-[13px] font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    Source
                </a>
            </div>
        </div>
    );
}
