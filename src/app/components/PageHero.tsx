import Link from 'next/link';

export default function PageHero({ eyebrow, title, description, cta = 'Start a project', ctaHref = '/contact' }: { eyebrow: string; title: string; description: string; cta?: string; ctaHref?: string }) {
  return (
    <section className="inner-hero page-reveal">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link className="button-primary" href={ctaHref}>{cta} <span>↗</span></Link>
    </section>
  );
}
