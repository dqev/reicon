import { Helmet } from 'react-helmet-async';
import { PAGE_META, FRAMEWORK_META, type PageMeta } from '@/data/page-meta';

interface Props {
  framework?: string;
}

export default function DocsHelmet({ framework }: Props) {
  const meta: PageMeta | undefined = framework
    ? FRAMEWORK_META[framework]
    : PAGE_META['/docs'];

  if (!meta) return null;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />
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
          { "@type": "ListItem", "position": 2, "name": "Docs", "item": "https://reicon.dev/docs" },
        ],
      })}</script>
    </Helmet>
  );
}
