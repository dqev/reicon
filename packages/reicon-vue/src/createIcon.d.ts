import { DefineComponent, ExtractPropTypes } from 'vue';

export type IconWeight = 'Filled' | 'Outline';

export declare const iconProps: {
  color: { type: StringConstructor; default: 'currentColor' };
  size: { type: (NumberConstructor | StringConstructor)[]; default: 24 };
  weight: { type: StringConstructor; default: 'Outline'; validator: (v: string) => boolean };
  strokeWidth: { type: (NumberConstructor | StringConstructor)[]; default: undefined };
};

export type IconProps = Partial<ExtractPropTypes<typeof iconProps>>;

export type IconComponent = DefineComponent<{
  /** Primary color. Default: `currentColor` */
  color?: string;
  /** Icon size (px when number). Default: `24` */
  size?: number | string;
  /** Icon weight / style. Default: `Outline` */
  weight?: IconWeight;
  /** Override stroke-width on stroked weights */
  strokeWidth?: number | string;
}>;

export declare function createIcon(
  displayName: string,
  iconData: Partial<Record<string, string>>,
): IconComponent;

export default createIcon;
