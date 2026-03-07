import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NewsItem } from "@/modules/news/types"

interface ArticleBodyProps {
  item: NewsItem
}

export function ArticleBody({ item }: ArticleBodyProps) {
  const types = item.news_types ?? []
  const primaryLabels = types.length > 0 ? types.map((t) => t.name).join(", ") : "Новость"

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
      <p className="text-slate-500 text-base italic leading-relaxed mb-8 pb-8 border-b border-slate-100">
        {item.card_description}
      </p>

      {item.description ? (
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown>{item.description}</ReactMarkdown>
        </div>
      ) : (
        <p className="text-slate-400 italic">Полный текст статьи недоступен.</p>
      )}

      <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-slate-400 text-sm">
          <Tag className="w-4 h-4" />
          {primaryLabels}
        </div>
        <Button
          asChild
          variant="outline"
          className="border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
        >
          <Link href="/news" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Все новости
          </Link>
        </Button>
      </div>
    </div>
  )
}
