import { Globe, Package, Zap, Bell } from "lucide-react"
import type { ComponentType } from "react"

const API_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

// --- Strapi v5 API types (flat, no `attributes` wrapper) ---

export interface StrapiNewsType {
  id: number
  documentId: string
  name: string
}

export interface StrapiNewsItem {
  id: number
  documentId: string
  title: string
  card_description: string
  description?: string | null
  slug: string
  title_seo?: string | null
  seo_description?: string | null
  createdAt: string
  news_types?: StrapiNewsType[]
}

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiListResponse<T> {
  data: T[]
  meta: { pagination: StrapiPagination }
}

export interface StrapiSingleResponse<T> {
  data: T
  meta: Record<string, unknown>
}

// --- Category UI config ---

export interface CategoryStyle {
  bg: string
  text: string
  icon: ComponentType<{ className?: string }>
}

const categoryStyles: Record<string, CategoryStyle> = {
  "Новости компании": { bg: "bg-blue-100", text: "text-blue-700", icon: Globe },
  "Обновления доставки": { bg: "bg-emerald-100", text: "text-emerald-700", icon: Package },
  "Акции": { bg: "bg-orange-100", text: "text-orange-700", icon: Zap },
  "Объявления": { bg: "bg-purple-100", text: "text-purple-700", icon: Bell },
}

const fallbackStyle: CategoryStyle = { bg: "bg-slate-100", text: "text-slate-600", icon: Globe }

export function getCategoryStyle(name: string): CategoryStyle {
  return categoryStyles[name] ?? fallbackStyle
}

// --- Date formatting ---

export function formatNewsDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

// --- API fetch functions ---

export async function getNewsList(params?: {
  page?: number
  pageSize?: number
  categoryName?: string
}): Promise<StrapiListResponse<StrapiNewsItem>> {
  const { page = 1, pageSize = 12, categoryName } = params ?? {}

  const qs = new URLSearchParams({
    populate: "news_types",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    sort: "createdAt:desc",
  })

  if (categoryName) {
    qs.set("filters[news_types][name][$eq]", categoryName)
  }

  try {
    const res = await fetch(`${API_BASE}/api/news-list?${qs}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error("fetch failed")
    return res.json()
  } catch {
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize, pageCount: 0, total: 0 } },
    }
  }
}

export async function getNewsArticle(slug: string): Promise<StrapiNewsItem | null> {
  try {
    const res = await fetch(`${API_BASE}/api/news/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json: StrapiSingleResponse<StrapiNewsItem> = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

export async function getNewsTypes(): Promise<StrapiNewsType[]> {
  try {
    const res = await fetch(`${API_BASE}/api/news-types`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    const json: StrapiListResponse<StrapiNewsType> = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}
