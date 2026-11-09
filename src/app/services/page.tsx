import type { Metadata } from 'next';
import Link from '@/app/components/LocaleLink';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import LocalizedText from '@/app/components/LocalizedText';
import { serviceSpecialties } from '@/app/data/siteContent';
import { localizeMetadata } from '@/app/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(
    'Services',
    'Explore Origins Software specialities across digital marketing, infrastructure, applied AI, full-stack engineering, cloud, cybersecurity and computer vision.',
    'Services | Origins Software',
    'Explore our nine service specialities across growth, software, cloud, AI and security.',
  );
}

export default function ServicesPage() {
  return <PageShell>
    <PageHero eyebrow="Specialities / 09 disciplines" title="The expertise to take complex work from idea to operation." description="Bring us the product, infrastructure, data or workflow problem in front of you. We’ll help define the right shape of the work before deciding how to build it." />
    <section className="services-overview" aria-label="Our service specialities">
      <div className="services-overview-heading">
        <div>
          <div className="section-kicker"><LocalizedText text="Related specialities" /></div>
          <h2><LocalizedText text="Connected disciplines, when the work calls for them." /></h2>
        </div>
        <div className="services-overview-count"><strong>09</strong><span>DISCIPLINES<br />ONE TEAM</span></div>
      </div>
      <div className="service-card-grid">
        {serviceSpecialties.map((service) => (
          <Link className="service-card" href={`/services/${service.slug}`} key={service.slug} data-motion data-index={service.number}>
            <div className="service-card-top">
              <span className="service-card-number">{service.number}<span> / 09</span></span>
              <span className="service-card-category"><LocalizedText text={service.category} /></span>
            </div>
            <div className="service-card-rule" aria-hidden="true">
              <span />
              <span>{service.number}</span>
            </div>
            <h3><LocalizedText text={service.title} /></h3>
            <p><LocalizedText text={service.description} /></p>
            <div className="service-card-capabilities">
              {service.capabilities.slice(0, 2).map((capability) => <span key={capability}><LocalizedText text={capability} /></span>)}
            </div>
            <div className="service-card-bottom">
              <span className="service-card-tags">{service.tags}</span>
              <span className="service-card-arrow" aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
    <section className="content-section two-col">
      <div><div className="section-kicker"><LocalizedText text="How we engage" /></div><h2><LocalizedText text="Defined scope. Visible decisions. Responsible delivery." /></h2></div>
      <div className="prose"><p><LocalizedText text="Some engagements need one specialist discipline. Others need product, engineering and operations to work together. We shape the team and delivery model around the problem, with assumptions, responsibilities and trade-offs made explicit." /></p><Link className="button-secondary" href="/contact"><LocalizedText text="Discuss your requirements" /> <span aria-hidden="true">↗</span></Link></div>
    </section>
  </PageShell>;
}
