import type { Metadata } from 'next';
import Link from '@/app/components/LocaleLink';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import LocalizedText from '@/app/components/LocalizedText';
import { workPatterns } from '@/app/data/siteContent';
import { localizeMetadata } from '@/app/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(
    'Case studies',
    'Explore representative software, AI, cloud and platform case studies from Origins Software. These illustrative scenarios are not presented as named client engagements or measured outcomes.',
    'Case studies | Origins Software',
    'Illustrative software, AI, cloud and platform case studies.',
  );
}

export default function WorkPage() {
  return <PageShell>
    <PageHero eyebrow="Work / case studies" title="Systems designed around the work people actually need to do." description="Explore representative challenges across software, AI, cloud and platform engineering, and see how Origins approaches the work. These illustrative case studies are not claims about named client engagements or measured outcomes." cta="Discuss your project" />
    <div className="pattern-note"><div className="pattern-note-mark" aria-hidden="true">i</div><p><strong><LocalizedText text="About these case studies." /></strong> <LocalizedText text="These are representative scenarios created to explain our engineering approach. They do not describe named clients, completed engagements or measured business results." /></p></div>
    <section className="content-section work-grid" aria-label="Representative case studies">
      {workPatterns.map((item) => <article className="work-card work-card-link" key={item.slug} data-motion>
        <Link href={`/work/${item.slug}`} className="work-art" aria-label={`Explore ${item.title}`}><span>{item.number}</span><div className="work-orbit" aria-hidden="true" /><div className="work-art-label">CASE STUDY</div></Link>
        <div className="work-copy"><div className="section-kicker"><LocalizedText text={item.sector} /></div><h2><Link href={`/work/${item.slug}`}><LocalizedText text={item.title} /></Link></h2><p><LocalizedText text={item.description} /></p><div className="work-meta">{item.disciplines.map((discipline, index) => <span key={discipline}>{index > 0 && ' · '}<LocalizedText text={discipline} /></span>)}</div><Link className="text-link work-detail-link" href={`/work/${item.slug}`}><LocalizedText text="Read case study" /> <span aria-hidden="true">↗</span></Link></div>
      </article>)}
    </section>
    <section className="content-section case-cta"><div><div className="section-kicker"><LocalizedText text="Your context is unique" /></div><h2><LocalizedText text="Bring the problem. We’ll work through the constraints with you." /></h2></div><Link className="button-primary" href="/contact"><LocalizedText text="Request a conversation" /> <span aria-hidden="true">↗</span></Link></section>
  </PageShell>;
}
