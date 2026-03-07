import { Calendar } from "lucide-react"
import type { NewsItem } from "@/modules/news/types"
import { getCategoryStyle, formatNewsDate } from "@/modules/news/utils"

interface ArticleHeaderProps {
  item: NewsItem
}

export function ArticleHeader({ item }: ArticleHeaderProps) {
  const types = item.news_types ?? []

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-56 h-56 bg-blue-50 rounded-full -translate-y-28 translate-x-28 pointer-events-none" />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {types.map((t) => {
            const style = getCategoryStyle(t.name)
            const Icon = style.icon
            return (
              <span
                key={t.id}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${style.bg} ${style.text}`}
              >
                <Icon className="w-3 h-3" />
                {t.name}
              </span>
            )
          })}
          <span className="inline-flex items-center gap-1.5 text-slate-400 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            {formatNewsDate(item.createdAt)}
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight text-balance">
          {item.title}
        </h1>
      </div>
    </div>
  )
}
