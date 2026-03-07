import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NewsItem } from "@/modules/news/types"
import { getCategoryStyle, formatNewsDate } from "@/modules/news/utils"

interface RelatedArticlesSidebarProps {
  articles: NewsItem[]
  currentSlug: string
}

export function RelatedArticlesSidebar({ articles, currentSlug }: RelatedArticlesSidebarProps) {
  const filtered = articles.filter((n) => n.slug !== currentSlug).slice(0, 3)

  return (
    <aside className="space-y-4">
      <h3 className="text-base font-bold text-slate-700 px-1">Другие новости</h3>
      {filtered.map((rel) => {
        const relTypes = rel.news_types ?? []
        const primaryRelType = relTypes[0]
        const relStyle = getCategoryStyle(primaryRelType?.name ?? "")
        const RelIcon = relStyle.icon
        return (
          <Link key={rel.id} href={`/news/${rel.slug}`} className="block group">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
              {primaryRelType && (
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${relStyle.bg} ${relStyle.text}`}
                  >
                    <RelIcon className="w-2.5 h-2.5" />
                    {primaryRelType.name}
                  </span>
                </div>
              )}
              <h4 className="text-sm font-semibold text-slate-800 leading-snug mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                {rel.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatNewsDate(rel.createdAt)}
                </span>
                <span className="text-blue-600 text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Читать
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        )
      })}

      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white text-center mt-2">
        <p className="font-bold mb-2">Подпишитесь на Telegram</p>
        <p className="text-blue-100 text-sm mb-4 leading-relaxed">
          Первыми узнавайте о новостях и акциях
        </p>
        <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600 text-white w-full">
          <a href="https://t.me/owaycargo" target="_blank" rel="noopener noreferrer">
            Подписаться
          </a>
        </Button>
      </div>
    </aside>
  )
}
