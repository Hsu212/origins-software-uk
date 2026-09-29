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

      <section className="content-section two-col">
        <div>
          <div className="section-kicker">Working with us</div>
          <h2>Commercial and operational documents belong in one system.</h2>
        </div>
        <div className="prose">
          <p>For clients, that can mean a quotation, statement of work, payment schedule, invoice and project documents. For partners, it can include supplier terms, security information and points of contact.</p>
          <Link className="button-secondary" href="/contact">Ask a company question</Link>
        </div>
      </section>
    </PageShell>
  );
}
