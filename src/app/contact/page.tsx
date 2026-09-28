import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

export default function ContactPage() {
  return <PageShell>
    <PageHero eyebrow="Contact" title="Tell us what needs to move." description="Share a little context and we will route the conversation to the right person. You do not need a perfect brief to get started." cta="Email hello@originsltd.com" ctaHref="mailto:hello@originsltd.com?subject=New%20Origins%20project" />
    <section className="content-section contact-grid">
      <div className="contact-card"><div className="section-kicker">New project</div><h2>Start with the problem.</h2><p>Include what you are building, where the project is today, your target timeline and anything already in place.</p><a className="button-primary" href="mailto:hello@originsltd.com?subject=New%20Origins%20project">Email the team <span>↗</span></a></div>
      <div className="contact-card"><div className="section-kicker">Existing client</div><h2>Open your workspace.</h2><p>Review quotations, service fees, invoices, documents and payment status in the secure client portal.</p><a className="button-secondary" href={process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || 'https://portal.originsltd.com'}>Open client portal</a></div>
      <div className="contact-card"><div className="section-kicker">General</div><h2>hello@originsltd.com</h2><p>For partnerships, suppliers, media and general company enquiries.</p></div>
    </section>
  </PageShell>;
}
