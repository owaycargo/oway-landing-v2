import type { ComponentType } from "react"

export interface NewsType {
  id: number
  documentId: string
  name: string
}

export interface NewsItem {
  id: number
  documentId: string
  title: string
  card_description: string
  description?: string | null
  slug: string
  title_seo?: string | null
  seo_description?: string | null
  createdAt: string
  news_types?: NewsType[]
}

export interface PaginationMeta {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface ListResponse<T> {
  data: T[]
  meta: { pagination: PaginationMeta }
}

export interface SingleResponse<T> {
  data: T
  meta: Record<string, unknown>
}

export interface CategoryStyle {
  bg: string
  text: string
  icon: ComponentType<{ className?: string }>
}
