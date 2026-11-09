import type { Metadata } from 'next';
import Link from '@/app/components/LocaleLink';
import { notFound } from 'next/navigation';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import LocalizedText from '@/app/components/LocalizedText';
import { workPatterns } from '@/app/data/siteContent';
import { localizeMetadata } from '@/app/metadata';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return workPatterns.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = workPatterns.find((pattern) => pattern.slug === slug);
  if (!item) return localizeMetadata('Work pattern not found', '');
  return localizeMetadata(item.title, item.description);
}

export default async function WorkPatternPage({ params }: Props) {
  const { slug } = await params;
  const item = workPatterns.find((pattern) => pattern.slug === slug);
  if (!item) notFound();

  return <PageShell>
    <PageHero eyebrow={`${item.number} / ${item.sector} / Illustrative case study`} title={item.title} description={item.description} cta="Apply this thinking to your project" />
    <div className="pattern-note"><div className="pattern-note-mark" aria-hidden="true">i</div><p><strong><LocalizedText text="About this example." /></strong> <LocalizedText text="This page describes a representative solution pattern to explain our approach. It is not a claim about a named client, a completed engagement or measured business outcomes." /></p></div>
    <section className="content-section case-study-narrative">
      <article className="case-study-chapter" data-motion>
        <span className="section-kicker"><LocalizedText text="The challenge" /></span>
        <p><LocalizedText text={item.challenge} /></p>
      </article>
      <article className="case-study-chapter" data-motion>
        <span className="section-kicker"><LocalizedText text="The approach" /></span>
        <p><LocalizedText text={item.approach} /></p>
      </article>
    </section>
    <section className="content-section detail-layout">
      <div className="detail-statement" data-motion><div className="section-kicker"><LocalizedText text="Questions worth resolving early" /></div><h2><LocalizedText text="Good architecture begins with the constraints." /></h2><p><LocalizedText text="The implementation should follow the environment, risk profile and operational reality. These questions help make the trade-offs visible before they become expensive to change." /></p></div>
      <div className="detail-list">{item.questions.map((question, index) => <article className="detail-list-row" key={question} data-motion><span>{String(index + 1).padStart(2, '0')}</span><h3><LocalizedText text={question} /></h3><span className="detail-list-mark" aria-hidden="true">↗</span></article>)}</div>
    </section>
    <section className="detail-principles-band"><div className="content-section detail-principles-inner"><div><div className="section-kicker"><LocalizedText text="Relevant disciplines" /></div><h2><LocalizedText text="Systems thinking, not isolated components." /></h2></div><ul>{item.disciplines.map((discipline) => <li key={discipline}><LocalizedText text={discipline} /></li>)}</ul></div></section>
    <section className="content-section case-cta">
      <div>
        <div className="section-kicker"><LocalizedText text="Your next step" /></div>
        <h2><LocalizedText text="Translate the pattern into your operating context." /></h2>
      </div>
      {/* Added the base "button" class to fix the layout */}
      <Link className="button button-primary" href="/contact">
        <LocalizedText text="Talk to the team" /> <span aria-hidden="true">↗</span>
      </Link>
    </section>
  </PageShell>;
}
