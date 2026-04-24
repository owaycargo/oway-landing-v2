import type { Metadata } from "next"
import Link from "next/link"
import {
  Calculator,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Package,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingDown,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedGuides } from "@/app/guides/_components/related-guides"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Как покупать на Target из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам на Target.com с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO. RedCard −5%, Target Circle, собственные бренды.",
  keywords: [
    "как покупать на Target",
    "Target из США",
    "Target доставка СНГ",
    "Target RedCard",
    "Target Circle",
    "OWAY Target",
    "Target Россия",
    "Target Казахстан",
  ],
  alternates: { canonical: "/guides/target" },
  openGraph: {
    title: "Как покупать на Target из США в СНГ — полный гайд 2026",
    description: "RedCard скидка 5%, Target Circle бонусы и доставка через OWAY CARGO.",
    url: "/guides/target",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
}

const faqItems = [
  {
    q: "Что такое Target и чем он отличается от Walmart и Amazon?",
    a: "Target — сеть магазинов №2 в США после Walmart. Позиционирование: чуть дороже Walmart, но лучший дизайн и качество товаров собственных брендов. Силён в: детских товарах, домашнем декоре, одежде (A New Day, Cat&Jack, Threshold), косметике (NYX, e.l.f., Pixi) и бакалее. Target.com — полноценный онлайн-магазин с шипингом по всем США.",
  },
  {
    q: "Что такое Target RedCard и как получить скидку 5%?",
    a: "Target RedCard — дебетовая или кредитная карта Target, дающая постоянную скидку 5% на все покупки + бесплатную доставку. Для зарубежных покупателей: RedCard не выдают, но Target Circle (бесплатная программа лояльности) даёт баллы 1% от покупки и персональные предложения. Регистрация через email на target.com — бесплатно.",
  },
  {
    q: "Какие собственные бренды Target самые выгодные?",
    a: "Топ собственных брендов Target: Cat&Jack (детская одежда — качество H&M, цена $5-15), Threshold (домашний текстиль — $20 vs $50 у конкурентов), A New Day (женская одежда), Good & Gather (бакалея), up&up (аналог Equate — бытовая химия, косметика на 30-40% дешевле брендов). up&up — прямой аналог Kirkland у Costco: одинаковое качество, ниже цена.",
  },
  {
    q: "Как Target отправляет на склад OWAY?",
    a: "Target.com доставляет по всем адресам в США, включая штат Делавэр где находится склад OWAY. Стандартная доставка: бесплатно при заказе от $35. Доставка за 2 дня: бесплатно с Target RedCard или $9.99 без неё. Конкретно в Делавэр — стандарт 3-5 рабочих дней.",
  },
  {
    q: "Что самое выгодное покупать на Target?",
    a: "1) Детские товары: Cat&Jack одежда ($5-15/позиция), Bumbo, Safety 1st — в 2 раза дешевле чем в СНГ. 2) Косметика: NYX, e.l.f., Pixi — аутентик по ценам ниже iHerb. 3) Домашний декор: Threshold, Studio McGee — то что у нас стоит $80 за $25. 4) Спортивные аксессуары: ковры для йоги, бутылки, гантели. 5) Сезонные распродажи: до −70% на праздничный декор после праздников.",
  },
  {
    q: "Когда у Target лучшие скидки?",
    a: "Black Friday (ноябрь) — главная распродажа года, до -60%. Cyber Monday — электроника и игрушки. Target Deal Days (июль, совпадает с Amazon Prime Day) — до -50% на популярные категории. Clearance: Target ставит красные ценники на товары которые нужно распродать быстро — бывает до -70%. Следите через Target Circle — персональные предложения приходят на email.",
  },
  {
    q: "Сколько стоит доставка Target → СНГ через OWAY?",
    a: "Target → склад OWAY (Делавэр): бесплатно при заказе $35+. Склад → СНГ: $12/кг в Казахстан/Кыргызстан/Узбекистан, $18/кг в Россию/Беларусь. Детская одежда (5 вещей) — примерно 1.5 кг = $18-27 доставки при стоимости вещей $30-60. Выгодно.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Как покупать на Target из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам на Target.com с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO.",
  author: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  publisher: {
    "@type": "Organization",
    name: "OWAY CARGO",
    logo: { "@type": "ImageObject", url: "https://owaycargo.com/favicon.svg" },
  },
  datePublished: "2026-02-01",
  dateModified: "2026-04-15",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://owaycargo.com/guides/target" },
  inLanguage: "ru",
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как купить на Target с доставкой в СНГ через OWAY CARGO",
  description:
    "Пошаговая инструкция по покупке на Target.com из США с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь.",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "12" },
  totalTime: "PT10M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Регистрация в OWAY CARGO",
      text: "Зарегистрируйтесь на owaycargo.com, получите OWAY-ID и адрес склада в штате Делавэр.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Создание аккаунта на Target.com + Target Circle",
      text: "Зарегистрируйтесь на target.com и активируйте Target Circle — бесплатная программа лояльности с баллами и скидками.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Выбор товаров",
      text: "Ищите категории детских товаров, косметики, домашнего декора и собственных брендов Target (Cat&Jack, up&up, Threshold).",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Оформление заказа",
      text: "При checkout укажите адрес склада OWAY (Делавэр). Заказ от $35 — бесплатная доставка по США. Оплатите картой Visa/Mastercard.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Отправка в страну через OWAY",
      text: "После прибытия посылки на склад — уведомление в Telegram, оплата тарифа OWAY, выбор страны доставки.",
    },
  ],
}

export default function TargetGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Гайды", url: "/guides" },
          { name: "Target", url: "/guides/target" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold mb-5">
            <span className="text-lg">🎯</span>
            <span>Target — Полный гайд 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Как покупать на Target.com{" "}
            <span className="text-red-600">из США в СНГ</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Детские товары, косметика NYX и домашний декор на 40% дешевле — через Target Circle
            бонусы и доставку OWAY CARGO.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="https://www.target.com" target="_blank" rel="noopener noreferrer sponsored">
              <Button className="h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl px-8 gap-2">
                <ExternalLink className="w-5 h-5" />
                Открыть Target.com
              </Button>
            </a>
            <Link href="/#calculator">
              <Button variant="outline" className="h-12 rounded-xl px-8 gap-2">
                <Calculator className="w-5 h-5" />
                Рассчитать доставку
              </Button>
            </Link>
          </div>
        </div>

        {/* Why Target */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему Target — лучший магазин для семейного шопинга из США
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Package,
                title: "Детские товары №1",
                desc: "Cat&Jack — детская одежда за $5-15. Качество H&M, цены в 3 раза ниже чем в СНГ. Bumbo, Fisher-Price, Safety 1st — всё есть.",
              },
              {
                icon: Sparkles,
                title: "Косметика по ценам ниже iHerb",
                desc: "NYX, e.l.f., Pixi, Wet n Wild — аутентичные американские бренды по аптечным ценам. То что у нас стоит $20 — за $6.",
              },
              {
                icon: TrendingDown,
                title: "Собственные бренды Target",
                desc: "up&up — аналог брендовой косметики и бытовой химии на 40% дешевле. Threshold — домашний текстиль уровня IKEA за полцены.",
              },
              {
                icon: Tag,
                title: "Target Circle — бесплатные бонусы",
                desc: "1% баллами от всех покупок + персональные предложения до 40% скидки на нужные категории. Регистрация бесплатная.",
              },
              {
                icon: ShieldCheck,
                title: "Бесплатная доставка от $35",
                desc: "На любой адрес США включая склад OWAY. Стандарт — 3-5 дней. При заказе детской одежды на $35+ — шипинг бесплатный.",
              },
              {
                icon: Clock,
                title: "Лучший clearance в ритейле",
                desc: "После сезона Target ставит красные ценники: до -70%. Следите за секцией Clearance на сайте — появляются ежедневно.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 bg-white border-slate-200">
                <item.icon className="w-7 h-7 text-red-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Как купить с Target из СНГ — 5 шагов
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Регистрация в OWAY CARGO",
                desc: (
                  <>
                    Зайдите на{" "}
                    <Link href="/" className="text-red-600 hover:text-red-700 font-semibold">
                      owaycargo.com
                    </Link>{" "}
                    или в Telegram{" "}
                    <a
                      href="https://t.me/Oway1_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      @Oway1_bot
                    </a>
                    . Получите OWAY-ID и адрес склада в штате Делавэр.
                  </>
                ),
              },
              {
                title: "Создайте аккаунт + Target Circle",
                desc: (
                  <>
                    Зарегистрируйтесь на{" "}
                    <a
                      href="https://www.target.com"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      target.com
                    </a>{" "}
                    и подключите <strong>Target Circle</strong> — бесплатную программу лояльности.
                    Получайте баллы и персональные скидки на нужные категории.
                  </>
                ),
              },
              {
                title: "Выберите товары",
                desc: (
                  <>
                    Лучшие категории для заказа из СНГ: детская одежда Cat&Jack, косметика NYX /
                    e.l.f., домашний текстиль Threshold, бытовая химия up&up. Используйте фильтр{" "}
                    <strong>«Ships to store»</strong> → смените на <strong>«Shipping»</strong>.
                  </>
                ),
              },
              {
                title: "Оформление заказа",
                desc: (
                  <>
                    При checkout укажите адрес склада OWAY (Делавэр) + OWAY-ID в поле Apt/Suite.
                    Оплатите картой Visa/Mastercard. При сумме от $35 — доставка по США бесплатна.
                  </>
                ),
              },
              {
                title: "Получение в вашей стране",
                desc: (
                  <>
                    Посылка приходит на склад за 3-5 дней. Уведомление в Telegram → оплачиваете
                    тариф OWAY ($12-18/кг) → через 7-21 день забираете в Пункте выдачи.
                  </>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Price comparison */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Что заказывать на Target — цены USA vs СНГ
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">Товар</th>
                  <th className="text-left p-4 font-semibold">Target (США)</th>
                  <th className="text-left p-4 font-semibold">Цена в СНГ</th>
                  <th className="text-left p-4 font-semibold">Экономия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Cat&Jack детская куртка", us: "$18", cis: "$45", save: "$27" },
                  { name: "NYX Complete Control Liner", us: "$9", cis: "$18", save: "$9" },
                  { name: "e.l.f. Power Grip Primer", us: "$10", cis: "$22", save: "$12" },
                  { name: "Threshold постельный комплект", us: "$30", cis: "$65", save: "$35" },
                  { name: "up&up Vitamin C Serum", us: "$12", cis: "$25", save: "$13" },
                  { name: "Fisher-Price Rocker Baby", us: "$45", cis: "$90", save: "$45" },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{row.name}</td>
                    <td className="p-4 text-slate-700">{row.us}</td>
                    <td className="p-4 text-slate-500">{row.cis}</td>
                    <td className="p-4 text-green-600 font-bold">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы о Target.com
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white border border-slate-200 rounded-xl px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto mb-14 text-center">
          <Card className="p-8 bg-gradient-to-br from-red-600 to-red-700 border-0">
            <h2 className="text-2xl font-bold text-white mb-3">Начните шопинг на Target сегодня</h2>
            <p className="text-red-100 mb-6">
              Получите американский адрес склада OWAY за 2 минуты — бесплатно
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button className="bg-white text-red-700 hover:bg-red-50 px-8 h-11 font-semibold">
                  Зарегистрироваться бесплатно
                </Button>
              </Link>
              <Link href="/#calculator">
                <Button variant="outline" className="border-red-300 text-white hover:bg-red-700 px-8 h-11">
                  <Calculator className="w-4 h-4 mr-2" />
                  Рассчитать стоимость
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        <RelatedGuides currentHref="/guides/target" />
      </main>

      <Footer />
    </div>
  )
}
