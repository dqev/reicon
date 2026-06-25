'use client';

import * as React from 'react';
import { AnimatePresence, motion, type Transition } from 'motion/react';

// ---------------------------------------------------------------------------
// Highlight – card cursor effect
// ---------------------------------------------------------------------------

type Bounds = { top: number; left: number; width: number; height: number };

type HighlightCtx = {
  activeValue: string | null;
  setActiveValue: (v: string | null) => void;
  setBounds: (r: DOMRect) => void;
  clearBounds: () => void;
  id: string;
  className?: string;
  style?: React.CSSProperties;
  transition: Transition;
  exitDelay: number;
};

const Ctx = React.createContext<HighlightCtx | undefined>(undefined);

function useCtx() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error('HighlightItem must be inside Highlight');
  return c;
}

// ---------------------------------------------------------------------------
// Highlight – wraps the grid and renders the travelling highlight element
// ---------------------------------------------------------------------------
export interface HighlightProps {
  children: React.ReactNode;
  className?: string;   // classes applied to the highlight overlay div
  style?: React.CSSProperties;
  transition?: Transition;
  exitDelay?: number;   // ms
}

export function Highlight({
  children,
  className = 'absolute inset-0 rounded-xl ring-2 ring-white/30 bg-white/[0.06] pointer-events-none',
  style,
  transition = { type: 'spring', stiffness: 350, damping: 35 },
  exitDelay = 150,
}: HighlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeValue, setActiveValue] = React.useState<string | null>(null);
  const [bounds, setBoundsState] = React.useState<Bounds | null>(null);
  const id = React.useId();

  const safeSetBoundsRef = React.useRef<((r: DOMRect) => void) | undefined>(undefined);
  React.useEffect(() => {
    safeSetBoundsRef.current = (rect: DOMRect) => {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      setBoundsState({ top: rect.top - cr.top, left: rect.left - cr.left, width: rect.width, height: rect.height });
    };
  });

  const setBounds = React.useCallback((r: DOMRect) => safeSetBoundsRef.current?.(r), []);
  const clearBounds = React.useCallback(() => setBoundsState(null), []);

  return (
    <Ctx.Provider value={{ activeValue, setActiveValue, setBounds, clearBounds, id, className, style, transition, exitDelay }}>
      <div ref={containerRef} style={{ position: 'relative' }}>
        <AnimatePresence initial={false} mode="wait">
          {bounds && (
            <motion.div
              key="highlight"
              data-slot="highlight"
              animate={{ top: bounds.top, left: bounds.left, width: bounds.width, height: bounds.height, opacity: 1 }}
              initial={{ top: bounds.top, left: bounds.left, width: bounds.width, height: bounds.height, opacity: 0 }}
              exit={{ opacity: 0, transition: { ...transition, delay: (transition as { delay?: number })?.delay ?? 0 + exitDelay / 1000 } }}
              transition={transition}
              style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none', ...style }}
              className={className}
            />
          )}
        </AnimatePresence>
        {children}
      </div>
    </Ctx.Provider>
  );
}

// ---------------------------------------------------------------------------
// HighlightItem – wraps each card; tracks hover → reports bounds to parent
// ---------------------------------------------------------------------------
export interface HighlightItemProps {
  children: React.ReactNode;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function HighlightItem({ children, value, className, style }: HighlightItemProps) {
  const { setActiveValue, setBounds, clearBounds } = useCtx();
  const itemId = React.useId();
  const localRef = React.useRef<HTMLDivElement>(null);
  const id = value ?? itemId;

  const handleMouseEnter = React.useCallback(() => {
    if (!localRef.current) return;
    setBounds(localRef.current.getBoundingClientRect());
    setActiveValue(id);
  }, [id, setBounds, setActiveValue]);

  const handleMouseLeave = React.useCallback(() => {
    setActiveValue(null);
    clearBounds();
  }, [clearBounds, setActiveValue]);

  return (
    <div
      ref={localRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', zIndex: 1, ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
