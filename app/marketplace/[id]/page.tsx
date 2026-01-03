import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getMarketplaceById, marketplaces, categories } from "@/lib/marketplaces"
import { ArrowLeft, ExternalLink, ShoppingBag } from "lucide-react"

interface MarketplacePageProps {
  params: Promise<{
    id: string
  }>
}

function getMarketplaceLogo(logo: string) {
  const logoStyles: Record<string, JSX.Element> = {
    ebay: <span className="text-blue-600" style={{ fontSize: "14px" }}>eBay</span>,
    amazon: <span className="text-orange-700" style={{ fontSize: "12px" }}>amazon</span>,
    walmart: <span className="text-blue-600" style={{ fontSize: "11px" }}>Walmart</span>,
    newegg: <span className="text-orange-700" style={{ fontSize: "12px" }}>Newegg</span>,
    macys: <span className="text-red-600" style={{ fontSize: "13px" }}>Macy's</span>,
    nordstrom: <span className="text-slate-800" style={{ fontSize: "11px" }}>Nordstrom</span>,
    target: <span className="text-red-600" style={{ fontSize: "13px" }}>Target</span>,
    kohls: <span className="text-blue-600" style={{ fontSize: "13px" }}>Kohl's</span>,
    zara: <span className="text-slate-900" style={{ fontSize: "16px" }}>ZARA</span>,
    hm: <span className="text-red-600" style={{ fontSize: "18px", fontWeight: "900" }}>H&M</span>,
    gap: <span className="text-blue-600" style={{ fontSize: "16px" }}>GAP</span>,
    oldnavy: <span className="text-blue-600" style={{ fontSize: "11px" }}>Old Navy</span>,
    nike: <span className="text-slate-900" style={{ fontSize: "14px", fontWeight: "900" }}>NIKE</span>,
    adidas: <span className="text-slate-900" style={{ fontSize: "12px" }}>adidas</span>,
    footlocker: <span className="text-blue-600" style={{ fontSize: "10px" }}>Foot Locker</span>,
    dsw: <span className="text-orange-700" style={{ fontSize: "14px", fontWeight: "900" }}>DSW</span>,
    costco: <span className="text-red-600" style={{ fontSize: "13px", fontWeight: "700" }}>Costco</span>,
    samsclub: <span className="text-blue-600" style={{ fontSize: "11px" }}>Sam's Club</span>,
    bjs: <span className="text-blue-600" style={{ fontSize: "14px", fontWeight: "700" }}>BJ's</span>,
    dollargeneral: <span className="text-yellow-600" style={{ fontSize: "10px" }}>Dollar General</span>,
    toysrus: <span className="text-blue-600" style={{ fontSize: "11px" }}>Toys R Us</span>,
    carters: <span className="text-blue-600" style={{ fontSize: "13px" }}>Carter's</span>,
    childrensplace: <span className="text-blue-600" style={{ fontSize: "9px" }}>Children's Place</span>,
    potterybarnkids: <span className="text-slate-700" style={{ fontSize: "8px" }}>Pottery Barn Kids</span>,
    vitaminshoppe: <span className="text-green-600" style={{ fontSize: "9px" }}>Vitamin Shoppe</span>,
    gnc: <span className="text-yellow-600" style={{ fontSize: "16px", fontWeight: "900" }}>GNC</span>,
    iherb: <span className="text-green-600" style={{ fontSize: "14px", fontWeight: "700" }}>iHerb</span>,
    vitacost: <span className="text-green-600" style={{ fontSize: "12px" }}>Vitacost</span>,
  }
  return logoStyles[logo] || <span className="text-slate-700">{logo}</span>
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
    openGraph: {
      title: `${marketplace.name} — Заказ товаров из США`,
      description: marketplace.description,
      type: "website",
    },
  }
}

export default async function MarketplacePage({ params }: MarketplacePageProps) {
  const { id } = await params
  const marketplace = getMarketplaceById(id)

  if (!marketplace) {
    notFound()
  }

  const category = categories.find((c) => c.id === marketplace.category)
  const relatedMarketplaces = marketplaces
    .filter((m) => m.category === marketplace.category && m.id !== marketplace.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
                {getMarketplaceLogo(marketplace.logo)}
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
            <a
              href={marketplace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-medium py-6">
                <ExternalLink className="w-5 h-5 mr-2" />
                Перейти на сайт магазина
              </Button>
            </a>
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
                          {getMarketplaceLogo(related.logo)}
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

