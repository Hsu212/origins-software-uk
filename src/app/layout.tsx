import type { Metadata } from 'next';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import CookieConsent from '@/app/components/CookieConsent';
import AssistantFloating from '@/app/components/AssistantFloating';
import { LocaleProvider } from '@/app/components/LocaleProvider';
import { locales, type Locale } from '@/app/i18n';
import { localizeMetadata } from './metadata';
import { headers } from 'next/headers';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const localized = await localizeMetadata(
    'Origins Software | Software for the work that matters',
    'Origins Software designs, builds and operates dependable digital products, business platforms and cloud systems for ambitious teams.',
    'Origins Software | Software for the work that matters',
    'Dependable digital products, business platforms and cloud systems, engineered with intent.',
  );

  return {
    ...localized,
    title: { default: localized.title, template: '%s | Origins Software' },
    applicationName: 'Origins Software',
    category: 'technology',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://origins-software.com'),
    openGraph: { ...localized.openGraph, type: 'website', siteName: 'Origins Software' },
    twitter: {
      card: 'summary',
      title: localized.title,
      description: 'Dependable digital products, business platforms and cloud systems, engineered with intent.',
    },
    robots: { index: true, follow: true },
    icons: { icon: '/origins-icon.png', apple: '/origins-icon.png' },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get('x-site-locale');
  const locale: Locale = locales.includes(headerLocale as Locale) ? headerLocale as Locale : 'en';
  const originalPath = requestHeaders.get('x-site-original-path') || '/';
  const unprefixedPath = originalPath.replace(/^\/(ja|zh|ar|de)(?=\/|$)/, '') || '/';
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://origins-software.com'}${originalPath}`} />
        <meta property="og:locale" content={{ en: 'en_GB', ja: 'ja_JP', zh: 'zh_CN', ar: 'ar_AR', de: 'de_DE' }[locale]} />
        {locales.filter((language) => language !== locale).map((language) => (
          <meta
            key={language}
            property="og:locale:alternate"
            content={{ en: 'en_GB', ja: 'ja_JP', zh: 'zh_CN', ar: 'ar_AR', de: 'de_DE' }[language]}
          />
        ))}
        {locales.map((language) => (
          <link
            key={language}
            rel="alternate"
            hrefLang={language}
            href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://origins-software.com'}${language === 'en' ? unprefixedPath : `/${language}${unprefixedPath === '/' ? '' : unprefixedPath}`}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://origins-software.com'}${unprefixedPath}`}
        />
        {/* Remote stylesheet loading avoids Next.js' next/font/google import-map failure. Local/system fallbacks remain available if Google Fonts cannot be reached. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700&family=Saira+Stencil+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <ThemeProvider>{children}<CookieConsent /><AssistantFloating /></ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
