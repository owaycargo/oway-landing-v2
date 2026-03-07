const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

export interface StrapiSeoImage {
  id: number
  url: string
  width: number
  height: number
  alternativeText: string | null
}

export interface StrapiSeoPage {
  id: number
  documentId: string
  title: string
  description: string
  keywords: string
  slug: string
  image: StrapiSeoImage[] | null
}

export interface StrapiSeoResponse {
  data: StrapiSeoPage | null
}

export async function getSeoPage(slug: string): Promise<StrapiSeoPage | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/seo-pages/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json: StrapiSeoResponse = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

export function parseKeywords(keywords: string): string[] {
  if (!keywords || typeof keywords !== "string") return []
  return keywords
    .split(", ")
    .map((k) => k.trim())
    .filter(Boolean)
}

export function getStrapiImageUrl(url: string): string {
  if (!url) return ""
  if (url.startsWith("http")) return url
  return `${STRAPI_URL.replace(/\/$/, "")}${url.startsWith("/") ? "" : "/"}${url}`
}
