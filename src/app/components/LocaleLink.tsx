'use client';

import Link, { type LinkProps } from 'next/link';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { useLocale } from './LocaleProvider';
import { withLocale } from '@/app/i18n';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

const LocaleLink = forwardRef<HTMLAnchorElement, Props>(function LocaleLink({ href, ...props }, ref) {
  const locale = useLocale();
  const localizedHref = typeof href === 'string' ? withLocale(href, locale) : href;
  return <Link href={localizedHref} ref={ref} {...props} />;
});

export default LocaleLink;
