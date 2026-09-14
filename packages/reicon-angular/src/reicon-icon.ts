import { Directive, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type IconWeight = 'Outline' | 'Filled';

export interface IconProps {
  /** Primary icon color. Defaults to the inherited CSS `currentColor`. */
  color?: string;
  /** Secondary color token used by icons that expose one. */
  secondaryColor?: string;
  /** Icon size. Numbers are rendered as SVG pixels; strings accept CSS units. */
  size?: number | string;
  /** Visual weight. */
  weight?: IconWeight;
  /** Override the source stroke width where supported. */
  strokeWidth?: number | string;
  /** CSS class applied to the generated SVG element. */
  class?: string;
  /** Inline styles applied to the generated SVG element. */
  style?: string | Record<string, string | number>;
  id?: string;
  title?: string;
  role?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean | string;
}

export type ReiconIconData = Partial<Record<'F' | 'O', string>>;

const DEFAULT_STROKE_WIDTH = 1.5;

function getNumericStrokeWidth(value: number | string | undefined): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? Math.max(0, value) : null;
  }

  if (typeof value !== 'string' || value.trim() === '') {
    return null;
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? Math.max(0, numericValue) : null;
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;');
}

function hashIconHtml(html: string): string {
  let hash = 2166136261;

  for (let index = 0; index < html.length; index += 1) {
    hash ^= html.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

function adjustmentPrefix(displayName: string, html: string): string {
  const safeName = displayName.replace(/[^a-zA-Z0-9_-]/g, '-');
  return `reicon-${safeName}-${hashIconHtml(html)}`;
}

function adjustExpandedPaths(displayName: string, html: string, strokeWidth: number): string {
  if (strokeWidth === DEFAULT_STROKE_WIDTH) {
    return html;
  }

  const adjustment = Math.abs(strokeWidth - DEFAULT_STROKE_WIDTH);
  if (strokeWidth > DEFAULT_STROKE_WIDTH) {
    return `<g stroke="currentColor" stroke-width="${adjustment}" stroke-linecap="round" stroke-linejoin="round" paint-order="stroke fill">${html}</g>`;
  }

  const safeStrokeWidth = String(strokeWidth).replace(/[^a-zA-Z0-9_-]/g, '-');
  const prefix = adjustmentPrefix(displayName, html);
  const adjustmentId = `${prefix}-${safeStrokeWidth}`;
  const sourceId = `${adjustmentId}-source`;
  const maskId = `${adjustmentId}-mask`;
  const inheritableHtml = html.replace(/\sfill="currentColor"/g, '');

  return `<defs><g id="${sourceId}">${inheritableHtml}</g><mask id="${maskId}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="-12" y="-12" width="48" height="48"><use href="#${sourceId}" fill="white"/><use href="#${sourceId}" fill="none" stroke="black" stroke-width="${adjustment}" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><use href="#${sourceId}" fill="currentColor" mask="url(#${maskId})"/>`;
}

function toCssPropertyName(property: string): string {
  return property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function styleToString(style: string | Record<string, string | number> | undefined): string | null {
  if (!style) {
    return null;
  }

  if (typeof style === 'string') {
    return style;
  }

  return Object.entries(style)
    .map(([property, value]) => `${toCssPropertyName(property)}: ${value}`)
    .join('; ');
}

/**
 * Base class shared by every generated standalone Angular icon component.
 * The icon SVG markup is generated from `data/icon-data.json` and trusted only
 * after the build has embedded it in this package.
 */
@Directive()
export abstract class ReiconIcon {
  protected abstract readonly iconData: ReiconIconData;

  private readonly sanitizer = inject(DomSanitizer);

  @Input() color: string | undefined;
  @Input() secondaryColor: string | undefined;
  @Input() size: number | string = 24;
  @Input() weight: IconWeight = 'Outline';
  @Input() strokeWidth: number | string | undefined;
  @Input({ alias: 'class' }) className = '';
  @Input({ alias: 'style' }) styleValue: string | Record<string, string | number> | undefined;
  @Input() id: string | undefined;
  @Input() title: string | undefined;
  @Input() role: string | undefined;
  @Input({ alias: 'aria-label' }) ariaLabel: string | undefined;
  @Input({ alias: 'aria-hidden' }) ariaHidden: boolean | string | undefined;

  protected get svgMarkup(): SafeHtml {
    const key = this.weight === 'Filled' ? 'F' : 'O';
    let html = this.iconData[key] ?? this.iconData.O ?? this.iconData.F ?? '';

    const secondaryColor = this.secondaryColor ?? this.color ?? 'currentColor';
    html = html.replace(/__RI_SECONDARY__/g, escapeAttribute(secondaryColor));

    const numericStrokeWidth = getNumericStrokeWidth(this.strokeWidth);
    if (numericStrokeWidth !== null) {
      if (html.includes('stroke-width=')) {
        html = html.replace(/\sstroke-width="[^"]*"/g, ` stroke-width="${numericStrokeWidth}"`);
      } else {
        html = adjustExpandedPaths(this.constructor.name, html, numericStrokeWidth);
      }
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  protected get svgClass(): string {
    return ['reicon', this.className].filter(Boolean).join(' ');
  }

  protected get svgStyle(): string | null {
    return styleToString(this.styleValue);
  }
}
