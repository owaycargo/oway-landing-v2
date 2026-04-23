import { MetadataRoute } from "next"
import { marketplaces } from "@/lib/marketplaces"
import { COUNTRY_LANDINGS } from "@/lib/countries"
import { CATEGORY_LANDINGS } from "@/lib/categories-data"

// Stable date для статичных страниц — обновляется только при деплое.
// Не вычисляется на каждый request, чтобы Google не видел «всё изменилось сегодня».
const STATIC_LAST_MODIFIED = new Date(
  process.env.BUILD_DATE || "2026-04-23",
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"

  const marketplaceUrls: MetadataRoute.Sitemap = marketplaces.map((marketplace) => ({
    url: `${baseUrl}/marketplace/${marketplace.id}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const countryUrls: MetadataRoute.Sitemap = COUNTRY_LANDINGS.map((c) => ({
    url: `${baseUrl}/delivery/${c.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_LANDINGS.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  // Fetch news slugs for dynamic news pages
  let newsUrls: MetadataRoute.Sitemap = []
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    const res = await fetch(
      `${strapiUrl}/api/news-list?pagination[pageSize]=100&sort=createdAt:desc`,
      { next: { revalidate: 3600 } },
    )
    if (res.ok) {
      const json = await res.json()
      const articles = json.data ?? []
      newsUrls = articles
        .filter((a: { slug?: string }) => a.slug)
        .map((a: { slug: string; createdAt?: string; updatedAt?: string }) => ({
          url: `${baseUrl}/news/${a.slug}`,
          lastModified: new Date(a.updatedAt || a.createdAt || STATIC_LAST_MODIFIED),
          changeFrequency: "monthly" as const,
          priority: 0.5,
        }))
    }
  } catch {
    // Strapi unavailable — skip news URLs
  }

  return [
    {
      url: baseUrl,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...countryUrls,
    ...categoryUrls,
    ...newsUrls,
    ...marketplaceUrls,
  ]
}
