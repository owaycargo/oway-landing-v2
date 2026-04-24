import { MetadataRoute } from "next"
import { marketplaces } from "@/lib/marketplaces"
import { COUNTRY_LANDINGS } from "@/lib/countries"
import { CATEGORY_LANDINGS } from "@/lib/categories-data"
import { getAllPosts } from "@/lib/posts"

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

  const posts = getAllPosts()
  const newsUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

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
      url: `${baseUrl}/sales`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/ebay`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/partner`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tracking`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/amazon`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/walmart`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/iherb`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/shein`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/nike`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/target`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/bestbuy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/nordstrom`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/costco`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...countryUrls,
    ...categoryUrls,
    ...newsUrls,
    ...marketplaceUrls,
  ]
}
