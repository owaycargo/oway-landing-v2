import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag, ArrowRight } from "lucide-react"
import { getNewsArticle, getNewsList, getCategoryStyle, formatNewsDate } from "@/lib/news"

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getNewsArticle(slug)

  if (!item) return { title: "Новость не найдена" }

  const { title, title_seo, seo_description, card_description } = item

  return {
    title: title_seo ? `${title_seo} — OWAY CARGO` : `${title} — OWAY CARGO`,
    description: seo_description || card_description,
    keywords: ["OWAY CARGO", "новости OWAY Cargo", "доставка из США"],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"),
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      title: title_seo || title,
      description: seo_description || card_description,
      url: `/news/${item.slug}`,
      siteName: "OWAY CARGO",
      locale: "ru_RU",
      type: "article",
      images: [{ url: "/banner.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: title_seo || title,
      description: seo_description || card_description,
      images: ["/banner.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params

  const [item, recentData] = await Promise.all([
    getNewsArticle(slug),
    getNewsList({ page: 1, pageSize: 10 }),
  ])

  if (!item) notFound()

  const { title, card_description, description, createdAt, news_types } = item
  const primaryTypes = news_types ?? []

  const relatedArticles = recentData.data
    .filter((n) => n.slug !== slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        {/* Back link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Все новости
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            {/* Article */}
            <article>
              {/* Header card */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-56 h-56 bg-blue-50 rounded-full -translate-y-28 translate-x-28 pointer-events-none" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    {primaryTypes.map((t) => {
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
                      {formatNewsDate(createdAt)}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight text-balance">
                    {title}
                  </h1>
                </div>
              </div>

              {/* Article body */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                <p className="text-slate-500 text-base italic leading-relaxed mb-8 pb-8 border-b border-slate-100">
                  {card_description}
                </p>

                {description ? (
                  <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                    <ReactMarkdown>{description}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-slate-400 italic">Полный текст статьи недоступен.</p>
                )}

                {/* Footer row */}
                <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-slate-400 text-sm">
                    <Tag className="w-4 h-4" />
                    {primaryTypes.length > 0
                      ? primaryTypes.map((t) => t.name).join(", ")
                      : "Новость"}
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
            </article>

            {/* Sidebar */}
            <aside className="space-y-4">
              <h3 className="text-base font-bold text-slate-700 px-1">Другие новости</h3>
              {relatedArticles.map((rel) => {
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

              {/* Telegram CTA */}
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
