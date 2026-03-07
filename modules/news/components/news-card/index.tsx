import Link from "next/link"
import { Calendar, ArrowRight, Tag } from "lucide-react"
import type { NewsItem } from "@/modules/news/types"
import { getCategoryStyle, formatNewsDate } from "@/modules/news/utils"

interface NewsCardProps {
  item: NewsItem
}

export function NewsCard({ item }: NewsCardProps) {
  const primaryType = (item.news_types ?? [])[0]
  const style = getCategoryStyle(primaryType?.name ?? "")
  const Icon = style.icon

  return (
    <Link href={`/news/${item.slug}`} className="block group">
      <article className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
          {primaryType ? (
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${style.bg} ${style.text}`}
            >
              <Icon className="w-3 h-3" />
              {primaryType.name}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
              <Tag className="w-3 h-3" />
              Новость
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug flex-1 group-hover:text-blue-700 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">
          {item.card_description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <span className="inline-flex items-center gap-1.5 text-slate-400 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            {formatNewsDate(item.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold group-hover:gap-2 transition-all">
            Подробнее
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </article>
    </Link>
  )
}
