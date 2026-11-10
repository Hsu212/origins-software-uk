import type { Metadata } from 'next';
import Link from '@/app/components/LocaleLink';
import { notFound } from 'next/navigation';
import PageShell from '@/app/components/PageShell';
import ServiceHero from '@/app/components/ServiceHero';
import LocalizedText from '@/app/components/LocalizedText';
import { serviceSpecialties } from '@/app/data/siteContent';
import { localizeMetadata } from '@/app/metadata';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSpecialties.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceSpecialties.find((item) => item.slug === slug);
  if (!service) return localizeMetadata('Service not found', '');
  const localized = await localizeMetadata(service.title, service.description);
  return { ...localized, openGraph: { ...localized.openGraph, type: 'website' } };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = serviceSpecialties.find((item) => item.slug === slug);
  if (!service) notFound();

  const related = serviceSpecialties.filter((item) => item.slug !== service.slug).slice(0, 3);

  return <PageShell>
    <div className="service-detail-page">
      <ServiceHero eyebrow={`${service.number} / ${service.category}`} title={service.title} description={service.description} service={service} />
      <div className="service-detail-overview">
        <div className="service-detail-overview-inner">
          <span><LocalizedText text="Speciality" /><strong>{service.number} / 09</strong></span>
          <span><LocalizedText text="Focus" /><strong><LocalizedText text={service.category} /></strong></span>
          <span><LocalizedText text="Core disciplines" /><strong>{service.capabilities.length.toString().padStart(2, '0')}</strong></span>
        </div>
      </div>
      <section className="content-section detail-layout">
      <div className="detail-statement" data-motion><div className="section-kicker"><LocalizedText text="What the work can include" /></div><h2><LocalizedText text="Make the technical work fit the business context." /></h2><p><LocalizedText text="Every engagement starts from the operating constraints, the people involved and what the system needs to make possible. Scope and implementation choices are agreed against those realities—not against a generic checklist." /></p></div>
      <div className="detail-list" aria-label={`${service.title} capabilities`}>
        {service.capabilities.map((capability, index) => <article className="detail-list-row" key={capability} data-motion><span>{String(index + 1).padStart(2, '0')}</span><h3><LocalizedText text={capability} /></h3><span className="detail-list-mark" aria-hidden="true">↗</span></article>)}
      </div>
    </section>
    <section className="detail-principles-band">
      <div className="content-section detail-principles-inner">
        <div><div className="section-kicker"><LocalizedText text="Engineering considerations" /></div><h2><LocalizedText text="Designed for the conditions beyond launch." /></h2></div>
        <ul>{service.considerations.map((item) => <li key={item}><LocalizedText text={item} /></li>)}</ul>
      </div>
    </section>
    <section className="content-section detail-related">
      <div className="section-heading-row"><div><div className="section-kicker"><LocalizedText text="Related specialities" /></div><h2><LocalizedText text="Connected disciplines, when the work calls for them." /></h2></div><Link className="text-link" href="/services"><LocalizedText text="All services" /> <span aria-hidden="true">↗</span></Link></div>
      <div className="related-service-list">{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`}><span>{item.number}</span><strong><LocalizedText text={item.title} /></strong><span aria-hidden="true">↗</span></Link>)}</div>
    </section>
      <section className="content-section case-cta">
      <div>
        <div className="section-kicker"><LocalizedText text="Have a specific challenge?" /></div>
        <h2><LocalizedText text="Let’s scope the work before we prescribe the solution." /></h2>
      </div>
      <Link className="button button-primary" href="/contact">
        <LocalizedText text="Start a conversation" /> <span aria-hidden="true">↗</span>
      </Link>
      </section>
    </div>
  </PageShell>;
}
