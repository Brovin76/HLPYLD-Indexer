import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://hypurryield.xyz/sitemap.xml',
  }
}

export function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hypurryield.xyz',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://hypurryield.xyz/vaults',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Add other important routes
  ]
}