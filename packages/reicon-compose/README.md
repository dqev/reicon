# Reicon for Jetpack Compose

**2676+ pixel-perfect icons** • Outline & Filled weights • Native `ImageVector` • Zero runtime dependencies • MIT Licensed

**Reicon Compose** is the official Jetpack Compose package for [Reicon](https://reicon.dev) — a free, open-source icon library featuring 2676+ handcrafted, grid-aligned icons. Every icon is available in both Outline and Filled weights as a native Compose `ImageVector`, ready to use with `Icon()`.

| 🔗 &nbsp; Resource | Link |
|---|---|
| 🌐 &nbsp; Website & icon browser | [reicon.dev](https://reicon.dev) |
| 📖 &nbsp; Documentation | [reicon.dev/docs](https://reicon.dev/docs) |

---

## Install

```kotlin
// settings.gradle.kts
maven { url = uri("https://jitpack.io") }

// app/build.gradle.kts
implementation("dev.reicon:reicon-compose:1.0.0")
```

<details>
<summary><b>Requirements</b></summary>

- **minSdk** 24
- **Jetpack Compose** (BOM 2026.04.01 or newer)
- No other dependencies required.

</details>

---

## Usage

```kotlin
import dev.reicon.Home
import dev.reicon.ReiconIcon
```

### Outline weight (default)

```kotlin
ReiconIcon(Home.Outline, contentDescription = "Home")
```

### Filled weight

```kotlin
Icon(Home.Filled, contentDescription = null)
```

### With custom color and size

```kotlin
ReiconIcon(
    Home.Outline,
    contentDescription = "Home",
    size = 32.dp,
    tint = Color(0xFF9B8AFB)
)
```

---

## API

### Icon objects

One object per icon, one `ImageVector` per weight:

| Accessor | Return type | Description |
|--------|-------------|-------------|
| `<Name>.Outline` | `ImageVector` | Outline weight (e.g. `Home.Outline`) |
| `<Name>.Filled` | `ImageVector` | Filled weight (e.g. `Home.Filled`) |

### `ReiconIcon()`

```kotlin
@Composable
fun ReiconIcon(
    icon: ImageVector,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    size: Dp = 24.dp,
    tint: Color = LocalContentColor.current
)
```

Wrapper around Material3 `Icon` with `size` and `tint` parameters.

---

## Icon Naming

Icons use **PascalCase** derived from their original kebab-case names:

| Original (kebab) | Compose accessor |
|------------------|------------------|
| `arrow-down` | `ArrowDown.Outline` |
| `home-2` | `Home2.Filled` |
| `send-2` | `Send2.Outline` |

Browse and search all 2676+ icons at [reicon.dev](https://reicon.dev).

---

## Features

- **2676+ icons** — Handcrafted, pixel-perfect vectors across 38 categories
- **Two weights** — Outline and Filled, consistent 24×24 grid
- **Native** — Real `ImageVector`s, tintable, no SVG renderer needed
- **Tree-shakeable** — One file per icon; R8 strips what you don't use
- **MIT licensed** — Free for personal and commercial use

---

## Related packages

| Package | Description |
|---------|-------------|
| [`reicon`](https://npmjs.com/package/reicon) | Core vanilla JS + CDN |
| [`reicon-react`](https://npmjs.com/package/reicon-react) | React components |
| [`reicon-vue`](https://npmjs.com/package/reicon-vue) | Vue 3 components |
| [`reicon-svelte`](https://npmjs.com/package/reicon-svelte) | Svelte components |
| [`reicon_flutter`](https://pub.dev/packages/reicon_flutter) | Dart & Flutter SVGs |

---

## Regenerating

Vectors are generated from [`data/icon-data.json`](../../data/icon-data.json), the single source of truth. Never edit them by hand:

```bash
python3 tool/build_kotlin.py
```

---

## License

MIT © Reicon

Free to use in personal and commercial projects. Attribution is appreciated but not required.
