import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Origins Software',
    short_name: 'Origins',
    description: 'Independent software engineering for dependable digital products and platforms.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020D14',
    theme_color: '#020D14',
    icons: [{ src: '/origins-icon.png', sizes: 'any', type: 'image/png' }],
  };
}
