import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  ExternalLink,
  Package,
  ShoppingBag,
  Sparkles,
  TrendingDown,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { CATEGORY_LANDINGS, getCategoryBySlug } from "@/lib/categories-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CATEGORY_LANDINGS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = getCategoryBySlug(slug)
  if (!data) return { title: "Категория не найдена" }

  return {
    title: `${data.name} с доставкой в СНГ — OWAY CARGO`,
    description: `${data.tagline}. Доставка ${data.nameGenitive} из США в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь. От $12/кг. Расчёт онлайн.`,
    keywords: data.metaKeywords,
    alternates: { canonical: `/category/${data.slug}` },
    openGraph: {
      title: `${data.name} — дешевле чем в СНГ`,
      description: data.tagline,
      url: `/category/${data.slug}`,
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

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const data = getCategoryBySlug(slug)
  if (!data) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Доставка ${data.nameGenitive} из США в СНГ`,
    description: data.description,
    serviceType: "Международная доставка",
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
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  const otherCategories = CATEGORY_LANDINGS.filter((c) => c.slug !== data.slug)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Категории товаров", url: "/category/" + data.slug },
          { name: data.name, url: `/category/${data.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="text-6xl mb-4">{data.emoji}</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            {data.name}
          </h1>
          <p className="text-lg md:text-xl text-blue-600 font-semibold mb-4">
            {data.tagline}
          </p>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/#calculator">
              <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 gap-2">
                <Calculator className="w-5 h-5" />
                Рассчитать стоимость
              </Button>
            </Link>
            <Link href="/#lead">
              <Button variant="outline" className="h-12 rounded-xl px-8">
                Оставить заявку
              </Button>
            </Link>
          </div>
        </div>

        {/* What to order */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Что заказывать из США
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {data.whatToOrder.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Top examples */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Сколько можно сэкономить
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-4 font-semibold text-slate-900">
                    Товар
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-900">
                    Цена в США
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-900">
                    Цена в СНГ
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-green-700">
                    Экономия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.topExamples.map((ex) => (
                  <tr key={ex.item}>
                    <td className="px-5 py-4 font-medium text-slate-900">{ex.item}</td>
                    <td className="px-5 py-4 text-slate-700">{ex.us}</td>
                    <td className="px-5 py-4 text-slate-500 line-through">{ex.cis}</td>
                    <td className="px-5 py-4 text-green-700 font-bold">
                      <div className="flex items-center gap-1">
                        <TrendingDown className="w-4 h-4" />
                        {ex.savings}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            Цены указаны ориентировочно. Для точного расчёта используйте{" "}
            <Link href="/#calculator" className="text-blue-600 hover:text-blue-700">
              калькулятор
            </Link>
            .
          </p>
        </section>

        {/* Customs note */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-orange-50 border-orange-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-orange-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Таможня и пошлины
                </h2>
                <p className="text-slate-700 leading-relaxed">{data.customsNote}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Recommended shops */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Проверенные магазины
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.recommendedShops.map((shopId) => (
              <Link key={shopId} href={`/marketplace/${shopId}`}>
                <Card className="p-5 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <ShoppingBag className="w-5 h-5 text-blue-600 mb-2" />
                  <div className="font-semibold text-slate-900 text-sm capitalize">
                    {shopId.replace(/-/g, " ")}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Подробнее →
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Why OWAY */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему OWAY CARGO
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              [
                "Склад в Делавэре (США)",
                "Один из 5 штатов без sales tax — экономия 6-10% на каждой покупке",
              ],
              ["Тариф от $12/кг", "Прозрачно. Без скрытых сборов. Калькулятор на главной"],
              [
                "Поддержка 24/7",
                "Отвечаем в Telegram в течение 15 минут",
              ],
              [
                "Парфюм любых видов",
                "Принимаем любой парфюм — у конкурентов часто запрещён",
              ],
              [
                "Консолидация бесплатно",
                "Объединяем несколько посылок в одну — экономия до 30% на весе",
              ],
              [
                "Страховка 3% = 100%",
                "Для дорогой электроники — полная компенсация стоимости",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">{title}</div>
                  <div className="text-sm text-slate-600">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы про {data.nameGenitive}
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {data.faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white border border-slate-200 rounded-2xl px-5"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4 font-semibold text-slate-900">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-6">
            <Link href="/faq" className="text-blue-600 hover:text-blue-700 text-sm">
              Больше вопросов в общем FAQ →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto mb-14">
          <Card className="p-8 md:p-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {data.emoji} Готовы заказать?
            </h2>
            <p className="mb-6 text-blue-100">
              Поддержка 24/7, ответ в течение 15 минут. Регистрация — 1 минута.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#calculator">
                <Button className="h-12 bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-8 gap-2">
                  <Calculator className="w-5 h-5" />
                  Калькулятор
                </Button>
              </Link>
              <a
                href="https://t.me/owaycargo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-12 bg-transparent text-white border-white hover:bg-white/10 rounded-xl px-8 gap-2 w-full"
                >
                  <ExternalLink className="w-5 h-5" />
                  Telegram
                </Button>
              </a>
            </div>
          </Card>
        </section>

        {/* Other categories */}
        <section className="max-w-5xl mx-auto mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
            Другие категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherCategories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`}>
                <Card className="p-4 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                  <div className="text-3xl mb-2">{c.emoji}</div>
                  <div className="font-semibold text-slate-900 text-xs">
                    {c.name.replace(" из США", "")}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
