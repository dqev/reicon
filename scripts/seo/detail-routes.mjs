/**
 * detail-routes.mjs - Build-time route definitions for every detail page
 * (icons, brands, flags, glass) so the generated static HTML carries the
 * correct per-page meta instead of falling back to the home page tags.
 *
 * Data sources (single source of truth):
 *   - scripts/icon-names.json            icon slug -> PascalCase name
 *   - data/icons-names-categories.json   icon slug -> category
 *   - data/brands.json                   brand icons
 *   - data/flag.json                     flag icons
 *   - data/filled.json                   glass icons
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SITE } from './meta.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const OG_IMAGE = `${SITE}/og/og-image.png`;

function readJson(relPath) {
  return JSON.parse(readFileSync(resolve(ROOT, relPath), 'utf-8'));
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function pascalCase(slug) {
  return slug.split('-').map(capitalize).join('');
}

function titleCase(value) {
  return value.split('-').map(capitalize).join(' ');
}

function formatIconName(name) {
  if (!name) return '';
  if (name.includes('-') || name.includes('_')) {
    return name.split(/[-_]+/).map(capitalize).join(' ');
  }
  return capitalize(name);
}

function slugify(name) {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}

function pageJsonLd({ url, title, description, name, breadcrumbId }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    url,
    name: title,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', url: SITE, name: 'Reicon' },
    breadcrumb: { '@id': breadcrumbId },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
    ...(name ? { about: { '@type': 'Thing', name } } : {}),
  };
}

function breadcrumbJsonLd(url, trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function iconRoutes() {
  const iconNames = readJson('scripts/icon-names.json');
  const categories = readJson('data/icons-names-categories.json');
  const categoryBySlug = new Map(categories.map((item) => [item.name, item.category]));

  return Object.entries(iconNames).map(([slug, pascalFromData]) => {
    const pascalName = pascalFromData || pascalCase(slug);
    const category = categoryBySlug.get(slug) || '';
    const categoryLabel = category ? titleCase(category) : '';
    const path = `/icon/${encodeURIComponent(slug)}`;
    const url = `${SITE}${path}`;
    const title = `${pascalName} Icon \u2014 Reicon`;
    const description = `Free ${pascalName} SVG icon from Reicon. Outline & filled weights. MIT licensed.`;
    const keywords = [
      `${slug} icon`,
      `${pascalName} svg`,
      `download ${slug} svg`,
      `${slug} react`,
      `${slug} vue`,
      `${slug} svelte`,
      `free ${category ? category.replace(/-/g, ' ') : 'svg'} icon`,
      `${slug} png`,
      'reicon',
    ].join(', ');

    const trail = [
      { name: 'Reicon', url: SITE },
      { name: 'Icons', url: `${SITE}/icons` },
      ...(categoryLabel ? [{ name: categoryLabel, url: `${SITE}/icons` }] : []),
      { name: `${pascalName} Icon`, url },
    ];

    return {
      path,
      outDir: `icon/${slug}`,
      title,
      description,
      keywords,
      ogImage: OG_IMAGE,
      isIconPage: true,
      jsonLd: [
        pageJsonLd({ url, title, description, name: `${pascalName} Icon`, breadcrumbId: `${url}#breadcrumb` }),
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: `${pascalName} Icon`,
          description,
          url,
          codeRepository: 'https://github.com/reicon-dev/reicon',
          programmingLanguage: ['SVG', 'React', 'Vue', 'Svelte'],
          runtimePlatform: ['Browser', 'Node.js'],
          license: 'https://opensource.org/licenses/MIT',
          isPartOf: { '@type': 'SoftwareApplication', name: 'Reicon', url: SITE },
        },
      ],
      breadcrumb: breadcrumbJsonLd(url, trail),
    };
  });
}

function customIconRoutes({ type, parentPath, parentLabel, label, descriptionLabel, items }) {
  const routes = [];

  for (const item of items) {
    const slug = slugify(item.name);
    // A slash would create an extra path segment the router cannot match.
    if (slug.includes('/')) continue;

    const displayName = formatIconName(item.name);
    const path = `/${parentPath}/${encodeURIComponent(slug)}`;
    const url = `${SITE}${path}`;
    const title = `${displayName} ${label} Icon SVG - Reicon`;
    const description = `Download or copy free ${displayName} vector ${descriptionLabel} SVG icon. Optimized, lossless, high-fidelity SVG code.`;

    const trail = [
      { name: 'Reicon', url: SITE },
      { name: parentLabel, url: `${SITE}/${parentPath}` },
      { name: displayName, url },
    ];

    routes.push({
      path,
      outDir: `${parentPath}/${slug}`,
      title,
      description,
      ogImage: OG_IMAGE,
      isIconPage: true,
      jsonLd: [pageJsonLd({ url, title, description, name: displayName, breadcrumbId: `${url}#breadcrumb` })],
      breadcrumb: breadcrumbJsonLd(url, trail),
    });
  }

  return routes;
}

function brandRoutes() {
  const data = readJson('data/brands.json');
  return customIconRoutes({
    parentPath: 'brands',
    parentLabel: 'Brands',
    label: 'Brand Logo',
    descriptionLabel: 'brand logo',
    items: data.icons || [],
  });
}

function flagRoutes() {
  const data = readJson('data/flag.json');
  return customIconRoutes({
    parentPath: 'flags',
    parentLabel: 'Flags',
    label: 'Flag',
    descriptionLabel: 'flag',
    items: data.icons || [],
  });
}

function glassRoutes() {
  const data = readJson('data/filled.json');
  const seen = new Set();
  const items = [];

  for (const icons of Object.values(data.categories || {})) {
    for (const name of Object.keys(icons)) {
      const slug = slugify(name);
      if (seen.has(slug)) continue;
      seen.add(slug);
      items.push({ name });
    }
  }

  return customIconRoutes({
    parentPath: 'glass',
    parentLabel: 'Glass',
    label: 'Glass',
    descriptionLabel: 'glass',
    items,
  });
}

export function buildDetailRoutes() {
  return [...iconRoutes(), ...brandRoutes(), ...flagRoutes(), ...glassRoutes()];
}
