import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

const steps = [
  ['01', 'Understand', 'Goals, users, constraints, existing systems, risks and what success needs to look like.'],
  ['02', 'Frame', 'We turn discovery into scope, architecture, milestones, responsibilities and a commercial proposal.'],
  ['03', 'Build', 'Small senior team, short feedback loops, visible progress and production-minded engineering.'],
  ['04', 'Operate', 'Launch, measure, document and improve. The handover is part of delivery, not an afterthought.'],
];

export default function ProcessPage() {
  return <PageShell>
    <PageHero eyebrow="Methodology" title="A calm delivery process with fewer surprises." description="The process is intentionally simple: understand the problem, agree on the shape of the work, build in small increments, then leave the system in a maintainable state." />
    <section className="content-section process-list">{steps.map(([no, title, body]) => <article key={no} className="process-row"><div className="process-no">{no}</div><div><h2>{title}</h2><p>{body}</p></div><div className="process-line" /></article>)}</section>
    <section className="content-section two-col"><div><div className="section-kicker">What clients see</div><h2>Visibility without project theatre.</h2></div><div className="prose"><p>Expect clear status, decision logs, scope changes, delivery notes and practical next steps. When assumptions change, they are surfaced early enough to act on.</p><Link className="text-link" href="/contact">Start with a discovery conversation <span>→</span></Link></div></section>
  </PageShell>;
}
