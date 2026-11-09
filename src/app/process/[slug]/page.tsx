import type { Metadata } from 'next';
import Link from '@/app/components/LocaleLink';
import { notFound } from 'next/navigation';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import LocalizedText from '@/app/components/LocalizedText';
import { processStages } from '@/app/data/siteContent';
import { localizeMetadata } from '@/app/metadata';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return processStages.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stage = processStages.find((item) => item.slug === slug);
  if (!stage) return localizeMetadata('Process stage not found', '');
  return localizeMetadata(stage.subtitle, stage.description);
}

export default async function ProcessStagePage({ params }: Props) {
  const { slug } = await params;
  const stage = processStages.find((item) => item.slug === slug);
  if (!stage) notFound();
  const currentIndex = processStages.findIndex((item) => item.slug === stage.slug);
  const nextStage = processStages[currentIndex + 1];

  return <PageShell>
    <PageHero eyebrow={`${stage.number} / ${stage.subtitle}`} title={stage.title} description={stage.description} cta={nextStage ? `Next: ${nextStage.subtitle}` : 'Discuss your project'} ctaHref={nextStage ? `/process/${nextStage.slug}` : '/contact'} />
    <section className="content-section detail-layout">
      <div className="detail-statement" data-motion><div className="section-kicker"><LocalizedText text="Stage outputs" /></div><h2><LocalizedText text="Make the next decision easier." /></h2><p><LocalizedText text="Each stage produces something tangible to review and use. The exact format depends on the project's size, risk and existing delivery practices." /></p></div>
      <div className="detail-list">{stage.outputs.map((output, index) => <article className="detail-list-row" key={output} data-motion><span>{String(index + 1).padStart(2, '0')}</span><h3><LocalizedText text={output} /></h3><span className="detail-list-mark" aria-hidden="true">↗</span></article>)}</div>
    </section>
    <section className="detail-principles-band"><div className="content-section detail-principles-inner"><div><div className="section-kicker"><LocalizedText text="Working principles" /></div><h2><LocalizedText text="Good delivery is a series of clear choices." /></h2></div><ul>{stage.principles.map((principle) => <li key={principle}><LocalizedText text={principle} /></li>)}</ul></div></section>
    <section className="content-section process-step-navigation"><Link href={currentIndex > 0 ? `/process/${processStages[currentIndex - 1].slug}` : '/process'} className="button-secondary">← <LocalizedText text={currentIndex > 0 ? processStages[currentIndex - 1].subtitle : 'All process stages'} /></Link>{nextStage && <Link href={`/process/${nextStage.slug}`} className="button-secondary"><LocalizedText text={`Next: ${nextStage.subtitle}`} /> <span aria-hidden="true">↗</span></Link>}</section>
    <section className="content-section case-cta"><div><div className="section-kicker"><LocalizedText text="A good place to start" /></div><h2><LocalizedText text="We’ll make the scope, risks and next steps clear." /></h2></div><Link className="button-primary" href="/contact"><LocalizedText text="Start a conversation" /> <span aria-hidden="true">↗</span></Link></section>
  </PageShell>;
}
