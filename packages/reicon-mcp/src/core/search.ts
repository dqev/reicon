import type { IconEntry, IconIndex, IconWeight, SearchResult } from './types.js';

// Only flag clearly conversational strings — short "add home icon" should be fine
const SENTENCE_MARKERS = /\?|!|\.{2,}/;
const SENTENCE_WORDS = /\b(please|could|would|want|need|show|find|give|get me|looking for|i am|i'm|can you|help me|what is)\b/i;

const SYNONYMS: Record<string, string[]> = {
  close: ['x'],
  dismiss: ['x', 'close'],
  cancel: ['x', 'close'],
  cart: ['cart', 'cart-large', 'shopping-cart2'],
  'shopping cart': ['cart', 'cart3', 'shopping-cart2', 'cart-large'],
  delete: ['trash', 'trash-bin-trash'],
  remove: ['trash', 'x'],
  bin: ['trash', 'trash-bin-trash'],
  settings: ['settings', 'settings-minimalistic', 'cog'],
  gear: ['settings', 'settings-minimalistic'],
  cog: ['settings'],
  arrow: ['arrow-right', 'arrow-down', 'arrow-up', 'arrow-left'],
  search: ['search', 'minimalistic-magnifer'],
  magnifier: ['search', 'minimalistic-magnifer'],
  heart: ['heart', 'heart-angle'],
  love: ['heart', 'heart-angle'],
  favorite: ['heart', 'star'],
  trash: ['trash', 'trash-bin-trash'],
  user: ['user', 'user-circle'],
  person: ['user', 'user-circle'],
  profile: ['user', 'user-circle'],
  avatar: ['user', 'user-circle'],
  home: ['home', 'home-2'],
  house: ['home', 'home-2'],
  menu: ['hamburger-menu', 'menu'],
  hamburger: ['hamburger-menu'],
  check: ['check', 'check-circle', 'check-read'],
  tick: ['check', 'check-circle'],
  notification: ['bell', 'bell-bing'],
  bell: ['bell', 'bell-bing'],
  alert: ['bell', 'shield-warning'],
  warning: ['shield-warning'],
  info: ['info-circle'],
  information: ['info-circle'],
  edit: ['pen', 'pen-2', 'edit'],
  pencil: ['pen', 'pen-2'],
  pen: ['pen', 'pen-2'],
  send: ['send-2', 'send'],
  share: ['share', 'share-2'],
  download: ['download', 'download-minimalistic'],
  upload: ['upload', 'upload-minimalistic'],
  link: ['link', 'link-2'],
  copy: ['copy', 'clipboard'],
  clipboard: ['clipboard', 'copy'],
  globe: ['globe', 'map'],
  world: ['globe'],
  lock: ['lock', 'lock-key-minimalistic'],
  unlock: ['lock-opened', 'lock-opened-2'],
  star: ['star', 'stars'],
  eye: ['eye', 'eye-closed'],
  visibility: ['eye', 'eye-closed'],
  phone: ['phone', 'phone-calling-rounded'],
  call: ['phone', 'phone-calling-rounded'],
  calendar: ['calendar', 'calendar-date'],
  date: ['calendar'],
  time: ['clock', 'stopwatch'],
  clock: ['clock'],
  camera: ['camera'],
  photo: ['camera', 'gallery'],
  image: ['gallery', 'camera'],
  message: ['chat-round', 'letter'],
  chat: ['chat-round', 'chat-square'],
  email: ['letter', 'letter-opened'],
  mail: ['letter', 'letter-opened'],
  add: ['add', 'add-circle'],
  plus: ['add', 'add-circle'],
  minus: ['subtract'],
  subtract: ['subtract'],
  refresh: ['refresh', 'restart'],
  reload: ['refresh', 'restart'],
  filter: ['filter'],
  sort: ['sort', 'alt-arrow-down'],
  grid: ['widget', 'four-circles'],
  list: ['list'],
  tag: ['tag'],
  folder: ['folder', 'folder-open'],
  file: ['file', 'file-text'],
  document: ['file-text', 'document'],
  chart: ['chart', 'pie-chart', 'chart-2'],
  graph: ['chart', 'chart-2'],
  play: ['play'],
  pause: ['pause'],
  stop: ['stop-circle'],
  volume: ['volume'],
  music: ['music-note', 'music-notes'],
  map: ['map', 'map-point'],
  location: ['map-point', 'target'],
  pin: ['map-point'],
  power: ['power'],
  wifi: ['wifi'],
  bluetooth: ['bluetooth'],
  battery: ['battery'],
};

function normalize(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

function tokenize(text: string): string[] {
  return normalize(text).split(' ').filter(Boolean);
}

export function isSentenceQuery(query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;
  if (SENTENCE_MARKERS.test(trimmed)) return true;
  const words = tokenize(trimmed);
  // Only flag > 7 words as a sentence (was 6, which was too aggressive)
  if (words.length > 7) return true;
  // Only flag if sentence words appear AND query is 5+ words
  if (words.length >= 5 && SENTENCE_WORDS.test(trimmed)) return true;
  if (/^(how|what|where|which|why|when)\b/i.test(trimmed)) return true;
  return false;
}

function synonymBoost(query: string, name: string): number {
  const key = normalize(query);
  const list = SYNONYMS[key];
  if (!list) return 0;
  const idx = list.indexOf(name);
  if (idx === -1) return 0;
  return 3000 - idx * 100;
}

// Fuzzy partial match — how many chars of `token` appear sequentially in `str`
function fuzzyScore(str: string, token: string): number {
  let ti = 0;
  let hits = 0;
  for (const c of str) {
    if (ti < token.length && c === token[ti]) { ti++; hits++; }
  }
  return ti === token.length ? Math.round((hits / str.length) * 100) : 0;
}

function scoreIcon(icon: IconEntry, query: string, tokens: string[], weight?: IconWeight): number {
  const q = normalize(query);
  const name = icon.name;
  const nameNorm = name.replace(/-/g, ' ');
  const catNorm = icon.category.replace(/-/g, ' ').toLowerCase();
  const tagsNorm = icon.tags.map((t) => normalize(t));
  let score = 0;

  // Synonym boost
  score += synonymBoost(query, name);

  // Exact name match
  if (name === q || name === q.replace(/ /g, '-')) {
    score += 10000;
  }

  // Single token exact match
  if (tokens.length === 1 && name === tokens[0]) {
    score += 5000;
  }

  // All tokens appear in name
  if (tokens.every((t) => name.includes(t) || nameNorm.includes(t))) {
    score += 2000;
  }

  // Full tag exact match
  if (tagsNorm.some((t) => t === q)) {
    score += 1500;
  }

  for (const token of tokens) {
    // Exact tag match
    if (tagsNorm.some((t) => t === token)) score += 800;
    // Name includes token
    if (name.includes(token)) score += 600;
    // Name starts with token (prefix boost)
    if (name.startsWith(token)) score += 400;
    // Tag includes token
    if (tagsNorm.some((t) => t.includes(token))) score += 300;
    // Category match
    if (catNorm.includes(token)) score += 150;
    // Fuzzy fallback — only if no direct match
    const directMatch = name.includes(token) || tagsNorm.some((t) => t.includes(token));
    if (!directMatch) {
      const fuzz = fuzzyScore(name, token);
      if (fuzz > 70) score += Math.round(fuzz * 0.8);
    }
  }

  // Prefer shorter names (more specific)
  score += Math.max(0, 50 - name.length);

  // Weight filter
  if (weight) {
    if (icon.weights[weight]) score += 10;
    else score -= 1000;
  }

  return score;
}

export function searchIcons(
  index: IconIndex,
  query: string,
  options: { weight?: IconWeight; limit?: number } = {},
): { results: SearchResult[]; instruction: string } | { error: string } {
  if (isSentenceQuery(query)) {
    return {
      error: 'Query looks like a full sentence. Use concise keywords instead, such as "cart", "user", or "settings".',
    };
  }

  // Default limit raised from 5 → 8 for better agent context
  const limit = options.limit ?? 8;
  const tokens = tokenize(query);
  const weights: IconWeight[] = options.weight ? [options.weight] : ['Outline', 'Filled'];
  const results: SearchResult[] = [];

  for (const icon of index.icons) {
    for (const weight of weights) {
      if (!icon.weights[weight]) continue;
      const score = scoreIcon(icon, query, tokens, weight);
      if (score > 0) {
        results.push({
          name: icon.name,
          weight,
          category: icon.category,
          tags: icon.tags,
          score,
        });
      }
    }
  }

  results.sort((a, b) => b.score - a.score || a.name.length - b.name.length);

  const seen = new Set<string>();
  const deduped: SearchResult[] = [];
  for (const r of results) {
    const key = `${r.name}:${r.weight}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(r);
    if (deduped.length >= limit) break;
  }

  if (deduped.length === 0) {
    return {
      error: `No icons found for "${query}". Try a shorter or different keyword.`,
    };
  }

  return {
    results: deduped,
    instruction:
      'Pick exactly one result from the list above. Prefer the highest score. Then call view_icon to confirm the SVG, or apply_icon to generate ready-to-use code. Do not ask the user to choose.',
  };
}

export function findIcon(index: IconIndex, name: string): IconEntry | undefined {
  return index.icons.find((i) => i.name === name);
}

export function listCategories(index: IconIndex): string[] {
  return index.categories;
}
