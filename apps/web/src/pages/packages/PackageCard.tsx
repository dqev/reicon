import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PackageItem } from './data';

function PackageVersionChip({ npmPkg, fallback }: { npmPkg?: string; fallback: string }) {
  const [version, setVersion] = useState<string>(fallback);

  useEffect(() => {
    if (!npmPkg || npmPkg.includes('_')) return;
    let isMounted = true;
    fetch(`https://registry.npmjs.org/${npmPkg}/latest`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Registry request failed');
      })
      .then((data) => {
        if (isMounted && data && data.version) {
          setVersion(`v${data.version}`);
        }
      })
      .catch(() => {
        // Fallback to exact monorepo version
      });

    return () => {
      isMounted = false;
    };
  }, [npmPkg]);

  return (
    <span className="chip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.8)' }}>
      {version}
    </span>
  );
}

export default function PackageCard({ pkg }: { pkg: PackageItem }) {
  return (
    <div className="relative flex flex-col justify-between gap-5 p-7 sm:p-8 rounded-[24px] bg-[#1a1a1a] min-h-[260px] transition-all hover:bg-[#202020] card-inset">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link to={pkg.guideUrl} className="w-12 h-12 flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-200">
            {pkg.icon}
          </Link>
          <div className="flex items-center gap-1.5 flex-wrap">
            {pkg.badge && (
              <span
                className="chip"
                style={{
                  backgroundColor: `${pkg.badge.color}24`,
                  color: pkg.badge.color,
                }}
              >
                {pkg.badge.label}
              </span>
            )}
            <PackageVersionChip npmPkg={pkg.npmPkg} fallback={pkg.version} />
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
          href={pkg.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/[0.06] hover:bg-white/10 text-white/80 hover:text-white text-[13px] font-medium px-4 h-8.5 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center border-0"
        >
          Source
        </a>
        {pkg.npmUrl && (
          <a
            href={pkg.npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/[0.06] hover:bg-white/10 text-white/80 hover:text-white text-[13px] font-medium px-4 h-8.5 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center border-0"
          >
            {pkg.registryLabel ?? 'npm'}
          </a>
        )}
      </div>
    </div>
  );
}
