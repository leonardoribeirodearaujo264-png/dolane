import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${site.url}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/gift-cards`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${site.url}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/cookie-policy`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
