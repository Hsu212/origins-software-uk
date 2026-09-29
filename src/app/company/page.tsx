import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

interface FactItem {
  label: string;
  value: string;
  isEmail?: boolean;
}

const companyFacts: FactItem[] = [
  { label: 'Legal name', value: 'Origins Ltd. UK' },
  { label: 'Company number', value: 'Registered in England & Wales' },
  { label: 'Registered office', value: 'London, United Kingdom' },
  { label: 'General enquiries', value: 'hello@originsltd.co.uk', isEmail: true },
  { label: 'Privacy enquiries', value: 'privacy@originsltd.co.uk', isEmail: true },
];

export default function CompanyPage() {
  return (
    <PageShell>
      <PageHero 
        eyebrow="Company" 
        title="Small enough to stay close. Structured enough to deliver." 
        description="Origins is an independent digital engineering company. This page is the place for the practical company information clients, partners and suppliers usually need." 
        cta="Contact the company" 
        ctaHref="/contact"
      />
      
      <section className="content-section company-facts">
        <div>
          <div className="section-kicker">Business information</div>
          <h2>Keep these details current.</h2>
        </div>
        <div className="facts-card modern-facts-card">
          {companyFacts.map((fact, index) => (
            <div className="fact-row" key={index}>
              <span className="fact-label">{fact.label}</span>
              <strong className="fact-value">
                {fact.isEmail ? (
                  <a href={`mailto:${fact.value}`}>{fact.value}</a>
                ) : (
                  fact.value
                )}
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Non-Card Working With Us Section */}
      <section className="content-section working-with-us-section">
        <div className="working-header">
          <div>
            <div className="section-kicker">Working with us</div>
            <h2>Commercial and operational documents belong in one system.</h2>
          </div>
          <Link className="button-primary modern-action-btn" href="/contact">
            Ask a company question <span>↗</span>
          </Link>
        </div>

        <div className="working-split-layout">
          <div className="working-block">
            <span className="working-indicator">01 // For Clients</span>
            <p>Quotations, statements of work, precise payment schedules, invoices, and comprehensive project handover documents structured transparently.</p>
          </div>
          <div className="working-block">
            <span className="working-indicator">02 // For Partners</span>
            <p>Supplier terms, security compliance protocols, technical guardrails, and direct points of contact for ongoing collaborations.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
