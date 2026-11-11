'use client';

import Link from '@/app/components/LocaleLink';
import { useCallback, useEffect, useState } from 'react';
import { translate } from '@/app/i18n';
import { useLocale } from './LocaleProvider';
import {
  COOKIE_PREFERENCES_CHANGED,
  OPEN_COOKIE_SETTINGS,
  defaultCookiePreferences,
  readCookiePreferences,
  saveCookiePreferences,
  type CookiePreferences,
} from './privacyPreferences';

type Choice = Pick<CookiePreferences, 'necessary' | 'analytics' | 'marketing'>;

export default function CookieConsent() {
  const locale = useLocale();
  const localized = (text: string) => translate(locale, text);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [hasSavedChoice, setHasSavedChoice] = useState(false);
  const [choice, setChoice] = useState<Choice>(defaultCookiePreferences);

  useEffect(() => {
    const initial = readCookiePreferences();
    if (initial) {
      setChoice(initial);
      setHasSavedChoice(true);
      setBannerOpen(false);
    } else {
      setBannerOpen(true);
    }

    const syncPreferences = () => {
      const saved = readCookiePreferences();
      if (saved) {
        setChoice(saved);
        setHasSavedChoice(true);
        setBannerOpen(false);
      } else {
        setChoice(defaultCookiePreferences);
        setHasSavedChoice(false);
        setBannerOpen(true);
      }
    };
    const openPreferences = () => {
      const saved = readCookiePreferences();
      if (saved) setChoice(saved);
      setPreferencesOpen(true);
    };
    window.addEventListener(COOKIE_PREFERENCES_CHANGED, syncPreferences);
    window.addEventListener('storage', syncPreferences);
    window.addEventListener(OPEN_COOKIE_SETTINGS, openPreferences);
    return () => {
      window.removeEventListener(COOKIE_PREFERENCES_CHANGED, syncPreferences);
      window.removeEventListener('storage', syncPreferences);
      window.removeEventListener(OPEN_COOKIE_SETTINGS, openPreferences);
    };
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;
    const dialog = document.querySelector<HTMLElement>('.cookie-preferences-dialog');
    const getFocusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    ) ?? []);
    const focusFrame = window.requestAnimationFrame(() => getFocusable()[0]?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && hasSavedChoice) {
        setPreferencesOpen(false);
        return;
      }
      if (event.key === 'Tab') {
        const items = getFocusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [preferencesOpen, hasSavedChoice]);

  const commit = useCallback((next: Choice) => {
    const saved = saveCookiePreferences(next);
    setChoice(saved);
    setHasSavedChoice(true);
    setBannerOpen(false);
    setPreferencesOpen(false);
  }, []);

  if (!bannerOpen && !preferencesOpen) return null;

  return (
    <>
      {bannerOpen && !preferencesOpen && (
        <section className="cookie-consent-banner" aria-labelledby="cookie-banner-title" role="region">
          <div className="cookie-consent-copy">
            <span className="cookie-eyebrow">{localized('YOUR PRIVACY')}</span>
            <h2 id="cookie-banner-title">{localized('Your choices matter.')}</h2>
            <p>{localized('We use essential storage to remember this choice. Optional analytics and marketing technologies stay off unless you allow them.')}</p>
            <Link href="/legal/cookies" className="cookie-policy-link">{localized('Read the cookie policy')} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="cookie-consent-actions">
            <button className="cookie-button cookie-button-primary" onClick={() => commit({ necessary: true, analytics: true, marketing: true })}>{localized('Accept all')}</button>
            <button className="cookie-button" onClick={() => commit({ necessary: true, analytics: false, marketing: false })}>{localized('Reject optional')}</button>
            <button className="cookie-text-button" onClick={() => setPreferencesOpen(true)}>{localized('Customise')}</button>
          </div>
        </section>
      )}

      {preferencesOpen && (
        <div className="cookie-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && hasSavedChoice) setPreferencesOpen(false); }}>
          <section className="cookie-preferences-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
            <div className="cookie-dialog-heading">
              <div><span className="cookie-eyebrow">{localized('PRIVACY CONTROLS')}</span><h2 id="cookie-settings-title">{localized('Cookie preferences')}</h2></div>
              <button className="cookie-dialog-close" aria-label={localized('Close cookie preferences')} onClick={() => setPreferencesOpen(false)}>×</button>
            </div>
            <p className="cookie-dialog-intro">{localized('Choose which optional technologies Origins Software may use. You can change your selection at any time from Settings.')}</p>
            <div className="cookie-preference-row">
              <div><h3>{localized('Strictly necessary')}</h3><p>{localized('Required for basic site operation and remembering your privacy choice.')}</p></div>
              <span className="cookie-always-on">{localized('Always on')}</span>
            </div>
            <label className="cookie-preference-row" htmlFor="cookie-analytics">
              <div><h3>{localized('Analytics and performance')}</h3><p>{localized('Allows future, consent-gated measurement of site usage. No analytics tool is loaded by this preference component itself.')}</p></div>
              <input id="cookie-analytics" type="checkbox" checked={choice.analytics} onChange={(event) => setChoice((current) => ({ ...current, analytics: event.target.checked }))} />
            </label>
            <label className="cookie-preference-row" htmlFor="cookie-marketing">
              <div><h3>{localized('Marketing')}</h3><p>{localized('Allows future, consent-gated marketing pixels or campaign measurement if configured.')}</p></div>
              <input id="cookie-marketing" type="checkbox" checked={choice.marketing} onChange={(event) => setChoice((current) => ({ ...current, marketing: event.target.checked }))} />
            </label>
            <div className="cookie-dialog-actions">
              <button className="cookie-button" onClick={() => commit({ necessary: true, analytics: false, marketing: false })}>{localized('Reject optional')}</button>
              <button className="cookie-button cookie-button-primary" onClick={() => commit(choice)}>{localized('Save preferences')}</button>
            </div>
            <p className="cookie-storage-note">{localized('Your preference is saved in this browser for up to 12 months.')} <Link href="/legal/cookies">{localized('Cookie policy')}</Link></p>
          </section>
        </div>
      )}
    </>
  );
}
