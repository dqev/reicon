/// Builds a complete SVG string from Reicon SVG path data.
///
/// [pathData] is raw SVG path markup from [ReiconWeight] getters.
/// [size] is the icon size in pixels (default 24).
/// [color] is any valid CSS color value (default `"currentColor"`).
///
/// ```dart
/// final svg = reiconSvg(Reicon.outline.home);
/// final colored = reiconSvg(Reicon.filled.star, size: 32, color: '#d97757');
/// ```
String reiconSvg(
  String pathData, {
  int size = 24,
  String color = 'currentColor',
}) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 24 24" fill="none" style="color: $color">$pathData</svg>';
}
