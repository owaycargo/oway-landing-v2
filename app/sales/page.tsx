import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Calculator,
  Calendar,
  ExternalLink,
  Flag,
  Gift,
  Package,
  ShoppingBag,
  Tag,
  Sparkles,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Календарь распродаж США 2026 — когда выгоднее всего заказывать",
  description:
    "Полный календарь американских распродаж: Black Friday, Cyber Monday, Amazon Prime Day, Memorial Day, Labor Day. Когда заказывать одежду, электронику, обувь с доставкой OWAY CARGO.",
  keywords: [
    "календарь распродаж США",
    "Black Friday 2026",
    "Amazon Prime Day",
    "Cyber Monday",
    "скидки США",
    "распродажи Америка",
    "OWAY распродажи",
  ],
  alternates: { canonical: "/sales" },
  openGraph: {
    title: "Календарь распродаж США — когда выгоднее всего заказывать",
    description: "Black Friday, Prime Day, Memorial Day и др. — все главные скидки года.",
    url: "/sales",
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

type Sale = {
  name: string
  when: string
  discount: string
  description: string
  topCategories: string[]
  plan: string
  icon: "flag" | "gift" | "tag" | "sparkles" | "package" | "shopping"
  highlight?: boolean
}

const SALES_CALENDAR: { month: string; sales: Sale[] }[] = [
  {
    month: "Январь",
    sales: [
      {
        name: "New Year Clearance",
        when: "1-15 января",
        discount: "До -70%",
        description:
          "Распродажа остатков новогодней коллекции. Зимняя одежда, украшения, подарочная упаковка со скидкой 70%.",
        topCategories: ["Зимние куртки", "Пуховики", "Аксессуары", "Товары для дома"],
        plan: "Хорошее время для закупки зимних вещей на следующий сезон — через год будут как новые по акционным ценам.",
        icon: "tag",
      },
      {
        name: "MLK Day Sales",
        when: "Третий понедельник января",
        discount: "-20% до -50%",
        description:
          "В честь Дня Мартина Лютера Кинга — массовые распродажи в универмагах и электронике.",
        topCategories: ["Матрасы", "Бытовая техника", "Одежда"],
        plan: "Хороший повод купить бытовую технику со скидкой.",
        icon: "flag",
      },
    ],
  },
  {
    month: "Февраль",
    sales: [
      {
        name: "Valentine's Day",
        when: "14 февраля",
        discount: "-20% до -40%",
        description: "Скидки на ювелирку, подарки, парфюм, нижнее бельё, шоколад.",
        topCategories: ["Парфюм", "Ювелирные украшения", "Нижнее бельё", "Косметика"],
        plan: "Парфюмерия Tom Ford, Creed часто в рамках Valentine's промо. Good для никиш.",
        icon: "gift",
      },
      {
        name: "Presidents Day Sales",
        when: "Третий понедельник февраля",
        discount: "-30% до -60%",
        description: "Один из крупнейших шопинг-дней в году. Матрасы, бытовая техника, одежда.",
        topCategories: ["Матрасы", "Бытовая техника", "Электроника", "Автомобили (для справки)"],
        plan: "Matras King размера за $500 вместо $1000 — но через OWAY невыгодно (большой вес). Смотреть мелкую технику.",
        icon: "flag",
      },
    ],
  },
  {
    month: "Март",
    sales: [
      {
        name: "Spring Clearance",
        when: "Конец марта — начало апреля",
        discount: "-30% до -60%",
        description: "Остатки зимних коллекций + ранние весенние дропы.",
        topCategories: ["Зимняя обувь", "Пуховики", "Весенние куртки"],
        plan: "Последняя возможность купить дорогие зимние вещи со скидкой.",
        icon: "tag",
      },
    ],
  },
  {
    month: "Апрель",
    sales: [
      {
        name: "Easter Sales",
        when: "За 2 недели до Пасхи",
        discount: "-20% до -40%",
        description: "Детская одежда, игрушки, конфеты, декор.",
        topCategories: ["Детская одежда", "LEGO", "Плюшевые игрушки"],
        plan: "Хорошее время для Carter's весенних коллекций и LEGO.",
        icon: "gift",
      },
      {
        name: "Tax Day Sales",
        when: "15 апреля",
        discount: "-15% до -30%",
        description: "День налогов в США — магазины дают скидки для стимула к покупкам.",
        topCategories: ["Электроника", "Товары для дома"],
        plan: "Не основная распродажа, но хороший день проверить промо.",
        icon: "flag",
      },
    ],
  },
  {
    month: "Май",
    sales: [
      {
        name: "Mother's Day",
        when: "Второе воскресенье мая",
        discount: "-20% до -50%",
        description: "Парфюм, косметика, ювелирка, цветы.",
        topCategories: ["Парфюм", "Косметика", "Украшения", "Сумки"],
        plan: "Вторая большая распродажа парфюма после Valentine's. Хорошая подборка на Sephora, Ulta.",
        icon: "gift",
      },
      {
        name: "Memorial Day",
        when: "Последний понедельник мая",
        discount: "-30% до -70%",
        description:
          "Открытие летнего сезона. Одна из крупнейших распродаж года: одежда, обувь, электроника, outdoor.",
        topCategories: [
          "Купальники",
          "Летняя одежда",
          "Outdoor товары (REI, Patagonia)",
          "Грили (если вдруг)",
          "Электроника",
        ],
        plan: "Отличная распродажа для летнего гардероба. Патагония редко даёт скидки — но на Memorial Day бывает.",
        icon: "flag",
        highlight: true,
      },
    ],
  },
  {
    month: "Июнь",
    sales: [
      {
        name: "Father's Day",
        when: "Третье воскресенье июня",
        discount: "-20% до -50%",
        description: "Инструменты, часы, гаджеты, мужская одежда.",
        topCategories: ["Инструменты", "Часы", "Мужская обувь", "Электроника"],
        plan: "Бренды часов Citizen, Seiko, Timex — выгодно. Инструменты Milwaukee, DeWalt со скидкой.",
        icon: "gift",
      },
    ],
  },
  {
    month: "Июль",
    sales: [
      {
        name: "Amazon Prime Day",
        when: "~11-12 июля (меняется ежегодно)",
        discount: "До -80% на Amazon-бренды",
        description:
          "Главная распродажа Amazon для Prime-подписчиков. Echo, Kindle, Fire TV, аксессуары со скидкой 50-80%. Сторонние бренды тоже участвуют.",
        topCategories: [
          "Echo Dot, Alexa",
          "Kindle",
          "Amazon Basics (кабели, аксессуары)",
          "Apple, Samsung",
          "Nike, Adidas",
        ],
        plan: "Главное событие лета. Для Prime-подписки вне США надо использовать американский адрес. Лайфхак: месячная подписка Prime за $14 окупается на одной покупке.",
        icon: "package",
        highlight: true,
      },
      {
        name: "4th of July",
        when: "4 июля (День независимости)",
        discount: "-25% до -50%",
        description: "Патриотический шопинг: одежда, outdoor, грили, красно-бело-синие вещи.",
        topCategories: ["Одежда", "Outdoor", "Товары для пикника"],
        plan: "Хороший момент для Old Navy, Gap, American Eagle.",
        icon: "flag",
      },
      {
        name: "Nordstrom Anniversary Sale",
        when: "~10-31 июля",
        discount: "-20% до -40%",
        description:
          "Крупнейшая распродажа Nordstrom года. Скидки на НОВЫЕ осенние коллекции (не сток!).",
        topCategories: [
          "Осенние куртки",
          "Обувь",
          "Сумки (Tory Burch, Kate Spade)",
          "Украшения",
          "Косметика",
        ],
        plan: "Главное событие для премиум-шопинга. Новые коллекции сразу со скидкой — уникальная акция.",
        icon: "sparkles",
        highlight: true,
      },
    ],
  },
  {
    month: "Август",
    sales: [
      {
        name: "Back to School",
        when: "Август (весь месяц)",
        discount: "-20% до -60%",
        description: "Школьные принадлежности, детская одежда, обувь, техника для учёбы.",
        topCategories: [
          "Детская одежда (Carter's, Oshkosh)",
          "Рюкзаки",
          "Ноутбуки для школьников",
          "Канцтовары",
        ],
        plan: "Лучшее время для закупки детской одежды на осень + школьных принадлежностей.",
        icon: "shopping",
      },
    ],
  },
  {
    month: "Сентябрь",
    sales: [
      {
        name: "Labor Day",
        when: "Первый понедельник сентября",
        discount: "-30% до -60%",
        description: "Конец лета — массовые распродажи летних коллекций + новые осенние.",
        topCategories: ["Купальники", "Летняя обувь", "Матрасы", "Бытовая техника"],
        plan: "Последняя возможность купить купальники на следующее лето по супер-цене.",
        icon: "flag",
        highlight: true,
      },
      {
        name: "Apple осенний анонс",
        when: "Середина сентября",
        discount: "Не скидки, но НОВЫЕ продукты",
        description:
          "Анонс нового iPhone, Apple Watch, AirPods. Старые модели часто резко дешевеют.",
        topCategories: ["iPhone предыдущего года", "Apple Watch", "AirPods"],
        plan: "Купить iPhone 14 после выхода iPhone 16 = скидка 30-40% на предыдущую модель.",
        icon: "sparkles",
      },
    ],
  },
  {
    month: "Октябрь",
    sales: [
      {
        name: "Columbus Day",
        when: "Второй понедельник октября",
        discount: "-30% до -50%",
        description: "Распродажа осенних коллекций. Одежда, обувь.",
        topCategories: ["Осенние куртки", "Сапоги", "Детская одежда"],
        plan: "Средней величины распродажа. Подготовка к Black Friday.",
        icon: "flag",
      },
      {
        name: "Halloween",
        when: "31 октября",
        discount: "-40% до -80% (после 31-го)",
        description: "После Halloween — распродажа костюмов, декора, конфет.",
        topCategories: ["Костюмы", "Декор", "Конфеты"],
        plan: "Купить детский костюм для следующего года — в 3-5 раз дешевле.",
        icon: "gift",
      },
    ],
  },
  {
    month: "Ноябрь",
    sales: [
      {
        name: "Black Friday",
        when: "Последняя пятница ноября",
        discount: "До -90%",
        description:
          "ГЛАВНАЯ распродажа года. Все магазины США участвуют. Самые низкие цены на электронику, одежду, обувь.",
        topCategories: [
          "Электроника (TV, ноутбуки)",
          "Телефоны iPhone, Samsung",
          "Игровые консоли",
          "Одежда премиум-брендов",
          "Обувь",
          "Инструменты",
          "Товары для дома",
        ],
        plan: "Главный день года. Начните подготовку в октябре: составьте wishlist, зарегистрируйтесь во всех магазинах, подпишитесь на email-рассылки. Топовые товары распродают за часы.",
        icon: "tag",
        highlight: true,
      },
      {
        name: "Cyber Monday",
        when: "Понедельник после Black Friday",
        discount: "До -80%",
        description: "Онлайн-продолжение Black Friday. Электроника в фокусе.",
        topCategories: [
          "Электроника",
          "Софт, подписки",
          "Онлайн-ритейлеры (Amazon, eBay)",
          "Одежда",
        ],
        plan: "Если не успели в Black Friday — на Cyber Monday часто те же скидки. Идеально для онлайн-шопинга.",
        icon: "package",
        highlight: true,
      },
      {
        name: "Thanksgiving Sales",
        when: "Четвертый четверг ноября",
        discount: "-40% до -70%",
        description: "Скидки перед Black Friday — некоторые магазины не ждут пятницы.",
        topCategories: ["Всё что попадается"],
        plan: "Начните проверять акции за 2-3 дня до Thanksgiving.",
        icon: "flag",
      },
    ],
  },
  {
    month: "Декабрь",
    sales: [
      {
        name: "Pre-Christmas Sales",
        when: "Первые 2 недели декабря",
        discount: "-30% до -60%",
        description: "Последний шанс купить подарки со скидками.",
        topCategories: ["Подарки", "Праздничная одежда", "Декор"],
        plan: "Если не успели в Black Friday — ещё можно урвать скидки до 10-15 декабря.",
        icon: "gift",
      },
      {
        name: "Boxing Day (26 декабря)",
        when: "26 декабря",
        discount: "-50% до -90%",
        description: "Распродажа остатков рождественских товаров + остатки всего.",
        topCategories: ["Всё со складов"],
        plan: "Если в Black Friday не успели — Boxing Day часто ещё ниже цены.",
        icon: "tag",
        highlight: true,
      },
    ],
  },
]

const iconMap = {
  flag: Flag,
  gift: Gift,
  tag: Tag,
  sparkles: Sparkles,
  package: Package,
  shopping: ShoppingBag,
}

export default function SalesCalendarPage() {
  const allSales = SALES_CALENDAR.flatMap((m) => m.sales)

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Календарь распродаж США 2026",
    description: "Все главные шопинг-события в американских магазинах — даты, скидки, категории товаров",
    numberOfItems: allSales.length,
    itemListElement: allSales.map((sale, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: sale.name,
        description: `${sale.description} Скидки: ${sale.discount}. Топ категории: ${sale.topCategories.join(", ")}.`,
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "VirtualLocation",
          url: "https://owaycargo.com/sales",
        },
        organizer: {
          "@type": "Organization",
          name: "OWAY CARGO",
          url: "https://owaycargo.com",
        },
      },
    })),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Календарь распродаж США", url: "/sales" },
        ]}
      />
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-5">
            <Calendar className="w-4 h-4" />
            <span>Обновлено на 2026 год</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Календарь распродаж{" "}
            <span className="text-blue-600">США 2026</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Все главные шопинг-события года. Планируйте закупки через OWAY CARGO заранее —
            в пиковые даты (Black Friday, Prime Day) склад работает 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/#calculator">
              <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 gap-2">
                <Calculator className="w-5 h-5" />
                Рассчитать доставку
              </Button>
            </Link>
            <Link href="/#marketplace">
              <Button variant="outline" className="h-12 rounded-xl px-8">
                Смотреть магазины
              </Button>
            </Link>
          </div>
        </div>

        {/* Top 5 sales highlight */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
            Топ-5 распродаж года
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { name: "Black Friday", when: "28 ноя", color: "bg-slate-900 text-white" },
              { name: "Cyber Monday", when: "1 дек", color: "bg-blue-600 text-white" },
              { name: "Prime Day", when: "11-12 июл", color: "bg-orange-500 text-white" },
              { name: "Memorial Day", when: "26 мая", color: "bg-red-600 text-white" },
              { name: "Labor Day", when: "1 сен", color: "bg-green-600 text-white" },
            ].map((sale) => (
              <Card
                key={sale.name}
                className={`p-5 ${sale.color} border-0 text-center`}
              >
                <div className="font-bold text-lg mb-1">{sale.name}</div>
                <div className="text-sm opacity-90">{sale.when}</div>
              </Card>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            Даты указаны для 2026 года. Приблизительно.
          </p>
        </section>

        {/* Full calendar */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Полный календарь по месяцам
          </h2>
          <div className="space-y-10">
            {SALES_CALENDAR.map(({ month, sales }) => (
              <div key={month}>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-200">
                  {month}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {sales.map((sale) => {
                    const Icon = iconMap[sale.icon]
                    return (
                      <Card
                        key={sale.name}
                        className={`p-6 border transition-all ${
                          sale.highlight
                            ? "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"
                            : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              sale.highlight ? "bg-orange-200" : "bg-blue-100"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                sale.highlight ? "text-orange-700" : "text-blue-600"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-slate-900">{sale.name}</h4>
                              {sale.highlight && (
                                <span className="text-xs px-2 py-0.5 bg-orange-200 text-orange-800 rounded-full font-semibold">
                                  ТОП
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 mb-1">{sale.when}</div>
                            <div className="text-sm font-semibold text-green-700">
                              {sale.discount}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 mb-3">{sale.description}</p>
                        <div className="text-xs font-semibold text-slate-600 mb-1">
                          Что брать:
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {sale.topCategories.map((cat) => (
                            <span
                              key={cat}
                              className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 italic border-t border-slate-200 pt-2">
                          💡 {sale.plan}
                        </p>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preparation tips */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              🎯 Как подготовиться к Black Friday / Prime Day через OWAY
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700">
              <li>
                <strong>За 4 недели:</strong> зарегистрируйтесь в{" "}
                <Link href="/" className="text-blue-600 hover:text-blue-700">
                  OWAY CARGO
                </Link>{" "}
                и получите адрес склада в Делавэре.
              </li>
              <li>
                <strong>За 3 недели:</strong> составьте wishlist. Подпишитесь на email-рассылки
                всех нужных магазинов (они часто рассылают ранние цены).
              </li>
              <li>
                <strong>За 2 недели:</strong> зарегистрируйтесь на Amazon Prime ($14/мес — окупается
                одной покупкой в Prime Day). В остальных магазинах проверьте наличие аккаунтов.
              </li>
              <li>
                <strong>За 1 неделю:</strong> рассчитайте бюджет + оцените доставку через{" "}
                <Link href="/#calculator" className="text-blue-600 hover:text-blue-700">
                  калькулятор
                </Link>
                .
              </li>
              <li>
                <strong>В день распродажи:</strong> покупайте с адресом OWAY. Популярные товары
                раскупают за часы — не медлите.
              </li>
              <li>
                <strong>После:</strong> посылки приходят на склад в течение 2-7 дней. OWAY уведомит
                в Telegram. Можно консолидировать несколько заказов в одну посылку — экономия на
                весе.
              </li>
            </ol>
          </Card>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto mb-10">
          <Card className="p-8 md:p-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Не упустите главные распродажи
            </h2>
            <p className="mb-6 text-blue-100">
              Сохраните страницу в закладки. Рассчитайте заранее — сэкономите время в пиковые дни.
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
