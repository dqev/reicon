# reicon-compose (fork scaffold)

Jetpack Compose port of [Reicon](https://github.com/dqev/reicon) — MIT licensed.
Upstream source of truth stays `data/icon-data.json`; this package codegens
`ImageVector`s from it. No hand-edited vectors.

## Generate

```bash
# sample (5 icons, both weights, one file per icon)
python3 tool/build_kotlin.py --icons home,search,heart,chat,send2

# full library (~2676 icons -> ~2676 files, one per icon)
python3 tool/build_kotlin.py
```

Output: `src/main/kotlin/dev/reicon/<Pascal>.kt` with
`object <Pascal> { val Outline: ImageVector; val Filled: ImageVector }`
plus `Reicon.kt` (`ReiconWeight` + `ReiconIcon` composable wrapper).

`tool/add-to-knit.sh <kebab-name>...` generates the named icons and vendors
them into Knit's `:reicon-compose` Android library module
(`reicon-compose/src/main/java/dev/reicon`), which the app consumes via
`implementation(project(":reicon-compose"))`.

## Use

```kotlin
import dev.reicon.Home
import dev.reicon.ReiconIcon

ReiconIcon(Home.Outline, contentDescription = "Home")
Icon(Home.Filled, contentDescription = null, tint = KnitGreen)
```

Tint works because every `fill="currentColor"` becomes
`SolidColor(Color.Black)`; stroke icons become `fill = null` +
`stroke = SolidColor(Color.Black)` with matching width/cap/join.

## Publish path

Standalone Android library module (`com.android.library` +
`org.jetbrains.kotlin.plugin.compose`), artifact `dev.reicon:reicon-compose`,
published via `maven-publish` to Maven Central. Per-icon files keep dex/compile
cost tree-shakeable, mirroring `reicon-react`'s per-component output.

## Status

Scaffold: generator + 5 sample icons (`Home`, `Search`, `Heart`, `Chat`,
`Send2` covering fill, `EvenOdd`, and stroke cases). Full run untested for
path-data edge cases (`circle` elements are approximated as arcs; `opacity`
maps to fillAlpha/strokeAlpha; `clip-rule` ignored by design).
