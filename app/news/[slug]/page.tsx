import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import {
  getNewsArticle,
  getNewsList,
  ArticleHeader,
  ArticleBody,
  RelatedArticlesSidebar,
} from "@/modules/news"
import { getAllPosts } from "@/lib/posts"

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title_seo || item.title,
    description: item.seo_description || item.card_description,
    datePublished: item.createdAt,
    dateModified: item.createdAt,
    author: {
      "@type": "Organization",
      name: "OWAY CARGO",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "OWAY CARGO",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.svg`,
      },
    },
    image: `${baseUrl}/banner.jpg`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/news/${item.slug}`,
    },
    inLanguage: "ru",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Новости", url: "/news" },
          { name: item.title, url: `/news/${item.slug}` },
        ]}
      />
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
