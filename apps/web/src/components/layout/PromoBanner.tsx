import { useState } from 'react';

const PROMO_URL = 'https://3dicons.reicon.dev/';

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="group fixed bottom-4 right-4 z-40 w-[250px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[24px] bg-[#1a1a1a] card-inset transition-colors duration-200 hover:bg-[#202020] sm:bottom-6 sm:right-6 sm:w-[290px]">
      <a
        href={PROMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Explore 3D Icons for designers and developers"
        className="block"
      >
        <div className="relative overflow-hidden bg-[#1a1a1a] transition-colors duration-200 group-hover:bg-[#202020]">
          <img
            src="/extra/3dicon-banner.png"
            alt="3D Icons for Designers and Developers"
            width={800}
            height={400}
            loading="lazy"
            style={{
              maskImage: 'linear-gradient(to bottom, #000 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 82%, transparent 100%)',
            }}
            className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent via-[#1a1a1a]/65 to-[#1a1a1a] backdrop-blur-[1px] transition-colors duration-200 group-hover:via-[#202020]/65 group-hover:to-[#202020]" />
        </div>

        <div className="flex items-center justify-between gap-3 p-3.5">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-[#ededed]">Explore 3D Icons</p>
            <p className="truncate text-[12px] text-[#737373]">3dicons.reicon.dev</p>
          </div>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#c9c9c9] transition-colors group-hover:bg-white/[0.1] group-hover:text-white">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.8">
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </a>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss 3D Icons promotion"
        className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="2">
          <path d="m7 7 10 10M17 7 7 17" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
