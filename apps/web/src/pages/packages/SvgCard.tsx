import { Link } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import { SVG_PACKAGE } from './data';

export default function SvgCard() {
    const pkg = SVG_PACKAGE;
    return (
        <div className="bg-text-base/3 rounded-2xl p-6 flex flex-col transition-all hover:bg-text-base/4">
            <Link to={pkg.guideUrl} className="w-16 h-16 flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-200">
                {pkg.icon}
            </Link>
            <h3 className="text-text-base font-semibold text-lg mb-2">{pkg.name}</h3>
            <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="bg-[#4285F4]/10 text-[#4285F4] border border-[#4285F4]/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">SVG (.zip)</span>
                <span className="bg-text-base/10 text-text-base/60 border border-text-base/10 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">5,300+ SVGs</span>
            </div>
            <p className="text-text-base/50 text-[14px] leading-relaxed mb-6 flex-1">{pkg.description}</p>
            <div className="flex items-center gap-2">
                <Link to={pkg.guideUrl} className="bg-[#9B8AFB] hover:bg-[#8B7AFB] text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    Guide
                </Link>
                <a href={pkg.downloadUrl} download className="bg-text-base/6 hover:bg-text-base/10 text-text-base/70 hover:text-text-base text-[13px] font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
                    <FiDownload size={14} />
                    Download ZIP
                </a>
            </div>
        </div>
    );
}
