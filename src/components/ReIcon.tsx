import { createElement } from 'react';

export interface ReIconProps {
    icon?: string;
    weight?: string;
    size?: number | string;
    color?: string;
    className?: string;
    'aria-label'?: string;
}

/**
 * Typed React wrapper around the `<re-icon>` custom element (Reicon CDN runtime).
 * Renders the web component via createElement so consumers get full TS typing
 * without relying on JSX intrinsic-element augmentation.
 */
export default function ReIcon(props: ReIconProps) {
    return createElement('re-icon', props as Record<string, unknown>);
}
