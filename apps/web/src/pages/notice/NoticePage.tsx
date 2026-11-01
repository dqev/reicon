import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PAGE_META } from '@/data/page-meta';
import ClayButton from '@/components/ui/Button';

const SEARCH_STATS = [
  { label: 'Clicks', value: '5.45k' },
  { label: 'Impressions', value: '94.7k' },
  { label: 'Average CTR', value: '5.8%' },
  { label: 'Average position', value: '17.9' },
];

const ANALYTICS_STATS = [
  { label: 'Total users', value: '2.9k' },
  { label: 'Active users', value: '2.9k' },
  { label: 'Event count', value: '35k' },
  { label: 'Busiest day', value: '1.7k' },
];

function PerformanceFigure({
  label,
  period,
  src,
  alt,
  width,
  height,
  stats,
}: {
  label: string;
  period: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  stats: { label: string; value: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <figure className="overflow-hidden rounded-[24px] bg-[#1a1a1a] card-inset">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-white/[0.06] px-5 py-4 sm:px-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#767676]">{label}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#5e5e5e]">{period}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`View ${label} chart full screen`}
          className="block w-full cursor-zoom-in border-0 bg-white p-0"
        >
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto"
          />
        </button>
        <figcaption className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#1a1a1a] px-5 py-4 sm:px-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#767676]">{stat.label}</div>
              <div className="mt-1.5 font-display text-[20px] font-medium leading-none tracking-[-0.01em] text-[#ededed]">
                {stat.value}
              </div>
            </div>
          ))}
        </figcaption>
      </figure>

      {isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${label} chart full screen`}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] p-4 sm:p-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close full screen chart"
              className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.08] text-[#ededed] transition-colors hover:bg-white/[0.16] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[80vh] max-w-[92vw] h-auto w-auto object-contain"
            />
          </div>,
          document.body,
        )}
    </>
  );
}

export default function NoticePage() {
  return (
    <div>
      <Helmet>
        <title>{PAGE_META['/notice'].title}</title>
        <meta name="description" content={PAGE_META['/notice'].description} />
        <link rel="canonical" href={PAGE_META['/notice'].url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_META['/notice'].url} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content={PAGE_META['/notice'].title} />
        <meta property="og:description" content={PAGE_META['/notice'].description} />
        <meta property="og:image" content={PAGE_META['/notice'].ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content={PAGE_META['/notice'].title} />
        <meta name="twitter:description" content={PAGE_META['/notice'].description} />
        <meta name="twitter:image" content={PAGE_META['/notice'].ogImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Notice", "item": "https://reicon.dev/notice" }
          ]
        })}</script>
      </Helmet>

      <main className="max-w-[1080px] mx-auto w-full flex flex-1 flex-col px-5 md:px-10 pt-10 md:pt-16 pb-20 overflow-x-hidden">
        <article className="max-w-[680px] mx-auto w-full">

          <h1 className="font-display text-[32px] sm:text-[46px] leading-[1.05] tracking-[-0.03em] text-[#fefefe] mb-5">
            Reicon may shut down.
          </h1>

          <p className="max-w-[560px] text-[15px] sm:text-[16px] leading-[1.7] text-[#9e9e9e]">
            If Reicon does not find support to cover its domain and running costs in the next one or two months, I
            will shut it down.
          </p>

          <div className="mt-8 flex items-center gap-3 border-y border-[#262626] py-3">
            <img
              src="/dev.jpeg"
              alt="Dev Chauhan"
              width="40"
              height="40"
              className="h-10 w-10 shrink-0 rounded-full bg-[#e9e9e9] object-cover ring-1 ring-white/10"
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[13px] text-[#ededed]">Dev Chauhan</span>
              <span className="h-3 w-px bg-[#262626]" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#767676]">
                Founder and maintainer
              </span>
            </div>
          </div>

          <div className="mt-10 space-y-10">
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#767676] mb-3">
                Where things stand
              </h2>
              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.8] text-[#b5b5b5]">
                <p>
                  I have been working on Reicon for around five or six months now. Nobody has supported it yet. Every
                  bill, the domain, hosting and the hours I put into icons, packages and docs, has come out of my own
                  pocket.
                </p>
                <p>
                  I did not build this to make money. I built it because I wanted a good icon library that anyone
                  could use for free. I still want that. The problem is that free for users is not free to run.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#767676] mb-3">
                What the numbers look like
              </h2>
              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.8] text-[#b5b5b5]">
                <p>
                  Reicon is small, but it is not unused. These are the real numbers from Google Analytics and Google
                  Search Console, not estimates.
                </p>
                <p>
                  In the last seven days, 2.9k people used the site and generated 35k events. In Google Search over the
                  last three months, Reicon appeared 94.7k times, received 5.45k clicks and held a 5.8% click-through
                  rate. The average position of 17.9 means most of that traffic still lands on the second page of
                  results, so there is room to grow if the project continues.
                </p>
              </div>

              <div className="mt-6 space-y-4 lg:relative lg:left-1/2 lg:w-[min(1000px,calc(100vw-80px))] lg:-translate-x-1/2">
                <PerformanceFigure
                  label="Google Search Console"
                  period="31 Jul - 27 Oct 2026"
                  src="/readme-assets/search.webp"
                  alt="Google Search Console performance chart. Total clicks 5.45k, total impressions 94.7k, average CTR 5.8%, average position 17.9. Daily clicks and impressions from 31 July to 27 October 2026."
                  width={2656}
                  height={1210}
                  stats={SEARCH_STATS}
                />
                <PerformanceFigure
                  label="Google Analytics"
                  period="25 - 31 Oct 2026"
                  src="/readme-assets/analytics.webp"
                  alt="Google Analytics report for the last seven days. Total users 2.9k, active users 2.9k, event count 35k and zero key events, with a peak of about 1.7k users on 26 October."
                  width={1634}
                  height={858}
                  stats={ANALYTICS_STATS}
                />
              </div>
            </section>

            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#767676] mb-3">
                What happens if nothing changes
              </h2>
              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.8] text-[#b5b5b5]">
                <p>
                  The domain is paid only for another one or two months. If nobody comes forward to cover that and
                  the basic running costs, I will let Reicon shut down when the current domain period ends.
                </p>
                <p>
                  The website, CDN and docs will go offline. The npm packages that are already published will stay
                  up because they are MIT licensed, so you can keep using the versions you have installed. But there
                  will be no new icons, fixes or framework support from me.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#767676] mb-3">
                What support would change
              </h2>
              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.8] text-[#b5b5b5]">
                <p>
                  I am not looking for a big sponsor. I need enough to cover the domain and the basic costs of
                  keeping the site and packages online. If that happens, Reicon stays online and I keep working on it.
                </p>
                <p>
                  Depending on the support, I can keep adding icons, fixing bugs, updating the packages and adding
                  support for new frameworks. I cannot promise a full roadmap right now. I can promise that the work
                  will continue if the costs are covered.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#767676] mb-3">
                Why I am not making it paid
              </h2>
              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.8] text-[#b5b5b5]">
                <p>
                  Some people asked why I do not just put Reicon behind a paywall. I thought about it. But the icons
                  are already MIT licensed and out in the open. Taking the same work and charging for it now would not
                  feel right.
                </p>
                <p>
                  I would rather keep this free and start something new that is paid from day one.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#767676] mb-3">
                What comes next
              </h2>
              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.8] text-[#b5b5b5]">
                <p>
                  I will be back with another project soon. It will be paid, with a clear price and a clear reason to
                  pay. I want to work on something I can maintain without worrying every month about whether I can
                  keep it online, and I want to enjoy building again.
                </p>
                <p>
                  That is the honest reason. I want to keep building, and I want the next project to give users a
                  better experience.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#767676] mb-3">
                Thank you
              </h2>
              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.8] text-[#b5b5b5]">
                <p>I know this is not the news anyone wanted. I am sorry.</p>
                <p>
                  Thank you to everyone who used the icons, opened an issue, sent feedback or shared the project.
                  Even if Reicon stops, the icons are still yours under MIT. You can keep using them.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-14 border-t border-[#262626] pt-8">
            <h2 className="font-display text-[20px] text-[#fefefe] mb-3">Can you help keep it online?</h2>
            <p className="text-[15px] leading-[1.8] text-[#9e9e9e]">
              If you or your company can cover the domain and running costs, or if you want to talk about another
              kind of support, email me at{' '}
              <a href="mailto:hello@reicon.dev" className="text-[#c8bdff] hover:text-white transition-colors">
                hello@reicon.dev
              </a>
              . If you cannot support it yourself, sharing this notice with someone who can also helps.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ClayButton to="/support" variant="secondary">
                Support Reicon
              </ClayButton>
              <ClayButton href="mailto:hello@reicon.dev" variant="primary">
                Email me
              </ClayButton>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
