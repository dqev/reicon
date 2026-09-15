import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, CheckCircle, X } from 'reicon-react';
import { initDodoPayments } from '@/lib/sponsor';

export function fireSponsorConfetti() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Confetti cannons from left and right
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#9B8AFB', '#FFDD00', '#61DAFB', '#FF6B6B', '#38EF7D'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#9B8AFB', '#FFDD00', '#61DAFB', '#FF6B6B', '#38EF7D'],
    });
  }, 250);
}

export default function SponsorHandler() {
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const triggerSuccess = () => {
    fireSponsorConfetti();
    setShowThankYouModal(true);
  };

  useEffect(() => {
    // 1. Initialize Dodo Payments event listener
    initDodoPayments(() => {
      triggerSuccess();
    });

    // 2. Check URL parameters for successful checkout return
    const urlParams = new URLSearchParams(window.location.search);
    const isSuccessParam =
      urlParams.get('sponsored') === 'true' ||
      urlParams.get('payment') === 'success' ||
      urlParams.get('status') === 'success' ||
      urlParams.get('checkout') === 'success';

    if (isSuccessParam) {
      triggerSuccess();

      // Clean URL params without reloading page
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    // 3. Listen to custom window event for manual testing / triggers
    const handleCustomSuccess = () => triggerSuccess();
    window.addEventListener('reicon:sponsor-success', handleCustomSuccess);
    return () => {
      window.removeEventListener('reicon:sponsor-success', handleCustomSuccess);
    };
  }, []);

  return (
    <AnimatePresence>
      {showThankYouModal && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-bg-base border border-text-base/15 rounded-3xl p-8 shadow-2xl text-center overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#9B8AFB]/20 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => setShowThankYouModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-text-base/5 hover:bg-text-base/10 text-text-base/60 hover:text-text-base flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#9B8AFB]/15 border border-[#9B8AFB]/30 text-[#9B8AFB] flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Heart size={32} className="fill-current animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <CheckCircle size={14} />
              <span>Sponsorship Complete!</span>
            </div>

            <h2 className="text-2xl font-serif font-bold text-text-base mb-3">
              Thank You for Sponsoring Reicon! ❤️
            </h2>

            <p className="text-text-base/70 text-sm leading-relaxed mb-6">
              Your contribution directly supports ongoing open-source maintenance, domain infrastructure, and adding brand new vector icons to Reicon.
            </p>

            <button
              onClick={() => setShowThankYouModal(false)}
              className="w-full bg-[#9B8AFB] hover:bg-[#8B78FA] text-white font-semibold text-sm py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              You’re Awesome! Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
