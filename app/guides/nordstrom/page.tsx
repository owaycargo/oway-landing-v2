import type { Metadata } from "next"
import Link from "next/link"
import {
  Calculator,
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
  title: "Как покупать на Nordstrom из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам на Nordstrom и Nordstrom Rack с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO. Люксовые бренды, Rack скидки до 70%, Nordy Club.",
  keywords: [
    "как покупать на Nordstrom",
    "Nordstrom из США",
    "Nordstrom Rack доставка СНГ",
    "Nordstrom Rack скидки",
    "люкс из США дешевле",
    "OWAY Nordstrom",
    "Nordstrom Россия Казахстан",
    "брендовая одежда из США",
  ],
  alternates: { canonical: "/guides/nordstrom" },
  openGraph: {
    title: "Как покупать на Nordstrom из США в СНГ — полный гайд 2026",
    description: "Nordstrom Rack скидки до 70%, Nordy Club бонусы и бесплатный возврат через OWAY CARGO.",
    url: "/guides/nordstrom",
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
    q: "В чём разница между Nordstrom и Nordstrom Rack?",
    a: "Nordstrom — люксовый универмаг с актуальными коллекциями (Gucci, Prada, Theory, Ted Baker). Nordstrom Rack — аутлет-версия: стоки прошлых сезонов, возвраты и специальные закупки от брендов со скидкой 30-70%. Для покупателей из СНГ: Rack даёт лучшее соотношение цены и бренда. Coach сумка за $80 вместо $350 — реально. Правило: сначала проверьте Rack, потом основной магазин.",
  },
  {
    q: "Что такое Nordy Club и как получить максимум бонусов?",
    a: "Nordy Club — бесплатная программа лояльности Nordstrom. Уровни: Member (3 балла за $1), Influencer ($500+/год: 4 балла за $1), Ambassador ($2000+/год: 5 баллов + ранний доступ к распродажам). 2000 баллов = $20 Nordstrom Note (сертификат). Дополнительно: Triple Points Days несколько раз в год, доступ к закрытым распродажам. Для разовых покупок — базовый Member достаточно.",
  },
  {
    q: "Какие бренды покупать на Nordstrom Rack выгоднее всего?",
    a: "Топ для заказа из СНГ через Rack: 1) Coach, Kate Spade сумки ($80-150 вместо $300-400). 2) Ted Baker, Theory одежда ($40-80 вместо $150-250). 3) Sam Edelman, Steve Madden обувь ($30-60 вместо $100-150). 4) Calvin Klein, Tommy Hilfiger одежда ($25-50). 5) Kiehl's, La Mer косметика (ограниченно). 6) Smartwool, UGG носки и обувь. Используйте фильтр бренда + категорию Clearance для максимальных скидок.",
  },
  {
    q: "Каков срок возврата и политика Nordstrom?",
    a: "Nordstrom — одна из лучших политик возврата в мире. Нет чёткого срока — принимают возвраты в разумные сроки, если товар не использован. Исключения: Beauty (без возврата если открыто), Rack — 45 дней. Возврат в США через prepaid label — бесплатно. После возврата на склад OWAY деньги возвращаются на карту за 5-10 рабочих дней.",
  },
  {
    q: "Как найти лучшие скидки на Nordstrom Rack?",
    a: "1) Clearance раздел — дополнительно 25-75% на и так уже сниженные товары. 2) Flash Events на nordstromrack.com — 36-72-часовые акции с ценами ниже Rack. 3) Подпишитесь на email рассылку Rack — первыми узнаёте о Flash Events. 4) Nordy Club приглашения — закрытые распродажи только для участников. 5) Nordstrom Anniversary Sale (июль) — новые коллекции по ценам прошлого сезона, доступ по уровню лояльности.",
  },
  {
    q: "Доставляет ли Nordstrom и Rack на адрес склада OWAY?",
    a: "Да, оба магазина доставляют по всей территории США включая Делавэр. Nordstrom.com — бесплатная доставка от $89 или с Nordy Club. Nordstromrack.com — бесплатная доставка при заказе от $89. Срок: 3-7 рабочих дней. Luxury товары (сумки, обувь) упаковываются надёжно — проблем при транзите через OWAY нет.",
  },
  {
    q: "Что лучше — Nordstrom Rack или YOOX / SSENSE для брендовых вещей?",
    a: "У каждого свои плюсы: Rack — широкий выбор mainstream люкса (Coach, Ted Baker, Calvin Klein) с физическим наличием, быстрая доставка в США. YOOX/SSENSE — более нишевые бренды (Maison Margiela, Alexander McQueen), но шипинг по международным правилам. Для базового гардероба из США — Rack выигрывает по скорости и надёжности доставки через OWAY.",
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
  headline: "Как покупать на Nordstrom из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам на Nordstrom и Nordstrom Rack с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO.",
  author: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  publisher: {
    "@type": "Organization",
    name: "OWAY CARGO",
    logo: { "@type": "ImageObject", url: "https://owaycargo.com/favicon.svg" },
  },
  datePublished: "2026-02-01",
  dateModified: "2026-04-15",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://owaycargo.com/guides/nordstrom" },
  inLanguage: "ru",
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как купить на Nordstrom с доставкой в СНГ через OWAY CARGO",
  description:
    "Пошаговая инструкция по покупке на Nordstrom и Nordstrom Rack из США с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь.",
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
      name: "Создание Nordy Club аккаунта",
      text: "Зарегистрируйтесь на nordstrom.com и nordstromrack.com, подключите бесплатный Nordy Club для баллов и доступа к закрытым распродажам.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Поиск товаров на Rack с максимальной скидкой",
      text: "Начните с nordstromrack.com → раздел Clearance для дополнительных 25-75% скидки. Используйте фильтр бренда для поиска нужных марок.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Оформление заказа",
      text: "При checkout укажите адрес склада OWAY (Делавэр) + OWAY-ID в Apt/Suite. При заказе от $89 — бесплатная доставка по США.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Отправка в страну через OWAY",
      text: "После прихода на склад — уведомление в Telegram, оплата тарифа OWAY, выбор страны получения.",
    },
  ],
}

export default function NordstromGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-zinc-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Гайды", url: "/guides" },
          { name: "Nordstrom", url: "/guides/nordstrom" },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-semibold mb-5">
            <span className="text-lg">👜</span>
            <span>Nordstrom + Nordstrom Rack — гайд 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Как покупать на Nordstrom{" "}
            <span className="text-zinc-600">из США в СНГ</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Coach сумка за $80, Ted Baker рубашка за $45, UGG ботинки за $90 — Nordstrom Rack
            скидки до 70% с доставкой через OWAY CARGO.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="https://www.nordstromrack.com" target="_blank" rel="noopener noreferrer sponsored">
              <Button className="h-12 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-8 gap-2">
                <ExternalLink className="w-5 h-5" />
                Открыть Nordstrom Rack
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

        {/* Why Nordstrom */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему Nordstrom Rack — лучший люкс-аутлет США
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: TrendingDown,
                title: "Скидки до 70% на бренды",
                desc: "Coach, Kate Spade, Ted Baker, Calvin Klein — прошлые сезоны со скидкой. Сумка Coach $350 → $85 на Rack — реальный кейс.",
              },
              {
                icon: Sparkles,
                title: "Flash Events — дополнительно",
                desc: "36-72-часовые акции на Rack: ещё -25-50% сверху. Появляются несколько раз в месяц. Подписка на email — единственный способ не пропустить.",
              },
              {
                icon: ShieldCheck,
                title: "Бесплатный возврат",
                desc: "Nordstrom — одна из лучших политик возврата в мире. На Rack — 45 дней. Если не подошло — возвращаете на склад OWAY в США бесплатно.",
              },
              {
                icon: Tag,
                title: "Clearance — скидки на скидки",
                desc: "Раздел Clearance на Rack — дополнительно 25-75% на уже сниженные товары. Здесь бывает Ted Baker за $20.",
              },
              {
                icon: Package,
                title: "Бесплатная доставка от $89",
                desc: "Nordstrom и Rack доставляют бесплатно на любой адрес США, включая склад OWAY в Делавэре.",
              },
              {
                icon: DollarSign,
                title: "Nordy Club — баллы за покупки",
                desc: "Бесплатная регистрация: 3 балла за $1, 2000 баллов = $20 скидка. Доступ к закрытым распродажам Nordstrom Anniversary Sale.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 bg-white border-slate-200">
                <item.icon className="w-7 h-7 text-zinc-700 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Как купить на Nordstrom Rack из СНГ — 5 шагов
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Регистрация в OWAY CARGO",
                desc: (
                  <>
                    Зайдите на{" "}
                    <Link href="/" className="text-zinc-700 font-semibold hover:underline">
                      owaycargo.com
                    </Link>{" "}
                    или в Telegram{" "}
                    <a
                      href="https://t.me/Oway1_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-700 font-semibold hover:underline"
                    >
                      @Oway1_bot
                    </a>
                    . Получите OWAY-ID и адрес склада в штате Делавэр.
                  </>
                ),
              },
              {
                title: "Создайте Nordy Club аккаунт",
                desc: (
                  <>
                    Зарегистрируйтесь на{" "}
                    <a
                      href="https://www.nordstromrack.com"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-zinc-700 font-semibold hover:underline"
                    >
                      nordstromrack.com
                    </a>{" "}
                    и одновременно на nordstrom.com — один аккаунт Nordy Club работает везде.
                    Подпишитесь на email для Flash Events.
                  </>
                ),
              },
              {
                title: "Найдите товары на Rack с максимальной скидкой",
                desc: (
                  <>
                    Зайдите в <strong>Clearance</strong> → выберите категорию → поставьте фильтр
                    нужного бренда. Лучшие находки: Coach, Kate Spade, Ted Baker, Sam Edelman.
                    Дополнительно проверьте раздел <strong>Flash Events</strong>.
                  </>
                ),
              },
              {
                title: "Оформление заказа",
                desc: (
                  <>
                    При checkout укажите адрес склада OWAY (Делавэр) + OWAY-ID в Apt/Suite.
                    При сумме от $89 — доставка по США бесплатна. Оплатите картой
                    Visa/Mastercard.
                  </>
                ),
              },
              {
                title: "Получение в вашей стране",
                desc: (
                  <>
                    Посылка приходит на склад за 3-7 дней. Уведомление в Telegram → оплачиваете
                    тариф OWAY ($12-18/кг) → через 7-21 день получаете в Пункте выдачи.
                    Сумка Coach (0.7 кг) = $8-13 доставки — мелочь при цене $80.
                  </>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white font-bold flex items-center justify-center flex-shrink-0">
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
            Реальные цены Nordstrom Rack — экономия на брендах
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">Товар</th>
                  <th className="text-left p-4 font-semibold">Rack (США)</th>
                  <th className="text-left p-4 font-semibold">Цена в СНГ</th>
                  <th className="text-left p-4 font-semibold text-green-400">Экономия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Coach сумка Tabby", us: "$85", cis: "$350", save: "$265" },
                  { name: "Kate Spade кошелёк", us: "$45", cis: "$180", save: "$135" },
                  { name: "Ted Baker блузка", us: "$40", cis: "$130", save: "$90" },
                  { name: "UGG Classic Short", us: "$90", cis: "$220", save: "$130" },
                  { name: "Sam Edelman туфли", us: "$35", cis: "$95", save: "$60" },
                  { name: "Calvin Klein пальто", us: "$120", cis: "$280", save: "$160" },
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
            Частые вопросы о Nordstrom и Nordstrom Rack
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
          <Card className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border-0">
            <h2 className="text-2xl font-bold text-white mb-3">
              Начните шопинг на Nordstrom Rack
            </h2>
            <p className="text-zinc-400 mb-6">
              Coach сумка за $85 уже ждёт — нужен только адрес склада OWAY
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button className="bg-white text-zinc-900 hover:bg-zinc-100 px-8 h-11 font-semibold">
                  Получить адрес склада
                </Button>
              </Link>
              <Link href="/#calculator">
                <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-800 px-8 h-11">
                  <Calculator className="w-4 h-4 mr-2" />
                  Рассчитать доставку
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        <RelatedGuides currentHref="/guides/nordstrom" />
      </main>

      <Footer />
    </div>
  )
}
