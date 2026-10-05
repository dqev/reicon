import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { PAGE_META } from '@/data/page-meta';

export default function IconsHelmet() {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || PAGE_META['/icons'];

  const breadcrumbsName =
    pathname === '/glass'
      ? 'Glass Icons'
      : pathname === '/flags'
      ? 'Country Flags'
      : pathname === '/brands'
      ? 'Brands & Social Media'
      : 'Icons';

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />
      <meta name="keywords" content="free icons, SVG icons, icon library, browse icons, glass icons, flag icons, brand logos, reicon" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:site_name" content="Reicon" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@reicon_dev" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.ogImage} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
          { "@type": "ListItem", "position": 2, "name": breadcrumbsName, "item": meta.url }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": meta.title,
        "description": meta.description,
        "url": meta.url,
        "isPartOf": { "@type": "WebSite", "name": "Reicon", "url": "https://reicon.dev" }
      })}</script>
    </Helmet>
  );
}
