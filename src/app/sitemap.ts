import type { MetadataRoute } from 'next';
import { processStages, serviceSpecialties, workPatterns } from '@/app/data/siteContent';
import { locales } from '@/app/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://origins-software.com';
  const staticPaths = ['', '/about', '/features', '/services', '/work', '/portfolio', '/process', '/company', '/contact', '/settings', '/legal/privacy', '/legal/terms', '/legal/service-terms', '/legal/cookies', '/legal/security', '/legal/accessibility', '/legal/acceptable-use'];
  const dynamicPaths = [
    ...serviceSpecialties.map((item) => `/services/${item.slug}`),
    ...workPatterns.map((item) => `/work/${item.slug}`),
    ...processStages.map((item) => `/process/${item.slug}`),
  ];
  const paths = [...staticPaths, ...dynamicPaths];
  return paths.flatMap((path) => locales.map((locale) => ({
    url: `${base}${locale === 'en' ? '' : `/${locale}`}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : path.split('/').length > 2 ? 0.55 : 0.7,
  })));
}
