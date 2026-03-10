import Link from "next/link"
import { Calendar, ArrowRight, Zap } from "lucide-react"
import type { NewsItem } from "@/modules/news/types"
import { getCategoryStyle, formatNewsDate } from "@/modules/news/utils"

interface NewsFeaturedCardProps {
  item: NewsItem
}

export function NewsFeaturedCard({ item }: NewsFeaturedCardProps) {
  const types = item.news_types ?? []

  return (
    <div className="max-w-5xl mx-auto mb-10">
      <Link href={`/news/${item.slug}`} className="block group">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Zap className="w-3 h-3" />
                Главное
              </span>
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
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 text-balance group-hover:text-blue-700 transition-colors">
              {item.title}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">
              {item.card_description}
            </p>
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
              Читать подробнее
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
