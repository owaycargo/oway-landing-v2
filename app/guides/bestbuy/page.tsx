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
  title: "Как покупать на Best Buy из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам электроники на Best Buy с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO. Open-Box скидки, My Best Buy бонусы, Price Match.",
  keywords: [
    "как покупать на Best Buy",
    "Best Buy из США",
    "Best Buy доставка СНГ",
    "Best Buy электроника",
    "Best Buy Open Box",
    "OWAY Best Buy",
    "купить технику в США",
    "Best Buy Россия Казахстан",
  ],
  alternates: { canonical: "/guides/bestbuy" },
  openGraph: {
    title: "Как покупать на Best Buy из США в СНГ — полный гайд 2026",
    description: "Open-Box скидки, Price Match Guarantee и электроника дешевле Amazon через OWAY CARGO.",
    url: "/guides/bestbuy",
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
    q: "Чем Best Buy лучше Amazon для покупки электроники?",
    a: "Best Buy — крупнейший специализированный магазин электроники в США. Преимущества перед Amazon: 1) Нет подделок — только официальные дистрибьюторы. 2) Open-Box товары (выставочные, возвраты) со скидкой 15-40% — с гарантией Best Buy. 3) Price Match: если на bestbuy.com товар дешевле чем у конкурентов — они снизят цену. 4) Geek Squad — профессиональная настройка (актуально если нужна помощь с setup). 5) Гарантия производителя + возможность купить расширенную.",
  },
  {
    q: "Что такое Best Buy Open Box и как это работает?",
    a: "Open Box — товары которые вернули покупатели или использовались как выставочные образцы. Best Buy тестирует каждый товар и присваивает категорию: Excellent (как новый, коробка открыта), Satisfactory (мелкие следы), Fair (функционирует, явные следы). Скидка: Excellent −10-15%, Satisfactory −20-30%, Fair −40%. Гарантия Best Buy сохраняется. Ищите через фильтр «Open-Box» на сайте — огромная экономия на TV, ноутбуках, камерах.",
  },
  {
    q: "Что такое My Best Buy и стоит ли подключать?",
    a: "My Best Buy — бесплатная программа лояльности. Базовый уровень: 1 балл за каждый $1 (250 баллов = $5). Plus ($49.99/год): дополнительные скидки + бесплатная доставка + эксклюзивные Member-только цены. Total ($179.99/год): всё выше + расширенная гарантия. Для разовых покупок — достаточно бесплатного. Для регулярных ($500+/год) — Plus окупается.",
  },
  {
    q: "Как работает Price Match Guarantee у Best Buy?",
    a: "Best Buy гарантирует лучшую цену: если найдёте тот же товар дешевле у Amazon, Walmart, Costco, B&H, Adorama — Best Buy снизит цену. Price Match действует в момент покупки (покажите ссылку или скриншот) и в течение 15 дней после (если цена упала у Best Buy или конкурента). Это делает bestbuy.com безопасным — не нужно следить за ценами самостоятельно.",
  },
  {
    q: "Какую электронику выгоднее всего покупать на Best Buy?",
    a: "Топ для заказа из СНГ: 1) Ноутбуки (MacBook, Dell XPS, HP Spectre — на $200-400 дешевле). 2) Телевизоры LG OLED, Samsung QLED (на $300-700 дешевле, но высокий вес → доставка). 3) Фотоаппараты (Sony Alpha, Canon R-серия — на $150-300 дешевле). 4) Наушники (Bose QC45, Sony XM5, AirPods — на $30-80 дешевле). 5) Игровые консоли (PS5, Xbox — те же цены, зато в наличии).",
  },
  {
    q: "Доставляет ли Best Buy на склад OWAY?",
    a: "Да. bestbuy.com доставляет по всем адресам в США, включая Делавэр. Стандарт — бесплатно при заказе от $35, 3-7 рабочих дней. Для крупной техники (TV, холодильники) — Best Buy организует доставку в точный день. Важно: крупная техника (TV 65+ дюймов) весит 30-50 кг — доставка через OWAY будет дорогой, лучше рассмотреть для среднеформатных товаров.",
  },
  {
    q: "Каков срок возврата на Best Buy?",
    a: "Стандарт: 15 дней для большинства товаров, 30 дней для My Best Buy Plus/Total участников, 15 дней для телефонов (стандарт). Исключения: ноутбуки — 15 дней, TV — 15 дней. Если товар неисправен — Best Buy организует ремонт или замену. Возврат на склад OWAY в США — бесплатно. Обратно в СНГ — за ваш счёт.",
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
  headline: "Как покупать на Best Buy из США в СНГ — полный гайд 2026",
  description:
    "Полный гайд по покупкам электроники на Best Buy с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO.",
  author: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  publisher: {
    "@type": "Organization",
    name: "OWAY CARGO",
    logo: { "@type": "ImageObject", url: "https://owaycargo.com/favicon.svg" },
  },
  datePublished: "2026-02-01",
  dateModified: "2026-04-15",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://owaycargo.com/guides/bestbuy" },
  inLanguage: "ru",
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как купить электронику на Best Buy с доставкой в СНГ через OWAY CARGO",
  description:
    "Пошаговая инструкция по покупке электроники на Best Buy из США с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь.",
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
      name: "Создание аккаунта на Best Buy + My Best Buy",
      text: "Зарегистрируйтесь на bestbuy.com и подключите бесплатный My Best Buy для накопления баллов.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Выбор товара: новый или Open-Box",
      text: "Используйте фильтр Open-Box для скидки 15-40% на проверенные возвраты. Проверьте Price Match — возможно дешевле у конкурента.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Оформление заказа",
      text: "При checkout укажите адрес склада OWAY (Делавэр) + OWAY-ID. При сумме от $35 — доставка по США бесплатна.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Отправка в страну через OWAY",
      text: "После прихода на склад — уведомление в Telegram, оплата тарифа OWAY, выбор страны получения.",
    },
  ],
}

export default function BestBuyGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Гайды", url: "/guides" },
          { name: "Best Buy", url: "/guides/bestbuy" },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-full text-sm font-semibold mb-5">
            <span className="text-lg">📺</span>
            <span>Best Buy — Электроника из США 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Как покупать на Best Buy{" "}
            <span className="text-blue-700">из США в СНГ</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Open-Box скидки до 40%, Price Match Guarantee и MacBook на $300 дешевле — через
            доставку OWAY CARGO в Россию, Казахстан, СНГ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="https://www.bestbuy.com" target="_blank" rel="noopener noreferrer sponsored">
              <Button className="h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-8 gap-2">
                <ExternalLink className="w-5 h-5" />
                Открыть BestBuy.com
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

        {/* Why Best Buy */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему Best Buy — лучшее место для покупки техники в США
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Только оригиналы",
                desc: "Best Buy — авторизованный ритейлер всех брендов (Apple, Sony, Samsung, LG). Никаких перекупщиков и серых схем — только официальные товары с гарантией.",
              },
              {
                icon: Tag,
                title: "Open-Box — скидка 15-40%",
                desc: "Возвраты и выставочные образцы тестируются и продаются дешевле. MacBook за $1099 можно найти за $850. С гарантией Best Buy.",
              },
              {
                icon: DollarSign,
                title: "Price Match Guarantee",
                desc: "Нашли дешевле у Amazon / Walmart / Costco? Best Buy снизит цену. Действует в момент покупки и 15 дней после.",
              },
              {
                icon: Zap,
                title: "Раньше всех в США",
                desc: "Новые iPhone, PlayStation, GeForce — Best Buy получает первым. Иногда в наличии когда на Amazon листинг ещё закрыт.",
              },
              {
                icon: Package,
                title: "Бесплатная доставка от $35",
                desc: "На любой адрес США, включая склад OWAY в Делавэре. Стандарт — 3-7 дней. Для крупной техники — назначаемый день.",
              },
              {
                icon: Sparkles,
                title: "My Best Buy баллы",
                desc: "1 балл за $1. 250 баллов = $5 скидка. Бесплатный уровень даёт доступ к Member-only ценам и ранним распродажам.",
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
            Как купить технику на Best Buy из СНГ — 5 шагов
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
                title: "Создайте My Best Buy аккаунт",
                desc: (
                  <>
                    Зарегистрируйтесь на{" "}
                    <a
                      href="https://www.bestbuy.com"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-blue-700 font-semibold hover:underline"
                    >
                      bestbuy.com
                    </a>{" "}
                    и подключите <strong>My Best Buy</strong> — бесплатно. Даёт доступ к
                    Member-ценам и начисление баллов с каждой покупки.
                  </>
                ),
              },
              {
                title: "Выбор товара — новый или Open-Box",
                desc: (
                  <>
                    Используйте фильтр <strong>«Open-Box»</strong> чтобы найти проверенные
                    возвраты со скидкой 15-40%. Нажмите{" "}
                    <strong>«Price Match»</strong> если видели дешевле на Amazon — Best Buy
                    снизит цену в момент покупки.
                  </>
                ),
              },
              {
                title: "Оформление заказа",
                desc: (
                  <>
                    При checkout укажите адрес склада OWAY (Делавэр) + OWAY-ID в Apt/Suite.
                    Оплатите картой Visa/Mastercard. При заказе от $35 — доставка по США
                    бесплатна.
                  </>
                ),
              },
              {
                title: "Получение в вашей стране",
                desc: (
                  <>
                    Товар приходит на склад за 3-7 дней. Уведомление в Telegram → оплачиваете
                    тариф OWAY ($12-18/кг) → через 7-21 день получаете в Пункте выдачи.
                    Ноутбук (2 кг) = $24-36 доставки в СНГ.
                  </>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-700 text-white font-bold flex items-center justify-center flex-shrink-0">
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
            Цены Best Buy vs СНГ — реальная экономия
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">Товар</th>
                  <th className="text-left p-4 font-semibold">Best Buy (США)</th>
                  <th className="text-left p-4 font-semibold">Цена в СНГ</th>
                  <th className="text-left p-4 font-semibold">Экономия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "MacBook Air M3 13\" 256GB", us: "$1099", cis: "$1449", save: "$350" },
                  { name: "Sony WH-1000XM5", us: "$349", cis: "$479", save: "$130" },
                  { name: "Canon EOS R50", us: "$679", cis: "$899", save: "$220" },
                  { name: "Apple AirPods Pro 2", us: "$249", cis: "$329", save: "$80" },
                  { name: "Samsung 65\" QLED 4K", us: "$799", cis: "$1299", save: "$500" },
                  { name: "iPad Air M2 11\"", us: "$599", cis: "$849", save: "$250" },
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
            Частые вопросы о Best Buy
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
          <Card className="p-8 bg-gradient-to-br from-blue-700 to-blue-800 border-0">
            <h2 className="text-2xl font-bold text-white mb-3">
              Готовы купить технику из США?
            </h2>
            <p className="text-blue-200 mb-6">
              Получите адрес склада OWAY бесплатно — и начните экономить на технике
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button className="bg-white text-blue-800 hover:bg-blue-50 px-8 h-11 font-semibold">
                  Получить адрес склада
                </Button>
              </Link>
              <Link href="/#calculator">
                <Button variant="outline" className="border-blue-400 text-white hover:bg-blue-700 px-8 h-11">
                  <Calculator className="w-4 h-4 mr-2" />
                  Рассчитать доставку
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        <RelatedGuides currentHref="/guides/bestbuy" />
      </main>

      <Footer />
    </div>
  )
}
