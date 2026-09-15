import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import { useGlobal, initialFromSide, type TooltipData } from './context';

export function TooltipOverlay() {
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
      floatingOffset(rendered.data?.sideOffset ?? 14),
      flip(),
      shift({ padding: 8 }),
      floatingArrow({ element: arrowRef }),
    ],
  });

  React.useLayoutEffect(() => {
    if (rendered.data?.referenceEl) {
      refs.setReference(rendered.data.referenceEl);
      update();
    }
  }, [rendered.data, refs, update]);

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
              className="bg-[var(--tooltip-bg)] shadow-xl rounded-md"
            >
              <div className="px-3 py-1.5">
                <motion.div layout="preserve-aspect">
                  <p className="text-xs font-medium text-[var(--tooltip-text)] whitespace-nowrap">
                    {rendered.data.label}
                  </p>
                </motion.div>
              </div>

              <FloatingArrow
                ref={arrowRef}
                context={context}
                width={12}
                height={6}
                className="fill-[var(--tooltip-bg)]"
                tipRadius={2}
              />
            </motion.div>
          </div>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
}
