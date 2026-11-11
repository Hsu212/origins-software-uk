import { headers } from 'next/headers';
import { locales, translate, type Locale } from './i18n';

export async function localizeMetadata(
  title: string,
  description: string,
  openGraphTitle = title,
  openGraphDescription = description,
) {
  const localeHeader = (await headers()).get('x-site-locale');
  const locale: Locale = locales.includes(localeHeader as Locale) ? (localeHeader as Locale) : 'en';

  return {
    title: translate(locale, title),
    description: translate(locale, description),
    openGraph: {
      title: translate(locale, openGraphTitle),
      description: translate(locale, openGraphDescription),
    },
  };
}
