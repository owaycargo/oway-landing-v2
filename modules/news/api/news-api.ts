import { getAllPosts, getPostBySlug, getAllCategories } from "@/lib/posts"
import type { ListResponse, NewsItem, NewsType } from "@/modules/news/types"

export interface GetNewsListParams {
  page?: number
  pageSize?: number
  categoryName?: string
}

export async function getNewsList(
  params?: GetNewsListParams
): Promise<ListResponse<NewsItem>> {
  const { page = 1, pageSize = 12, categoryName } = params ?? {}

  let posts = getAllPosts()

  if (categoryName) {
    posts = posts.filter((p) =>
      p.news_types?.some((t) => t.name === categoryName)
    )
  }

  const total = posts.length
  const pageCount = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const data = posts.slice(start, start + pageSize)

  return {
    data,
    meta: { pagination: { page, pageSize, pageCount, total } },
  }
}

export async function getNewsArticle(slug: string): Promise<NewsItem | null> {
  return getPostBySlug(slug)
}

export async function getNewsTypes(): Promise<NewsType[]> {
  return getAllCategories().map((name, i) => ({
    id: i + 1,
    documentId: name,
    name,
  }))
}
