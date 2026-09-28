import Link from 'next/link';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

export default function CompanyPage() {
  return <PageShell>
    <PageHero eyebrow="Company" title="Small enough to stay close. Structured enough to deliver." description="Origins is an independent digital engineering company. This page is the place for the practical company information clients, partners and suppliers usually need." cta="Contact the company" />
    <section className="content-section company-facts"><div><div className="section-kicker">Business information</div><h2>Keep these details current.</h2></div><div className="facts-card"><div><span>Legal name</span><strong>Origins Ltd.</strong></div><div><span>Company number</span><strong>ADD REGISTERED NUMBER</strong></div><div><span>Registered office</span><strong>ADD REGISTERED OFFICE</strong></div><div><span>General enquiries</span><strong>hello@originsltd.com</strong></div><div><span>Privacy enquiries</span><strong>privacy@originsltd.com</strong></div></div></section>
    <section className="content-section two-col"><div><div className="section-kicker">Working with us</div><h2>Commercial and operational documents belong in one system.</h2></div><div className="prose"><p>For clients, that can mean a quotation, statement of work, payment schedule, invoice and project documents. For partners, it can include supplier terms, security information and points of contact.</p><Link className="button-secondary" href="/contact">Ask a company question</Link></div></section>
  </PageShell>;
}
