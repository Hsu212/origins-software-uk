export const COOKIE_PREFERENCES_KEY = 'origins-cookie-preferences-v1';
export const MOTION_PREFERENCE_KEY = 'origins-reduce-motion-v1';
export const COOKIE_PREFERENCES_CHANGED = 'origins:cookie-preferences-changed';
export const OPEN_COOKIE_SETTINGS = 'origins:open-cookie-settings';
export const COOKIE_POLICY_VERSION = 1;
export const CONSENT_LIFETIME_MS = 365 * 24 * 60 * 60 * 1000;

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: number;
  savedAt: string;
  expiresAt: number;
};

export const defaultCookiePreferences: Pick<CookiePreferences, 'necessary' | 'analytics' | 'marketing'> = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<CookiePreferences>;
    if (
      value.version !== COOKIE_POLICY_VERSION ||
      typeof value.analytics !== 'boolean' ||
      typeof value.marketing !== 'boolean' ||
      typeof value.expiresAt !== 'number' ||
      value.expiresAt <= Date.now()
    ) {
      window.localStorage.removeItem(COOKIE_PREFERENCES_KEY);
      return null;
    }
    return {
      necessary: true,
      analytics: value.analytics,
      marketing: value.marketing,
      version: COOKIE_POLICY_VERSION,
      savedAt: typeof value.savedAt === 'string' ? value.savedAt : new Date().toISOString(),
      expiresAt: value.expiresAt,
    };
  } catch {
    return null;
  }
}

export function saveCookiePreferences(
  preferences: Pick<CookiePreferences, 'necessary' | 'analytics' | 'marketing'>,
): CookiePreferences {
  const saved: CookiePreferences = {
    necessary: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
    version: COOKIE_POLICY_VERSION,
    savedAt: new Date().toISOString(),
    expiresAt: Date.now() + CONSENT_LIFETIME_MS,
  };
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(saved));
    } catch {
      // The current page still honours the selection in memory if browser storage is blocked.
    }
    window.dispatchEvent(new Event(COOKIE_PREFERENCES_CHANGED));
  }
  return saved;
}

export function openCookieSettings(): void {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
}

export function readReduceMotionPreference(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(MOTION_PREFERENCE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveReduceMotionPreference(reduce: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(MOTION_PREFERENCE_KEY, String(reduce));
  } catch {
    // Keep the live-page setting working even when browser storage is disabled.
  }
  if (reduce) document.documentElement.setAttribute('data-motion', 'reduce');
  else document.documentElement.removeAttribute('data-motion');
}
