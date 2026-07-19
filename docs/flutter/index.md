# Reicon for Flutter

> 2700+ handcrafted, pixel-perfect SVG icons in Outline and Filled weights — now available for Flutter.

## Install

Add to your `pubspec.yaml`:

```yaml
dependencies:
  reicon_flutter: ^1.0.0
```

```bash
flutter pub get
```

## Usage

```dart
import 'package:reicon_flutter/reicon_flutter.dart';
import 'package:flutter_svg/flutter_svg.dart';
```

### Outline icons

```dart
SvgPicture.string(
  reiconSvg(Reicon.outline.home, size: 24),
)
```

### Filled icons

```dart
SvgPicture.string(
  reiconSvg(Reicon.filled.settings, size: 24),
)
```

### With custom color

```dart
SvgPicture.string(
  reiconSvg(Reicon.outline.star, size: 32),
  colorFilter: ColorFilter.mode(Colors.amber, BlendMode.srcIn),
)
```

## API

| Accessor | Description |
|----------|-------------|
| `Reicon.outline.*` | 2674 outline icons |
| `Reicon.filled.*` | 2674 filled icons |
| `reiconSvg(path)` | Build SVG string from path data |

## Links

- [pub.dev](https://pub.dev/packages/reicon_flutter)
- [Source](./packages/reicon-flutter)
