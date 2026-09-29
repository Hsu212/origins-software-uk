import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero 
        eyebrow="Contact" 
        title="Tell us what needs to move." 
        description="Share a little context and we will route the conversation to the right person. You do not need a perfect brief to get started." 
        cta="Email hello@originsltd.com" 
        ctaHref="mailto:hello@originsltd.com?subject=New%20Origins%20project" 
      />
      <section className="content-section contact-grid">
        {/* Card 1: New project */}
        <div className="contact-outer-card">
          <div className="contact-dot"></div>
          <div className="contact-card-inner">
            <div className="ray"></div>
            <div className="line topl"></div>
            <div className="line bottoml"></div>
            <div className="line leftl"></div>
            <div className="line rightl"></div>
            <div className="contact-card-content">
              <div className="section-kicker">New project</div>
              <h2>Start with the problem.</h2>
              <p>Include what you are building, where the project is today, your target timeline and anything already in place.</p>
              <a className="button-primary" href="mailto:hello@originsltd.com?subject=New%20Origins%20project">Email the team <span>↗</span></a>
            </div>
          </div>
        </div>

        {/* Card 2: Existing client */}
        <div className="contact-outer-card">
          <div className="contact-dot"></div>
          <div className="contact-card-inner">
            <div className="ray"></div>
            <div className="line topl"></div>
            <div className="line bottoml"></div>
            <div className="line leftl"></div>
            <div className="line rightl"></div>
            <div className="contact-card-content">
              <div className="section-kicker">Existing client</div>
              <h2>Open your workspace.</h2>
              <p>Review quotations, service fees, invoices, documents and payment status in the secure client portal.</p>
              <a className="button-secondary" href={process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || 'https://portal.origins-software.com'}>Open client portal</a>
            </div>
          </div>
        </div>

        {/* Card 3: General */}
        <div className="contact-outer-card">
          <div className="contact-dot"></div>
          <div className="contact-card-inner">
            <div className="ray"></div>
            <div className="line topl"></div>
            <div className="line bottoml"></div>
            <div className="line leftl"></div>
            <div className="line rightl"></div>
            <div className="contact-card-content">
              <div className="section-kicker">General</div>
              <h2>hello@originsltd.com</h2>
              <p>For partnerships, suppliers, media and general company enquiries.</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
