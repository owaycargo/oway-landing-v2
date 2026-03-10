import Link from "next/link"
import type { NewsType } from "@/modules/news/types"
import { getCategoryStyle, buildNewsListHref } from "@/modules/news/utils"

interface NewsCategoryFilterProps {
  newsTypes: NewsType[]
  currentCategory?: string
}

export function NewsCategoryFilter({ newsTypes, currentCategory }: NewsCategoryFilterProps) {
  if (newsTypes.length === 0) return null

  return (
    <div className="max-w-5xl mx-auto mb-10 flex flex-wrap gap-2 justify-center">
      <Link
        href={buildNewsListHref({})}
        className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
          !currentCategory
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
        }`}
      >
        Все
      </Link>
      {newsTypes.map((t) => {
        const style = getCategoryStyle(t.name)
        const Icon = style.icon
        const active = currentCategory === t.name
        return (
          <Link
            key={t.id}
            href={buildNewsListHref({ category: t.name })}
            className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
              active
                ? `${style.bg} ${style.text} border-transparent`
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {t.name}
          </Link>
        )
      })}
    </div>
  )
}
