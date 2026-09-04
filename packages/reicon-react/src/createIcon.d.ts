import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

export type IconWeight = 'Filled' | 'Outline';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'color'> {
  /** Primary color. Default: inherits from CSS */
  color?: string;
  /** Secondary color. Default: same as color */
  secondaryColor?: string;
  /** Icon size (px when number). Default: `24` */
  size?: number | string;
  /** Icon weight / style. Default: `Outline` */
  weight?: IconWeight;
  /** Override the visual stroke width of Outline icons. Default: `1.5` */
  strokeWidth?: number | string;
}

export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

export declare function createIcon(
  displayName: string,
  iconData: Partial<Record<string, string>>,
): IconComponent;

export default createIcon;
