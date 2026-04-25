import type { Metadata } from "next"
import Link from "next/link"
import { ShoppingCart, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Выкуп товаров из США — OWAY CARGO | Купим за вас в любом магазине",
  description:
    "Выкуп товаров из американских магазинов: Amazon, eBay, Nike, Apple Store, Best Buy и других. Ваша карта не принимается — мы купим за вас. Комиссия 10% физлица, 5% для бизнеса.",
  keywords: [
    "выкуп товаров из США",
    "купить товар в США без карты",
    "посредник покупка США",
    "proxy buying USA",
    "выкуп с Amazon",
    "выкуп с Nike США",
    "покупка в американском магазине",
    "OWAY выкуп",
  ],
  alternates: { canonical: "/purchase" },
  openGraph: {
    title: "Выкуп товаров из США — OWAY CARGO",
    description: "Купим любой товар в США за вас. Комиссия 10%. Amazon, eBay, Nike, Apple, Best Buy и другие.",
    url: "/purchase",
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

const STEPS = [
  { step: "01", title: "Отправьте ссылку", desc: "Скопируйте URL товара из любого американского магазина и отправьте нам в Telegram или через форму." },
  { step: "02", title: "Получите счёт", desc: "Мы рассчитаем итоговую стоимость: цена товара + налог (если есть) + комиссия OWAY 10%." },
  { step: "03", title: "Оплатите", desc: "Вы оплачиваете полную сумму заранее. Принимаем карты, крипто, банковский перевод." },
  { step: "04", title: "Мы покупаем", desc: "Наши специалисты размещают заказ от нашего имени. Товар приходит на наш склад в Делавэре." },
  { step: "05", title: "Получаете", desc: "После поступления товара на склад мы взвешиваем, фотографируем и отправляем вам. Стандартные сроки доставки." },
]

const FAQ_ITEMS = [
  {
    q: "В каких магазинах работает выкуп?",
    a: "Во всех крупных американских интернет-магазинах: Amazon, eBay, Nike, Adidas, Apple Store, Best Buy, Target, Walmart, Nordstrom Rack, SHEIN, iHerb, Costco, Gap, Old Navy, Ralph Lauren, Levi's, Sephora, Bath & Body Works и тысячах других.",
  },
  {
    q: "Почему не работает моя карта?",
    a: "Большинство российских и других карт СНГ не принимаются в американских магазинах из-за санкций, географических ограничений или политики магазина (некоторые магазины продают только при US-адресе и US-карте). Наш выкуп решает эту проблему.",
  },
  {
    q: "Что если магазин откажет в заказе?",
    a: "Возвращаем 100% оплаченной суммы. Мы заблаговременно предупреждаем о потенциальных ограничениях (например, лимитированные релизы Nike SNKRS, Apple Education Store и т.д.).",
  },
  {
    q: "Как работает скидка 5% для бизнеса?",
    a: "Если вы байер, дропшиппер или делаете регулярные заказы (от 3 в месяц) — комиссия снижается до 5%. Напишите нам в Telegram, обсудим условия.",
  },
  {
    q: "Можно ли выкупить лимитированные кроссовки (Nike SNKRS, Jordan)?",
    a: "Пробуем, но честно: рейтинговые дропы (SNKRS) очень конкурентны. Мы подаём заявку от нашего аккаунта. Если не удаётся — возврат денег. Для лимитированных товаров рекомендуем рассматривать StockX через наш выкуп.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Выкуп товаров из США",
  serviceType: "Посреднические покупки (proxy buying)",
  description: "Покупка товаров в американских магазинах от имени OWAY CARGO для клиентов из СНГ",
  provider: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  offers: {
    "@type": "Offer",
    description: "Комиссия 10% от стоимости товара для физических лиц, 5% для бизнеса",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "10",
      priceCurrency: "percent",
      unitText: "% от стоимости товара",
    },
  },
  areaServed: [
    { "@type": "Country", name: "Russia" },
    { "@type": "Country", name: "Kazakhstan" },
    { "@type": "Country", name: "Kyrgyzstan" },
    { "@type": "Country", name: "Belarus" },
    { "@type": "Country", name: "Uzbekistan" },
  ],
}

export default function PurchasePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://owaycargo.com" },
          { name: "Выкуп товаров из США", url: "https://owaycargo.com/purchase" },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Выкуп товаров из США
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto mb-2">
              Карта не принимается? Магазин не отправляет за рубеж?
            </p>
            <p className="text-xl font-semibold text-white mb-8">
              Мы купим за вас. Комиссия от 5%.
            </p>
            <a href="https://t.me/owaycargo" target="_blank" rel="noopener noreferrer">
              <Button className="h-12 bg-white text-blue-700 hover:bg-blue-50 px-10 text-base font-semibold gap-2">
                <ExternalLink className="w-4 h-4" />
                Написать в Telegram
              </Button>
            </a>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-8 bg-white border-slate-200 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10%</div>
              <div className="font-semibold text-slate-900 text-lg mb-1">Физические лица</div>
              <div className="text-sm text-slate-600">от стоимости товара</div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Любой товар, любой магазин
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Оплата после одобрения
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Возврат если магазин отказал
                </div>
              </div>
            </Card>
            <Card className="p-8 bg-blue-600 text-white text-center border-0">
              <div className="text-4xl font-bold mb-2">5%</div>
              <div className="font-semibold text-lg mb-1">Байеры и бизнес</div>
              <div className="text-sm text-blue-100">регулярные заказы от 3/мес</div>
              <div className="mt-4 space-y-2 text-sm text-blue-100">
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-200" />
                  Персональный менеджер
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-200" />
                  Приоритетная обработка
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-200" />
                  Оптовые условия
                </div>
              </div>
            </Card>
          </div>

          {/* How it works */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Как работает выкуп</h2>
            <div className="space-y-5">
              {STEPS.map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold text-sm">
                    {s.step}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{s.title}</div>
                    <div className="text-sm text-slate-600 mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Popular stores */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Популярные магазины для выкупа</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Amazon", "eBay", "Nike", "Adidas", "Apple Store", "Best Buy",
                "Target", "Walmart", "Nordstrom", "SHEIN", "iHerb", "Costco",
                "Gap", "Old Navy", "Ralph Lauren", "Sephora", "Bath & Body Works",
                "StockX", "GOAT", "Foot Locker",
              ].map((store) => (
                <span key={store} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full">
                  {store}
                </span>
              ))}
              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">
                + тысячи других
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Amazon", slug: "amazon" },
                { name: "Nike",   slug: "nike" },
                { name: "Best Buy", slug: "bestbuy" },
                { name: "iHerb", slug: "iherb" },
              ].map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  Гайд по {g.name}
                </Link>
              ))}
            </div>
          </Card>

          {/* FAQ */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Частые вопросы</h2>
            <div className="space-y-5">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <div className="font-semibold text-slate-900 mb-1">{item.q}</div>
                  <div className="text-sm text-slate-600">{item.a}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center pb-4">
            <p className="text-slate-600 mb-4 text-lg">Пришлите ссылку на товар — рассчитаем стоимость за 15 минут</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://t.me/owaycargo" target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-12 gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Telegram — быстрее всего
                </Button>
              </a>
              <Link href="/#lead">
                <Button variant="outline" className="h-12 px-10">
                  Форма на сайте
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
