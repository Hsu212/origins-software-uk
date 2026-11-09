import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import LocalizedText from '@/app/components/LocalizedText';

export default function ContactPage() {
  return <PageShell>
    <PageHero eyebrow="Contact" title="Tell us what needs to move." description="Share a little context and we will route the conversation to the right person. You do not need a perfect brief to get started." cta="Email support@origins-software.com" ctaHref="mailto:support@origins-software.com?subject=New%20Origins%20project" />
    <section className="content-section contact-grid">
      <div className="contact-card"><div className="section-kicker"><LocalizedText text="New project" /></div><h2><LocalizedText text="Start with the problem." /></h2><p><LocalizedText text="Include what you are building, where the project is today, your target timeline and anything already in place." /></p><a className="button-primary" href="mailto:support@origins-software.com?subject=New%20Origins%20project"><LocalizedText text="Email the team" /> <span>↗</span></a></div>
      <div className="contact-card"><div className="section-kicker"><LocalizedText text="Existing client" /></div><h2><LocalizedText text="Open your workspace." /></h2><p><LocalizedText text="Review quotations, service fees, invoices, documents and payment status in the secure client portal." /></p><a className="button-secondary" href={process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || 'https://portal.origins-software.com'}><LocalizedText text="Open client portal" /></a></div>
      <div className="contact-card"><div className="section-kicker"><LocalizedText text="General" /></div><h2>support@origins-software.com</h2><p><LocalizedText text="For partnerships, suppliers, media and general company enquiries." /></p></div>
    </section>
  </PageShell>;
}
