/**
 * seo-config.mjs — Single source of truth for all site-wide SEO content.
 *
 * Edit this file to update meta tags, descriptions, JSON-LD, and keywords
 * across the entire site. Then run: node scripts/update-seo.mjs
 */

export const SITE = 'https://reicon.dev';
export const TWITTER_HANDLE = '@reicon_dev';

// OG image URL helper: path → https://reicon.dev/og/{file}
function og(filename) {
  return `${SITE}/og/${filename}`;
}

// ── Site-wide defaults (used as fallbacks in index.html) ─────────────────────
export const SITE_DEFAULTS = {
  title: 'Reicon',
  description: 'Open-Source Icon Library for Designers & Developers',
  keywords: 'free icon library, open source icons, SVG icons, UI icons, React icons, Vue icons, Figma icons, reicon, MIT license',
  ogTitle: 'Reicon',
  ogDescription: 'Open-Source Icon Library for Designers & Developers',
  ogImage: og('og.jpg'),
};

// ── Per-route SEO definitions ─────────────────────────────────────────────────
export const ROUTES = [
  {
    path: '/',
    title: 'Reicon',
    description: 'Open-Source Icon Library for Designers & Developers',
    ogImage: og('og.jpg'),
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/icons',
    title: 'Free Open-Source SVG Icons — Reicon',
    description: 'Browse 3,900+ free, open-source SVG icons in Outline, Filled, and Duotone weights. MIT licensed.',
    ogImage: og('icons.jpeg'),
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/illustration',
    title: '71,000+ Free SVG Illustrations — Open-Source Vector Graphics | Reicon',
    description: 'Browse 71,000+ free open-source SVG vector illustrations for React, Vue, HTML, and Figma. Download high-resolution PNG & customizable SVGs. MIT licensed.',
    ogImage: og('illustration.jpg'),
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/logos',
    title: '4,900+ Free SVG Brand Logos — High Quality Vector Logos | Reicon',
    description: 'Browse and download 4,900+ clean vector brand logos for tech companies, frameworks, AI, and global brands. Free SVG & PNG formats. MIT licensed.',
    ogImage: og('logos.jpeg'),
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/docs',
    title: 'Reicon Docs — Get Started',
    description: 'Get started with Reicon. Install and use icons in React, Vue, Svelte, Flutter, Figma, VS Code, and MCP.',
    ogImage: og('docs.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/react',
    title: 'Reicon for React — Reicon',
    description: 'Install and use Reicon in React. Import components, customize props, tree-shake unused icons.',
    ogImage: og('docs-react.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/react-native',
    title: 'Reicon for React Native — Reicon',
    description: 'Install and use Reicon in React Native. SVG components for Expo and bare React Native.',
    ogImage: og('docs-react-native.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/vue',
    title: 'Reicon for Vue — Reicon',
    description: 'Install and use Reicon in Vue 3 and Nuxt 3. Import components and customize props.',
    ogImage: og('docs-vue.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/svelte',
    title: 'Reicon for Svelte — Reicon',
    description: 'Install and use Reicon in Svelte and SvelteKit. Import components and customize props.',
    ogImage: og('docs-svelte.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/vanilla',
    title: 'Reicon for Vanilla JS — Reicon',
    description: 'Use Reicon icons via CDN in vanilla JavaScript and HTML. No build tools needed.',
    ogImage: og('docs-vanilla.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/figma',
    title: 'Reicon for Figma — Reicon',
    description: 'Install the Reicon Figma plugin. Search, customize, and drag-and-drop icons onto your canvas.',
    ogImage: og('docs-figma.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/vscode',
    title: 'Reicon for VS Code — Reicon',
    description: 'Install the Reicon VS Code extension. Search and insert icon code directly at your cursor.',
    ogImage: og('docs-vscode.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/mcp',
    title: 'Reicon MCP Server & CLI — Reicon',
    description: 'Let AI agents search 2,700+ icons, preview SVGs, and generate code. Runs as MCP server or standalone CLI.',
    ogImage: og('docs-mcp.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/svg',
    title: 'Reicon Raw SVGs — Reicon',
    description: 'Download and use raw Reicon SVG icons in HTML, static layouts, or CMS templates.',
    ogImage: og('docs.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/docs/flutter',
    title: 'Reicon for Flutter — Reicon',
    description: 'Install and use Reicon in Flutter and Dart projects. 2,700+ icons as raw SVG path strings.',
    ogImage: og('docs-flutter.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/packages',
    title: 'Reicon Packages — Reicon',
    description: 'Official Reicon packages for React, React Native, Vue, Svelte, Flutter, and JavaScript.',
    ogImage: og('packages.jpg'),
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/pack',
    title: 'Reicon Pack Builder — Reicon',
    description: 'Select and export custom icon packs. Download as SVG, PNG, or WebP ZIP files.',
    ogImage: og('pack.jpg'),
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/faq',
    title: 'Reicon FAQ — Reicon',
    description: 'Answers about Reicon: license, framework support, Figma integration, and contributions.',
    ogImage: og('faq.jpg'),
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/support',
    title: 'Support Reicon — Buy Me a Coffee',
    description: 'Support ongoing open-source development of Reicon. Buy us a coffee to keep 2,700+ handcrafted SVG icons free for everyone.',
    ogImage: og('support.jpg'),
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/terms',
    title: 'Reicon Terms of Service — Reicon',
    description: 'Terms of service for using the Reicon open-source icon library.',
    ogImage: og('terms.jpg'),
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/privacy',
    title: 'Reicon Privacy Policy — Reicon',
    description: 'Privacy policy for Reicon. Learn how we handle your data.',
    ogImage: og('privacy.jpg'),
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/license',
    title: 'Reicon MIT License — Reicon',
    description: 'Reicon is free and open-source under the MIT license. Use in personal and commercial projects.',
    ogImage: og('license.jpg'),
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
    'alternateName': ['Reicon Icons', 'Reicon Icon Library', 'reicon-mcp'],
    'url': SITE,
    'description': 'Reicon is a free, open-source SVG icon library for designers and developers. Pixel-perfect, handcrafted icons for React, React Native, Vue, Svelte, Flutter, Figma, and the web. Includes an MCP server and CLI for AI agent icon search and codegen.',
    'disambiguatingDescription': 'Reicon (reicon.dev) is an open-source SVG icon library for web designers and developers. It is not the Windows desktop icon restore utility ReIcon by Sordum.org.',
    'applicationCategory': 'DesignApplication',
    'applicationSubCategory': 'Icon Library',
    'operatingSystem': 'Web, Node.js',
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
        'acceptedAnswer': { '@type': 'Answer', 'text': "Run 'npm install reicon-react' for React, 'npm install reicon-react-native' for React Native, or use the CDN. See reicon.dev/docs for full instructions." },
      },
      {
        '@type': 'Question',
        'name': 'Does Reicon have an MCP server or CLI?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. reicon-mcp is a Model Context Protocol server and CLI that lets AI agents search 2,700+ icons, preview SVGs, and generate React, React Native, Vue, Svelte, or HTML code. Run it with: npx reicon-mcp. See reicon.dev/docs/mcp.' },
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
  '/', '/icons', '/logos', '/illustration', '/docs', '/docs/react', '/docs/react-native',
  '/docs/vue', '/docs/svelte', '/docs/vanilla', '/docs/figma',
  '/docs/vscode', '/docs/mcp', '/docs/svg', '/docs/flutter',
  '/packages', '/pack',
]);
