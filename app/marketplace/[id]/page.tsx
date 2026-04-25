import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { MarketplaceLogo } from "@/components/marketplace-logo"
import { ShopLinkButton } from "./shop-link-button"
import { getMarketplaceById, marketplaces, categories } from "@/lib/marketplaces"
import { COUNTRY_LANDINGS } from "@/lib/countries"
import { ArrowLeft, BookOpen, ShoppingBag } from "lucide-react"

interface MarketplacePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return marketplaces.map((marketplace) => ({
    id: marketplace.id,
  }))
}

export async function generateMetadata({ params }: MarketplacePageProps): Promise<Metadata> {
  const { id } = await params
  const marketplace = getMarketplaceById(id)

  if (!marketplace) {
    return {
      title: "Магазин не найден",
    }
  }

  const categoryName = categories.find((c) => c.id === marketplace.category)?.name || "Магазин"

  return {
    title: `${marketplace.name} — Заказ товаров из США через OWAY CARGO`,
    description: `${marketplace.description} Заказывайте товары из ${marketplace.name} с доставкой в СНГ через OWAY CARGO.`,
    keywords: [
      marketplace.name,
      `заказ из ${marketplace.name}`,
      `доставка из ${marketplace.name}`,
      categoryName,
      "доставка из США",
      "OWAY CARGO",
    ],
    alternates: { canonical: `/marketplace/${id}` },
    openGraph: {
      title: `${marketplace.name} — Заказ товаров из США`,
      description: marketplace.description,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function MarketplacePage({ params }: MarketplacePageProps) {
  const { id } = await params
  const marketplace = getMarketplaceById(id)

  if (!marketplace) {
    notFound()
  }

  const GUIDE_MAP: Record<string, string> = {
    amazon:       "/guides/amazon",
    ebay:         "/guides/ebay",
    walmart:      "/guides/walmart",
    iherb:        "/guides/iherb",
    nike:         "/guides/nike",
    target:       "/guides/target",
    bestbuy:      "/guides/bestbuy",
    nordstrom:    "/guides/nordstrom",
    nordstromrack:"/guides/nordstrom",
  }
  const guideUrl = GUIDE_MAP[marketplace.id]

  const category = categories.find((c) => c.id === marketplace.category)
  const relatedMarketplaces = marketplaces
    .filter((m) => m.category === marketplace.category && m.id !== marketplace.id)
    .slice(0, 4)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Доставка из ${marketplace.name} в страны СНГ`,
    description: `Услуга OWAY CARGO по доставке товаров из ${marketplace.name} в Россию, Беларусь, Казахстан, Кыргызстан и Узбекистан. Тарифы от $12 за кг.`,
    serviceType: "Международная доставка посылок",
    provider: {
      "@type": "Organization",
      name: "OWAY CARGO",
      url: baseUrl,
    },
    areaServed: [
      { "@type": "Country", name: "Russia" },
      { "@type": "Country", name: "Belarus" },
      { "@type": "Country", name: "Kazakhstan" },
      { "@type": "Country", name: "Kyrgyzstan" },
      { "@type": "Country", name: "Uzbekistan" },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "12",
      highPrice: "18",
      offerCount: 5,
      description: "От $12/кг (Кыргызстан, Казахстан, Узбекистан) до $18/кг (Россия, Беларусь)",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Магазины США", url: "/#marketplace" },
          { name: marketplace.name, url: `/marketplace/${marketplace.id}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main className="w-full max-w-[1440px] mx-auto px-[15px] py-8 md:py-16">
        {/* Back Button */}
        <Link
          href="/#marketplace"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться к списку магазинов</span>
        </Link>

        {/* Marketplace Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="w-32 h-32 rounded-3xl bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
              <div className="text-xs font-bold text-slate-700 px-2 text-center leading-tight">
                <MarketplaceLogo logo={marketplace.logo} />
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                {category?.name}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{marketplace.name}</h1>
              <p className="text-lg text-slate-600 leading-relaxed">{marketplace.description}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <ShopLinkButton marketplaceId={marketplace.id} url={marketplace.url} />
            <Link href="/#calculator" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-2 border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:border-blue-500 rounded-xl text-base font-medium py-6"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Рассчитать доставку
              </Button>
            </Link>
          </div>
        </div>

        {/* Guide Banner */}
        {guideUrl && (
          <Link href={guideUrl} className="block mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl px-6 py-4 flex items-center justify-between gap-4 hover:from-blue-700 hover:to-blue-800 transition-all">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-white shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm md:text-base">
                    Полный гайд по покупкам на {marketplace.name}
                  </p>
                  <p className="text-blue-200 text-xs mt-0.5">Лайфхаки, экономия, пошаговая инструкция для СНГ</p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-white rotate-180 shrink-0" />
            </div>
          </Link>
        )}

        {/* How to Order Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Как заказать товары из {marketplace.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Выберите товары</h3>
                  <p className="text-slate-600 text-sm">
                    Перейдите на сайт {marketplace.name} и добавьте нужные товары в корзину. Оформите заказ с адресом
                    доставки OWAY CARGO.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Получите адрес склада</h3>
                  <p className="text-slate-600 text-sm">
                    В личном кабинете OWAY CARGO вы получите адрес склада в США, куда нужно отправить посылку.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Отслеживайте посылку</h3>
                  <p className="text-slate-600 text-sm">
                    После получения посылки на складе вы получите уведомление и сможете отслеживать её статус в
                    реальном времени.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Получите доставку</h3>
                  <p className="text-slate-600 text-sm">
                    Посылка будет доставлена в ваш город через нашу сеть доставки. Вы получите уведомление о готовности
                    к выдаче.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Country delivery links */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Доставляем из {marketplace.name} в 5 стран СНГ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {COUNTRY_LANDINGS.map((c) => (
              <Link key={c.slug} href={`/delivery/${c.slug}`}>
                <Card className="p-4 bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-1">{c.flag}</div>
                  <div className="font-semibold text-slate-900 text-sm">{c.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">${c.price}/кг · {c.days} дн.</div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Marketplaces */}
        {relatedMarketplaces.length > 0 && (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Похожие магазины</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedMarketplaces.map((related) => (
                <Link key={related.id} href={`/marketplace/${related.id}`}>
                  <Card className="p-6 rounded-3xl border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer bg-white h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center mb-4 shadow-sm overflow-hidden">
                        <div className="text-xs font-bold text-slate-700 px-2 text-center leading-tight">
                          <MarketplaceLogo logo={related.logo} />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{related.name}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">{related.description}</p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium py-2.5">
                        Подробнее
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

