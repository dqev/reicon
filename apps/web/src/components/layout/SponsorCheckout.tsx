import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { openSponsorCheckout } from '@/lib/sponsor';

interface SponsorCheckoutContextValue {
  startSponsorCheckout: () => void;
}

const SponsorCheckoutContext = createContext<SponsorCheckoutContextValue | null>(null);

export function useSponsorCheckout() {
  const context = useContext(SponsorCheckoutContext);
  if (!context) {
    throw new Error('useSponsorCheckout must be used inside SponsorCheckoutProvider');
  }
  return context;
}

export function SponsorCheckoutProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const startedRef = useRef(false);
  const openTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const startSponsorCheckout = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setOpen(true);

    openTimerRef.current = window.setTimeout(() => {
      openTimerRef.current = null;
      openSponsorCheckout(() => {
        setOpen(false);
        startedRef.current = false;
      });
    }, 700);

    hideTimerRef.current = window.setTimeout(() => {
      hideTimerRef.current = null;
      setOpen(false);
      startedRef.current = false;
    }, 5000);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <SponsorCheckoutContext.Provider value={{ startSponsorCheckout }}>
      {children}

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0c0c0c]/50 px-4 backdrop-blur-[2px]"
          role="status"
          aria-live="polite"
        >
          <p className="flex items-center gap-2.5 text-[14px] font-medium text-[#ededed]">
            Opening Dodo Payments
            <img src="/framework-logos/dodo.svg" alt="" width="18" height="18" className="h-[18px] w-[18px]" />
          </p>
        </div>
      )}
    </SponsorCheckoutContext.Provider>
  );
}
