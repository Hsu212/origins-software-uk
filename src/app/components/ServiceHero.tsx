'use client';

import Link from '@/app/components/LocaleLink';
import { translate } from '@/app/i18n';
import type { ServiceSpecialty } from '@/app/data/siteContent';
import { useLocale } from './LocaleProvider';
import LocalizedText from './LocalizedText';

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  service?: ServiceSpecialty;
};

const featuredDisciplines = [
  ['01', 'Product engineering', 'PRODUCT · WEB · MOBILE'],
  ['02', 'Cloud & platform', 'INFRASTRUCTURE · DELIVERY'],
  ['03', 'Applied intelligence', 'AI · DATA · AUTOMATION'],
];

export default function ServiceHero({ eyebrow, title, description, service }: Props) {
  const locale = useLocale();

  return (
    <section className={`service-hero${service ? ' service-detail-hero' : ' service-index-hero'}`}>
      <div className="service-hero-grid" aria-hidden="true" />
      <div className="service-hero-inner">
        <div className="service-hero-copy">
          <div className="service-hero-eyebrow"><span />{translate(locale, eyebrow)}</div>
          <h1>{translate(locale, title)}</h1>
          <p>{translate(locale, description)}</p>
          <div className="service-hero-actions">
            {service ? (
              <>
                <Link className="service-hero-primary" href="/contact">
                  <LocalizedText text="Discuss this speciality" /><span aria-hidden="true">↗</span>
                </Link>
                <Link className="service-hero-secondary" href="/services">
                  <LocalizedText text="All services" />
                </Link>
              </>
            ) : (
              <>
                <Link className="service-hero-primary" href="#service-list">
                  <LocalizedText text="Explore capabilities" /><span aria-hidden="true">↓</span>
                </Link>
                <Link className="service-hero-secondary" href="/contact">
                  <LocalizedText text="Discuss your requirements" />
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="service-hero-visual" data-service={service?.slug ?? 'all'} role="img" aria-label={translate(locale, service ? 'Speciality overview' : 'Origins service disciplines')}>
          <div className="service-visual-topbar">
            <span className="service-visual-window-dots" aria-hidden="true"><i /><i /><i /></span>
            <span>{service ? `${service.number} / ${service.category}` : 'ORIGINS / ENGINEERING SYSTEMS'}</span>
            <span>{service ? 'DETAIL' : '09'}</span>
          </div>
          <div className="service-visual-main">
            <div className="service-visual-heading">
              <span>{service ? 'DISCIPLINE / OVERVIEW' : 'CONNECTED DISCIPLINES'}</span>
              <span className="service-visual-status"><i /> {service ? 'SCOPED TO CONTEXT' : 'ONE ACCOUNTABLE TEAM'}</span>
            </div>
            {service ? (
              <div className="service-visual-capability-list">
                {service.capabilities.slice(0, 3).map((capability, index) => (
                  <div className="service-visual-capability" key={capability}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong><LocalizedText text={capability} /></strong>
                    <i aria-hidden="true">↗</i>
                  </div>
                ))}
              </div>
            ) : (
              <div className="service-visual-discipline-list">
                {featuredDisciplines.map(([number, discipline, scope]) => (
                  <div className="service-visual-discipline" key={number}>
                    <span>{number}</span>
                    <div><strong><LocalizedText text={discipline} /></strong><small>{scope}</small></div>
                    <i aria-hidden="true">↗</i>
                  </div>
                ))}
              </div>
            )}
            <div className="service-visual-footer">
              <span>{service ? service.tags : 'DISCOVERY · ENGINEERING · OPERATIONS'}</span>
              <span>ORIGINS / 2026</span>
            </div>
          </div>
          <div className="service-visual-orbit service-visual-orbit-one" aria-hidden="true" />
          <div className="service-visual-orbit service-visual-orbit-two" aria-hidden="true" />
        </div>
      </div>
      <div className="service-hero-index" aria-hidden="true">
        <span>{service ? service.number : '00'}</span>
        <span>{service ? 'SPECIALITY / 09' : 'CAPABILITIES / 09 DISCIPLINES'}</span>
      </div>
    </section>
  );
}
