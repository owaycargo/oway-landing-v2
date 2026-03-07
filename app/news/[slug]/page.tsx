import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  getNewsArticle,
  getNewsList,
  ArticleHeader,
  ArticleBody,
  RelatedArticlesSidebar,
} from "@/modules/news"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Все новости
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            <article>
              <ArticleHeader item={item} />
              <ArticleBody item={item} />
            </article>

            <RelatedArticlesSidebar
              articles={recentData.data}
              currentSlug={slug}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
