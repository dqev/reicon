export interface IconOptions {
  /** Primary color. Default: `currentColor` */
  color?: string;
  /** Icon size (px when number). Default: `24` */
  size?: number | string;
  /** Override stroke-width on stroked icons */
  strokeWidth?: number | string;
  /** Additional CSS class */
  className?: string;
  /** Extra SVG attributes */
  attrs?: Record<string, string | number>;
}

export interface IconFunction {
  /** Create an SVG element for this icon */
  (options?: IconOptions): SVGSVGElement;
  /** Icon display name */
  displayName: string;
  /** Raw icon SVG markup */
  iconData: string;
  /** Returns the SVG markup as a string */
  toSvg(options?: IconOptions): string;
}

export declare function createIcon(
  displayName: string,
  iconData: string,
): IconFunction;

export default createIcon;
