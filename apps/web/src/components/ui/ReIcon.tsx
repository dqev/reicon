import { createElement } from 'react';

export interface ReIconProps {
    icon?: string;
    weight?: string;
    size?: number | string;
    color?: string;
    className?: string;
    'aria-label'?: string;
}

export default function ReIcon(props: ReIconProps) {
    return createElement('re-icon', props as Record<string, unknown>);
}
