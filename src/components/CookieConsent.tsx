import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'reicon-react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
};

const COOKIE_KEY = 'reicon_cookie_consent';

function getStoredConsent(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function setStoredConsent(prefs: CookiePreferences) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
}

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
    setTimeout(() => setVisible(false), 500);
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
        className={`pointer-events-auto max-w-[420px] mx-auto sm:mx-0 sm:ml-4 bg-[var(--dropdown-bg)] border border-text-base/8 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_var(--shadow-color)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
      >
        {!showSettings ? (
          <div className="p-5">
            {/* Header with cookie icon */}
            <div className="flex items-center gap-1 mb-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Cookie size={18} className="text-[#6C5CE7]" />
              </div>
              <h3 className="text-[16px] font-semibold text-text-base">We use cookies</h3>
            </div>

            <p className="text-[12.5px] text-text-base/50 leading-[1.7] mb-5">
              We use cookies to enhance your browsing experience and analyze site traffic.
              Read our{' '}
              <Link to="/privacy" className="text-[#6C5CE7] hover:text-[#8B7CF7] transition-colors">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAcceptAll}
                className="flex-1 text-[12.5px] font-semibold text-white bg-[#6C5CE7] hover:bg-[#5A4BD1] active:scale-[0.97] px-4 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 text-[12.5px] font-semibold text-text-base/70 hover:text-text-base bg-text-base/5 hover:bg-text-base/9 active:scale-[0.97] px-4 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
              >
                Decline
              </button>
            </div>

            <button
              onClick={() => setShowSettings(true)}
              className="w-full text-[11.5px] text-text-base/30 hover:text-text-base/60 mt-3 py-1 transition-colors cursor-pointer"
            >
              Customize preferences
            </button>
          </div>
        ) : (
          <div className="p-5">
            {/* Settings header */}
            <div className="flex items-center gap-1 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Cookie size={18} className="text-[#6C5CE7]" />
              </div>
              <h3 className="text-[16px] font-semibold text-text-base">Cookie Preferences</h3>
            </div>

            {/* Toggles */}
            <div className="space-y-2.5 mb-5">
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

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSavePreferences}
                className="flex-1 text-[12.5px] font-semibold text-white bg-[#6C5CE7] hover:bg-[#5A4BD1] active:scale-[0.97] px-4 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="text-[12px] text-text-base/40 hover:text-text-base/70 px-3 py-2.5 transition-colors cursor-pointer"
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

function CookieToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl bg-text-base/2 border border-text-base/5 ${disabled ? 'opacity-50' : ''
        }`}
    >
      <div>
        <div className="text-[12.5px] text-text-base/80 font-medium">{label}</div>
        <div className="text-[11px] text-text-base/30">{description}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative shrink-0 ml-3 w-9 h-5 rounded-full transition-colors duration-200 ${checked ? 'bg-[#6C5CE7]' : 'bg-text-base/8'
          } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-4' : ''
            }`}
        />
      </button>
    </div>
  );
}
