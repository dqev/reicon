# Changelog

## Unreleased

- Fix JitPack installs: add root `jitpack.yml` that builds `:library` from
  `packages/reicon-compose` (repo root has no Gradle build file, so JitPack
  failed with "No build file found")
- Publish version now follows the JitPack `VERSION` (tag / `main-SNAPSHOT`)
  instead of hardcoded `1.0.0`, so requested versions resolve correctly.
  Install with `implementation("dev.reicon:reicon-compose:main-SNAPSHOT")`

## 1.0.0

- Initial release of the official `reicon-compose` package for [reicon.dev](https://reicon.dev)
- 2676 icons in **Outline** weight via `<Name>.Outline` (e.g. `Home.Outline`)
- 2676 icons in **Filled** weight via `<Name>.Filled` (e.g. `Home.Filled`)
- `ReiconIcon()` composable wrapper with `size` and `tint` parameters
- Native `ImageVector`s, zero runtime dependencies beyond Compose UI
- Known limitation: 3 Outline icons (`refresh3`, `ticket-alt`, `ticket3`) use
  `stroke-dasharray`, unsupported by `ImageVector`, and render solid
