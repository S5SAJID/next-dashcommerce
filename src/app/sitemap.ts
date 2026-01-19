import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NODE_ENV === "development" ? "http" : "https"}://${process.env.CUSTOM_ROOT_DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}