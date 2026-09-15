import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'reicon-react';

import { getStoredConsent, setStoredConsent, type CookiePreferences } from './storage';
import CookieToggle from './CookieToggle';

export type { CookiePreferences };

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => {
        setVisible(true);
        requestAnimationFrame(() => setAnimateIn(true));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = (prefs: CookiePreferences) => {
    setStoredConsent(prefs);
    setPreferences(prefs);
    setAnimateIn(false);
    setTimeout(() => {
      setVisible(false);
      window.dispatchEvent(new CustomEvent('reicon-cookie-consent-dismissed'));
    }, 500);
  };

  const handleAcceptAll = () => {
    dismiss({ necessary: true, analytics: true, functional: true });
  };

  const handleDecline = () => {
    dismiss({ necessary: true, analytics: false, functional: false });
  };

  const handleSavePreferences = () => {
    dismiss(preferences);
    setShowSettings(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-5 pointer-events-none">
      <div
        className={`pointer-events-auto max-w-sm mx-auto sm:max-w-[420px] sm:mx-0 sm:ml-4 bg-[var(--dropdown-bg)] border border-text-base/8 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_var(--shadow-color)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
      >
        {!showSettings ? (
          <div className="p-3 sm:p-5">
            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                <Cookie size={16} className="text-[#9B8AFB]" />
              </div>
              <h3 className="text-[14px] sm:text-[16px] font-semibold text-text-base">We use cookies</h3>
            </div>

            <p className="text-[11.5px] sm:text-[12.5px] text-text-base/50 leading-[1.6] mb-3 sm:mb-5">
              We use cookies to enhance your browsing experience and analyze site traffic.
              Read our{' '}
              <Link to="/privacy" className="text-[#9B8AFB] hover:text-[#8B7CF7] transition-colors">
                Privacy Policy
              </Link>
              .
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAcceptAll}
                className="flex-1 text-[12px] sm:text-[12.5px] font-semibold text-white bg-[#9B8AFB] hover:bg-[#8B7AFB] active:scale-[0.97] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 text-[12px] sm:text-[12.5px] font-semibold text-text-base/70 hover:text-text-base bg-text-base/5 hover:bg-text-base/9 active:scale-[0.97] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
              >
                Decline
              </button>
            </div>

            <button
              onClick={() => setShowSettings(true)}
              className="w-full text-[11px] sm:text-[11.5px] text-text-base/30 hover:text-text-base/60 mt-2 sm:mt-3 py-1 transition-colors cursor-pointer"
            >
              Customize preferences
            </button>
          </div>
        ) : (
          <div className="p-3 sm:p-5">
            <div className="flex items-center gap-1 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                <Cookie size={16} className="text-[#9B8AFB]" />
              </div>
              <h3 className="text-[14px] sm:text-[16px] font-semibold text-text-base">Cookie Preferences</h3>
            </div>

            <div className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-5">
              <CookieToggle
                label="Necessary"
                description="Core website functionality"
                checked={true}
                disabled={true}
              />
              <CookieToggle
                label="Analytics"
                description="Usage statistics & insights"
                checked={preferences.analytics}
                onChange={(v) => setPreferences((p) => ({ ...p, analytics: v }))}
              />
              <CookieToggle
                label="Functional"
                description="Preferences & personalization"
                checked={preferences.functional}
                onChange={(v) => setPreferences((p) => ({ ...p, functional: v }))}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSavePreferences}
                className="flex-1 text-[12px] sm:text-[12.5px] font-semibold text-white bg-[#9B8AFB] hover:bg-[#8B7AFB] active:scale-[0.97] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="text-[11.5px] sm:text-[12px] text-text-base/40 hover:text-text-base/70 px-3 py-2 sm:py-2.5 transition-colors cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
