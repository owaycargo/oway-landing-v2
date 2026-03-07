export interface BuildHrefParams {
  category?: string
  page?: number
}

export function buildNewsListHref(params: BuildHrefParams): string {
  const qs = new URLSearchParams()
  if (params.category) qs.set("category", params.category)
  if (params.page != null && params.page > 1) qs.set("page", String(params.page))
  const str = qs.toString()
  return `/news${str ? `?${str}` : ""}`
}
