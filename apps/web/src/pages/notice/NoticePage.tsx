import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PAGE_META } from '@/data/page-meta';
import ClayButton from '@/components/ui/Button';

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

      <main className="max-w-[820px] mx-auto w-full flex flex-1 flex-col px-5 md:px-10 pt-10 md:pt-16 pb-20 overflow-x-hidden">
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
