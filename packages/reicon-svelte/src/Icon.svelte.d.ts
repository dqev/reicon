import { SvelteComponent } from 'svelte';

export interface IconComponentProps {
  /** Primary icon color. Default: `currentColor` */
  color?: string;
  /** Icon size (px when number, or any CSS unit). Default: `24` */
  size?: number | string;
  /** Icon weight / style: `'Outline'` | `'Filled'`. Default: `'Outline'` */
  weight?: 'Outline' | 'Filled';
  /** Override stroke-width on stroked weights */
  strokeWidth?: number | string;
  /** Icon svg path data for different weights */
  iconData?: Record<string, string>;
  // allow other standard SVG/HTML attributes
  [key: string]: any;
}

export default class Icon extends SvelteComponent<IconComponentProps, any, any> {}
