import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import {
  getNewsList,
  getNewsTypes,
  NewsHero,
  NewsCategoryFilter,
  NewsFeaturedCard,
  NewsGrid,
  NewsPagination,
  NewsSubscribeCta,
} from "@/modules/news"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Новости", url: "/news" },
        ]}
      />
      <Header />

      <main className="container mx-auto px-4 py-16">
        <NewsHero />

        <NewsCategoryFilter newsTypes={newsTypes} currentCategory={category} />

        {articles.length === 0 ? (
          <div className="max-w-5xl mx-auto text-center py-20">
            <p className="text-slate-400 text-lg">Новостей не найдено</p>
          </div>
        ) : (
          <>
            {featured && <NewsFeaturedCard item={featured} />}
            <NewsGrid items={grid} />
            <NewsPagination
              page={pagination.page}
              pageCount={pagination.pageCount}
              category={category}
            />
          </>
        )}

        <NewsSubscribeCta />
      </main>

      <Footer />
    </div>
  )
}
