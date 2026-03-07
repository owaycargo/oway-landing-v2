import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buildNewsListHref } from "@/modules/news/utils"

interface NewsPaginationProps {
  page: number
  pageCount: number
  category?: string
}

export function NewsPagination({ page, pageCount, category }: NewsPaginationProps) {
  if (pageCount <= 1) return null

  return (
    <div className="max-w-5xl mx-auto mb-16 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link
          href={buildNewsListHref({ category, page: page - 1 })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад
        </Link>
      )}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={buildNewsListHref({ category, page: p })}
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold border transition-colors ${
            p === page
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
          }`}
        >
          {p}
        </Link>
      ))}
      {page < pageCount && (
        <Link
          href={buildNewsListHref({ category, page: page + 1 })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
        >
          Вперёд
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
