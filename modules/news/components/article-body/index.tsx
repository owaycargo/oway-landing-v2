import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { ArrowLeft, Calculator, MessageCircle, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NewsItem } from "@/modules/news/types"
import { ArticleShare } from "@/modules/news/components/article-share"

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

      <ArticleShare title={item.title} slug={item.slug} />

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <h3 className="text-lg md:text-xl font-bold mb-2">
          Планируете отправку посылки из США?
        </h3>
        <p className="text-sm text-blue-100 mb-4">
          OWAY CARGO — доставка в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь.
          От $12/кг. Рассчитайте за 30 секунд.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/#calculator" className="flex-1">
            <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 rounded-xl gap-2">
              <Calculator className="w-4 h-4" />
              Калькулятор
            </Button>
          </Link>
          <a
            href="https://t.me/owaycargo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              variant="outline"
              className="w-full bg-transparent text-white border-white hover:bg-white/10 rounded-xl gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Telegram
            </Button>
          </a>
        </div>
      </div>

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
