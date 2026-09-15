import * as React from 'react';
import { LayoutGroup } from 'motion/react';
import { GlobalCtx, TRANSITION, useGlobal, type TooltipData, type Side } from './context';
import { TooltipOverlay } from './TooltipOverlay';

export interface IconTooltipProviderProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

export function IconTooltipProvider({
  children,
  openDelay = 100,
  closeDelay = 120,
}: IconTooltipProviderProps) {
  const globalId = React.useId();
  const [current, setCurrent] = React.useState<TooltipData | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCloseRef = React.useRef(0);

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const show = React.useCallback(
    (data: TooltipData) => {
      clear();
      if (current !== null) {
        setCurrent(data);
        return;
      }
      const now = Date.now();
      const delay = now - lastCloseRef.current < closeDelay ? 0 : openDelay;
      timerRef.current = setTimeout(() => setCurrent(data), delay);
    },
    [current, openDelay, closeDelay],
  );

  const hide = React.useCallback(() => {
    clear();
    timerRef.current = setTimeout(() => {
      setCurrent(null);
      lastCloseRef.current = Date.now();
    }, closeDelay);
  }, [closeDelay]);

  const hideNow = React.useCallback(() => {
    clear();
    setCurrent(null);
    lastCloseRef.current = Date.now();
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hideNow();
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('scroll', hideNow, true);
    window.addEventListener('resize', hideNow, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('scroll', hideNow, true);
      window.removeEventListener('resize', hideNow, true);
    };
  }, [hideNow]);

  return (
    <GlobalCtx.Provider value={{ show, hide, hideNow, current, transition: TRANSITION, globalId }}>
      <LayoutGroup>
        {children}
      </LayoutGroup>
      <TooltipOverlay />
    </GlobalCtx.Provider>
  );
}

export interface IconTooltipTriggerProps {
  children: React.ReactNode;
  label: string;
  side?: Side;
  sideOffset?: number;
  className?: string;
}

export function IconTooltipTrigger({
  children,
  label,
  side = 'bottom',
  sideOffset = 14,
  className = 'w-full h-full aspect-square block',
}: IconTooltipTriggerProps) {
  const { show, hide, current } = useGlobal();
  const id = React.useId();
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = React.useCallback(() => {
    if (!ref.current) return;
    show({ label, referenceEl: ref.current, id, side, sideOffset });
  }, [show, label, id, side, sideOffset]);

  const handleMouseLeave = React.useCallback(() => {
    hide();
  }, [hide]);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      data-state={current?.id === id ? 'open' : 'closed'}
    >
      {children}
    </div>
  );
}
