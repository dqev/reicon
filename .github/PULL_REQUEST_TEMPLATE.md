<!-- Thanks for contributing to Reicon! 💜 Fill out the relevant sections below. -->

## Summary

<!-- One sentence: what does this PR do? -->

## Related issue

<!-- Closes #123 — delete this line if not applicable -->

## Type of change

- [ ] 🎨 New icon(s)
- [ ] ✏️ Icon fix (alignment / stroke / grid)
- [ ] 🐛 Bug fix
- [ ] ✨ Feature / enhancement
- [ ] 📖 Documentation
- [ ] 🔧 Chore / tooling

---

## For icon contributions

<!-- Fill this out if you checked "New icon(s)" or "Icon fix" above -->

**Icon name(s):** <!-- e.g. wave-hand, split-screen -->

**Did you add `"contributor": { "github": "your-username" }` to each new icon?**
- [ ] Yes — my GitHub username is in `data/icon-data.json` next to each new icon
- [ ] N/A — this is an icon fix, not a new icon

**Screenshots**

| Outline | Filled |
| ------- | ------ |
|         |        |

---

## Checklist

- [ ] Branch is up to date with `main`.
- [ ] `npm run sync:icons` was run after editing `data/icon-data.json`.
- [ ] `npm run validate:icons` reports ✅ in sync.
- [ ] `npm run lint` passes (no type errors).
- [ ] Icons are on a 24×24 grid, use `currentColor`, paths are SVGO-optimised.
- [ ] **I did NOT run `npm run build:packages`** — package releases are handled by the maintainer.
