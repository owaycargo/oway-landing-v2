import { NEWS_API_BASE } from "./constants"
import type { ListResponse, NewsItem, NewsType, SingleResponse } from "@/modules/news/types"

export interface GetNewsListParams {
  page?: number
  pageSize?: number
  categoryName?: string
}

export async function getNewsList(
  params?: GetNewsListParams
): Promise<ListResponse<NewsItem>> {
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
    const res = await fetch(`${NEWS_API_BASE}/api/news-list?${qs}`, {
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

export async function getNewsArticle(slug: string): Promise<NewsItem | null> {
  try {
    const res = await fetch(`${NEWS_API_BASE}/api/news/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json: SingleResponse<NewsItem> = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

export async function getNewsTypes(): Promise<NewsType[]> {
  try {
    const res = await fetch(`${NEWS_API_BASE}/api/news-types`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    const json: ListResponse<NewsType> = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}
