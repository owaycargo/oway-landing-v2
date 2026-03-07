import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Newspaper, Calendar, ArrowRight, Tag, Zap, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import {
  getNewsList,
  getNewsTypes,
  getCategoryStyle,
  formatNewsDate,
} from "@/lib/news"

export const metadata: Metadata = {
  title: "Новости — OWAY CARGO | Обновления и события компании",
  description:
    "Последние новости OWAY CARGO: расширение маршрутов доставки, новые тарифы, партнёрства и события компании. Будьте в курсе всех обновлений.",
  keywords: [
    "новости OWAY Cargo",
    "обновления доставки из США",
    "логистика новости",
    "OWAY Cargo события",
    "доставка из США обновления",
    "новые маршруты доставки",
    "акции доставка СНГ",
  ],
  authors: [{ name: "OWAY CARGO" }],
  creator: "OWAY CARGO",
  publisher: "OWAY CARGO",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"),
  alternates: { canonical: "/news" },
  openGraph: {
    title: "Новости — OWAY CARGO | Обновления и события компании",
    description:
      "Последние новости OWAY CARGO: расширение маршрутов доставки, новые тарифы, партнёрства и события компании.",
    url: "/news",
    siteName: "OWAY CARGO",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/banner.jpg", width: 1200, height: 630, alt: "Новости OWAY CARGO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Новости — OWAY CARGO",
    description: "Последние новости и обновления OWAY CARGO",
    images: ["/banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

interface NewsPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { category, page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)
  const pageSize = 9

  const [newsData, newsTypes] = await Promise.all([
    getNewsList({ page, pageSize, categoryName: category }),
    getNewsTypes(),
  ])

  const articles = newsData.data
  const pagination = newsData.meta.pagination

  const featured = !category && page === 1 ? articles[0] : null
  const grid = featured ? articles.slice(1) : articles

  function buildHref(params: { category?: string; page?: number }) {
    const qs = new URLSearchParams()
    if (params.category) qs.set("category", params.category)
    if (params.page && params.page > 1) qs.set("page", String(params.page))
    const str = qs.toString()
    return `/news${str ? `?${str}` : ""}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Newspaper className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-balance">
            Новости OWAY CARGO
          </h1>
          <p className="text-lg text-slate-600 text-pretty leading-relaxed">
            Следите за последними обновлениями, акциями и событиями компании. Мы регулярно публикуем
            новости о маршрутах, тарифах и улучшениях сервиса.
          </p>
        </div>

        {/* Category filter */}
        {newsTypes.length > 0 && (
          <div className="max-w-5xl mx-auto mb-10 flex flex-wrap gap-2 justify-center">
            <Link
              href={buildHref({})}
              className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                !category
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              Все
            </Link>
            {newsTypes.map((t) => {
              const style = getCategoryStyle(t.name)
              const Icon = style.icon
              const active = category === t.name
              return (
                <Link
                  key={t.id}
                  href={buildHref({ category: t.name })}
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
        )}

        {articles.length === 0 ? (
          <div className="max-w-5xl mx-auto text-center py-20">
            <p className="text-slate-400 text-lg">Новостей не найдено</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <div className="max-w-5xl mx-auto mb-10">
                <Link href={`/news/${featured.slug}`} className="block group">
                  <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
                    <div className="relative">
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          <Zap className="w-3 h-3" />
                          Главное
                        </span>
                        {(featured.news_types ?? []).map((t) => {
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
                          {formatNewsDate(featured.createdAt)}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 text-balance group-hover:text-blue-700 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">
                        {featured.card_description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Читать подробнее
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* News Grid */}
            <div className="max-w-5xl mx-auto mb-10">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grid.map((item) => {
                  const primaryType = (item.news_types ?? [])[0]
                  const style = getCategoryStyle(primaryType?.name ?? "")
                  const Icon = style.icon
                  return (
                    <Link key={item.id} href={`/news/${item.slug}`} className="block group">
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
                })}
              </div>
            </div>

            {/* Pagination */}
            {pagination.pageCount > 1 && (
              <div className="max-w-5xl mx-auto mb-16 flex items-center justify-center gap-2">
                {page > 1 && (
                  <Link
                    href={buildHref({ category, page: page - 1 })}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Назад
                  </Link>
                )}
                {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={buildHref({ category, page: p })}
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold border transition-colors ${
                      p === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                {page < pagination.pageCount && (
                  <Link
                    href={buildHref({ category, page: page + 1 })}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    Вперёд
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
          </>
        )}

        {/* Subscribe CTA */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Bell className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Будьте в курсе новостей</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Подпишитесь на наш Telegram-канал и первыми узнавайте об акциях, обновлениях маршрутов и
            важных объявлениях OWAY CARGO.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
              <a href="https://t.me/owaycargo" target="_blank" rel="noopener noreferrer">
                Подписаться на Telegram
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold"
            >
              <Link href="/">На главную</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
