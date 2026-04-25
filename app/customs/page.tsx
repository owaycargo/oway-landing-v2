import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Таможня при доставке из США — лимиты, пошлины, правила 2026 | OWAY CARGO",
  description:
    "Таможенные правила при доставке посылок из США в Россию, Казахстан, Кыргызстан, Беларусь, Узбекистан. Лимит €200 беспошлинно, пошлины на электронику, что нельзя ввозить. Актуально 2026.",
  keywords: [
    "таможня доставка из США",
    "таможенный лимит посылки из США 2026",
    "пошлина на посылки из США",
    "ЕАЭС таможня лимит €200",
    "беспошлинный ввоз из США",
    "таможня Россия посылки из США",
    "таможня Казахстан США",
  ],
  alternates: { canonical: "/customs" },
  openGraph: {
    title: "Таможня при доставке из США — правила 2026",
    description: "Лимит €200 беспошлинно. Всё о пошлинах на электронику, одежду, витамины из США в страны СНГ.",
    url: "/customs",
    type: "article",
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

const COUNTRY_CUSTOMS = [
  {
    flag: "🇷🇺",
    name: "Россия",
    slug: "russia",
    limit: "€200 / 31 кг",
    overLimit: "15% от суммы превышения",
    note: "С 1 июля 2026: 5% со всей стоимости при превышении лимита",
  },
  {
    flag: "🇧🇾",
    name: "Беларусь",
    slug: "belarus",
    limit: "€200 / 31 кг",
    overLimit: "15% от суммы превышения",
    note: "Те же правила ЕАЭС что и в России",
  },
  {
    flag: "🇰🇿",
    name: "Казахстан",
    slug: "kazakhstan",
    limit: "€200 / 31 кг",
    overLimit: "15% от суммы превышения",
    note: "Действуют нормы ЕАЭС",
  },
  {
    flag: "🇰🇬",
    name: "Кыргызстан",
    slug: "kyrgyzstan",
    limit: "€200 / 31 кг",
    overLimit: "15% от суммы превышения",
    note: "Действуют нормы ЕАЭС",
  },
  {
    flag: "🇺🇿",
    name: "Узбекистан",
    slug: "uzbekistan",
    limit: "$200/месяц",
    overLimit: "Рассчитывается индивидуально",
    note: "OWAY работает как курьер — лимит $200 в месяц",
  },
]

const FAQ_ITEMS = [
  {
    q: "Что значит «€200 беспошлинно»?",
    a: "Посылки суммарной стоимостью до €200 в одном отправлении не облагаются ввозной таможенной пошлиной. Если стоимость превышает €200 — пошлина начисляется на сумму превышения (15% для ЕАЭС). С 1 июля 2026 правило меняется: 5% будет начисляться со всей стоимости посылки при превышении лимита.",
  },
  {
    q: "Кто платит пошлину?",
    a: "OWAY CARGO включила пошлину в тариф $12/$18 за кг для большинства категорий товаров. Вы ничего не платите отдельно. Исключение: дорогая электроника (смартфоны, ноутбуки, планшеты, смарт-часы) — пошлина согласуется с вами индивидуально до отправки.",
  },
  {
    q: "Пошлина на iPhone из США в Россию?",
    a: "iPhone стоит больше €200, поэтому пошлина рассчитывается: 15% × (стоимость − €200). Например, iPhone 15 за $1099 ≈ €1000: пошлина = 15% × €800 = €120. С 1 июля 2026 — 5% × €1000 = €50 (станет дешевле).",
  },
  {
    q: "Пошлина на MacBook из США?",
    a: "Ноутбуки и компьютеры — аналогично iPhone. Пошлина 15% от суммы превышения €200 порога. MacBook Air за $1099: 15% × €800 = €120. С июля 2026 — 5% от всей суммы = €50.",
  },
  {
    q: "Можно ли занизить стоимость в инвойсе?",
    a: "Нет. OWAY CARGO не занижает декларацию — это нарушение таможенного законодательства. Последствия: конфискация, штраф до 2-кратной стоимости, уголовная ответственность при больших суммах. Мы предлагаем легальные методы экономии: правильный выбор категории и расчёт пошлины до отправки.",
  },
  {
    q: "Что такое ЕАЭС и как это влияет на таможню?",
    a: "ЕАЭС — Евразийский Экономический Союз (Россия, Беларусь, Казахстан, Кыргызстан, Армения). Для посылок в страны ЕАЭС действуют единые нормы: лимит €200 / 31 кг в одном отправлении. С 1 июля 2026 вводятся новые правила для товаров с зарубежных маркетплейсов.",
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

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Таможня при доставке из США в СНГ — правила и лимиты 2026",
  description: "Полное руководство по таможенным правилам при доставке посылок из США в Россию, Казахстан, Кыргызстан, Беларусь, Узбекистан.",
  author: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  publisher: { "@type": "Organization", name: "OWAY CARGO", logo: { "@type": "ImageObject", url: "https://owaycargo.com/icon.svg" } },
  datePublished: "2026-01-01",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://owaycargo.com/customs" },
}

export default function CustomsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://owaycargo.com" },
          { name: "Таможня при доставке из США", url: "https://owaycargo.com/customs" },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Таможня при доставке из США
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto">
              Лимиты, пошлины, правила ЕАЭС 2026 — всё что нужно знать перед заказом
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* Key rule */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-blue-900 text-lg mb-1">Главное правило: €200 беспошлинно</div>
                <p className="text-blue-800 text-sm">
                  Для стран ЕАЭС (Россия, Беларусь, Казахстан, Кыргызстан): до €200 и 31 кг в одной посылке — пошлина 0%.
                  Сверх лимита: 15% от суммы превышения (с 1 июля 2026 — 5% от всей стоимости).
                </p>
                <p className="text-blue-700 text-xs mt-2 font-medium">
                  Хорошая новость: OWAY CARGO включает пошлину в тариф для большинства категорий товаров.
                </p>
              </div>
            </div>
          </Card>

          {/* 2026 changes */}
          <Card className="p-6 bg-orange-50 border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-orange-900 text-lg mb-1">Изменения с 1 июля 2026</div>
                <p className="text-orange-800 text-sm mb-2">
                  ЕАЭС вводит новый режим: при превышении порога €200 пошлина составит <strong>5% со всей стоимости</strong> (не только с превышения), минимум €1/кг.
                </p>
                <p className="text-orange-700 text-sm">
                  Пример: iPhone за €1000 — сейчас пошлина €120 (15% × €800), после июля — €50 (5% × €1000). <strong>Для дорогих товаров станет дешевле!</strong>
                </p>
              </div>
            </div>
          </Card>

          {/* Country table */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Лимиты по странам</h2>
            <div className="space-y-3">
              {COUNTRY_CUSTOMS.map((c) => (
                <Link key={c.slug} href={`/delivery/${c.slug}`} className="block group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-all gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.flag}</span>
                      <div className="font-semibold text-slate-900">{c.name}</div>
                    </div>
                    <div className="md:text-right pl-10 md:pl-0">
                      <div className="text-blue-700 font-bold">{c.limit}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Сверх лимита: {c.overLimit}</div>
                      {c.note && <div className="text-xs text-orange-600 mt-0.5">{c.note}</div>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Electronics duties */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Пошлины на электронику из США</h2>
            <p className="text-slate-600 text-sm mb-6">Электроника стоит дороже €200, поэтому для неё рассчитывается отдельная пошлина. OWAY согласует сумму ДО отправки.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="pb-3 font-semibold text-slate-700">Товар</th>
                    <th className="pb-3 font-semibold text-slate-700">Цена в США</th>
                    <th className="pb-3 font-semibold text-slate-700">Пошлина (до июля 2026)</th>
                    <th className="pb-3 font-semibold text-green-700">После июля 2026</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { item: "iPhone 15 Pro 256GB", price: "$1099 ≈ €1000", now: "€120 (15% × €800)", after: "€50 (5% × €1000)" },
                    { item: "MacBook Air M3 13\"",  price: "$1099 ≈ €1000", now: "€120",              after: "€50" },
                    { item: "iPad Air 11\" M2",     price: "$599 ≈ €550",  now: "€52 (15% × €350)",  after: "€27 (5% × €550)" },
                    { item: "Apple Watch Ultra 2",  price: "$799 ≈ €730",  now: "€79 (15% × €530)",  after: "€37 (5% × €730)" },
                  ].map((row) => (
                    <tr key={row.item}>
                      <td className="py-3 font-medium text-slate-900">{row.item}</td>
                      <td className="py-3 text-slate-600">{row.price}</td>
                      <td className="py-3 text-slate-700">{row.now}</td>
                      <td className="py-3 text-green-700 font-semibold">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* What you can't send */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Что нельзя ввозить из США</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                "Оружие, боеприпасы, их имитации",
                "Наркотики и психотропные вещества",
                "Взрывчатка, пиротехника",
                "Алкоголь (ограничения авиа-IATA)",
                "Рецептурные лекарства",
                "Литий-ионные аккумуляторы >100 Wh отдельно",
                "Живые растения с землёй",
                "Скоропортящиеся продукты",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-red-500 font-bold text-base flex-shrink-0">✕</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Парфюм, косметика, витамины, одежда, электроника (в устройстве) — всё разрешено.{" "}
              <Link href="/faq" className="text-blue-600">Полный список в FAQ →</Link>
            </p>
          </Card>

          {/* FAQ */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Частые вопросы про таможню</h2>
            <div className="space-y-5">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <div className="font-semibold text-slate-900 mb-1">{item.q}</div>
                  <div className="text-sm text-slate-600">{item.a}</div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Link href="/faq#customs" className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                Ещё вопросы в FAQ <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center pb-4">
            <p className="text-slate-600 mb-4">Остались вопросы по пошлинам? Менеджер ответит за 15 минут.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#lead">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-12">
                  Написать менеджеру
                </Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline" className="h-12 px-10">
                  Рассчитать доставку
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
