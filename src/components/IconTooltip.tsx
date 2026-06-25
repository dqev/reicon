
import * as React from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Transition,
} from 'motion/react';
import {
  useFloating,
  autoUpdate,
  offset as floatingOffset,
  flip,
  shift,
  arrow as floatingArrow,
  FloatingPortal,
  FloatingArrow,
} from '@floating-ui/react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Side = 'top' | 'bottom' | 'left' | 'right';

type TooltipData = {
  label: string;
  referenceEl: HTMLElement;
  id: string;
  side: Side;
  sideOffset: number;
};

type GlobalCtx = {
  show: (data: TooltipData) => void;
  hide: () => void;
  hideNow: () => void;
  current: TooltipData | null;
  transition: Transition;
  globalId: string;
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const GlobalCtx = React.createContext<GlobalCtx | null>(null);
function useGlobal() {
  const c = React.useContext(GlobalCtx);
  if (!c) throw new Error('IconTooltipTrigger must be inside IconTooltipProvider');
  return c;
}

// ---------------------------------------------------------------------------
// The one floating tooltip overlay rendered at the Provider level
// ---------------------------------------------------------------------------
const TRANSITION: Transition = { type: 'spring', stiffness: 300, damping: 35 };

/** Direction the tooltip animates in from when entering */
function initialFromSide(side: Side) {
  if (side === 'top') return { y: 15 };
  if (side === 'bottom') return { y: -15 };
  if (side === 'left') return { x: 15 };
  return { x: -15 }; // right
}

const MotionFloatingArrow = motion.create(FloatingArrow);

function TooltipOverlay() {
  const { current, transition, globalId } = useGlobal();

  const [rendered, setRendered] = React.useState<{
    data: TooltipData | null;
    open: boolean;
  }>({ data: null, open: false });

  const arrowRef = React.useRef<SVGSVGElement>(null);

  const side = rendered.data?.side ?? 'bottom';

  const { refs, x, y, strategy, context, update } = useFloating({
    placement: side,
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset(rendered.data?.sideOffset ?? 0),
      flip(),
      shift({ padding: 8 }),
      floatingArrow({ element: arrowRef }),
    ],
  });

  // Sync reference element
  React.useLayoutEffect(() => {
    if (rendered.data?.referenceEl) {
      refs.setReference(rendered.data.referenceEl);
      update();
    }
  }, [rendered.data, refs, update]);

  // Sync open state
  React.useEffect(() => {
    if (current) {
      setRendered({ data: current, open: true });
    } else {
      setRendered((p) => (p.data ? { ...p, open: false } : p));
    }
  }, [current]);

  const ready = x != null && y != null;

  return (
    <AnimatePresence mode="wait">
      {rendered.data && ready && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: 0,
              left: 0,
              zIndex: 9999,
              transform: `translate3d(${x}px, ${y}px, 0)`,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              layoutId={`icon-tooltip-${globalId}`}
              initial={{ opacity: 0, scale: 0, ...initialFromSide(side) }}
              animate={
                rendered.open
                  ? { opacity: 1, scale: 1, x: 0, y: 0 }
                  : { opacity: 0, scale: 0, ...initialFromSide(side) }
              }
              exit={{ opacity: 0, scale: 0, ...initialFromSide(side) }}
              onAnimationComplete={() => {
                if (!rendered.open) setRendered({ data: null, open: false });
              }}
              transition={transition}
              style={{ position: 'relative', transformOrigin: 'center top' }}
              // No overflow-hidden here — arrow must render outside the box
              className="bg-white shadow-xl rounded-md"
            >
              {/* Text content */}
              <div className="px-3 py-1.5">
                <motion.div layout="preserve-aspect">
                  <p className="text-xs font-medium text-[#09090b] whitespace-nowrap">
                    {rendered.data.label}
                  </p>
                </motion.div>
              </div>

              {/* Pointing arrow — FloatingArrow renders outside the box, clip must be off */}
              <MotionFloatingArrow
                ref={arrowRef}
                context={context}
                layoutId={`icon-tooltip-arrow-${globalId}`}
                transition={transition}
                width={12}
                height={6}
                className="fill-white"
                tipRadius={2}
              />
            </motion.div>
          </div>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export interface IconTooltipProviderProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

export function IconTooltipProvider({
  children,
  openDelay = 300,
  closeDelay = 300,
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
      // If already showing a tooltip, switch immediately (no delay)
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

  // Hide on scroll / resize / escape — same as animate-ui
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

// ---------------------------------------------------------------------------
// Trigger — wrap each icon card with this
// ---------------------------------------------------------------------------
export interface IconTooltipTriggerProps {
  children: React.ReactNode;
  label: string;
  side?: Side;
  sideOffset?: number;
}

export function IconTooltipTrigger({
  children,
  label,
  side = 'bottom',
  sideOffset = 14,
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
      data-state={current?.id === id ? 'open' : 'closed'}
    >
      {children}
    </div>
  );
}
