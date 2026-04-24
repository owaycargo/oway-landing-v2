import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Гайды по шопингу в США — как покупать на Amazon, eBay, Walmart, iHerb",
  description:
    "Подробные инструкции по покупкам в американских интернет-магазинах с доставкой в СНГ через OWAY CARGO. Amazon, eBay, Walmart, iHerb — советы, лайфхаки, экономия.",
  keywords: [
    "гайды шопинг США",
    "как покупать на Amazon",
    "как покупать на eBay",
    "Walmart доставка СНГ",
    "iHerb доставка Россия",
    "шопинг из США",
    "OWAY CARGO гайды",
  ],
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Гайды по шопингу в США — Amazon, eBay, Walmart, iHerb",
    description: "Советы и лайфхаки по покупкам в США с доставкой в Россию, Казахстан, Кыргызстан, Беларусь.",
    url: "/guides",
    type: "website",
  },
  robots: { index: true, follow: true },
}

const guides = [
  {
    href: "/guides/amazon",
    logo: "🛒",
    name: "Amazon",
    badge: "Самый популярный",
    badgeColor: "bg-orange-100 text-orange-700",
    description:
      "Миллионы товаров, Prime 1-2 дня на склад, A-to-z Guarantee и Amazon Basics со скидкой 40%. Полный гайд для покупателей из СНГ.",
    highlights: ["Amazon Prime", "Amazon Basics −40%", "A-to-z Guarantee", "CamelCamelCamel"],
    color: "from-orange-50 to-amber-50",
    border: "border-orange-200",
  },
  {
    href: "/guides/ebay",
    logo: "🔖",
    name: "eBay",
    badge: "Б/у и редкие товары",
    badgeColor: "bg-blue-100 text-blue-700",
    description:
      "Аукционы, брендовые вещи по $1, редкая электроника и запчасти. Как не попасться на мошенников и выигрывать торги.",
    highlights: ["Аукционы", "Best Offer", "eBay Bucks", "Money Back Guarantee"],
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
  },
  {
    href: "/guides/walmart",
    logo: "🏪",
    name: "Walmart",
    badge: "Дешевле Amazon",
    badgeColor: "bg-yellow-100 text-yellow-700",
    description:
      "Детские товары, Equate витамины и бытовая химия дешевле Amazon. Важный нюанс Ship to vs Pickup only — разбираем.",
    highlights: ["Детские товары", "Equate бренд", "Walmart+", "Ship to склад"],
    color: "from-yellow-50 to-orange-50",
    border: "border-yellow-200",
  },
  {
    href: "/guides/iherb",
    logo: "🌿",
    name: "iHerb",
    badge: "Витамины и БАДы",
    badgeColor: "bg-green-100 text-green-700",
    description:
      "Топ-9 брендов, промокод −20% новым, Rewards 5% и Daily Deals. Почему через OWAY дешевле чем напрямую в РФ.",
    highlights: ["−20% новым", "Rewards 5%", "Daily Deals", "Топ-9 брендов"],
    color: "from-green-50 to-emerald-50",
    border: "border-green-200",
  },
  {
    href: "/guides/shein",
    logo: "👗",
    name: "SHEIN",
    badge: "Одежда до −90%",
    badgeColor: "bg-pink-100 text-pink-700",
    description:
      "Таблица размеров, Flash Sales, промокоды и лайфхаки. Платье за $8 вместо $40 в ресейле — реально.",
    highlights: ["Скидки до 90%", "Таблица размеров", "Flash Sales", "35 дней возврат"],
    color: "from-pink-50 to-rose-50",
    border: "border-pink-200",
  },
]

export default function GuidesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://owaycargo.com" },
          { name: "Гайды", url: "https://owaycargo.com/guides" },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-blue-200" />
              <span className="text-blue-200 text-sm font-medium uppercase tracking-wider">Шопинг-гайды</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Как покупать в США и получать в СНГ
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Подробные инструкции по лучшим американским магазинам — лайфхаки, экономия и пошаговые гайды от команды OWAY CARGO
            </p>
          </div>
        </section>

        {/* Guides grid */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((g) => (
              <Link key={g.href} href={g.href} className="group block">
                <Card className={`h-full p-6 bg-gradient-to-br ${g.color} border ${g.border} hover:shadow-lg transition-all duration-200 group-hover:-translate-y-1`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{g.logo}</span>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">{g.name}</h2>
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${g.badgeColor} mt-1`}>
                          {g.badge}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all mt-1" />
                  </div>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{g.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.highlights.map((h) => (
                      <span key={h} className="text-xs bg-white/70 text-slate-700 px-2.5 py-1 rounded-full border border-white">
                        {h}
                      </span>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
            <ShoppingBag className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Готовы заказать?</h2>
            <p className="text-slate-600 mb-6">
              Рассчитайте стоимость доставки за 30 секунд или свяжитесь с нашими менеджерами
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#calculator">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Рассчитать стоимость
                </Button>
              </Link>
              <Link href="/#contact">
                <Button variant="outline" className="px-8">
                  Написать менеджеру
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
