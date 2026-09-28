import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

const services = [
  { no: '01', title: 'Digital products', body: 'Customer-facing web platforms and internal products with clear UX, strong foundations and room to evolve.', tags: 'Web • Product • UX' },
  { no: '02', title: 'Software engineering', body: 'APIs, application architecture, integrations and core product engineering for new builds or existing systems.', tags: 'APIs • Full-stack • Architecture' },
  { no: '03', title: 'Cloud & DevOps', body: 'Practical infrastructure, environments, CI/CD and observability designed around reliability and predictable operations.', tags: 'Cloud • CI/CD • SRE' },
  { no: '04', title: 'AI & data systems', body: 'AI-assisted workflows, data pipelines and model-enabled features that fit real business processes.', tags: 'AI • Data • Automation' },
  { no: '05', title: 'Security engineering', body: 'Threat-aware design, application hardening, secure infrastructure and engineering practices that reduce avoidable risk.', tags: 'AppSec • Network • Review' },
  { no: '06', title: 'Modernisation', body: 'Incremental upgrades for ageing systems, performance issues, technical debt and legacy operational workflows.', tags: 'Migration • Refactor • Performance' },
];

export default function ServicesPage() {
  return <PageShell>
    <PageHero eyebrow="Capabilities" title="One senior team across product, software and infrastructure." description="Use us for the whole journey or for the technical layer that is blocking progress. Engagements can be fixed-scope, milestone-based or ongoing." />
    <section className="content-section services-list">{services.map((service) => <article className="service-row" key={service.no}><div className="service-no">{service.no}</div><div><h2>{service.title}</h2><p>{service.body}</p><span>{service.tags}</span></div><div className="service-arrow">↗</div></article>)}</section>
    <section className="content-section two-col"><div><div className="section-kicker">Engagement models</div><h2>Commercial clarity before implementation.</h2></div><div className="prose"><p>We can scope a defined delivery, work against milestones, or embed as an engineering partner. Every proposal can break the work into services, assumptions, fees and payment stages so stakeholders know what they are approving.</p><Link className="button-secondary" href="/contact">Request a quotation</Link></div></section>
  </PageShell>;
}
