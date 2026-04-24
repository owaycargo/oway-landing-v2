import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
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
  Zap,
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
  title: "Как покупать на Nike.com из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам на Nike.com с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO. Эксклюзивы, Nike Member скидки, таблица размеров.",
  keywords: [
    "как покупать на Nike",
    "Nike из США",
    "Nike доставка СНГ",
    "Nike Member",
    "Nike кроссовки из Америки",
    "OWAY Nike",
    "Nike Россия",
    "Nike Казахстан",
  ],
  alternates: { canonical: "/guides/nike" },
  openGraph: {
    title: "Как покупать на Nike.com из США в СНГ — полный гайд 2026",
    description: "Nike Member скидки, эксклюзивы SNKRS и доставка через OWAY CARGO.",
    url: "/guides/nike",
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
    q: "Зачем покупать Nike на сайте США а не в СНГ?",
    a: "На Nike.com (USA) цены на 30-50% ниже чем в официальных магазинах СНГ. Плюс — полный ассортимент включая эксклюзивы Nike SNKRS, лимитированные коллаборации (Travis Scott, Off-White, Sacai) которые до СНГ не доезжают. Американские Nike — оригиналы с полным сроком носки.",
  },
  {
    q: "Что такое Nike Member и как получить скидку?",
    a: "Nike Member — бесплатный аккаунт на nike.com. Даёт: скидки Member только для участников (обычно 20-25% на определённые категории), ранний доступ к релизам через SNKRS, бесплатную доставку по США (на наш склад OWAY). Регистрация бесплатная, всегда рекомендуем создавать перед покупкой.",
  },
  {
    q: "Как выбрать размер Nike для европейской/российской системы?",
    a: "Американские мужские размеры: US 7 = EU 40, US 8 = EU 41, US 9 = EU 42.5, US 10 = EU 44, US 11 = EU 45. Женские: US 6 = EU 36, US 7 = EU 38, US 8 = EU 39. Совет: Nike часто делает колодку шире американских стандартов, если у вас широкая стопа — берите на 0.5 размера больше. На странице каждого товара есть Size Guide с конвертером.",
  },
  {
    q: "Что такое Nike SNKRS и как покупать там?",
    a: "SNKRS — приложение Nike для лимитированных дропов (Jordan, Dunk, Yeezy-style релизы). Работает через Draw (розыгрыш) и FCFS (кто первый). Нужен аккаунт Nike Member. Адрес доставки — склад OWAY. Подписки на уведомления = больше шансов успеть на дроп. SNKRS-эксклюзивы перепродаются по $200-500+ сверху цены.",
  },
  {
    q: "Какова политика возврата Nike?",
    a: "Nike предлагает 60 дней на возврат без объяснения причин. Для Member — бесплатный возврат. Обувь можно вернуть даже если поносили — если есть дефект производства. Возврат инициируется в личном кабинете nike.com, Nike присылает prepaid label. Деньги возвращаются за 5-7 дней. Обратно в СНГ — за счёт клиента.",
  },
  {
    q: "Сколько идёт Nike с США через OWAY?",
    a: "Nike → склад OWAY (Делавэр): 2-5 дней бесплатно. Склад OWAY → СНГ: Казахстан, Кыргызстан, Узбекистан — 10-14 дней ($12/кг). Россия, Беларусь — 16-21 день ($18/кг). Пара кроссовок весит 1-1.2 кг = $12-22 доставки. При цене Nike $120-$160 в США и $200-$280 в СНГ — всё равно выгодно даже с доставкой.",
  },
  {
    q: "Что ещё кроме кроссовок выгодно покупать на Nike.com?",
    a: "Топ для заказа: 1) Спортивная одежда Nike Dri-FIT (в США $30-40, у нас $60-80). 2) Nike Tech Fleece (худи $110 в США vs $180 в СНГ). 3) Детская Nike — качество то же, экономия 40%. 4) Nike Outlet — скидки до 60% на прошлые коллекции (outlet.nike.com). 5) Jordan Brand одежда — редко появляется в СНГ.",
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
  headline: "Как покупать на Nike.com из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам на Nike.com с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO.",
  author: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  publisher: {
    "@type": "Organization",
    name: "OWAY CARGO",
    logo: { "@type": "ImageObject", url: "https://owaycargo.com/favicon.svg" },
  },
  datePublished: "2026-02-01",
  dateModified: "2026-04-15",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://owaycargo.com/guides/nike" },
  inLanguage: "ru",
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как купить Nike.com с доставкой в СНГ через OWAY CARGO",
  description:
    "Пошаговая инструкция по покупке на Nike.com из США с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь.",
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
      name: "Создание Nike Member аккаунта",
      text: "Зарегистрируйтесь на nike.com — бесплатно. Активируйте Nike Member для скидок и бесплатной доставки по США.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Выбор товара и размера",
      text: "Используйте Size Guide на странице товара для конвертации размеров EU → US. Member-скидки применяются автоматически при входе в аккаунт.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Оформление заказа",
      text: "При checkout укажите адрес склада OWAY (Делавэр). Оплатите картой Visa/Mastercard. Nike доставит за 2-5 дней бесплатно.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Отправка в страну через OWAY",
      text: "После прибытия посылки на склад — получите уведомление в Telegram, оплатите тариф OWAY и выберите страну доставки.",
    },
  ],
}

export default function NikeGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Гайды", url: "/guides" },
          { name: "Nike", url: "/guides/nike" },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold mb-5">
            <span className="text-lg font-black tracking-tighter">NIKE</span>
            <span className="text-slate-300">Полный гайд 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Как покупать на Nike.com{" "}
            <span className="text-slate-600">из США в СНГ</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nike Member скидки, лимитированные дропы SNKRS и кроссовки на 40% дешевле чем в
            СНГ — с доставкой через OWAY CARGO.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="https://www.nike.com" target="_blank" rel="noopener noreferrer sponsored">
              <Button className="h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 gap-2">
                <ExternalLink className="w-5 h-5" />
                Открыть Nike.com
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

        {/* Why Nike USA */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему Nike из США выгоднее чем в СНГ
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: TrendingDown,
                title: "На 30-50% дешевле",
                desc: "Nike Air Max 90 в США $110, в СНГ $180-220. Jordan 1 в США $170, в СНГ $280+. Экономия покрывает доставку с лихвой.",
              },
              {
                icon: Sparkles,
                title: "SNKRS — лимитированные дропы",
                desc: "Jordan, Dunk Low, Nike x Off-White, Travis Scott — коллаборации которые в СНГ найти нереально или $300+ сверху.",
              },
              {
                icon: Tag,
                title: "Nike Member — бесплатные бонусы",
                desc: "Бесплатный аккаунт даёт Member-скидки, ранний доступ к релизам и бесплатную доставку по США.",
              },
              {
                icon: Package,
                title: "Nike Outlet — скидки до 60%",
                desc: "outlet.nike.com — прошлые коллекции по сниженным ценам. Nike Dri-FIT за $15, кроссовки за $50.",
              },
              {
                icon: ShieldCheck,
                title: "100% оригинал",
                desc: "Покупаете напрямую у Nike — никаких перекупщиков, серых схем и подделок. Гарантия производителя.",
              },
              {
                icon: Clock,
                title: "60 дней возврат",
                desc: "Nike даёт 60 дней на возврат без объяснений. Самая лояльная политика среди крупных брендов.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 bg-white border-slate-200">
                <item.icon className="w-7 h-7 text-slate-800 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Как купить Nike из США — 5 шагов
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Регистрация в OWAY CARGO",
                desc: (
                  <>
                    Зайдите на{" "}
                    <Link href="/" className="text-slate-800 font-semibold hover:underline">
                      owaycargo.com
                    </Link>{" "}
                    или в Telegram{" "}
                    <a
                      href="https://t.me/Oway1_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 font-semibold hover:underline"
                    >
                      @Oway1_bot
                    </a>
                    . Получите OWAY-ID и адрес склада в штате Делавэр, США.
                  </>
                ),
              },
              {
                title: "Создайте Nike Member аккаунт",
                desc: (
                  <>
                    Зарегистрируйтесь на{" "}
                    <a
                      href="https://www.nike.com/register"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-slate-800 font-semibold hover:underline"
                    >
                      nike.com
                    </a>{" "}
                    — бесплатно. Member-статус даёт скидки, ранний доступ к дропам и бесплатную
                    доставку по США на наш склад.
                  </>
                ),
              },
              {
                title: "Выберите товар и размер",
                desc: (
                  <>
                    Используйте <strong>Size Guide</strong> на странице каждого товара — Nike
                    публикует таблицу EU/UK/US/CM. Для широкой стопы берите на 0.5 размера больше.
                    Применяйте фильтр{" "}
                    <strong>«Member Access»</strong> для скидочных позиций.
                  </>
                ),
              },
              {
                title: "Оформление заказа",
                desc: (
                  <>
                    При checkout укажите адрес склада OWAY (Делавэр) + OWAY-ID в поле
                    Apt/Suite. Оплатите картой Visa/Mastercard. Nike доставит за 2-5 дней
                    бесплатно (с Member-аккаунтом).
                  </>
                ),
              },
              {
                title: "Получение в вашей стране",
                desc: (
                  <>
                    После прихода посылки на склад — уведомление в Telegram. Оплачиваете тариф
                    OWAY ($12-18/кг), выбираете страну. Пара кроссовок (1-1.2 кг) = $12-22
                    доставки в СНГ.
                  </>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center flex-shrink-0">
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

        {/* Size table */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-2">Таблица размеров Nike (мужские)</h2>
            <p className="text-slate-400 text-sm mb-6">US → EU конвертер</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-700">
                    <th className="text-left pb-3 font-medium">US</th>
                    <th className="text-left pb-3 font-medium">EU</th>
                    <th className="text-left pb-3 font-medium">UK</th>
                    <th className="text-left pb-3 font-medium">CM</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {[
                    ["7", "40", "6", "25"],
                    ["8", "41", "7", "26"],
                    ["9", "42.5", "8", "27"],
                    ["10", "44", "9", "28"],
                    ["11", "45", "10", "29"],
                    ["12", "46", "11", "30"],
                  ].map(([us, eu, uk, cm]) => (
                    <tr key={us} className="border-b border-slate-700/50">
                      <td className="py-2.5 font-bold">{us}</td>
                      <td className="py-2.5">{eu}</td>
                      <td className="py-2.5">{uk}</td>
                      <td className="py-2.5">{cm} см</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs mt-4">
              * Женские: US на 1.5 меньше мужского. Например US Women 8 = US Men 6.5 = EU 38.
            </p>
          </Card>
        </section>

        {/* Price comparison */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Сравнение цен: Nike USA vs СНГ
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">Модель</th>
                  <th className="text-left p-4 font-semibold">Nike.com (США)</th>
                  <th className="text-left p-4 font-semibold">Цена в СНГ</th>
                  <th className="text-left p-4 font-semibold text-green-400">Экономия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Nike Air Max 90", us: "$110", cis: "$180", save: "$70" },
                  { name: "Nike Air Force 1", us: "$110", cis: "$175", save: "$65" },
                  { name: "Jordan 1 Retro High", us: "$180", cis: "$280+", save: "$100+" },
                  { name: "Nike Tech Fleece Hoodie", us: "$110", cis: "$180", save: "$70" },
                  { name: "Nike Dri-FIT T-Shirt", us: "$30", cis: "$55", save: "$25" },
                  { name: "Nike React Infinity Run", us: "$160", cis: "$250", save: "$90" },
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
          <p className="text-xs text-slate-400 mt-3 text-center">
            * Цены актуальны на апрель 2026. Без учёта стоимости доставки через OWAY.
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы о Nike.com
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
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border-0">
            <h2 className="text-2xl font-bold text-white mb-3">Готовы заказать Nike из США?</h2>
            <p className="text-slate-400 mb-6">
              Зарегистрируйтесь в OWAY и получите американский адрес склада за 2 минуты
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button className="bg-white text-slate-900 hover:bg-slate-100 px-8 h-11">
                  Начать — это бесплатно
                </Button>
              </Link>
              <Link href="/#calculator">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 h-11">
                  <Calculator className="w-4 h-4 mr-2" />
                  Рассчитать стоимость
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        <RelatedGuides currentHref="/guides/nike" />
      </main>

      <Footer />
    </div>
  )
}
