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
  title: "Как покупать на Costco из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам на Costco.com с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO. Kirkland Signature, членство, оптовые цены без склада.",
  keywords: [
    "как покупать на Costco",
    "Costco из США",
    "Costco доставка СНГ",
    "Kirkland Signature",
    "Costco членство",
    "OWAY Costco",
    "Costco Россия Казахстан",
    "оптовые цены США",
  ],
  alternates: { canonical: "/guides/costco" },
  openGraph: {
    title: "Как покупать на Costco из США в СНГ — полный гайд 2026",
    description: "Kirkland Signature, членство $65 и оптовые цены с доставкой через OWAY CARGO.",
    url: "/guides/costco",
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
    q: "Нужно ли членство Costco для покупки на costco.com?",
    a: "Для большинства товаров на costco.com — да, нужно членство. Стоимость: Gold Star $65/год (для физических лиц), Executive $130/год (+ 2% кешбэк на покупки). Без членства на costco.com доступны только аптека и некоторые разделы. Лайфхак: Costco периодически продаёт Gift Cards на Gold Star членство через сторонние сайты (BJs, Sam's Club) с небольшой скидкой. Членство можно оформить онлайн и использовать сразу для заказов на costco.com.",
  },
  {
    q: "Что такое Kirkland Signature и почему это выгодно?",
    a: "Kirkland Signature — собственный бренд Costco, производится теми же заводами что и топовые марки. Примеры: Kirkland Organic Extra Virgin Olive Oil (производитель — Agro Sevilla, лучший в мире), Kirkland Vitamin E (аналог Now Foods), Kirkland Wild Alaskan Salmon (аналог дорогих консервов), Kirkland AA Battery (аналог Duracell, производится Duracell). Цена на 30-50% ниже брендового аналога при идентичном качестве.",
  },
  {
    q: "Что конкретно выгодно заказывать на Costco через OWAY?",
    a: "Лучшие категории для доставки в СНГ: 1) Kirkland витамины и БАДы (Fish Oil, Vitamin D3, Melatonin) — дешевле iHerb при большем объёме. 2) Орехи и сухофрукты (Kirkland Almonds, Mixed Nuts) — гигантские упаковки. 3) Кофе (Kirkland Coffee) — килограммы по цене 100г. 4) Спортивное питание (Kirkland Whey Protein). 5) Электроника: TV LG, Samsung периодически бывает дешевле Best Buy. 6) Одежда (Kirkland Dress Shirts, Jeans). 7) Красота (Kirkland кокосовое масло, лосьон).",
  },
  {
    q: "Как Costco.com доставляет на склад OWAY?",
    a: "costco.com доставляет по всем адресам США включая Делавэр где находится склад OWAY. Стандартная доставка: бесплатно для большинства товаров (Costco включает доставку в цену). Крупногабаритные товары (мебель, TV 65+) — Costco организует Threshold Delivery в определённый день. Для мелких и средних товаров — стандарт 3-7 дней. Важно: Costco упаковывает очень надёжно — товары приходят на склад OWAY в отличном состоянии.",
  },
  {
    q: "Как работает Costco Executive Membership 2% кешбэк?",
    a: "Executive Membership ($130/год) даёт 2% кешбэк на все покупки в виде Reward Certificate раз в год. Если потратили за год $3000 — получите $60 сертификат. При тратах $6500+/год Executive окупается vs Gold Star. Для покупателей из СНГ: если планируете регулярные крупные закупки через OWAY — Executive выгоднее. Для разовых — достаточно Gold Star $65.",
  },
  {
    q: "Каков срок возврата товаров Costco?",
    a: "Costco — одна из лучших политик возврата: 90 дней для электроники (TV, компьютеры, смартфоны), практически без срока для всего остального. Электронику принимают обратно без вопросов в течение 90 дней даже открытую. Возврат на склад OWAY в США бесплатен. После возврата деньги на карту — 5-10 рабочих дней. Важно: открытые продукты питания не принимаются обратно.",
  },
  {
    q: "Выгоднее покупать Kirkland витамины на Costco или iHerb?",
    a: "Зависит от объёма: Costco Kirkland Fish Oil 400 капсул — $15 (~$0.038/капсула). iHerb аналогичный Now Foods Omega-3 180 капсул — $14 (~$0.078/капсула). Costco в 2 раза дешевле за капсулу при большем объёме. Но: минимальный заказ Costco — крупная упаковка. Если нужно 60 капсул попробовать — iHerb лучше. Для регулярного приёма на полгода — Costco выигрывает.",
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
  headline: "Как покупать на Costco из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам на Costco.com с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO.",
  author: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  publisher: {
    "@type": "Organization",
    name: "OWAY CARGO",
    logo: { "@type": "ImageObject", url: "https://owaycargo.com/favicon.svg" },
  },
  datePublished: "2026-02-01",
  dateModified: "2026-04-15",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://owaycargo.com/guides/costco" },
  inLanguage: "ru",
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как купить на Costco с доставкой в СНГ через OWAY CARGO",
  description:
    "Пошаговая инструкция по покупке на Costco.com из США с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь.",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "12" },
  totalTime: "PT15M",
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
      name: "Оформление Costco членства",
      text: "Оформите Gold Star членство ($65/год) на costco.com. Это откроет доступ к оптовым ценам на весь ассортимент сайта.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Выбор товаров Kirkland Signature",
      text: "Ищите бренд Kirkland Signature — оптовые цены на витамины, орехи, кофе, одежду на 30-50% ниже аналогичных брендов.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Оформление заказа",
      text: "При checkout укажите адрес склада OWAY (Делавэр) + OWAY-ID. Доставка по США включена в цену большинства товаров Costco.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Отправка в страну через OWAY",
      text: "После прихода на склад — уведомление в Telegram, оплата тарифа OWAY ($12-18/кг), выбор страны. Крупные упаковки Costco весят больше — считайте вес заранее.",
    },
  ],
}

export default function CostcoGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Гайды", url: "/guides" },
          { name: "Costco", url: "/guides/costco" },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-full text-sm font-semibold mb-5">
            <span className="text-lg">🏢</span>
            <span>Costco — Оптовые цены из США 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Как покупать на Costco{" "}
            <span className="text-blue-700">из США в СНГ</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Kirkland Signature витамины вдвое дешевле iHerb, кофе килограммами, орехи оптом —
            членство $65 и доставка через OWAY CARGO.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="https://www.costco.com" target="_blank" rel="noopener noreferrer sponsored">
              <Button className="h-12 bg-blue-800 hover:bg-blue-900 text-white rounded-xl px-8 gap-2">
                <ExternalLink className="w-5 h-5" />
                Открыть Costco.com
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

        {/* Why Costco */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему Costco — лучший оптовый магазин США для покупателей из СНГ
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: TrendingDown,
                title: "Kirkland — дешевле брендов на 40%",
                desc: "Kirkland производят те же заводы что и топовые бренды. Рыбий жир, витамины, орехи, кофе — цена как у No-Name, качество как у премиум.",
              },
              {
                icon: Package,
                title: "Большие упаковки = экономия",
                desc: "400 капсул рыбьего жира за $15. 1 кг миндаля за $8. 2 кг кофе за $14. Упаковки на 6-12 месяцев — нет смысла покупать часто.",
              },
              {
                icon: DollarSign,
                title: "Членство $65 окупается быстро",
                desc: "Gold Star $65/год. Экономия на первом заказе Kirkland витаминов vs аналогов = $20-40. Членство окупается за 2-3 заказа.",
              },
              {
                icon: ShieldCheck,
                title: "Возврат 90 дней на электронику",
                desc: "Лучшая политика возврата в США для техники. TV, ноутбуки, iPad — 90 дней без вопросов даже если открыли.",
              },
              {
                icon: Sparkles,
                title: "Executive 2% кешбэк",
                desc: "Executive членство $130/год даёт 2% от всех покупок раз в год. При тратах $6500+/год — самоокупается.",
              },
              {
                icon: Clock,
                title: "Доставка включена в цену",
                desc: "Costco включает стоимость доставки в цену большинства товаров на сайте. Фактически — бесплатный шипинг на склад OWAY.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 bg-white border-slate-200">
                <item.icon className="w-7 h-7 text-blue-700 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Как купить на Costco из СНГ — 5 шагов
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Регистрация в OWAY CARGO",
                desc: (
                  <>
                    Зайдите на{" "}
                    <Link href="/" className="text-blue-700 font-semibold hover:underline">
                      owaycargo.com
                    </Link>{" "}
                    или в Telegram{" "}
                    <a
                      href="https://t.me/Oway1_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 font-semibold hover:underline"
                    >
                      @Oway1_bot
                    </a>
                    . Получите OWAY-ID и адрес склада в штате Делавэр.
                  </>
                ),
              },
              {
                title: "Оформите Costco членство",
                desc: (
                  <>
                    Зайдите на{" "}
                    <a
                      href="https://www.costco.com/join-costco.html"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-blue-700 font-semibold hover:underline"
                    >
                      costco.com/join
                    </a>{" "}
                    и оформите <strong>Gold Star ($65/год)</strong>. Это даёт доступ к
                    оптовым ценам на весь ассортимент costco.com. Оплата картой Visa/Mastercard.
                  </>
                ),
              },
              {
                title: "Выбирайте Kirkland Signature",
                desc: (
                  <>
                    Ищите бренд <strong>Kirkland Signature</strong> в нужной категории.
                    Лучшее для доставки в СНГ: витамины (Fish Oil, Vitamin D, Melatonin),
                    орехи (Almonds, Mixed Nuts), кофе, спортпит (Whey Protein).
                  </>
                ),
              },
              {
                title: "Оформление заказа",
                desc: (
                  <>
                    При checkout укажите адрес склада OWAY (Делавэр) + OWAY-ID в Apt/Suite.
                    Доставка по США включена в цену большинства товаров. Оплатите картой
                    Visa/Mastercard.
                  </>
                ),
              },
              {
                title: "Получение в вашей стране",
                desc: (
                  <>
                    Посылка приходит на склад за 3-7 дней. Уведомление в Telegram → оплачиваете
                    тариф OWAY ($12-18/кг). Учитывайте вес: упаковка Kirkland Mixed Nuts 1.36 кг
                    = $16-24 доставки при цене орехов $15. Считайте заранее.
                  </>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-white font-bold flex items-center justify-center flex-shrink-0">
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

        {/* Kirkland comparison */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-800 to-blue-900 border-0">
            <h2 className="text-2xl font-bold text-white mb-2">
              Kirkland vs Бренды — реальное сравнение цен
            </h2>
            <p className="text-blue-300 text-sm mb-6">Costco.com, апрель 2026</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-blue-300 border-b border-blue-700">
                    <th className="text-left pb-3 font-medium">Kirkland товар</th>
                    <th className="text-left pb-3 font-medium">Цена</th>
                    <th className="text-left pb-3 font-medium">Аналог бренд</th>
                    <th className="text-left pb-3 font-medium text-green-400">Экономия</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {[
                    ["Fish Oil 400 кап.", "$15", "Now Foods $29", "$14"],
                    ["Vitamin D3 360 кап.", "$9", "Thorne $22", "$13"],
                    ["Whey Protein 2.3 кг", "$28", "ON Gold Standard $45", "$17"],
                    ["Almonds 1.36 кг", "$8", "Blue Diamond $14", "$6"],
                    ["Colombian Coffee 1.36 кг", "$14", "Starbucks 1 кг $20", "$6+"],
                  ].map(([item, price, brand, save]) => (
                    <tr key={item} className="border-b border-blue-800/50">
                      <td className="py-2.5 font-medium">{item}</td>
                      <td className="py-2.5">{price}</td>
                      <td className="py-2.5 text-blue-300">{brand}</td>
                      <td className="py-2.5 text-green-400 font-bold">{save}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы о Costco
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
          <Card className="p-8 bg-gradient-to-br from-blue-800 to-blue-900 border-0">
            <h2 className="text-2xl font-bold text-white mb-3">
              Начните экономить с Costco уже сегодня
            </h2>
            <p className="text-blue-300 mb-6">
              Kirkland Fish Oil 400 капсул за $15 — против $29 за 180 капсул на iHerb
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 h-11 font-semibold">
                  Получить адрес склада
                </Button>
              </Link>
              <Link href="/#calculator">
                <Button variant="outline" className="border-blue-500 text-white hover:bg-blue-800 px-8 h-11">
                  <Calculator className="w-4 h-4 mr-2" />
                  Рассчитать доставку
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        <RelatedGuides currentHref="/guides/costco" />
      </main>

      <Footer />
    </div>
  )
}
