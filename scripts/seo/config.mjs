/**
 * seo-config.mjs — Single source of truth for all site-wide SEO content.
 *
 * Edit this file to update meta tags, descriptions, JSON-LD, and keywords
 * across the entire site. Then run: node scripts/update-seo.mjs
 */

export const SITE = 'https://reicon.dev';
export const OG_IMAGE = `${SITE}/og-image.png?v=4`;
export const TWITTER_HANDLE = '@reicon_dev';

// ── Site-wide defaults (used as fallbacks in index.html) ─────────────────────
export const SITE_DEFAULTS = {
  title: 'Reicon — Free Open-Source Icon Library for Designers & Developers',
  description: 'Reicon is a free, open-source icon library with 2,700+ handcrafted, pixel-perfect SVG icons. Available for React, React Native, Vue, Svelte, Figma, VS Code, and the web. MIT licensed.',
  keywords: 'free icon library, open source icons, SVG icons, UI icons, React icons, React Native icons, Vue icons, Svelte icons, Figma icons, VS Code icons, pixel perfect icons, handcrafted icons, reicon, MIT license',
  ogTitle: 'Reicon — Free Open-Source Icon Library',
  ogDescription: 'Free, open-source SVG icon library with 2,700+ handcrafted, pixel-perfect icons for React, React Native, Vue, Svelte, Figma, VS Code, and the web.',
};

// ── Per-route SEO definitions ─────────────────────────────────────────────────
export const ROUTES = [
  {
    path: '/',
    title: 'Reicon — Free Open-Source Icon Library for Designers & Developers',
    description: 'Reicon is a free, open-source icon library with 2,700+ handcrafted, pixel-perfect SVG icons. Available for React, React Native, Vue, Svelte, Figma, VS Code, and the web. MIT licensed.',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/icons',
    title: 'Browse 2700+ Free Icons — Reicon Icon Library',
    description: 'Browse and search 2,700+ free, open-source SVG icons. Filter by category and weight. Copy React, React Native, Vue, Svelte, or HTML code instantly.',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/usage',
    title: 'Usage Guide — Reicon | React, React Native, Vue, Svelte & CDN',
    description: 'Learn how to install and use Reicon icons in React, React Native, Vue, Svelte, and vanilla JavaScript. Props reference, TypeScript support, and code examples.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/usage/react',
    title: 'React Usage Guide — Reicon | React Icon Library',
    description: 'Install and use Reicon icons in React. Import components, customize props, tree-shake unused icons, and use with Tailwind CSS.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/usage/react-native',
    title: 'React Native Usage Guide — Reicon | React Native Icon Library',
    description: 'Install and use Reicon icons in React Native. Tree-shakeable SVG components via react-native-svg. Works with Expo and bare React Native.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/usage/vue',
    title: 'Vue Usage Guide — Reicon | Vue 3 Icon Library',
    description: 'Install and use Reicon icons in Vue 3 and Nuxt 3. Import components, customize props, and tree-shake unused icons.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/usage/svelte',
    title: 'Svelte Usage Guide — Reicon | Svelte Icon Library',
    description: 'Install and use Reicon icons in Svelte and SvelteKit. Import components and customize props.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/usage/vanilla',
    title: 'CDN / JavaScript Usage Guide — Reicon | Vanilla JS Icons',
    description: 'Use Reicon icons via CDN in vanilla JavaScript and HTML. No build tools needed.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/usage/figma',
    title: 'Figma Plugin Guide — Reicon | Drag & Drop Figma Icons',
    description: 'Install the Reicon Figma Plugin. Search, customize stroke weights, and drag-and-drop vector icons onto your canvas.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/usage/vscode',
    title: 'VS Code Extension Guide — Reicon | Sidebar Snippet Installer',
    description: 'Install the Reicon VS Code Extension. Search and insert React, Vue, Svelte, or raw SVG code directly at your cursor.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/usage/svg',
    title: 'Raw SVG Assets Guide — Reicon | Embed & Style SVG Files',
    description: 'Download and use raw Reicon SVG icons in HTML, static layouts, or CMS templates. Customize with CSS currentColor.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/packages',
    title: 'Packages & Integrations — Reicon | React, React Native, Vue, Svelte',
    description: 'Install official Reicon packages for React, React Native, Vue, Svelte, and JavaScript. Plus Figma plugin and VS Code extension.',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/pack',
    title: 'Icon Pack Builder — Reicon | Custom Icon Packs',
    description: 'Select and export custom icon packs. Download as SVG, PNG, or WebP ZIP files.',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions — Reicon | Free Open-Source Icons',
    description: 'Answers about Reicon: license, React/React Native/Vue/Svelte support, Figma integration, icon requests, and contribution guidelines.',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/terms',
    title: 'Terms of Service — Reicon',
    description: 'Terms of service for using Reicon, the free open-source icon library.',
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — Reicon',
    description: 'Privacy policy for Reicon. Learn how we handle your data.',
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/license',
    title: 'License — Reicon | MIT License',
    description: 'Reicon is free and open-source under the MIT license. Use in personal and commercial projects.',
    priority: '0.3',
    changefreq: 'yearly',
  },
];

// ── Site-wide JSON-LD (injected into index.html) ──────────────────────────────
export const GLOBAL_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Reicon',
    'alternateName': ['Reicon Icons', 'Reicon Icon Library'],
    'url': SITE,
    'description': 'Reicon is a free, open-source SVG icon library for designers and developers. Pixel-perfect, handcrafted icons for React, React Native, Vue, Svelte, Figma, and the web.',
    'disambiguatingDescription': 'Reicon (reicon.dev) is an open-source SVG icon library for web designers and developers. It is not the Windows desktop icon restore utility ReIcon by Sordum.org.',
    'applicationCategory': 'DesignApplication',
    'applicationSubCategory': 'Icon Library',
    'operatingSystem': 'Web',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'license': 'https://opensource.org/licenses/MIT',
    'creator': { '@type': 'Person', 'name': 'Dev Chauhan', 'url': 'https://devchauhan.in' },
    'sameAs': ['https://github.com/dqev/reicon', 'https://github.com/reicon-dev'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Reicon',
    'url': SITE,
    'logo': `${SITE}/favicon/apple-touch-icon.png`,
    'description': 'Free, open-source SVG icon library built with obsessive precision.',
    'contactPoint': { '@type': 'ContactPoint', 'email': 'hello@reicon.dev', 'contactType': 'customer support' },
    'sameAs': ['https://github.com/dqev/reicon', 'https://github.com/reicon-dev'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Reicon',
    'alternateName': ['Reicon Icons', 'Reicon Icon Library'],
    'url': SITE,
    'description': 'Free, open-source SVG icon library for designers and developers.',
    'inLanguage': 'en-US',
    'publisher': { '@type': 'Organization', 'name': 'Reicon', 'url': SITE },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': { '@type': 'EntryPoint', 'urlTemplate': `${SITE}/icons?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is Reicon?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Reicon is a free, open-source SVG icon library with 2,700+ handcrafted, pixel-perfect icons in Outline and Filled weights.' },
      },
      {
        '@type': 'Question',
        'name': 'Is Reicon free to use?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, fully free and open-source under the MIT license. Use in personal and commercial projects.' },
      },
      {
        '@type': 'Question',
        'name': 'Does Reicon work with React, React Native, Vue, and Svelte?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Install reicon-react for React, reicon-react-native for React Native, reicon-vue for Vue 3, or reicon-svelte for Svelte.' },
      },
      {
        '@type': 'Question',
        'name': 'How do I install Reicon?',
        'acceptedAnswer': { '@type': 'Answer', 'text': "Run 'npm install reicon-react' for React, 'npm install reicon-react-native' for React Native, or use the CDN. See reicon.dev/usage for full instructions." },
      },
      {
        '@type': 'Question',
        'name': 'Is Reicon the same as ReIcon by Sordum?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'No. Reicon (reicon.dev) is an open-source SVG icon library. ReIcon by Sordum.org is a Windows desktop utility. They are completely unrelated.' },
      },
    ],
  },
];

// ── Sitemap volatile routes (get today's date on every build) ─────────────────
export const VOLATILE_ROUTES = new Set([
  '/', '/icons', '/usage', '/usage/react', '/usage/react-native',
  '/usage/vue', '/usage/svelte', '/usage/vanilla', '/usage/figma',
  '/usage/vscode', '/usage/svg', '/packages', '/pack',
]);
