import type { IconEntry, IconIndex, IconWeight, SearchResult } from './types.js';

const SENTENCE_MARKERS = /\?|!|\.{2,}/;
const SENTENCE_WORDS = /\b(please|could|would|want|need|show|find|give|get|me|my|the|a|an|icon for|looking for|i am|i'm|can you|help me)\b/i;

const SYNONYMS: Record<string, string[]> = {
  close: ['x'],
  cart: ['cart', 'cart-large', 'shopping-cart2'],
  'shopping cart': ['cart', 'cart3', 'shopping-cart2', 'cart-large'],
  delete: ['trash', 'trash-bin-trash'],
  remove: ['trash', 'x'],
  settings: ['settings', 'settings-minimalistic'],
  arrow: ['arrow-right', 'arrow-down', 'arrow-up', 'arrow-left'],
  search: ['search', 'minimalistic-magnifer'],
  heart: ['heart', 'heart-angle'],
  trash: ['trash', 'trash-bin-trash'],
  user: ['user', 'user-circle'],
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
  if (words.length > 6) return true;
  if (words.length >= 4 && SENTENCE_WORDS.test(trimmed)) return true;
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

function scoreIcon(icon: IconEntry, query: string, tokens: string[], weight?: IconWeight): number {
  const q = normalize(query);
  const name = icon.name;
  const nameNorm = name.replace(/-/g, ' ');
  const tagsNorm = icon.tags.map((t) => normalize(t));
  let score = 0;

  score += synonymBoost(query, name);

  if (name === q || name === q.replace(/ /g, '-')) {
    score += 10000;
  }

  if (tokens.length === 1 && name === tokens[0]) {
    score += 5000;
  }

  if (tokens.every((t) => name.includes(t) || nameNorm.includes(t))) {
    score += 2000;
  }

  if (tagsNorm.some((t) => t === q)) {
    score += 1500;
  }

  for (const token of tokens) {
    if (tagsNorm.some((t) => t === token)) score += 800;
    if (name.includes(token)) score += 600;
    if (tagsNorm.some((t) => t.includes(token))) score += 300;
  }

  if (tokens.length === 1 && name.startsWith(tokens[0])) {
    score += 400;
  }

  score += Math.max(0, 50 - name.length);

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

  const limit = options.limit ?? 5;
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

  return {
    results: deduped,
    instruction: 'Pick exactly one result from the list above and proceed with view_icon or apply_icon. Do not ask a person to choose.',
  };
}

export function findIcon(index: IconIndex, name: string): IconEntry | undefined {
  return index.icons.find((i) => i.name === name);
}

export function listCategories(index: IconIndex): string[] {
  return index.categories;
}
