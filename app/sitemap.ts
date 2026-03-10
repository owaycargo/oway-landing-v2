import { MetadataRoute } from "next"
import { marketplaces } from "@/lib/marketplaces"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"

  const marketplaceUrls: MetadataRoute.Sitemap = marketplaces.map((marketplace) => ({
    url: `${baseUrl}/marketplace/${marketplace.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Fetch news slugs for dynamic news pages
  let newsUrls: MetadataRoute.Sitemap = []
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    const res = await fetch(
      `${strapiUrl}/api/news-list?pagination[pageSize]=100&sort=createdAt:desc`,
      { next: { revalidate: 3600 } }
    )
    if (res.ok) {
      const json = await res.json()
      const articles = json.data ?? []
      newsUrls = articles
        .filter((a: { slug?: string }) => a.slug)
        .map((a: { slug: string }) => ({
          url: `${baseUrl}/news/${a.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.5,
        }))
    }
  } catch {
    // Strapi unavailable — skip news URLs
  }

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
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...newsUrls,
    ...marketplaceUrls,
  ]
}

