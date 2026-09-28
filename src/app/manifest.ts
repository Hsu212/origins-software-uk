import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Origins Ltd.',
    short_name: 'Origins',
    description: 'Digital engineering for ambitious teams.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07130f',
    theme_color: '#07130f',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
