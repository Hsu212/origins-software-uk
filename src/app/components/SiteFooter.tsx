'use client';

import Image from 'next/image';
import Link from '@/app/components/LocaleLink';
import { translate } from '@/app/i18n';
import { useLocale } from './LocaleProvider';

const columns = [
  { title: 'Explore', links: [['Services', '/services'], ['Engineering standards', '/features'], ['Selected work', '/portfolio'], ['Case studies', '/work'], ['Our process', '/process'], ['About Origins', '/about'], ['Company information', '/company']] },
  { title: 'Contact', links: [['Start a project', '/contact'], ['Client portal', process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || 'https://portal.origins-software.com'], ['support@origins-software.com', 'mailto:support@origins-software.com']] },
  { title: 'Policies', links: [['Privacy', '/legal/privacy'], ['Terms of service', '/legal/terms'], ['Service terms', '/legal/service-terms'], ['Cookie policy', '/legal/cookies'], ['Privacy & settings', '/settings'], ['Security', '/legal/security'], ['Accessibility', '/legal/accessibility'], ['Acceptable use', '/legal/acceptable-use']] },
];

export default function SiteFooter() {
  const locale = useLocale();
  const localized = (text: string) => translate(locale, text);
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand-column">
          <div className="footer-eyebrow">Origins / Digital engineering studio</div>
          <Link href="/" className="footer-brand brand-lockup" aria-label={localized('Origins Software home')}>
            <Image src="/origins-icon.png" alt="" width={84} height={84} className="brand-icon" />
            <span className="brand-lockup-type"><span className="brand-origins">ORIGINS</span><span className="brand-software">SOFTWARE</span></span>
          </Link>
          <p className="footer-lead">{localized('Independent software engineering for complex products, platforms and operations.')}</p>
          <div className="footer-assurance"><span className="footer-assurance-dot" /> {localized('Built for teams operating at scale')}</div>
          <address className="footer-address">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M16.25 8.35c0 4.15-6.25 9.15-6.25 9.15S3.75 12.5 3.75 8.35a6.25 6.25 0 1 1 12.5 0Z" />
              <circle cx="10" cy="8.25" r="2.1" />
            </svg>
            <span>181–184 High Street North<br />East Ham, London<br />United Kingdom</span>
          </address>
          <Link className="footer-contact-link" href="/contact">{localized('Start a conversation')} <span>↗</span></Link>
        </div>
        {columns.map((column) => (
          <div key={column.title} className="footer-column">
            <div className="footer-heading">{localized(column.title)}</div>
            <div className="footer-links">
              {column.links.map(([label, href]) => href.startsWith('mailto:') || href.startsWith('http')
                ? <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{localized(label)}</a>
                : <Link key={href} href={href}>{localized(label)}</Link>)}
            </div>
          </div>
        ))}
      </div>

      <div className="footer-company-bar">
        <span>Origins Software <i aria-hidden="true">/</i> EST. 2026</span>
        <span>{localized('Clear thinking. Careful engineering.')}</span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Origins Software. {localized('All rights reserved.')}</span>
        <Link href="#top">{localized('Back to top')} ↑</Link>
      </div>
    </footer>
  );
}
