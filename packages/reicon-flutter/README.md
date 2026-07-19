<p align="center">
  <a href="https://reicon.dev">
    <img src="https://reicon.dev/readme-assets/flutter.svg" alt="Reicon Flutter — SVG Icon Library for Dart & Flutter" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://pub.dev/packages/reicon_flutter"><img src="https://img.shields.io/pub/v/reicon_flutter?color=black&label=pub" alt="pub version" /></a>
  <a href="https://pub.dev/packages/reicon_flutter/score"><img src="https://img.shields.io/pub/points/reicon_flutter?color=black" alt="pub points" /></a>
  <a href="https://pub.dev/packages/reicon_flutter"><img src="https://img.shields.io/pub/likes/reicon_flutter?color=black" alt="pub likes" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
</p>

<h1 align="center">Reicon for Dart &amp; Flutter</h1>

<p align="center">
  <b>2674+ pixel-perfect SVG icons</b> • Outline & Filled weights • Dart & Flutter • Zero dependencies • MIT Licensed
</p>

<p align="center">
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API</a> •
  <a href="#icon-naming">Icon Naming</a> •
  <a href="#related-packages">Related</a> •
  <a href="#links">Links</a>
</p>

**Reicon Flutter** is the official Dart & Flutter package for <a href="https://reicon.dev">Reicon</a> — a free, open-source SVG icon library featuring 2674+ handcrafted, grid-aligned icons. Every icon is available in both Outline and Filled weights as raw SVG path data, ready for any Dart or Flutter SVG renderer.

| 🔗 &nbsp; Resource | Link |
|---|---|
| 🌐 &nbsp; Website & icon browser | [reicon.dev](https://reicon.dev) |
| 📖 &nbsp; Documentation | [reicon.dev/docs](https://reicon.dev/docs) |
| 🎨 &nbsp; Figma plugin | [reicon.dev/docs/figma](https://reicon.dev/docs/figma) |

---

## Install

Add to your `pubspec.yaml`:

```yaml
dependencies:
  reicon_flutter: ^1.0.0
```

```bash
dart pub get
# or for Flutter: flutter pub get
```

<details>
<summary><b>Requirements</b></summary>

- **Dart** ≥ 3.0
- For Flutter: **flutter_svg** (recommended for rendering)
- No other dependencies required.

</details>

---

## Usage

```dart
import 'package:reicon_flutter/reicon_flutter.dart';
```

### Get SVG path data

```dart
// Outline weight (default)
String homePath = Reicon.outline.home;

// Filled weight
String settingsPath = Reicon.filled.settings;
```

### Build a complete SVG string

```dart
String svg = reiconSvg(
  Reicon.outline.star,
  size: 32,
  color: '#d97757',
);
```

### Use with Flutter + flutter_svg

```dart
import 'package:flutter_svg/flutter_svg.dart';

SvgPicture.string(
  reiconSvg(Reicon.outline.heart, size: 24),
  colorFilter: ColorFilter.mode(Colors.red, BlendMode.srcIn),
)
```

### Look up by name at runtime

```dart
String? icon = Reicon.outline['home'];  // SVG path or null
```

### Iterate over all icons

```dart
for (String name in Reicon.outline.names) {
  print('$name: ${Reicon.outline[name]}');
}
print('Total: ${Reicon.outline.length} icons');
```

---

## API

### `Reicon`

Entry point. Static accessors for each weight:

| Member | Return type | Description |
|--------|-------------|-------------|
| `Reicon.outline` | `ReiconWeight` | All icons in Outline weight |
| `Reicon.filled` | `ReiconWeight` | All icons in Filled weight |

### `ReiconWeight`

Access icons within a weight:

| Member | Return type | Description |
|--------|-------------|-------------|
| `weight.name` | `String` | Display name (`"Outline"` / `"Filled"`) |
| `weight.length` | `int` | Number of icons |
| `weight.names` | `Iterable<String>` | All icon names |
| `weight[iconName]` | `String?` | Look up by name |
| `weight.iconName` | `String` | Direct getter for each icon (e.g. `home`, `settings`) |

### `reiconSvg()`

```dart
String reiconSvg(String pathData, {int size = 24, String color = 'currentColor'})
```

Wraps raw SVG path data in a complete `<svg>` tag.

---

## Icon Naming

Icons use **camelCase** derived from their original kebab-case names:

| Original (kebab) | Dart accessor |
|------------------|---------------|
| `arrow-down` | `Reicon.outline.arrowDown` |
| `arrow-down-2` | `Reicon.outline.arrowDown2` |
| `3d-box` | `Reicon.outline.i3dBox` |
| `align-center-h` | `Reicon.outline.alignCenterH` |
| `user-circle` | `Reicon.outline.userCircle` |

Names starting with a digit are prefixed with `i` (e.g. `3d-box` → `i3dBox`).

Browse and search all 2674+ icons at <a href="https://reicon.dev">reicon.dev</a>.

---

## Features

- **2674+ icons** — Handcrafted, pixel-perfect SVGs across a wide range of categories
- **Two weights** — Outline and Filled, with consistent 24×24 grid alignment
- **Zero dependencies** — Pure Dart, no native plugins required
- **Runtime lookup** — Access icons by string name with `Reicon.outline['name']`
- **SVG builder** — `reiconSvg()` helper wraps path data in a complete SVG string
- **Iterable** — Iterate over all icon names and path data
- **MIT licensed** — Free for personal and commercial use

---

## Related packages

| Package | Description |
|---------|-------------|
| [`reicon`](https://npmjs.com/package/reicon) | Core vanilla JS + CDN |
| [`reicon-react`](https://npmjs.com/package/reicon-react) | React components for all 2674+ icons |
| [`reicon-vue`](https://npmjs.com/package/reicon-vue) | Vue 3 components for all 2674+ icons |
| [`reicon-svelte`](https://npmjs.com/package/reicon-svelte) | Svelte components for all 2674+ icons |
| [`reicon-react-native`](https://npmjs.com/package/reicon-react-native) | React Native components |
| [reicon-figma](https://reicon.dev/figma) | Figma plugin |

---

## Links

- 🌐 &nbsp; Website: [reicon.dev](https://reicon.dev)
- 📖 &nbsp; Documentation: [reicon.dev/docs](https://reicon.dev/docs)
- 📦 &nbsp; pub: [pub.dev/packages/reicon_flutter](https://pub.dev/packages/reicon_flutter)
- 🐙 &nbsp; GitHub: [github.com/dqev/reicon](https://github.com/dqev/reicon)
- 🐛 &nbsp; Issues: [github.com/dqev/reicon/issues](https://github.com/dqev/reicon/issues)

---

## License

MIT © [Dev Chauhan](https://devchauhan.in)

Free to use in personal and commercial projects. Attribution is appreciated but not required.
