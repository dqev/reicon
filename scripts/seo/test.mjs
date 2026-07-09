#!/usr/bin/env node

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(__dirname, '../../index.html'), 'utf-8');

const c = { pass: '\x1b[32m✓\x1b[0m', fail: '\x1b[31m✗\x1b[0m', warn: '\x1b[33m⚠\x1b[0m', h: '\x1b[36m', r: '\x1b[0m' };
let passes = 0, fails = 0;

function check(label, condition, required = true) {
  if (condition) { console.log(`  ${c.pass} ${label}`); passes++; }
  else if (required) { console.log(`  ${c.fail} ${label}`); fails++; }
  else { console.log(`  ${c.warn} ${label} (optional)`); }
}

function has(pattern) { return new RegExp(pattern, 'i').test(html); }
function get(pattern) { return html.match(new RegExp(pattern, 'i'))?.[1] || null; }

console.log(`\n${c.h}SEO Audit — index.html${c.r}\n${'─'.repeat(50)}`);

console.log(`\n${c.h}Primary${c.r}`);
check('title', has('<title>[^<]+</title>'));
check('description', has('name="description"'));
check('keywords', has('name="keywords"'));
check('robots', has('name="robots"'));
check('canonical', has('rel="canonical"'));

console.log(`\n${c.h}Open Graph${c.r}`);
['og:type', 'og:url', 'og:title', 'og:description', 'og:image', 'og:image:width', 'og:image:height', 'og:locale', 'og:site_name']
  .forEach((p) => check(p, has(`property="${p}"`)));

console.log(`\n${c.h}Twitter${c.r}`);
['twitter:card', 'twitter:site', 'twitter:creator', 'twitter:title', 'twitter:description', 'twitter:image']
  .forEach((p) => check(p, has(`name="${p}"`)));

console.log(`\n${c.h}Images${c.r}`);
const ogImg = get('property="og:image" content="([^"]*)"');
const twImg = get('name="twitter:image" content="([^"]*)"');
check('og:image uses HTTPS', ogImg?.startsWith('https://'));
check('twitter:image uses HTTPS', twImg?.startsWith('https://'));
check('og and twitter images match', ogImg === twImg, false);

console.log(`\n${c.h}JSON-LD${c.r}`);
const lds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
check(`${lds.length} JSON-LD block(s) found`, lds.length > 0);
lds.forEach((m, i) => {
  try { const d = JSON.parse(m[1].trim()); check(`  block ${i + 1}: ${d['@type']}`, true); }
  catch { check(`  block ${i + 1}: invalid JSON`, false); }
});

console.log(`\n${c.h}Performance${c.r}`);
check(`preconnect hints: ${(html.match(/rel="preconnect"/g)||[]).length}`, has('rel="preconnect"'));
check(`preload hints: ${(html.match(/rel="preload"/g)||[]).length}`, has('rel="preload"'));

console.log(`\n${c.h}Favicon${c.r}`);
['favicon.svg', 'favicon.ico', 'apple-touch-icon', 'site.webmanifest']
  .forEach((f) => check(f, html.includes(f)));

console.log(`\n${'─'.repeat(50)}`);
console.log(`${passes} passed, ${fails} failed\n`);
if (fails > 0) process.exit(1);
