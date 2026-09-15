import { Link } from 'react-router-dom';
import { PackageItem } from './data';

export default function PackageCard({ pkg }: { pkg: PackageItem }) {
    return (
        <div className="bg-text-base/3 rounded-2xl p-6 flex flex-col transition-all hover:bg-text-base/4">
            <Link to={pkg.guideUrl} className="w-16 h-16 flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-200">
                {pkg.icon}
            </Link>
            <h3 className="text-text-base font-semibold text-lg mb-2">{pkg.name}</h3>
            <div className="flex items-center gap-2 flex-wrap mb-4">
                <img src={`https://img.shields.io/npm/v/${pkg.npmPkg}?color=9B8AFB`} alt={`${pkg.name} version`} loading="lazy" className="h-5" />
                <img src={`https://img.shields.io/npm/dm/${pkg.npmPkg}?color=9B8AFB`} alt={`${pkg.name} downloads`} loading="lazy" className="h-5" />
            </div>
            <p className="text-text-base/50 text-[14px] leading-relaxed mb-6 flex-1">{pkg.description}</p>
            <div className="flex items-center gap-2">
                <Link to={pkg.guideUrl} className="bg-[#9B8AFB] hover:bg-[#8B7AFB] text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    Guide
                </Link>
                <a href={pkg.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-text-base/6 hover:bg-text-base/10 text-text-base/70 hover:text-text-base text-[13px] font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    Source
                </a>
                <a href={pkg.npmUrl} target="_blank" rel="noopener noreferrer" className="bg-text-base/6 hover:bg-text-base/10 text-text-base/70 hover:text-text-base text-[13px] font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    npm
                </a>
            </div>
        </div>
    );
}
