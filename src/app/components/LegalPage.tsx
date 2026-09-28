import Link from 'next/link';

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: { heading: string; body: React.ReactNode }[] }) {
  return (
    <section className="legal-page page-reveal">
      <div className="legal-meta"><Link href="/">Origins</Link><span>Legal</span></div>
      <h1>{title}</h1>
      <div className="legal-updated">Last updated: {updated}</div>
      <p className="legal-intro">{intro}</p>
      <div className="legal-sections">
        {sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><div className="legal-body">{section.body}</div></section>)}
      </div>
    </section>
  );
}
