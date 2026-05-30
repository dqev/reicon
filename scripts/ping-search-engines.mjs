#!/usr/bin/env node
/**
 * Notify search engines about updated pages after a build.
 *
 * 1. IndexNow  — instantly notifies Bing, Yandex, DuckDuckGo, Seznam, Naver.
 *                Requires the key file to be reachable at:
 *                https://reicon.dev/<KEY>.txt  (public/<KEY>.txt)
 *
 * 2. Google Indexing API — optional. Only runs when a service-account JSON is
 *                provided via the GOOGLE_INDEXING_CREDENTIALS env var (raw JSON
 *                or a path to the file). Google's public sitemap-ping endpoint
 *                was deprecated in Jan 2024, so the only programmatic push left
 *                is the Indexing API. For sitemap discovery, Google relies on
 *                Search Console + the <lastmod> values in our sitemap.
 *
 * Usage: node scripts/ping-search-engines.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createSign } from 'crypto';
import { PostHog } from 'posthog-node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://reicon.dev';
const HOST = 'reicon.dev';
const INDEXNOW_KEY = 'e44e44937f4e91fe08a9067fd87b2860';
const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');

// Priority URLs that benefit most from fast (re)indexing.
const PRIORITY_URLS = [
  `${SITE}/`,
  `${SITE}/icons`,
  `${SITE}/usage`,
  `${SITE}/usage/react`,
  `${SITE}/usage/vue`,
  `${SITE}/usage/vanilla`,
  `${SITE}/packages`,
];

function loadAllUrls() {
  const iconNames = JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8'));
  return [
    ...PRIORITY_URLS,
    `${SITE}/license`,
    ...Object.keys(iconNames).map((name) => `${SITE}/icon/${name}`),
  ];
}

// ── 1. IndexNow ─────────────────────────────────────────────────────
async function submitIndexNow(allUrls) {
  const BATCH_SIZE = 10000; // IndexNow hard limit per request
  let submitted = 0;
  let success = true;

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE);
    try {
      const res = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: HOST,
          key: INDEXNOW_KEY,
          keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      });
      submitted += batch.length;
      const ok = res.status === 200 || res.status === 202;
      if (!ok) success = false;
      console.log(`  IndexNow batch ${Math.floor(i / BATCH_SIZE) + 1}: ${ok ? '✓' : res.status} (${batch.length} URLs)`);
      if (!ok) {
        const body = await res.text().catch(() => '');
        if (body) console.log(`    ↳ ${body.slice(0, 200)}`);
      }
    } catch (e) {
      console.error(`  IndexNow batch failed: ${e.message}`);
      success = false;
    }
  }

  console.log(`  IndexNow total: ${submitted} URLs submitted`);
  return { submitted, success };
}

// ── 2. Google Indexing API (optional) ───────────────────────────────
function loadGoogleCreds() {
  const raw = process.env.GOOGLE_INDEXING_CREDENTIALS;
  if (!raw) return null;
  try {
    // Allow either a path or inline JSON.
    if (raw.trim().startsWith('{')) return JSON.parse(raw);
    if (existsSync(raw)) return JSON.parse(readFileSync(raw, 'utf-8'));
  } catch (e) {
    console.warn(`  Google Indexing: could not parse credentials (${e.message})`);
  }
  return null;
}

function base64url(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getGoogleAccessToken(creds) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(JSON.stringify({
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(creds.private_key).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const jwt = `${header}.${claim}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`token endpoint returned ${res.status}`);
  const json = await res.json();
  return json.access_token;
}

async function submitGoogleIndexing(urls) {
  const creds = loadGoogleCreds();
  if (!creds) {
    console.log('  Google Indexing API: skipped (no GOOGLE_INDEXING_CREDENTIALS)');
    return { submitted: 0, success: true, skipped: true };
  }

  let token;
  try {
    token = await getGoogleAccessToken(creds);
  } catch (e) {
    console.error(`  Google Indexing API: auth failed (${e.message})`);
    return { submitted: 0, success: false, skipped: false };
  }

  // The Indexing API is rate-limited (200/day default). Only push priority URLs.
  let submitted = 0;
  let success = true;
  for (const url of urls) {
    try {
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url, type: 'URL_UPDATED' }),
      });
      const ok = res.status === 200;
      if (!ok) success = false;
      submitted += ok ? 1 : 0;
      console.log(`  Google Indexing ${ok ? '✓' : res.status}: ${url}`);
    } catch (e) {
      console.error(`  Google Indexing failed for ${url}: ${e.message}`);
      success = false;
    }
  }
  return { submitted, success, skipped: false };
}

async function main() {
  console.log('🔔 Pinging search engines...\n');
  const allUrls = loadAllUrls();

  const [indexNowResult, googleResult] = await Promise.all([
    submitIndexNow(allUrls),
    // Only priority URLs go to Google's Indexing API (daily quota).
    submitGoogleIndexing(PRIORITY_URLS),
  ]);

  console.log('\n✅ Done.');
  console.log('   Bing / Yandex / DuckDuckGo: processed within minutes via IndexNow.');
  console.log('   Google: discovers updates via Search Console + sitemap <lastmod>.');
  if (googleResult.skipped) {
    console.log('   (Set GOOGLE_INDEXING_CREDENTIALS to also push priority URLs to Google instantly.)');
  }

  const posthog = new PostHog(process.env.POSTHOG_API_KEY, {
    host: process.env.POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  posthog.capture({
    distinctId: 'build-system',
    event: 'search engines pinged',
    properties: {
      indexnow_url_count: indexNowResult.submitted,
      indexnow_success: indexNowResult.success,
      google_indexing_count: googleResult.submitted,
      google_indexing_success: googleResult.success,
      google_indexing_skipped: googleResult.skipped,
    },
  });
  await posthog.shutdown();
}

main();
