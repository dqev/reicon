import { Link } from 'react-router-dom';

interface SponsorItem {
  name: string;
  url: string;
  role: string;
  description: string;
  tier?: 'gold' | 'silver';
  logo: React.ReactNode;
}

const SPONSORS: SponsorItem[] = [
  {
    name: 'Ui Goodies',
    url: 'https://uigoodies.com/?utm_source=reicon',
    role: 'uigoodies.com',
    description:
      'The best curated resources and tools for UI & UX designers, creators, and developers. Discover top UI kits, icons, tools, mockups, and typography.',
    tier: 'gold',
    logo: (
      <svg viewBox="0 0 83 110" className="w-5 h-5 fill-[#FF7139]" aria-hidden="true">
        <path
          d="M63.408 60.7466V103.794L40.7583 91.8417L18.1162 103.794V60.0642C29.15 70.1413 41.1395 76.6153 41.1395 76.6153C41.1395 76.6153 52.5893 70.433 63.408 60.7466Z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path d="M41.14 69.8248C41.14 69.8248 0 47.6066 0 21.423C0 15.7412 2.25138 10.2937 6.25706 6.27631C10.2627 2.2593 15.697 0 21.363 0C30.2976 0 37.95 4.88283 41.14 12.6941C44.3301 4.88283 51.9821 0 60.917 0C66.5834 0 72.0173 2.25553 76.023 6.27631C80.0287 10.2937 82.28 15.7412 82.28 21.423C82.28 47.6066 41.14 69.8248 41.14 69.8248Z" />
      </svg>
    ),
  },
  {
    name: 'beUI Pro',
    url: 'https://beui.dev/?utm_source=reicon',
    role: 'beui.dev',
    description:
      'Premium animated blocks, screens, and templates for React, Next.js, and React Native, with live previews and source code you own.',
    tier: 'silver',
    logo: (
      <img
        src="/ui/beui-logo.svg"
        alt="beUI Pro logo"
        className="h-full max-w-none object-cover object-left rounded-full"
      />
    ),
  },
  {
    name: 'Motion Video',
    url: 'https://motionvideo.xyz/',
    role: 'motionvideo.xyz',
    description:
      'AI-powered motion design platform and directory showcasing curated motion videos, creative-code examples, showreels, and agent skills.',
    logo: (
      <img
        src="/ui/motionvideo.svg"
        alt="Motion Video logo"
        className="absolute inset-0 w-full h-full object-cover rounded-full"
      />
    ),
  },
];

export default function SponsoredBy() {
  return (
    <section id="sponsors" className="reveal max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
      <h2 className="font-sans font-normal text-[22px] sm:text-[26px] text-[#fefefe] tracking-[-0.02em] text-center mb-8 sm:mb-10 md:mb-12">
        Sponsored by
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] max-w-[1120px] mx-auto">
        {SPONSORS.map((sponsor, i) => (
          <div
            key={i}
            className={`relative flex flex-col justify-between gap-6 p-7 sm:p-8 rounded-[24px] bg-[#1a1a1a] min-h-[240px] transition-all duration-200 ${
              sponsor.tier === 'gold'
                ? 'border border-[#d4af37]/50 hover:border-[#d4af37]/75'
                : sponsor.tier === 'silver'
                  ? 'border border-[#c0c0c0]/45 hover:border-[#c0c0c0]/75'
                  : 'card-inset hover:bg-[#1e1e1e]'
            }`}
          >
            {/* External Website Link */}
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${sponsor.name}`}
              className={`absolute top-6 right-6 w-3.5 h-3.5 transition-colors ${
                sponsor.tier === 'gold'
                  ? 'text-[#d4af37]/60 hover:text-[#d4af37]'
                  : sponsor.tier === 'silver'
                    ? 'text-[#c0c0c0]/70 hover:text-[#e0e0e0]'
                    : 'text-white/20 hover:text-white/60'
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-full h-full"
              >
                <path d="M7 17L17 7H7M17 7V17" />
              </svg>
            </a>

            {/* Description Text */}
            <p className="text-[15px] sm:text-[16px] leading-[1.55] text-[#c9c9c9] pr-6 flex-1 m-0">
              {sponsor.description}
            </p>

            {/* Sponsor Info Row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  className="shrink-0 inline-flex rounded-full transition-opacity hover:opacity-85"
                >
                  <span
                    className={`relative w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium overflow-hidden shrink-0 ${
                      sponsor.tier === 'gold'
                        ? 'bg-white shadow-sm ring-1 ring-[#d4af37]/40'
                        : sponsor.tier === 'silver'
                          ? 'bg-white/[0.08] shadow-sm ring-1 ring-[#c0c0c0]/40'
                          : 'bg-white/[0.06] text-white/70'
                    }`}
                  >
                    {sponsor.logo}
                  </span>
                </a>

                <div className="flex flex-col gap-0.5 min-w-0">
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-[#ededed] hover:underline truncate"
                  >
                    {sponsor.name}
                  </a>
                  <span className="text-[13px] text-[#737373] truncate">{sponsor.role}</span>
                </div>
              </div>

              {/* Tier Pill */}
              {sponsor.tier === 'gold' && (
                <span className="inline-flex items-center justify-center h-7 px-3 rounded-full bg-[rgba(245,166,35,0.18)] text-[#F5A623] text-[12px] font-medium shrink-0 border-0 select-none">
                  Gold Sponsor
                </span>
              )}
              {sponsor.tier === 'silver' && (
                <span className="inline-flex items-center justify-center h-7 px-3 rounded-full bg-[rgba(226,232,240,0.16)] text-[#E2E8F0] text-[12px] font-medium shrink-0 border-0 select-none">
                  Silver Sponsor
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Become a Sponsor Call-to-action */}
      <div className="mt-8 sm:mt-10 flex items-center justify-center">
        <Link
          to="/support"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#8f8f8f] hover:text-[#ededed] transition-colors"
        >
          <span>Interested in sponsoring?</span>
          <span className="text-[#9B8AFB] font-medium hover:underline inline-flex items-center gap-1">
            Become a sponsor
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
