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
        <meta name="keywords" content="reicon packages, reicon-react, reicon-flutter, reicon-vue, reicon-svelte, SVG download, React icon library, Vue icons, Svelte icons" />
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

      <main className="flex-1 pt-28 px-6 pb-16 w-full overflow-x-hidden">
        <div className="max-w-[1160px] mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-serif text-text-base mb-12">Packages</h1>

          {/* Libraries & Frameworks */}
          <section className="mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-text-base/95 mb-8 flex items-center gap-4">
              <span>Libraries & Frameworks</span>
              <span className="h-[1px] flex-1 bg-text-base/10" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
              <SvgCard />
            </div>
          </section>

          {/* Developer Tools */}
          <section>
            <h2 className="text-xl md:text-2xl font-serif text-text-base/95 mb-8 flex items-center gap-4">
              <span>Developer Tools & Extensions</span>
              <span className="h-[1px] flex-1 bg-text-base/10" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOOLS.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}
