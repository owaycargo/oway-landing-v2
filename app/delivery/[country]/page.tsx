import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calculator, CheckCircle2, Clock, DollarSign, MapPin, Package, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { COUNTRY_LANDINGS, getCountryBySlug } from "@/lib/countries"

interface PageProps {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  return COUNTRY_LANDINGS.map((c) => ({ country: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params
  const data = getCountryBySlug(country)
  if (!data) return { title: "Страна не найдена" }

  const title = `Доставка из США в ${data.nameInto} — от $${data.price}/кг`
  const description = `OWAY CARGO доставляет посылки из США в ${data.nameInto} за ${data.days} дней. Тариф $${data.price}/кг, без минимального веса. Калькулятор, таможня, Пункт выдачи в ${data.capitalCity}.`

  return {
    title,
    description,
    keywords: [
      `доставка из США в ${data.nameInto}`,
      `доставка в ${data.nameInto}`,
      `заказать из США в ${data.name}`,
      `OWAY CARGO ${data.name}`,
      `посылка из Америки в ${data.nameInto}`,
    ],
    alternates: { canonical: `/delivery/${data.slug}` },
    openGraph: {
      title,
      description,
      url: `/delivery/${data.slug}`,
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

export default async function CountryDeliveryPage({ params }: PageProps) {
  const { country } = await params
  const data = getCountryBySlug(country)
  if (!data) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Доставка из США в ${data.nameInto}`,
    description: `OWAY CARGO — международная доставка посылок из США в ${data.nameInto}. Тариф $${data.price}/кг, срок ${data.days} дней.`,
    serviceType: "Международная авиадоставка",
    provider: {
      "@type": "Organization",
      name: "OWAY CARGO",
      url: baseUrl,
    },
    areaServed: { "@type": "Country", name: data.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: data.price,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: data.price,
        priceCurrency: "USD",
        unitCode: "KGM",
      },
      deliveryLeadTime: {
        "@type": "QuantitativeValue",
        minValue: data.days.split("-")[0],
        maxValue: data.days.split("-")[1],
        unitCode: "DAY",
      },
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

  const otherCountries = COUNTRY_LANDINGS.filter((c) => c.slug !== data.slug)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Доставка по странам", url: "/#pickup" },
          { name: `Доставка в ${data.nameInto}`, url: `/delivery/${data.slug}` },
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
        <div className="max-w-5xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-5">
            <span className="text-xl">{data.flag}</span>
            <span>{data.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Доставка из США в <span className="text-blue-600">{data.nameInto}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            От <span className="font-bold text-slate-900">${data.price} за кг</span> · Срок{" "}
            <span className="font-bold text-slate-900">{data.days} дней</span> · Без минимального веса
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

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 mb-12">
          <Card className="p-6 bg-white border-slate-200">
            <DollarSign className="w-6 h-6 text-blue-600 mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">${data.price}</div>
            <div className="text-sm text-slate-600">за 1 кг</div>
          </Card>
          <Card className="p-6 bg-white border-slate-200">
            <Clock className="w-6 h-6 text-blue-600 mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">{data.days}</div>
            <div className="text-sm text-slate-600">дней в пути</div>
          </Card>
          <Card className="p-6 bg-white border-slate-200">
            <MapPin className="w-6 h-6 text-blue-600 mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">{data.capitalCity}</div>
            <div className="text-sm text-slate-600">Пункт выдачи</div>
          </Card>
        </div>

        {/* Examples */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
            Примеры расчёта
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {data.weightExamples.map((ex) => (
              <Card key={ex.weight} className="p-6 bg-white border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <Package className="w-4 h-4" />
                  {ex.weight}
                </div>
                <p className="text-slate-700 mb-3">{ex.items}</p>
                <div className="text-2xl font-bold text-blue-600">{ex.price}</div>
              </Card>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            Для точного расчёта с учётом объёмного веса используйте{" "}
            <Link href="/#calculator" className="text-blue-600 hover:text-blue-700">
              калькулятор
            </Link>
            .
          </p>
        </section>

        {/* Customs */}
        <section className="max-w-5xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-white border-slate-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Таможня и пошлины для {data.nameGenitive}
                </h2>
                <p className="text-slate-600 text-sm">
                  Что нужно знать перед отправкой
                </p>
              </div>
            </div>
            <div className="space-y-3 text-slate-700">
              <p>
                <span className="font-semibold">Беспошлинный лимит:</span> {data.customs.limit}.
              </p>
              <p>{data.customs.details}</p>
              {data.customs.notes && (
                <p className="text-sm text-slate-600 pt-2 border-t border-slate-200">
                  ⚠️ {data.customs.notes}
                </p>
              )}
            </div>
          </Card>
        </section>

        {/* Pickup cities */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
            Доставляем в города {data.nameGenitive}
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {data.pickupCities.map((city) => (
              <span
                key={city}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700"
              >
                📍 {city}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-500 text-center mt-4">
            Основной Пункт выдачи — {data.capitalCity}. В другие города — курьером или почтой.
          </p>
        </section>

        {/* Payment */}
        {data.paymentLocal && (
          <section className="max-w-5xl mx-auto mb-14">
            <Card className="p-6 md:p-8 bg-blue-50 border-blue-200">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                💳 Способы оплаты в {data.nameInto}
              </h2>
              <p className="text-slate-700">
                Принимаем {data.paymentLocal}. OWAY CARGO также работает как обменник валют
                USD ↔ {data.currency.code} ({data.currency.name}).
              </p>
            </Card>
          </section>
        )}

        {/* Why OWAY */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему OWAY CARGO
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["Склад в штате Делавэр (США)", "Один из 5 штатов без sales tax — экономия 6-10% на каждой покупке"],
              ["Хранение 30 дней бесплатно", "Потом $0.5/день. Успеете собрать заказы и сконсолидировать"],
              ["Бесплатный repack", "Убираем лишнюю упаковку — экономия на объёмном весе"],
              ["Принимаем парфюм любых видов", "У большинства конкурентов запрещён"],
              ["Базовая компенсация до $500", "Расширенная страховка — 3% от декларации = 100% компенсация"],
              ["Telegram-уведомления", "Статус посылки приходит в @Oway1_bot в режиме реального времени"],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
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
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы про доставку в {data.nameInto}
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
              Посмотреть все 54 вопроса в FAQ →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto mb-14">
          <Card className="p-8 md:p-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Готовы отправить посылку в {data.nameInto}?
            </h2>
            <p className="mb-6 text-blue-100">
              Рассчитайте стоимость или оставьте заявку — менеджер свяжется в течение 15 минут. Поддержка 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#calculator">
                <Button className="h-12 bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-8 gap-2">
                  <Calculator className="w-5 h-5" />
                  Калькулятор
                </Button>
              </Link>
              <Link href="/#lead">
                <Button
                  variant="outline"
                  className="h-12 bg-transparent text-white border-white hover:bg-white/10 rounded-xl px-8"
                >
                  Заявка на обратный звонок
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        {/* Other countries */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
            Доставка в другие страны
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherCountries.map((c) => (
              <Link key={c.slug} href={`/delivery/${c.slug}`}>
                <Card className="p-4 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="text-2xl mb-2">{c.flag}</div>
                  <div className="font-semibold text-slate-900 text-sm">{c.name}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    ${c.price}/кг · {c.days} дней
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <div className="max-w-3xl mx-auto mt-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm">
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
