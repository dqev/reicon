import { Helmet } from 'react-helmet-async';
import { PAGE_META } from '@/data/page-meta';

export default function FaqHelmet() {
  const meta = PAGE_META['/faq'];

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
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Reicon', 'item': 'https://reicon.dev' },
          { '@type': 'ListItem', 'position': 2, 'name': 'FAQ', 'item': 'https://reicon.dev/faq' },
        ],
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is Reicon?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Reicon is a free, open-source icon library built with obsessive precision. Every icon is pixel-perfect and handcrafted — no auto-generation.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Is Reicon free to use?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, Reicon is completely free and open-source under the MIT license. You can use it in personal and commercial projects.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Does Reicon work with React, Angular, Vue, Svelte, and Figma?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, Reicon icons are available as SVGs with first-class support for React, Angular 20+, React Native, Vue, Svelte, Figma, and other popular design and development tools. Install via npm with reicon-react, reicon-angular, reicon-react-native, reicon-vue, or reicon-svelte.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How many icons does Reicon have?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Reicon has over 2,700 handcrafted SVG icons, each available in two weights: Outline and Filled. New icons are added regularly.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How do I install Reicon?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Install via npm with \'npm install reicon\' for JavaScript projects, \'npm install reicon-react\' for React, \'npm install reicon-angular\' for Angular 20+, \'npm install reicon-react-native\' for React Native, or use the CDN script tag. Visit reicon.dev/docs for full installation instructions.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Is Reicon the same as ReIcon by Sordum?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No. Reicon (reicon.dev) is a free, open-source SVG icon library for designers and developers. ReIcon by Sordum.org is a completely different product — a Windows utility for restoring desktop icon layouts. They are unrelated.'
            }
          }
        ]
      })}</script>
    </Helmet>
  );
}
