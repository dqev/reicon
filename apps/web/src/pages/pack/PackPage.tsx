import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PAGE_META } from '@/data/page-meta';

/**
 * /pack — Icon Pack Builder placeholder page.
 * Linked from sitemap, prerender, and the navigation so it must be a real route.
 */
export default function PackPage() {
    return (
        <div>
            <Helmet>
                <title>{PAGE_META['/pack'].title}</title>
                <meta
                    name="description"
                    content={PAGE_META['/pack'].description}
                />
                <link rel="canonical" href={PAGE_META['/pack'].url} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={PAGE_META['/pack'].url} />
                <meta property="og:site_name" content="Reicon" />
                <meta property="og:title" content={PAGE_META['/pack'].title} />
                <meta
                    property="og:description"
                    content={PAGE_META['/pack'].description}
                />
                <meta property="og:image" content={PAGE_META['/pack'].ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@reicon_dev" />
                <meta name="twitter:title" content={PAGE_META['/pack'].title} />
                <meta
                    name="twitter:description"
                    content={PAGE_META['/pack'].description}
                />
                <meta name="twitter:image" content={PAGE_META['/pack'].ogImage} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Reicon', item: 'https://reicon.dev' },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Icon Pack',
                                item: 'https://reicon.dev/pack',
                            },
                        ],
                    })}
                </script>
            </Helmet>

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
                <div className="max-w-lg">
                    <re-icon icon="box" size="48" color="currentColor" className="text-[#9B8AFB] mb-6 block mx-auto" />
                    <h1 className="font-serif text-3xl md:text-4xl text-text-base mb-4">
                        Icon Pack Builder
                    </h1>
                    <p className="text-text-base/50 text-[15px] leading-[1.8] mb-8">
                        Custom icon pack export is coming soon. In the meantime, you can{' '}
                        <Link to="/icons" className="text-[#9B8AFB] hover:underline">
                            browse all icons
                        </Link>{' '}
                        and download individual SVGs from each icon's detail page.
                    </p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <Link
                            to="/icons"
                            className="bg-[#9B8AFB] hover:bg-[#8B7AFB] text-white text-[14px] font-medium px-6 py-2.5 rounded-full transition-colors"
                        >
                            Browse Icons
                        </Link>
                        <Link
                            to="/packages"
                            className="bg-text-base/6 hover:bg-text-base/10 border border-text-base/10 text-text-base/70 hover:text-text-base text-[14px] font-medium px-6 py-2.5 rounded-full transition-colors"
                        >
                            View Packages
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
