<p align="center">
  <a href="https://reicon.dev">
    <img src="https://reicon.dev/readme-assets/flutter.svg" alt="Flutter" width="80" />
  </a>
</p>

<p align="center">
  <a href="https://reicon.dev">
    <img src="https://reicon.dev/og-image.png" alt="Reicon" width="400" />
  </a>
</p>

<h1 align="center">Reicon for Dart &amp; Flutter</h1>

<p align="center">
  <a href="https://pub.dev/packages/reicon_flutter"><img src="https://img.shields.io/pub/v/reicon_flutter?color=6C5CE7&label=pub" alt="pub version" /></a>
  <a href="https://pub.dev/packages/reicon_flutter/score"><img src="https://img.shields.io/pub/points/reicon_flutter?color=6C5CE7" alt="pub points" /></a>
  <a href="https://pub.dev/packages/reicon_flutter"><img src="https://img.shields.io/pub/likes/reicon_flutter?color=6C5CE7" alt="pub likes" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
</p>

<p align="center">
  2700+ handcrafted, pixel-perfect SVG icons in <strong>Outline</strong> and <strong>Filled</strong> weights.
  Free, open-source, MIT licensed.
</p>

<p align="center">
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API</a> •
  <a href="#icon-naming">Naming</a> •
  <a href="#related-packages">Related</a> •
  <a href="https://reicon.dev/icons">Browse Icons</a>
</p>

---

## Overview

**reicon_flutter** is the official Dart & Flutter package for [Reicon](https://reicon.dev) — the icon library designers actually want.

2700+ precision-crafted, open-source SVG icons, all hand-drawn on a strict 24×24 grid. No auto-generation, no AI shortcuts — just obsessive attention to detail. Every icon ships in two weights — **Outline** (1.5px stroke) and **Filled** (solid).

Use it with any SVG renderer in Dart, Flutter, or server-side projects.

| Weight | Icons | Accessor |
|--------|-------|----------|
| Outline | 2674 | `Reicon.outline.*` |
| Filled | 2674 | `Reicon.filled.*` |

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

// Result: '<svg xmlns="..." width="32" height="32" ...><path d="..."/></svg>'
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

| Original (kebab) | Dart constant |
|------------------|---------------|
| `arrow-down` | `Reicon.outline.arrowDown` |
| `arrow-down-2` | `Reicon.outline.arrowDown2` |
| `3d-box` | `Reicon.outline.i3dBox` |
| `align-center-h` | `Reicon.outline.alignCenterH` |
| `user-circle` | `Reicon.outline.userCircle` |

Names starting with a digit are prefixed with `i` (e.g. `3d-box` → `i3dBox`).

---

## Related Packages

| Package | Description |
|---------|-------------|
| [reicon](https://npmjs.com/package/reicon) | Core vanilla JS + CDN |
| [reicon-react](https://npmjs.com/package/reicon-react) | React components |
| [reicon-vue](https://npmjs.com/package/reicon-vue) | Vue 3 components |
| [reicon-svelte](https://npmjs.com/package/reicon-svelte) | Svelte components |
| [reicon-react-native](https://npmjs.com/package/reicon-react-native) | React Native components |
| [reicon-figma](https://reicon.dev/figma) | Figma plugin |
| [reicon-vscode](https://marketplace.visualstudio.com/items?itemName=DevChauhan.reicon) | VS Code extension |

---

## Links

- 🌐 **Website & icon browser**: [reicon.dev](https://reicon.dev)
- 📖 **Documentation**: [reicon.dev/docs](https://reicon.dev/docs)
- 🐙 **GitHub**: [github.com/dqev/reicon](https://github.com/dqev/reicon)
- 🐛 **Issues**: [github.com/dqev/reicon/issues](https://github.com/dqev/reicon/issues)

---

## License

MIT © [Dev Chauhan](https://devchauhan.in). Free to use in personal and commercial projects.
