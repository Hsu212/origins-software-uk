import type { Metadata } from 'next';
import Link from '@/app/components/LocaleLink';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import LocalizedText from '@/app/components/LocalizedText';
import { workPatterns } from '@/app/data/siteContent';
import { localizeMetadata } from '@/app/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return localizeMetadata(
    'Portfolio',
    'Explore Origins Software portfolio examples across digital products, cloud platforms, AI workflows, computer vision and modernisation.',
    'Portfolio | Origins Software',
    'Representative portfolio examples showing how Origins approaches complex software and platform challenges.',
  );
}

export default function PortfolioPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio / selected case studies"
        title="A closer look at the systems we know how to shape."
        description="Explore a range of representative software, platform, cloud and AI challenges. Each story explains the problem space, engineering approach and decisions that matter."
        cta="Discuss your project"
      />
      <div className="pattern-note">
        <div className="pattern-note-mark" aria-hidden="true">i</div>
        <p>
          <strong><LocalizedText text="About these portfolio examples." /></strong>{' '}
          <LocalizedText text="These are illustrative case studies, not named client projects. They describe representative challenges and engineering approaches; no client results or completed engagements are claimed." />
        </p>
      </div>
      <section className="content-section portfolio-section" aria-label="Portfolio case studies">
        <div className="portfolio-section-heading">
          <div>
            <span className="section-kicker"><LocalizedText text="Selected case studies" /></span>
            <h2><LocalizedText text="Different problems. Thoughtful engineering." /></h2>
          </div>
          <span className="portfolio-count">{String(workPatterns.length).padStart(2, '0')} / <LocalizedText text="representative examples" /></span>
        </div>
        <div className="portfolio-case-grid">
          {workPatterns.map((item) => (
            <article className="portfolio-case-card" key={item.slug} data-motion>
              <Link className={`portfolio-case-art portfolio-art-${item.number}`} href={`/work/${item.slug}`} aria-label={`Read case study: ${item.title}`}>
                <span className="portfolio-art-number">{item.number}</span>
                <span className="portfolio-art-caption"><LocalizedText text={item.sector} /></span>
                <span className="portfolio-art-mark" aria-hidden="true"><i /><i /><i /></span>
                <span className="portfolio-art-arrow" aria-hidden="true">↗</span>
              </Link>
              <div className="portfolio-case-copy">
                <div className="portfolio-case-meta">
                  <span>{item.number} / {String(workPatterns.length).padStart(2, '0')}</span>
                  <span><LocalizedText text={item.sector} /></span>
                </div>
                <h3><Link href={`/work/${item.slug}`}><LocalizedText text={item.title} /></Link></h3>
                <p><LocalizedText text={item.description} /></p>
                <div className="portfolio-case-disciplines">
                  {item.disciplines.slice(0, 2).map((discipline) => (
                    <span key={discipline}><LocalizedText text={discipline} /></span>
                  ))}
                </div>
                <Link className="text-link portfolio-case-link" href={`/work/${item.slug}`}>
                  <LocalizedText text="Read case study" /><span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section portfolio-cta">
        <div>
          <span className="section-kicker"><LocalizedText text="Your project is next" /></span>
          <h2><LocalizedText text="Have a challenge that is not on this list?" /></h2>
          <p><LocalizedText text="Tell us about your users, systems and constraints. We will help you shape the right next step." /></p>
        </div>
        <Link className="button-primary" href="/contact"><LocalizedText text="Start a conversation" /><span aria-hidden="true">↗</span></Link>
      </section>
    </PageShell>
  );
}
