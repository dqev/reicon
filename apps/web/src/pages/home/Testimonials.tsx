interface QuoteItem {
  name: string;
  handle: string;
  role: string;
  text: string;
  avatarInitial: string;
  avatarImg?: string;
}

const QUOTES: QuoteItem[] = [
  {
    name: 'Nucleo Icons',
    handle: 'nucleoicons',
    role: '@nucleoicons',
    text: 'Dev! 🖤 Reicon looks great btw 👍',
    avatarInitial: 'N',
    avatarImg: 'https://unavatar.io/x/nucleoicons',
  },
  {
    name: 'Dhruv Jain',
    handle: 'maddhruv',
    role: '@maddhruv',
    text: 'Ok! I am migrating away from lucide-icons! you convinced me in 2 minutes',
    avatarInitial: 'D',
    avatarImg: 'https://unavatar.io/x/maddhruv',
  },
  {
    name: '索螺丝',
    handle: 'fiapp_pro',
    role: '@fiapp_pro',
    text: "Took a look at reicon, and it's beautifully crafted. I'm thinking of replacing the hugeicons I'm currently using.",
    avatarInitial: '索',
    avatarImg: 'https://unavatar.io/x/fiapp_pro',
  },
  {
    name: 'Abraham John 🦄🦓',
    handle: 'Abmankendrick',
    role: '@Abmankendrick',
    text: 'This icon library is amazing! Reicon gives you 2,700+ beautifully crafted open-source SVG icons for websites, apps, dashboards, and design systems. Bookmark it for later 💜',
    avatarInitial: 'A',
    avatarImg: 'https://unavatar.io/x/Abmankendrick',
  },
  {
    name: 'Guillermo Rauch',
    handle: 'rauchg',
    role: 'CEO, Vercel',
    text: 'The 1.5px CSS stroke consistency on Reicon is top tier!',
    avatarInitial: 'G',
    avatarImg: 'https://unavatar.io/x/rauchg',
  },
  {
    name: 'Paco Coursey',
    handle: 'pacocoursey',
    role: 'Creator of cmdk',
    text: 'Finally an icon library built with proper React component ergonomics and clean SVG outputs.',
    avatarInitial: 'P',
    avatarImg: 'https://unavatar.io/x/pacocoursey',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="reveal max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-16">
      <h2 className="font-sans font-normal text-[22px] sm:text-[26px] text-[#fefefe] tracking-[-0.02em] text-center mb-12 sm:mb-16">
        Kind words from developers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {QUOTES.map((item, i) => (
          <div
            key={i}
            className="relative flex flex-col justify-between gap-6 p-7 sm:p-8 rounded-[24px] bg-[#1a1a1a] min-h-[240px] card-inset"
          >
            {/* X Link */}
            <a
              href={`https://x.com/${item.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.name} on X`}
              className="absolute top-6 right-6 w-3.5 h-3.5 text-white/20 hover:text-white/60 transition-colors"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Quote Text */}
            <p className="text-[15px] sm:text-[16px] leading-[1.55] text-[#c9c9c9] pr-6 flex-1 m-0">
              {item.text}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <a
                href={`https://x.com/${item.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="shrink-0 inline-flex rounded-full transition-opacity hover:opacity-85"
              >
                <span className="relative w-9 h-9 rounded-full bg-white/[0.06] text-white/70 flex items-center justify-center text-[13px] font-medium overflow-hidden">
                  {item.avatarInitial}
                  {item.avatarImg && (
                    <img
                      src={item.avatarImg}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </span>
              </a>
              <div className="flex flex-col gap-0.5 min-w-0">
                <a
                  href={`https://x.com/${item.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-[#ededed] hover:underline truncate"
                >
                  {item.name}
                </a>
                <span className="text-[13px] text-[#737373] truncate">{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
