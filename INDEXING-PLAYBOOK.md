# Reicon — Fast Indexing Playbook

Pro-grade setup for getting reicon.dev (2,700+ pages) indexed fast and kept fresh.

## What's automated (runs on every build)

`npm run build` → generates sitemaps + pre-renders meta → `postbuild` pings search engines.

1. **Multi-sitemap with image extensions** (`scripts/generate-sitemap.mjs`)
   - Sitemap index → `sitemap-pages.xml` + `sitemap-icons-N.xml` (500 URLs each).
   - Every icon URL carries an `<image:image>` entry → eligible for **Google Images**.
   - **Stable `<lastmod>`** via `scripts/lastmod-cache.json` (commit this file). Only new/changed URLs get a fresh date, which keeps Google's trust in your lastmod signal.

2. **IndexNow** (`scripts/ping-search-engines.mjs`)
   - Instantly notifies **Bing, Yandex, DuckDuckGo, Seznam, Naver**.
   - Key file: `public/e44e44937f4e91fe08a9067fd87b2860.txt` (REQUIRED — was missing before; submissions silently failed without it).

3. **Google Indexing API** (optional, same script)
   - Google killed the sitemap-ping endpoint in Jan 2024, so there is no anonymous push anymore.
   - To push priority URLs to Google instantly, set `GOOGLE_INDEXING_CREDENTIALS` (service-account JSON or a path to it). Without it, the step is skipped cleanly.

4. **AI/LLM crawlers welcomed** (`public/robots.txt`)
   - GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot, etc. explicitly allowed for GEO.

## One-time manual steps (cannot be automated)

These are the highest-leverage actions and must be done in the dashboards:

### Google Search Console — https://search.google.com/search-console
1. Add property `reicon.dev` (Domain property via DNS TXT is best).
2. **Sitemaps** → submit `https://reicon.dev/sitemap.xml`.
3. **URL Inspection** → paste your homepage → **Request Indexing** (do this for the 5–7 priority URLs once).
4. Confirm **Page indexing** report has no "Discovered – not indexed" spikes after a week.

### Bing Webmaster Tools — https://www.bing.com/webmasters
1. Add `reicon.dev` (you can import directly from Search Console).
2. Submit `https://reicon.dev/sitemap.xml`.
3. IndexNow is already wired, so new pages appear within minutes.

### (Optional) Google Indexing API
1. Google Cloud → create a service account → enable **Indexing API**.
2. Download the JSON key.
3. In Search Console → Settings → Users → add the service-account email as **Owner**.
4. Set env var before build:
   ```bash
   export GOOGLE_INDEXING_CREDENTIALS="$(cat service-account.json)"
   npm run ping
   ```

## Manual triggers

```bash
npm run sitemap     # regenerate sitemaps (updates lastmod cache)
npm run ping        # re-submit to IndexNow (+ Google API if configured)
npm run seo:check   # audit meta tags / OG / Twitter / structured data
```

## Why these matter (ranking factors, not myths)

- **Stable lastmod** → Google crawls changed pages first, wastes less crawl budget on 2,700 static icon pages.
- **Image sitemap** → icon SVGs become discoverable in Google Images, a primary search surface for "X icon" queries.
- **IndexNow key file** → the difference between Bing indexing in minutes vs. never.
- **Pre-rendered meta + SSR content** (already in `prerender-meta.mjs`) → crawlers see real `<h1>`, breadcrumbs, and descriptions without running JS.
- **llms.txt / llms-full.txt + AI-friendly robots** → citations in ChatGPT, Perplexity, Google AI Overviews (GEO).

## Cadence

- **Every deploy**: automated (sitemap + IndexNow).
- **Weekly**: glance at Search Console Page Indexing + Core Web Vitals.
- **When adding icons**: just build — new URLs get today's lastmod and are pushed via IndexNow automatically.
