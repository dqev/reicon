import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart } from 'reicon-react';
import DodoPaymentIcon from '@/components/ui/DodoPaymentIcon';
import { openSponsorCheckout } from '@/lib/sponsor';

const STORAGE_KEY = 'reicon-sponsor-overlay-v3';

export default function BrandsOverlay() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const dismissedRef = useRef(false);

  const isAllowedPage =
    pathname.startsWith('/icons') ||
    pathname.startsWith('/icon/') ||
    pathname.startsWith('/docs') ||
    pathname.startsWith('/packages') ||
    pathname.startsWith('/faq');

  useEffect(() => {
    if (!isAllowedPage) {
      setVisible(false);
      return;
    }

    const ownDismissed = (() => {
      try { return localStorage.getItem(STORAGE_KEY) === 'dismissed'; }
      catch { return false; }
    })();
    if (ownDismissed) { dismissedRef.current = true; return; }

    const delayTimer = setTimeout(() => {
      if (dismissedRef.current) return;
      setVisible(true);
      requestAnimationFrame(() => setAnimateIn(true));
    }, 1000);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [isAllowedPage]);

  const dismiss = () => {
    dismissedRef.current = true;
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 400);
    try { localStorage.setItem(STORAGE_KEY, 'dismissed'); } catch {}
  };

  if (!isAllowedPage || !visible) return null;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 md:right-10 z-[9998] pointer-events-none flex justify-end">
      <div
        className={`pointer-events-auto w-[285px] sm:w-[315px] max-w-[calc(100vw-24px)] bg-bg-base border border-text-base/10 rounded-[16px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.32)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
      >
        {/* OG Hero Image with Overlay Gradient */}
        <div className="relative h-[100px] sm:h-[112px] w-full overflow-hidden bg-gradient-to-br from-[#9B8AFB]/20 to-transparent">
          <img
            src="/og/og-image.png"
            alt="Sponsor Reicon"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent" />
          <div className="absolute top-2.5 left-3 flex items-center gap-1.5 bg-bg-base/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-text-base/10 text-[10px] font-bold tracking-[0.05em] uppercase text-[#9B8AFB]">
            <Heart size={11} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>Support Open Source</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="relative px-3.5 pb-3.5 pt-1">
          <div className="flex items-start justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-[14px] sm:text-[15px] font-semibold text-text-base leading-[1.25] tracking-[-0.01em]">
                Now you can sponsor Reicon!
              </h3>
              <p className="text-[11px] sm:text-[12px] text-text-base/55 leading-[1.4] mt-0.5">
                Support 2,700+ free icons &amp; updates via Dodo Payments.
              </p>
            </div>

            <div className="flex gap-1 shrink-0 pt-0.5">
              <button
                onClick={() => openSponsorCheckout()}
                className="inline-flex items-center gap-1.5 bg-[#9B8AFB] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full hover:bg-[#8B78FA] active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                <DodoPaymentIcon size={12} />
                <span>Sponsor</span>
              </button>

              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-text-base/5 hover:bg-text-base/10 transition-colors text-text-base/40 hover:text-text-base/70 cursor-pointer"
              >
                <re-icon icon="x" size="11" color="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


