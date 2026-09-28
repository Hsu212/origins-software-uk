import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

const work = [
  { sector: 'Mobility', title: 'Computer vision for traffic-sign intelligence', body: 'Detection and classification pipelines designed for varied road-sign domains and real-time inference.', meta: 'Computer vision • Python • YOLO' },
  { sector: 'Operations', title: 'Connected workspace platform', body: 'A unified workspace connecting communication, tasks, projects, documents and operational workflows.', meta: 'Web platform • Realtime • UX' },
  { sector: 'AI systems', title: 'Multi-agent workforce tooling', body: 'AI agents with role-based workflows, scheduling, tool execution and human escalation paths.', meta: 'AI • Automation • Integrations' },
];

export default function WorkPage() {
  return <PageShell>
    <PageHero eyebrow="Selected work" title="Systems designed around the work people actually need to do." description="A few examples of the product, engineering and automation problems we work on. Detailed case studies can be shared where client confidentiality allows." cta="Discuss your project" />
    <section className="content-section work-grid">{work.map((item, i) => <article className="work-card" key={item.title}><div className="work-art"><span>0{i+1}</span><div className="work-orbit" /></div><div className="work-copy"><div className="section-kicker">{item.sector}</div><h2>{item.title}</h2><p>{item.body}</p><div className="work-meta">{item.meta}</div></div></article>)}</section>
    <section className="content-section case-cta"><div><div className="section-kicker">Need the full story?</div><h2>We can walk through architecture, scope and delivery decisions.</h2></div><Link className="button-primary" href="/contact">Request a conversation <span>↗</span></Link></section>
  </PageShell>;
}
