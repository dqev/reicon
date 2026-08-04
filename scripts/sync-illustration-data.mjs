#!/usr/bin/env node
/**
 * sync-illustration-data.mjs
 *
 * Verifies public/illustration-data/ structure and ensures category group JSON files
 * (object.json, people.json, etc.) and letter-indexed search buckets (a.json..z.json) are synced.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_PATH = resolve(__dirname, '../public/illustration-data');
const GROUPS_PATH = resolve(BASE_PATH, 'groups');
const ALL_PATH = resolve(BASE_PATH, 'all');
const SEARCH_PATH = resolve(BASE_PATH, 'search');

if (existsSync(BASE_PATH)) {
  // 1. Generate category level combined json files in groups directory if missing
  if (existsSync(GROUPS_PATH)) {
    const files = readdirSync(GROUPS_PATH);
    const catMap = {};

    for (const file of files) {
      if (!file.includes('--') || !file.endsWith('.json')) continue;
      const cat = file.split('--')[0];
      try {
        const data = JSON.parse(readFileSync(join(GROUPS_PATH, file), 'utf-8'));
        const entries = Array.isArray(data) ? data : (data.entries || []);
        if (entries.length > 0) {
          if (!catMap[cat]) catMap[cat] = [];
          catMap[cat] = catMap[cat].concat(entries);
        }
      } catch {}
    }

    for (const [cat, items] of Object.entries(catMap)) {
      const outPath = join(GROUPS_PATH, `${cat}.json`);
      if (!existsSync(outPath)) {
        writeFileSync(outPath, JSON.stringify(items));
      }
    }
  }

  // 2. Ensure letter search buckets exist
  if (existsSync(ALL_PATH) && !existsSync(SEARCH_PATH)) {
    mkdirSync(SEARCH_PATH, { recursive: true });
    const allFiles = readdirSync(ALL_PATH);
    const letterMap = {};

    for (const f of allFiles) {
      if (!f.endsWith('.json')) continue;
      try {
        const content = JSON.parse(readFileSync(join(ALL_PATH, f), 'utf-8'));
        const rawList = Array.isArray(content) ? content : (content.entries || []);

        for (const item of rawList) {
          const slug = item[0];
          const keywords = item[2] || '';

          const chars = new Set();
          if (slug && slug[0]) chars.add(slug[0].toLowerCase());
          keywords.toLowerCase().split(/\s+/).forEach((w) => {
            if (w && /^[a-z0-9]$/.test(w[0])) chars.add(w[0]);
          });

          for (const char of chars) {
            const key = /^[a-z0-9]$/.test(char) ? char : 'misc';
            if (!letterMap[key]) letterMap[key] = [];
            letterMap[key].push(item);
          }
        }
      } catch {}
    }

    for (const [key, list] of Object.entries(letterMap)) {
      const outPath = join(SEARCH_PATH, `${key}.json`);
      writeFileSync(outPath, JSON.stringify(list));
    }
  }

  console.log('Illustration data verified in public/illustration-data.');
}
