'use client';

import Link, { type LinkProps } from 'next/link';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { useLocale } from './LocaleProvider';
import { withLocale } from '@/app/i18n';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

const LocaleLink = forwardRef<HTMLAnchorElement, Props>(function LocaleLink({ href, scroll, ...props }, ref) {
  const locale = useLocale();
  const localizedHref = typeof href === 'string' ? withLocale(href, locale) : href;
  const hasHash = typeof href === 'string' && href.includes('#');
  return <Link href={localizedHref} scroll={scroll ?? hasHash} ref={ref} {...props} />;
});

export default LocaleLink;
