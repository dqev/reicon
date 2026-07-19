// ignore_for_file: depend_on_referenced_packages
//
// This is a simple usage example for the `reicon` package.
//
// Run with: dart example/reicon_example.dart

import 'package:reicon_flutter/reicon_flutter.dart';

void main() {
  print('=== Reicon Icon Library ===\n');

  // 1. Access SVG path data
  final homePath = Reicon.outline.home;
  final settingsFilled = Reicon.filled.settings;

  print('Outline home path length: ${homePath.length} chars');
  print('Filled settings path length: ${settingsFilled.length} chars');

  // 2. Build a complete SVG string
  final svg = reiconSvg(
    Reicon.outline.star,
    size: 32,
    color: '#d97757',
  );
  print('\nStar icon SVG:');
  print(svg);

  // 3. Iterate over icons
  print('\nFirst 5 outline icons:');
  for (final name in Reicon.outline.names.take(5)) {
    print('  - $name');
  }

  // 4. Look up by name
  final icon = Reicon.outline['home'];
  print('\nHome icon by lookup: ${icon != null}');

  // 5. Metadata
  print('\nOutline: ${Reicon.outline.length} icons');
  print('Filled:  ${Reicon.filled.length} icons');

  // 6. Weight name
  print('Weight: ${Reicon.outline.name}');
  print('Weight: ${Reicon.filled.name}');
}
