import { MetadataRoute } from "next"
import { marketplaces } from "@/lib/marketplaces"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"

  const marketplaceUrls: MetadataRoute.Sitemap = marketplaces.map((marketplace) => ({
    url: `${baseUrl}/marketplace/${marketplace.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...marketplaceUrls,
  ]
}

