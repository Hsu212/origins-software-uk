'use client';

import Link from '@/app/components/LocaleLink';
import { translate } from '@/app/i18n';
import { useLocale } from './LocaleProvider';
import { LocalizedContent } from './LocalizedText';

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: { heading: string; body: React.ReactNode }[] }) {
  const locale = useLocale();
  const updatedDate = new Date(`${updated} UTC`);
  const formattedUpdated = Number.isNaN(updatedDate.getTime())
    ? updated
    : new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(updatedDate);
  return (
    <section className="legal-page page-reveal">
      <div className="legal-meta"><Link href="/">Origins</Link><span>{translate(locale, 'Legal')}</span></div>
      <h1>{translate(locale, title)}</h1>
      <div className="legal-updated">{translate(locale, 'Last updated:')} {formattedUpdated}</div>
      {locale !== 'en' && <p className="legal-translation-notice">{translate(locale, 'Informational translation. The English version is authoritative if there is any difference.')}</p>}
      <p className="legal-intro">{translate(locale, intro)}</p>
      <div className="legal-sections">
        {sections.map((section) => <section key={section.heading}><h2>{translate(locale, section.heading)}</h2><div className="legal-body"><LocalizedContent>{section.body}</LocalizedContent></div></section>)}
      </div>
    </section>
  );
}
