import type { Metadata } from 'next';
import Link from '@/app/components/LocaleLink';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import LocalizedText from '@/app/components/LocalizedText';
import { localizeMetadata } from '@/app/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(
    'Engineering Standards',
    'Explore the engineering principles Origins Software brings to security, reliability, accessibility, delivery automation, AI oversight and operational handover.',
    'Engineering Standards | Origins Software',
    'The practical principles behind dependable software delivery.',
  );
}

const standards = [
  { number: '01', title: 'Secure by design', text: 'Treat identity, permissions, data handling, dependency risk and threat modelling as design inputs—not as last-minute checklist items.', detail: 'Security engineering', href: '/services/proactive-cybersecurity' },
  { number: '02', title: 'Observable and recoverable', text: 'Plan for failures as well as the happy path. Define meaningful signals, useful alerts, backups, rollback paths and recovery ownership.', detail: 'Cloud & DevOps', href: '/services/cloud-devops' },
  { number: '03', title: 'Performance with purpose', text: 'Measure the journeys and workloads that matter, then use evidence to guide tuning, caching, data access and infrastructure choices.', detail: 'Custom web architecture', href: '/services/custom-web-architecture' },
  { number: '04', title: 'Accessible by default', text: 'Build clear information hierarchy, semantic interactions, keyboard access, visible focus and reduced-motion support into the experience.', detail: 'Full-stack development', href: '/services/full-stack-development' },
  { number: '05', title: 'AI with boundaries', text: 'Evaluate systems against representative tasks, make tool permissions explicit, record important actions and introduce human approval where impact warrants it.', detail: 'Applied AI & ML', href: '/services/applied-ai-ml' },
  { number: '06', title: 'Ownership after launch', text: 'Treat documentation, runbooks, knowledge transfer and the practical ability to operate the system as part of delivery—not optional extras.', detail: 'Our delivery process', href: '/process/operate' },
];

export default function FeaturesPage() {
  return <PageShell>
    <PageHero eyebrow="Engineering standards" title="Built to work in the real world—not only in a demo." description="Good software is more than a polished interface. It needs sound foundations, visible behaviour, thoughtful risk management and a clear path to being operated and improved." cta="Discuss your requirements" />
    <section className="content-section standards-intro">
      <div className="section-kicker"><LocalizedText text="Principles in practice" /></div>
      <p><LocalizedText text="These are practical engineering principles to guide scope and implementation. The exact controls, tests and operational commitments are agreed to fit each project's risk profile and environment." /></p>
    </section>
    <section className="content-section standards-list" aria-label="Engineering standards">
      {standards.map((item) => <article className="standard-row" key={item.number} data-motion>
        <span className="standard-number">{item.number}</span>
        <div className="standard-main"><h2><LocalizedText text={item.title} /></h2><p><LocalizedText text={item.text} /></p><Link href={item.href} className="text-link"><LocalizedText text={`Explore ${item.detail}`} /> <span aria-hidden="true">↗</span></Link></div>
      </article>)}
    </section>
    <section className="content-section two-col"><div><div className="section-kicker"><LocalizedText text="Project assurance" /></div><h2><LocalizedText text="Define what “ready” means before release." /></h2></div><div className="prose"><p><LocalizedText text="Acceptance criteria, test coverage, access boundaries, recovery expectations and ownership should be explicit enough for a team to make a release decision with confidence. We adapt this checklist to the system being built." /></p><Link className="button-secondary" href="/process"><LocalizedText text="See the delivery process" /> <span aria-hidden="true">↗</span></Link></div></section>
  </PageShell>;
}
