import * as React from 'react';
import type { Transition } from 'motion/react';

export type Side = 'top' | 'bottom' | 'left' | 'right';

export type TooltipData = {
  label: string;
  referenceEl: HTMLElement;
  id: string;
  side: Side;
  sideOffset: number;
};

export type GlobalCtx = {
  show: (data: TooltipData) => void;
  hide: () => void;
  hideNow: () => void;
  current: TooltipData | null;
  transition: Transition;
  globalId: string;
};

export const GlobalCtx = React.createContext<GlobalCtx | null>(null);

export function useGlobal() {
  const c = React.useContext(GlobalCtx);
  if (!c) throw new Error('IconTooltipTrigger must be inside IconTooltipProvider');
  return c;
}

export const TRANSITION: Transition = { type: 'spring', stiffness: 300, damping: 35 };

export function initialFromSide(side: Side) {
  if (side === 'top') return { y: 15 };
  if (side === 'bottom') return { y: -15 };
  if (side === 'left') return { x: 15 };
  return { x: -15 };
}
