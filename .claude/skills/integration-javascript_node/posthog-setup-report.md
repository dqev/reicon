<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Reicon project's Node.js build pipeline scripts. The `posthog-node` SDK (v5.34.6) was installed and configured to fire events at the end of each of the three build scripts that run during `npm run build`. Because these are short-lived Node.js processes, each script creates a PostHog client with `flushAt: 1` and `flushInterval: 0` to ensure events are dispatched immediately, followed by `await client.shutdown()`. PostHog credentials are read from the `POSTHOG_API_KEY` and `POSTHOG_HOST` environment variables (set in `.env`), and are never hardcoded.

| Event | Description | File |
|---|---|---|
| `sitemap generated` | Fired after sitemap XML files are written. Properties: `icon_count`, `static_page_count`, `total_urls`, `sitemap_count`. | `scripts/generate-sitemap.mjs` |
| `meta prerendered` | Fired after post-build HTML pre-rendering completes. Properties: `static_page_count`, `icon_page_count`, `total_pages`. | `scripts/prerender-meta.mjs` |
| `search engines pinged` | Fired after IndexNow and Google sitemap ping requests complete. Properties: `google_success`, `google_status`, `indexnow_url_count`, `indexnow_success`. | `scripts/ping-search-engines.mjs` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on build pipeline activity, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1602144)
- [Build pipeline runs](/insights/9fV65O89) — trend of all three build events over time
- [Sitemap total URLs per build](/insights/on6IOde2) — average URL count in the sitemap index per build
- [IndexNow URLs submitted per build](/insights/FyPhj1UY) — total URLs sent to IndexNow search engines per build
- [Pre-rendered pages per build](/insights/v7OlSP8B) — total and icon-page HTML output per build
- [Total build runs (last 30 days)](/insights/zSYnHvR3) — bold number summary of recent build frequency

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
