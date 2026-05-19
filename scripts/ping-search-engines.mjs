#!/usr/bin/env node
/**
 * Notify search engines about updated pages after a build.
 *
 * - IndexNow: Instantly notifies Bing, Yandex, DuckDuckGo, Seznam, Naver
 * - Google: Pings sitemap URL
 *
 * Usage: node scripts/ping-search-engines.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PostHog } from 'posthog-node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://reicon.dev';
const INDEXNOW_KEY = 'e44e44937f4e91fe08a9067fd87b2860';
const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');

async function pingGoogle() {
  const sitemapUrl = `${SITE}/sitemap.xml`;
  try {
    const res = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log(`  Google sitemap ping: ${res.status === 200 ? '✓' : res.status}`);
    return { success: res.status === 200, status: res.status };
  } catch (e) {
    console.error(`  Google ping failed: ${e.message}`);
    return { success: false, status: 'error' };
  }
}

async function submitIndexNow() {
  // Build URL list — static pages + all icon pages
  const iconNames = JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8'));
  const allUrls = [
    `${SITE}/`,
    `${SITE}/icons`,
    `${SITE}/usage`,
    `${SITE}/packages`,
    ...Object.keys(iconNames).map((name) => `${SITE}/icon/${name}`),
  ];

  // IndexNow accepts max 10,000 URLs per request
  const BATCH_SIZE = 10000;
  let submitted = 0;
  let success = true;

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE);
    try {
      const res = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: 'reicon.dev',
          key: INDEXNOW_KEY,
          keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      });
      submitted += batch.length;
      if (res.status !== 200 && res.status !== 202) success = false;
      console.log(`  IndexNow batch ${Math.floor(i / BATCH_SIZE) + 1}: ${res.status === 200 || res.status === 202 ? '✓' : res.status} (${batch.length} URLs)`);
    } catch (e) {
      console.error(`  IndexNow batch failed: ${e.message}`);
      success = false;
    }
  }

  console.log(`  IndexNow total: ${submitted} URLs submitted`);
  return { submitted, success };
}

async function main() {
  console.log('🔔 Pinging search engines...\n');
  const [googleResult, indexNowResult] = await Promise.all([pingGoogle(), submitIndexNow()]);
  console.log('\n✅ Done. Bing/Yandex/DuckDuckGo will process within minutes. Google may take 1-2 days.');

  const posthog = new PostHog(process.env.POSTHOG_API_KEY, {
    host: process.env.POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  posthog.capture({
    distinctId: 'build-system',
    event: 'search engines pinged',
    properties: {
      google_success: googleResult.success,
      google_status: googleResult.status,
      indexnow_url_count: indexNowResult.submitted,
      indexnow_success: indexNowResult.success,
    },
  });
  await posthog.shutdown();
}

main();
