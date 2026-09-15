/**
 * src/utils/search.ts — Dedicated Search Algorithm Engine for Reicon
 *
 * Provides fast prefix, keyword, tag, fuzzy, and synonym matching for icons.
 */

export interface SearchIndexEntry {
  /** Icon key / name (e.g. 'chrome', 'heart', 'search-3') */
  n: string;
  /** Category key (e.g. 'ui', 'newicons') */
  c: string;
  /** Tags and description keywords */
  t: string[];
}

export interface SearchResult {
  name: string;
  category: string;
  tags: string[];
  score: number;
}

export interface SearchOptions {
  limit?: number;
  category?: string;
}

/** Pre-computed synonym expansions for common developer and design terms */
const SYNONYMS: Record<string, string[]> = {
  chr: ['chrome', 'browser', 'google-chrome'],
  chrome: ['browser', 'google', 'web', 'internet'],
  browser: ['chrome', 'firefox', 'safari', 'edge', 'web', 'window', 'tab'],
  gear: ['settings', 'cog', 'options', 'preferences'],
  cog: ['settings', 'gear', 'options'],
  settings: ['gear', 'cog', 'preferences', 'options', 'adjust'],
  user: ['account', 'profile', 'avatar', 'person', 'member'],
  profile: ['user', 'account', 'avatar', 'person'],
  mail: ['email', 'message', 'envelope', 'inbox', 'letter'],
  email: ['mail', 'message', 'envelope', 'inbox'],
  message: ['mail', 'email', 'chat', 'comment', 'bubble'],
  chat: ['message', 'comment', 'bubble', 'discussion'],
  trash: ['delete', 'bin', 'remove', 'garbage'],
  delete: ['trash', 'bin', 'remove', 'close'],
  search: ['magnifier', 'find', 'lookup', 'explore', 'scan'],
  find: ['search', 'magnifier', 'lookup'],
  lock: ['security', 'password', 'key', 'protect', 'private', 'padlock'],
  key: ['lock', 'security', 'password', 'access'],
  home: ['house', 'building', 'main', 'dashboard'],
  house: ['home', 'building'],
  image: ['photo', 'picture', 'media', 'gallery'],
  photo: ['image', 'picture', 'camera'],
  phone: ['call', 'mobile', 'device', 'telephone', 'contact'],
  call: ['phone', 'mobile', 'telephone'],
  file: ['document', 'page', 'paper', 'text'],
  document: ['file', 'page', 'paper'],
  folder: ['directory', 'archive', 'files'],
  star: ['favorite', 'bookmark', 'rating', 'like'],
  heart: ['like', 'favorite', 'love'],
  like: ['heart', 'thumbs-up', 'favorite'],
  play: ['video', 'media', 'start', 'stream'],
  pause: ['stop', 'media', 'hold'],
  stop: ['pause', 'media', 'end'],
  check: ['tick', 'correct', 'mark', 'done', 'success', 'ok'],
  close: ['cross', 'remove', 'cancel', 'exit', 'x'],
  cross: ['close', 'remove', 'cancel', 'x'],
  plus: ['add', 'create', 'new'],
  add: ['plus', 'create', 'new'],
  minus: ['remove', 'reduce', 'subtract'],
  remove: ['minus', 'trash', 'delete'],
  edit: ['pencil', 'pen', 'write', 'modify', 'update'],
  pencil: ['edit', 'pen', 'write', 'draw'],
  pen: ['edit', 'pencil', 'write'],
  arrow: ['chevron', 'direction', 'move', 'navigation'],
  chevron: ['arrow', 'expand', 'collapse', 'direction'],
};

function normalize(str: string): string {
  return str.toLowerCase().trim().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
}

function tokenize(str: string): string[] {
  return normalize(str).split(' ').filter(Boolean);
}

function getSynonyms(token: string): string[] {
  const norm = token.toLowerCase();
  const set = new Set<string>([norm]);
  const synList = SYNONYMS[norm];
  if (synList) {
    for (const s of synList) set.add(s);
  }
  return [...set];
}

/**
 * Calculates match score for an icon entry given a search query.
 */
export function scoreIconEntry(
  entry: SearchIndexEntry,
  query: string,
  tokens: string[]
): number {
  const qNorm = normalize(query);
  const qSlug = qNorm.replace(/\s+/g, '-');
  const nameNorm = normalize(entry.n);
  const nameSlug = entry.n.toLowerCase();
  const nameParts = nameSlug.split('-');
  const catNorm = normalize(entry.c);
  const tagsNorm = entry.t.map(normalize);

  let score = 0;

  // 1. Exact match on full icon name
  if (nameSlug === qSlug || nameNorm === qNorm) {
    return 10000;
  }

  // 2. Exact prefix match on full icon name (e.g. "chr" -> "chrome")
  if (nameSlug.startsWith(qSlug) || nameNorm.startsWith(qNorm)) {
    score += 5000;
  }

  // 3. Name contains query substring
  if (nameSlug.includes(qSlug) || nameNorm.includes(qNorm)) {
    score += 2500;
  }

  // 4. Token-by-token evaluation
  for (const token of tokens) {
    const syns = getSynonyms(token);
    let matchedInEntry = false;

    for (const syn of syns) {
      const isOriginalToken = syn === token;
      const weight = isOriginalToken ? 1.0 : 0.6;

      // Exact part of icon name (e.g. 'chrome' part in 'google-chrome')
      if (nameParts.includes(syn)) {
        score += Math.round(1800 * weight);
        matchedInEntry = true;
      }

      // Name part starts with token (e.g. 'chr' -> 'chrome')
      else if (nameParts.some((p) => p.startsWith(syn))) {
        score += Math.round(1400 * weight);
        matchedInEntry = true;
      }

      // Name part contains token
      else if (nameParts.some((p) => p.includes(syn))) {
        score += Math.round(800 * weight);
        matchedInEntry = true;
      }

      // Exact tag match
      if (tagsNorm.includes(syn)) {
        score += Math.round(1200 * weight);
        matchedInEntry = true;
      }

      // Tag prefix or substring match
      else if (tagsNorm.some((t) => t.startsWith(syn) || t.includes(syn))) {
        score += Math.round(600 * weight);
        matchedInEntry = true;
      }

      // Category match
      if (catNorm.includes(syn)) {
        score += Math.round(300 * weight);
        matchedInEntry = true;
      }
    }

    if (!matchedInEntry) {
      score -= 300;
    }
  }

  // Shorter icon names get slight boost for cleaner matching
  score += Math.max(0, 30 - entry.n.length);

  return Math.max(0, score);
}

/**
 * Main search function to query icons from the index.
 */
export function executeSearch(
  query: string,
  index: SearchIndexEntry[],
  options: SearchOptions = {}
): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const limit = options.limit ?? 500;
  const tokens = tokenize(trimmed);
  const results: SearchResult[] = [];

  for (const entry of index) {
    if (options.category && options.category !== 'all' && entry.c !== options.category) {
      continue;
    }

    const score = scoreIconEntry(entry, trimmed, tokens);
    if (score > 0) {
      results.push({
        name: entry.n,
        category: entry.c,
        tags: entry.t,
        score,
      });
    }
  }

  // Sort by score descending, then by name length ascending
  results.sort((a, b) => b.score - a.score || a.name.length - b.name.length);

  // Deduplicate by name
  const seen = new Set<string>();
  const deduped: SearchResult[] = [];
  for (const r of results) {
    if (seen.has(r.name)) continue;
    seen.add(r.name);
    deduped.push(r);
    if (deduped.length >= limit) break;
  }

  return deduped;
}
