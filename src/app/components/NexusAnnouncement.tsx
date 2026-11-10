'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { translate } from '@/app/i18n';
import { useLocale } from './LocaleProvider';

export default function NexusAnnouncement() {
  const locale = useLocale();
  const localized = (text: string) => translate(locale, text);
  const [isOpen, setIsOpen] = useState(true);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusableSelector = 'a[href], button:not([disabled])';
    const getFocusable = () => Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="nexus-announcement-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <section
        className="nexus-announcement"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nexus-announcement-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="nexus-announcement-art" aria-hidden="true">
          <div className="nexus-announcement-orbit nexus-announcement-orbit-one" />
          <div className="nexus-announcement-orbit nexus-announcement-orbit-two" />
          <Image src="/nexus-icon.png" alt="" width={128} height={128} className="nexus-announcement-icon" />
          <span className="nexus-announcement-art-label">ORIGINS / DEVELOPER TOOLING</span>
        </div>
        <div className="nexus-announcement-content">
          <div className="nexus-announcement-header">
            <p className="nexus-announcement-eyebrow"><span />{localized('NEW DEVELOPER TOOL')}</p>
            <button
              type="button"
              className="nexus-announcement-close"
              onClick={() => setIsOpen(false)}
              aria-label={localized('Close Nexus announcement')}
            >×</button>
          </div>
          <h2 id="nexus-announcement-title">{localized('Meet Nexus Origins.')}</h2>
          <p className="nexus-announcement-lede">
            {localized('A desktop workspace for environment and project management, secure secrets, access administration, audit visibility and Origins Forge.')}
          </p>
          <p className="nexus-announcement-detail">
            {localized('Connect to the Origins Cloud API as a centralized control plane, while supported Forge operations stay on your local machine—from environment setup through authorized penetration testing.')}
          </p>
          <div className="nexus-announcement-features">
            <span>{localized('Environment management')}</span>
            <span>{localized('Secrets, access & audit')}</span>
            <span>{localized('Origins Forge, locally')}</span>
          </div>
          <div className="nexus-announcement-actions">
            <a
              className="nexus-announcement-cta"
              href="mailto:support@origins-software.com?subject=Nexus%20Origins%20enquiry"
            >
              {localized('Ask us about Nexus')} <span aria-hidden="true">↗</span>
            </a>
            <button type="button" className="nexus-announcement-dismiss" onClick={() => setIsOpen(false)}>
              {localized('Maybe later')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
