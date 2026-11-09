'use client';

import Image from 'next/image';
import Link from '@/app/components/LocaleLink';
import { translate } from '@/app/i18n';
import { useLocale } from './LocaleProvider';

export default function PageHero({ eyebrow, title, description, cta = 'Start a project', ctaHref = '/contact', image }: { eyebrow: string; title: string; description: string; cta?: string; ctaHref?: string; image?: string }) {
  const locale = useLocale();
  return (
    <section className={`inner-hero page-reveal${image ? ' inner-hero-with-art' : ''}`}>
      <div className="inner-hero-copy">
        <div className="eyebrow">{translate(locale, eyebrow)}</div>
        <h1>{translate(locale, title)}</h1>
        <p>{translate(locale, description)}</p>
        <Link className="button-primary" href={ctaHref}>{translate(locale, cta)} <span>↗</span></Link>
      </div>
      {image && (
        <div className="inner-hero-art" aria-hidden="true">
          <Image src={image} alt="" fill sizes="(max-width: 820px) 360px, (max-width: 1100px) 34vw, 380px" className="inner-hero-art-image" />
          <span className="inner-hero-art-index">{eyebrow}</span>
          <span className="inner-hero-art-frame" />
        </div>
      )}
    </section>
  );
}
