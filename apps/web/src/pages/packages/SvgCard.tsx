import { Link } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import { SVG_PACKAGE } from './data';

export default function SvgCard() {
  const pkg = SVG_PACKAGE;
  return (
    <div className="relative flex flex-col justify-between gap-5 p-7 sm:p-8 rounded-[24px] bg-[#1a1a1a] min-h-[260px] transition-all hover:bg-[#202020] card-inset">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link to={pkg.guideUrl} className="w-12 h-12 flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-200">
            {pkg.icon}
          </Link>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="chip" style={{ backgroundColor: 'rgba(66, 133, 244, 0.14)', color: '#4285F4' }}>SVG (.zip)</span>
            <span className="chip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.8)' }}>5,300+ SVGs</span>
          </div>
        </div>

        <h3 className="text-[#ededed] font-medium text-[18px] sm:text-[19px] tracking-[-0.01em] mb-2">
          <Link to={pkg.guideUrl} className="hover:underline">
            {pkg.name}
          </Link>
        </h3>

        <p className="text-[#c9c9c9] text-[14px] sm:text-[15px] leading-[1.6] m-0">
          {pkg.description}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2 flex-wrap">
        <Link
          to={pkg.guideUrl}
          className="bg-[#9B8AFB] hover:bg-[#8B78FA] text-white text-[13px] font-medium px-4 h-8.5 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center border-0"
        >
          Guide
        </Link>
        <a
          href={pkg.downloadUrl}
          download
          className="bg-white/[0.06] hover:bg-white/10 text-white/80 hover:text-white text-[13px] font-medium px-4 h-8.5 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer border-0"
        >
          <FiDownload size={13} />
          Download ZIP
        </a>
      </div>
    </div>
  );
}
