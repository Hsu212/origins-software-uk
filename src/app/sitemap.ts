import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://originsltd.com';
  const paths = ['', '/about', '/services', '/work', '/process', '/company', '/contact', '/legal/privacy', '/legal/terms', '/legal/service-terms', '/legal/cookies', '/legal/security', '/legal/accessibility', '/legal/acceptable-use'];
  return paths.map((path) => ({ url: `${base}${path}`, changeFrequency: 'monthly', priority: path === '' ? 1 : 0.6 }));
}
