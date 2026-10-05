import { Helmet } from 'react-helmet-async';
import { PAGE_META } from '@/data/page-meta';
import PackageCard from './PackageCard';
import SvgCard from './SvgCard';
import ToolCard from './ToolCard';
import { PACKAGES, TOOLS } from './data';

export default function PackagesPage() {
  return (
    <div className="flex-1">
      <Helmet>
        <title>{PAGE_META['/packages'].title}</title>
        <meta name="description" content={PAGE_META['/packages'].description} />
        <link rel="canonical" href={PAGE_META['/packages'].url} />
        <meta name="keywords" content="reicon packages, reicon-react, reicon-flutter, reicon-compose, reicon-vue, reicon-svelte, SVG download, React icon library, Vue icons, Svelte icons" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_META['/packages'].url} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content={PAGE_META['/packages'].title} />
        <meta property="og:description" content={PAGE_META['/packages'].description} />
        <meta property="og:image" content={PAGE_META['/packages'].ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content={PAGE_META['/packages'].title} />
        <meta name="twitter:description" content={PAGE_META['/packages'].description} />
        <meta name="twitter:image" content={PAGE_META['/packages'].ogImage} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Reicon', 'item': 'https://reicon.dev' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Packages', 'item': 'https://reicon.dev/packages' },
          ],
        })}</script>
      </Helmet>

      <main className="max-w-[1160px] mx-auto w-full flex flex-col flex-1 px-4 sm:px-6 md:px-10 py-12 md:py-16">
        <div className="w-full">
          {/* Main Title */}
          <h1 className="font-sans font-normal text-[22px] sm:text-[26px] text-[#fefefe] tracking-[-0.02em] text-center mb-12 sm:mb-16">
            Packages
          </h1>

          {/* Libraries & Frameworks */}
          <section className="mb-14 md:mb-18">
            <h2 className="font-sans font-normal text-[18px] sm:text-[20px] text-[#fefefe] tracking-[-0.02em] mb-8 flex items-center gap-4">
              <span>Libraries &amp; Frameworks</span>
              <span className="h-[1px] flex-1 bg-white/[0.06]" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
              {PACKAGES.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
            </div>
          </section>

          {/* Developer Tools */}
          <section>
            <h2 className="font-sans font-normal text-[18px] sm:text-[20px] text-[#fefefe] tracking-[-0.02em] mb-8 flex items-center gap-4">
              <span>Developer Tools &amp; Extensions</span>
              <span className="h-[1px] flex-1 bg-white/[0.06]" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
              {TOOLS.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
              <SvgCard />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
