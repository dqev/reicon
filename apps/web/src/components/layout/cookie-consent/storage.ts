const COOKIE_KEY = 'reicon_cookie_consent';

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
};

export function getStoredConsent(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(prefs: CookiePreferences) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
}
