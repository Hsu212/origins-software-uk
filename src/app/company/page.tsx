import Link from '@/app/components/LocaleLink';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import LocalizedText from '@/app/components/LocalizedText';

export default function CompanyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Company information"
        title="A straightforward engineering partner."
        description="Origins Software works with teams that need thoughtful product engineering, dependable systems and clear communication from the first conversation through delivery."
        cta="Contact Origins"
      />
      <section className="content-section company-facts">
        <div>
          <div className="section-kicker"><LocalizedText text="Working with Origins" /></div>
          <h2><LocalizedText text="Practical information. No unnecessary layers." /></h2>
        </div>
        <div className="facts-card">
          <div><span><LocalizedText text="Project enquiries" /></span><strong>support@origins-software.com</strong></div>
          <div><span><LocalizedText text="Engagements" /></span><strong><LocalizedText text="Scoped delivery, milestones or ongoing engineering support" /></strong></div>
          <div><span><LocalizedText text="Project visibility" /></span><strong><LocalizedText text="Clear scope, progress, decisions and handover" /></strong></div>
          <div><span><LocalizedText text="Client workspace" /></span><strong><a href={process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || 'https://portal.origins-software.com'} target="_blank" rel="noreferrer"><LocalizedText text="Open the client portal" /> ↗</a></strong></div>
        </div>
      </section>
      <section className="content-section two-col">
        <div>
          <div className="section-kicker"><LocalizedText text="Commercial clarity" /></div>
          <h2><LocalizedText text="Start with the context, then agree the work." /></h2>
        </div>
        <div className="prose">
          <p><LocalizedText text="Before implementation, we work to make the objective, scope, dependencies, delivery approach and commercial assumptions clear. Formal company, supplier and engagement details can be handled directly as part of that conversation." /></p>
          <Link className="button-secondary" href="/contact"><LocalizedText text="Ask a company question" /> <span>↗</span></Link>
        </div>
      </section>
    </PageShell>
  );
}
