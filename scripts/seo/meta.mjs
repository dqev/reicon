export const SITE = 'https://reicon.dev';
export const SITE_DEFAULTS = {
  ogImage: `${SITE}/og/og.jpg`,
};

export function buildMeta({ title, desc, url, ogImage = SITE_DEFAULTS.ogImage, ogImageAlt, keywords, jsonLd, breadcrumb, isIconPage = false }) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const t = esc(title);
  const d = esc(desc);
  const lds = [...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []), ...(breadcrumb ? [breadcrumb] : [])];

  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    keywords ? `<meta name="keywords" content="${esc(keywords)}" />` : '',
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta property="og:type" content="${isIconPage ? 'article' : 'website'}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:site_name" content="Reicon" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    ogImage ? `<meta property="og:image" content="${esc(ogImage)}" />` : '',
    ogImage ? `<meta property="og:image:width" content="1200" />` : '',
    ogImage ? `<meta property="og:image:height" content="630" />` : '',
    ogImage && ogImageAlt ? `<meta property="og:image:alt" content="${esc(ogImageAlt)}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@reicon_dev" />`,
    `<meta name="twitter:creator" content="@reicon_dev" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}" />` : '',
    ogImage && ogImageAlt ? `<meta name="twitter:image:alt" content="${esc(ogImageAlt)}" />` : '',
    ...lds.map((ld) => `<script type="application/ld+json">${JSON.stringify(ld)}</script>`),
  ].filter(Boolean).join('\n    ');
}

export function injectMeta(baseHtml, metaTags) {
  let html = baseHtml;
  html = html.replace(/<title>[^<]*<\/title>/, '');
  html = html.replace(/<link rel="canonical"[^>]*\/?>\n?/g, '');
  html = html.replace(/<meta name="description"[\s\S]*?\/>\n?/g, '');
  html = html.replace(/<meta name="keywords"[\s\S]*?\/>\n?/g, '');
  html = html.replace(/<meta property="og:[\s\S]*?\/>\n?/g, '');
  html = html.replace(/<meta name="twitter:[\s\S]*?\/>\n?/g, '');
  return html.replace('</head>', `    ${metaTags}\n  </head>`);
}

export function fixFavicons(html) {
  return html
    .replace(/\/assets\/favicon-16x16-[A-Za-z0-9_-]+\.png/g, '/favicon/favicon-16x16.png')
    .replace(/\/assets\/favicon-32x32-[A-Za-z0-9_-]+\.png/g, '/favicon/favicon-32x32.png')
    .replace(/\/assets\/favicon-48x48-[A-Za-z0-9_-]+\.png/g, '/favicon/favicon-48x48.png')
    .replace(/\/assets\/favicon-[A-Za-z0-9_-]+\.svg/g, '/favicon/favicon.svg')
    .replace(/\/assets\/favicon-[A-Za-z0-9_-]+\.ico/g, '/favicon/favicon.ico')
    .replace(/\/assets\/apple-touch-icon-[A-Za-z0-9_-]+\.png/g, '/favicon/apple-touch-icon.png')
    .replace(/\/assets\/site-[A-Za-z0-9_-]+\.webmanifest/g, '/favicon/site.webmanifest');
}

export function toPascal(str) {
  return str.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

export function toTitle(str) {
  return str.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function humanCat(slug) {
  const map = { ui: 'UI', it: 'IT', newicons: 'General', 'arrows-action': 'Arrows & Action', 'text-formatting': 'Text Formatting' };
  return map[slug] ?? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function xmlEscape(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
