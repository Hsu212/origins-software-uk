'use client';

import { useEffect, useState } from 'react';
import Link from '@/app/components/LocaleLink';
import { translate } from '@/app/i18n';
import { useLocale } from './LocaleProvider';
import {
  defaultCookiePreferences,
  openCookieSettings,
  readCookiePreferences,
  readReduceMotionPreference,
  saveCookiePreferences,
  saveReduceMotionPreference,
} from './privacyPreferences';

export default function SettingsPanel() {
  const locale = useLocale();
  const localized = (text: string) => translate(locale, text);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const saved = readCookiePreferences();
    setAnalytics(saved?.analytics ?? defaultCookiePreferences.analytics);
    setMarketing(saved?.marketing ?? defaultCookiePreferences.marketing);
    setReduceMotion(readReduceMotionPreference());
    if (saved) setLastSaved(new Date(saved.savedAt).toLocaleString());
  }, []);

  const save = () => {
    const saved = saveCookiePreferences({ necessary: true, analytics, marketing });
    saveReduceMotionPreference(reduceMotion);
    setLastSaved(new Date(saved.savedAt).toLocaleString());
  };

  return (
    <div className="settings-layout">
      <section className="settings-section" aria-labelledby="settings-cookies-title">
        <div className="settings-section-heading"><div><span className="section-kicker">{localized('01 / PRIVACY')}</span><h2 id="settings-cookies-title">{localized('Cookie preferences')}</h2></div><span className="settings-section-mark" aria-hidden="true">◉</span></div>
        <p className="settings-description">{localized('Essential storage is always enabled so the site can remember your privacy choice. Optional categories remain disabled until you choose otherwise.')}</p>
        <div className="settings-choice-row">
          <div><h3>{localized('Strictly necessary')}</h3><p>{localized('Required for basic functionality and consent storage.')}</p></div><span className="cookie-always-on">{localized('Always on')}</span>
        </div>
        <label className="settings-choice-row" htmlFor="settings-analytics">
          <div><h3>{localized('Analytics and performance')}</h3><p>{localized('Optional measurement of site use, only if an analytics provider is configured.')}</p></div>
          <input id="settings-analytics" className="settings-switch" type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
        </label>
        <label className="settings-choice-row" htmlFor="settings-marketing">
          <div><h3>{localized('Marketing')}</h3><p>{localized('Optional campaign measurement or marketing pixels, only if configured.')}</p></div>
          <input id="settings-marketing" className="settings-switch" type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} />
        </label>
        <div className="settings-actions"><button className="button button-primary" onClick={save}>{localized('Save preferences')} <span aria-hidden="true">↗</span></button><button className="button button-ghost" onClick={() => { setAnalytics(false); setMarketing(false); saveCookiePreferences({ necessary: true, analytics: false, marketing: false }); setLastSaved(new Date().toLocaleString()); }}>{localized('Reject optional')}</button></div>
        {lastSaved && <p className="settings-saved" role="status">{localized('Preferences saved in this browser on')} {lastSaved}.</p>}
        <p className="settings-footnote">{localized('Changing a preference does not automatically delete cookies set directly by a third-party provider. You can also manage those in your browser. Read our')} <Link href="/legal/cookies">{localized('Cookie & Tracking Technology Policy')}</Link>.</p>
      </section>

      <section className="settings-section" aria-labelledby="settings-accessibility-title">
        <div className="settings-section-heading"><div><span className="section-kicker">{localized('02 / ACCESSIBILITY')}</span><h2 id="settings-accessibility-title">{localized('Motion and animation')}</h2></div><span className="settings-section-mark" aria-hidden="true">↝</span></div>
        <p className="settings-description">{localized('Choose to reduce decorative motion across this website. When this is off, your operating system’s reduced-motion preference is still respected.')}</p>
        <label className="settings-choice-row" htmlFor="settings-reduce-motion">
          <div><h3>{localized('Reduce decorative animations')}</h3><p>{localized('Shortens or disables non-essential animation and smooth scrolling.')}</p></div>
          <input id="settings-reduce-motion" className="settings-switch" type="checkbox" checked={reduceMotion} onChange={(event) => setReduceMotion(event.target.checked)} />
        </label>
        <div className="settings-actions"><button className="button button-primary" onClick={save}>{localized('Save settings')} <span aria-hidden="true">↗</span></button></div>
      </section>

      <section className="settings-section settings-assistant-note" aria-labelledby="settings-assistant-title">
        <div className="settings-section-heading"><div><span className="section-kicker">{localized('03 / AI ASSISTANT')}</span><h2 id="settings-assistant-title">{localized('How chat works')}</h2></div><span className="settings-section-mark" aria-hidden="true">✳</span></div>
        <p className="settings-description">{localized('When you send a message to the Origins assistant, the website server forwards it to the RAG service configured by the site operator. Conversation messages are held in the open chat’s browser memory and are not saved to browser storage by this widget. Avoid entering passwords, payment details, confidential client data, or other sensitive information.')}</p>
        <div className="settings-actions"><button className="button button-ghost" onClick={openCookieSettings}>{localized('Open privacy preferences')} <span aria-hidden="true">↗</span></button><Link className="button button-ghost" href="/legal/privacy">{localized('Read privacy policy')} <span aria-hidden="true">↗</span></Link></div>
      </section>
    </div>
  );
}
