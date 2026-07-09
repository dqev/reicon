#!/usr/bin/env node

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createSign } from 'crypto';
import { PostHog } from 'posthog-node';
import { ROUTES } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://reicon.dev';
const HOST = 'reicon.dev';
const INDEXNOW_KEY = 'e44e44937f4e91fe08a9067fd87b2860';
const ICON_NAMES_JSON = resolve(__dirname, '../icon-names.json');

const PRIORITY_URLS = ROUTES
  .filter((r) => parseFloat(r.priority) >= 0.8)
  .map((r) => `${SITE}${r.path === '/' ? '/' : r.path}`);

function allUrls() {
  const icons = Object.keys(JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8')));
  return [...PRIORITY_URLS, `${SITE}/license`, ...icons.map((n) => `${SITE}/icon/${n}`)];
}

async function indexNow(urls) {
  const BATCH = 10000;
  let submitted = 0;
  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    try {
      const res = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`, urlList: batch }),
      });
      const ok = res.status === 200 || res.status === 202;
      submitted += batch.length;
      console.log(`IndexNow batch ${Math.floor(i / BATCH) + 1}: ${ok ? '✓' : res.status} (${batch.length} URLs)`);
    } catch (e) {
      console.error(`IndexNow batch failed: ${e.message}`);
    }
  }
  return submitted;
}

function loadGoogleCreds() {
  const raw = process.env.GOOGLE_INDEXING_CREDENTIALS;
  if (!raw) return null;
  try {
    if (raw.trim().startsWith('{')) return JSON.parse(raw);
    if (existsSync(raw)) return JSON.parse(readFileSync(raw, 'utf-8'));
  } catch {}
  return null;
}

async function googleToken(creds) {
  const now = Math.floor(Date.now() / 1000);
  const b64 = (s) => Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const header = b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64(JSON.stringify({ iss: creds.client_email, scope: 'https://www.googleapis.com/auth/indexing', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const sig = signer.sign(creds.private_key).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${header}.${claim}.${sig}` }),
  });
  if (!res.ok) throw new Error(`token ${res.status}`);
  return (await res.json()).access_token;
}

async function googleIndexing(urls) {
  const creds = loadGoogleCreds();
  if (!creds) { console.log('Google Indexing: skipped (no GOOGLE_INDEXING_CREDENTIALS)'); return 0; }
  let token;
  try { token = await googleToken(creds); } catch (e) { console.error(`Google auth failed: ${e.message}`); return 0; }
  let submitted = 0;
  for (const url of urls) {
    try {
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url, type: 'URL_UPDATED' }),
      });
      if (res.status === 200) submitted++;
      console.log(`Google Indexing ${res.status === 200 ? '✓' : res.status}: ${url}`);
    } catch (e) { console.error(`Google Indexing failed: ${url}: ${e.message}`); }
  }
  return submitted;
}

async function main() {
  const urls = allUrls();
  const [indexNowCount, googleCount] = await Promise.all([indexNow(urls), googleIndexing(PRIORITY_URLS)]);
  console.log(`\n✓ IndexNow: ${indexNowCount} URLs | Google: ${googleCount} URLs`);

  const ph = new PostHog(process.env.POSTHOG_API_KEY, { host: process.env.POSTHOG_HOST, flushAt: 1, flushInterval: 0 });
  ph.capture({ distinctId: 'build-system', event: 'search engines pinged', properties: { indexnow: indexNowCount, google: googleCount, total_urls: urls.length } });
  await ph.shutdown();
}

main();
