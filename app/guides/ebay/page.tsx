import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  Calculator,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Gavel,
  Package,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
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
  title: "Как покупать на eBay из США в СНГ — полный гайд 2026",
  description:
    "Подробный гайд по покупкам на eBay с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан и Беларусь через OWAY CARGO. Аукционы, Buy It Now, защита покупателя, сравнение с eBay Global Shipping.",
  keywords: [
    "как покупать на eBay",
    "eBay из России",
    "eBay в Казахстан",
    "eBay Global Shipping",
    "аукционы eBay",
    "eBay Buy It Now",
    "доставка с eBay",
    "OWAY eBay",
  ],
  alternates: { canonical: "/guides/ebay" },
  openGraph: {
    title: "Как покупать на eBay из США в СНГ — полный гайд",
    description: "Всё про аукционы, Buy It Now, защиту покупателя и доставку через OWAY CARGO.",
    url: "/guides/ebay",
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

const faqItems = [
  {
    q: "Почему выгодно покупать на eBay из США вместо eBay в своей стране?",
    a: "eBay в США — крупнейший рынок с миллионами продавцов. Там часто лоты которых нет в СНГ: редкие кроссовки, винтажная электроника, коллекционные Lego, ретро-консоли, автозапчасти для старых машин. Plus цены на новые товары нередко ниже чем у американских розничных магазинов — продавцы конкурируют друг с другом.",
  },
  {
    q: "Как OWAY CARGO лучше eBay Global Shipping (GSP)?",
    a: "eBay Global Shipping программа (GSP) — своя служба eBay для международной доставки. Проблемы: 1) Часто в 2-3 раза дороже OWAY. 2) Не все продавцы подключены — половину лотов не привезут. 3) Нет консолидации — заказ из 3 магазинов = 3 оплаты доставки. С OWAY: покупаете у любого продавца, свезли к нам на склад в Делавэре, мы объединяем в одну посылку и отправляем. Экономия ощутимая.",
  },
  {
    q: "Что делать если продавец не отправляет в мой штат/страну?",
    a: "Многие продавцы eBay отправляют только внутри США. Это НЕ проблема — указываете адрес нашего склада в штате Делавэр как адрес доставки. Продавец считает что везёт внутри США, доставка копеечная. Посылка приходит на наш склад, OWAY отправляет её вам.",
  },
  {
    q: "Как защититься от мошенников на eBay?",
    a: "1) Покупайте у продавцов с feedback ≥ 99% и 500+ отзывов. 2) Читайте последние негативные отзывы (если много за последний месяц — не берите). 3) Проверяйте фото — требуйте реальные фото лота, не стоковые. 4) Используйте PayPal или кредитную карту для оплаты — даёт защиту покупателя. 5) Если что-то не так — открывайте спор в течение 30 дней через eBay Money Back Guarantee.",
  },
  {
    q: "Сколько стоит доставка с eBay через OWAY?",
    a: "Тариф на посылку от нас стандартный: $12/кг (Кыргызстан, Казахстан, Узбекистан) или $18/кг (Россия, Беларусь). Внутренняя доставка продавец → склад OWAY часто бесплатна (многие продавцы делают free shipping внутри США) или $5-15 максимум. Используйте калькулятор для точного расчёта.",
  },
  {
    q: "Как работают аукционы на eBay?",
    a: "На eBay два формата: Buy It Now (покупка сразу по фикс-цене, как в обычном магазине) и аукцион (ставки от покупателей, побеждает максимальная ставка к концу времени). На аукционах можно сэкономить 30-50%, но есть риск не выиграть. Стратегия: sniping — делайте ставку в последние 5-10 секунд (чтобы другие не увидели и не перебили).",
  },
  {
    q: "Можно ли вернуть товар купленный на eBay?",
    a: "Если продавец принимает возвраты — да. Политика указана в карточке товара. Но возврат в США бесплатный; пересылать из СНГ обратно через OWAY — ваши расходы. Поэтому важно правильно выбирать ДО покупки: размеры, состояние, описание.",
  },
  {
    q: "Что такое eBay Bucks и можно ли ими пользоваться?",
    a: "eBay Bucks — кэшбэк программа. 1% от покупок возвращается eBay-баллами, которыми можно оплатить следующий заказ. Для международных покупателей программа обычно работает. Регистрируйтесь в аккаунте → Account → eBay Bucks.",
  },
  {
    q: "Покупал ли OWAY гарантирует что товар доставят в целости?",
    a: "OWAY отвечает за сохранность посылки с момента приёма на наш склад в США до выдачи вам в стране. Базовая компенсация до $500 включена в тариф. Расширенная страховка 3% от декларируемой стоимости = 100% компенсация. Но если товар пришёл от продавца eBay уже повреждённым — это вопрос к продавцу eBay (открывайте спор в eBay Money Back Guarantee).",
  },
  {
    q: "Какие категории на eBay самые выгодные для покупки через OWAY?",
    a: "Топ-6 самых выгодных: 1) Электроника Б/У (iPhone, MacBook, PlayStation со скидкой 40-70%). 2) Новые кроссовки лимитированных моделей (Jordan, Yeezy, редкие Air Max). 3) Винтажные часы (Seiko, Citizen, Timex). 4) Коллекционные Lego (снятые с производства). 5) Автозапчасти для иномарок (особенно Honda, Toyota, BMW). 6) Винтажные видеоигры и консоли. Всё это в СНГ либо не найти, либо дороже в 2-5 раз.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Как покупать на eBay из США в СНГ — полный гайд 2026",
  description:
    "Аукционы, брендовые товары, редкая электроника — как покупать на eBay из США с доставкой через OWAY CARGO в Россию, Казахстан, Кыргызстан.",
  author: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  publisher: {
    "@type": "Organization",
    name: "OWAY CARGO",
    logo: { "@type": "ImageObject", url: "https://owaycargo.com/favicon.svg" },
  },
  datePublished: "2025-12-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://owaycargo.com/guides/ebay" },
  inLanguage: "ru",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как купить на eBay с доставкой в СНГ через OWAY CARGO",
  description:
    "Пошаговая инструкция по покупке на eBay из США с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь.",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "12" },
  totalTime: "PT15M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Регистрация в OWAY CARGO",
      text: "Зарегистрируйтесь на owaycargo.com или в Telegram-боте @Oway1_bot, получите персональный OWAY-ID и адрес склада в штате Делавэр.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Регистрация или вход на eBay",
      text: "Создайте аккаунт на ebay.com (или войдите). Установите предпочитаемый способ оплаты — PayPal или кредитную карту.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Поиск товара",
      text: "Ищите нужный товар. Фильтруйте по продавцам с рейтингом ≥ 99%, 500+ отзывов. Выбирайте 'Buy It Now' для мгновенной покупки или аукцион для экономии.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Покупка с адресом OWAY",
      text: "При оформлении заказа укажите адрес склада OWAY в штате Делавэр как адрес доставки. Добавьте свой OWAY-ID в поле apt/suite.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Отправка в страну получения",
      text: "После поступления посылки на склад OWAY — выберите страну, оплатите тариф ($12-$18/кг), получите трекинг и заберите посылку в Пункте выдачи.",
    },
  ],
}

export default function EbayGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Гайды", url: "/guides" },
          { name: "eBay", url: "/guides/ebay" },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-5">
            <span className="text-xl font-black" style={{ color: "#0064D2" }}>eBay</span>
            <span>Полный гайд 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Как покупать на eBay из США{" "}
            <span className="text-blue-600">в страны СНГ</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Всё что нужно знать про аукционы, Buy It Now, защиту покупателя и доставку
            через OWAY CARGO. Экономия до 70% vs eBay Global Shipping.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer">
              <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 gap-2">
                <ExternalLink className="w-5 h-5" />
                Открыть eBay.com
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

        {/* Why eBay */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему eBay — один из лучших магазинов для доставки в СНГ
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: ShoppingBag,
                title: "Миллионы продавцов",
                desc: "Редкие товары которых нет ни в одном другом магазине США. Винтажная электроника, коллекционные предметы, автозапчасти.",
              },
              {
                icon: TrendingDown,
                title: "Цены ниже розничных",
                desc: "Продавцы конкурируют между собой. iPhone Б/У, MacBook, PlayStation со скидкой 40-70% от розницы.",
              },
              {
                icon: Gavel,
                title: "Аукционы = экономия",
                desc: "На аукционах можно купить товар за 30-50% от рыночной цены. Особенно выгодно для редких лимитированных моделей.",
              },
              {
                icon: Package,
                title: "OWAY привозит любые лоты",
                desc: "Многие продавцы отправляют только внутри США — не проблема. Указываете адрес нашего склада в Делавэре.",
              },
              {
                icon: ShieldCheck,
                title: "Защита покупателя",
                desc: "eBay Money Back Guarantee + PayPal Buyer Protection = двойная защита. Спорные сделки возвращают деньги.",
              },
              {
                icon: DollarSign,
                title: "Дешевле чем GSP",
                desc: "eBay Global Shipping Program дороже OWAY в 2-3 раза и не работает с половиной продавцов. С OWAY доступны все лоты.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 bg-white border-slate-200">
                <item.icon className="w-7 h-7 text-blue-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* How to buy - step by step */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Как купить на eBay с доставкой в СНГ — 5 шагов
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Регистрация в OWAY CARGO",
                desc: (
                  <>
                    Зайдите на{" "}
                    <Link href="/" className="text-blue-600 hover:text-blue-700">
                      owaycargo.com
                    </Link>{" "}
                    или в Telegram{" "}
                    <a
                      href="https://t.me/Oway1_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      @Oway1_bot
                    </a>
                    . Получите OWAY-ID и адрес склада в штате Делавэр.
                  </>
                ),
              },
              {
                title: "Регистрация на eBay",
                desc: (
                  <>
                    Создайте аккаунт на{" "}
                    <a
                      href="https://www.ebay.com/register"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      ebay.com
                    </a>
                    . Подключите PayPal или кредитную карту для защиты. Для
                    регистрации достаточно email.
                  </>
                ),
              },
              {
                title: "Поиск и проверка продавца",
                desc: (
                  <>
                    Ищите товар. <strong>Критерии надёжного продавца:</strong> рейтинг ≥ 99%,
                    отзывов ≥ 500, последние 30 дней без массовых негативов, реальные
                    фото лота (не стоковые).
                  </>
                ),
              },
              {
                title: "Покупка с адресом OWAY",
                desc: (
                  <>
                    При checkout вставьте адрес склада OWAY (штат Делавэр) + ваш OWAY-ID
                    в поле suite/apt. Оплачивайте PayPal или кредитной картой —
                    получаете 2 уровня защиты.
                  </>
                ),
              },
              {
                title: "Доставка в страну",
                desc: (
                  <>
                    После поступления на склад OWAY получите уведомление в Telegram.
                    Выберите страну, оплатите тариф. Забрать можно в Пункте выдачи или
                    заказать курьером до двери.
                  </>
                ),
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0">
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

        {/* eBay GSP vs OWAY */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            eBay Global Shipping vs OWAY CARGO
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-4 font-semibold text-slate-900">Критерий</th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-900">eBay GSP</th>
                  <th className="text-left px-5 py-4 font-semibold text-blue-600">OWAY CARGO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                <tr>
                  <td className="px-5 py-4 font-medium">Тариф</td>
                  <td className="px-5 py-4 text-slate-600">$30-$60/кг</td>
                  <td className="px-5 py-4 text-green-700 font-semibold">$12-$18/кг</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">Консолидация заказов</td>
                  <td className="px-5 py-4 text-slate-600">❌ Нет (каждая отдельно)</td>
                  <td className="px-5 py-4 text-green-700">✓ Бесплатно</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">Repack</td>
                  <td className="px-5 py-4 text-slate-600">❌ Нет</td>
                  <td className="px-5 py-4 text-green-700">✓ Бесплатно по запросу</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">Покрытие продавцов</td>
                  <td className="px-5 py-4 text-slate-600">~50% продавцов</td>
                  <td className="px-5 py-4 text-green-700">100% любой продавец США</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">Хранение на складе</td>
                  <td className="px-5 py-4 text-slate-600">Нет (сразу отправка)</td>
                  <td className="px-5 py-4 text-green-700">30 дней бесплатно</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">Срок доставки в РФ</td>
                  <td className="px-5 py-4 text-slate-600">3-5 недель</td>
                  <td className="px-5 py-4 text-green-700">16-21 день</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">Срок доставки в KG/KZ/UZ</td>
                  <td className="px-5 py-4 text-slate-600">4-6 недель</td>
                  <td className="px-5 py-4 text-green-700">7-9 дней</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Top eBay categories */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Что выгодно покупать на eBay через OWAY
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "📱 Электроника Б/У",
                items: [
                  "iPhone 14/15 refurbished от Apple",
                  "MacBook с гарантией Apple Care",
                  "PlayStation 5 и Xbox Series X",
                  "iPad Pro Б/У в отличном состоянии",
                ],
              },
              {
                title: "👟 Кроссовки",
                items: [
                  "Jordan лимитированные модели",
                  "Yeezy v2, v3",
                  "Air Max редких расцветок",
                  "Винтажные Nike и Adidas",
                ],
              },
              {
                title: "⌚ Часы и аксессуары",
                items: [
                  "Seiko, Citizen дайвы",
                  "Apple Watch Ultra 1 Б/У",
                  "Ролексы и Omega (проверять продавца!)",
                  "Винтажные Timex, Casio",
                ],
              },
              {
                title: "🧱 Lego снятые с производства",
                items: [
                  "Technic, Star Wars",
                  "Architecture серия",
                  "Коллекционные сеты",
                  "Возможен рост цены в 2-5 раз",
                ],
              },
              {
                title: "🚗 Автозапчасти",
                items: [
                  "Redko detali Honda, Toyota",
                  "Тюнинг-запчасти BMW, Audi",
                  "Оригиналы для американских машин",
                  "Часто дешевле чем у дилеров",
                ],
              },
              {
                title: "🎮 Ретро-игры",
                items: [
                  "NES, SNES, Sega картриджи",
                  "PlayStation 1, 2 игры",
                  "Game Boy и карманные консоли",
                  "Редкие лоты = инвестиции",
                ],
              },
            ].map((cat) => (
              <Card key={cat.title} className="p-6 bg-white border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">{cat.title}</h3>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Sniping strategy */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Секретная стратегия: eBay Sniping
                </h2>
                <p className="text-sm text-slate-600">Как выиграть аукцион за 5 секунд</p>
              </div>
            </div>
            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Sniping</strong> — классическая тактика опытных покупателей. Идея: не
                делать ставку заранее (это приглашает конкурентов повышать), а поставить
                максимальную желаемую цену в последние 5-10 секунд аукциона.
              </p>
              <p>
                <strong>Как это делать:</strong>
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Нашли нужный лот → добавьте в Watchlist (не ставку!)</li>
                <li>За 5 минут до конца аукциона откройте лот</li>
                <li>
                  Введите максимальную сумму которую готовы заплатить (eBay сам сделает минимальную
                  ставку для победы, сохранит ваш максимум скрытым)
                </li>
                <li>Нажмите «Place Bid» за 5-10 секунд до конца</li>
                <li>
                  Другие участники не успеют отреагировать. Если ваша максимальная ставка больше
                  чем у всех — вы выиграли.
                </li>
              </ol>
              <p className="text-sm text-slate-600 mt-3">
                💡 Можно использовать автоматические сервисы (Gixen, AuctionSniper) которые
                делают ставку за вас — но базовые есть в самом eBay.
              </p>
            </div>
          </Card>
        </section>

        {/* Fraud protection */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-white border-slate-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Как защититься от мошенников
                </h2>
                <p className="text-sm text-slate-600">
                  Правила безопасной покупки на eBay
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Продавец ≥ 99% рейтинг, ≥ 500 отзывов.</strong> Новички с 10
                  отзывами — риск.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Читайте последние негативные отзывы.</strong> Если за 30 дней
                  много жалоб — не покупайте.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Реальные фото лота.</strong> Если только стоковые — попросите
                  продавца прислать свои. Отказ = красный флаг.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Оплата PayPal или кредитной картой.</strong> Никогда не через
                  Western Union, Zelle или bank transfer — там нет защиты.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>eBay Money Back Guarantee.</strong> Работает 30 дней с момента
                  доставки. Если товар не тот или не пришёл — открывайте спор, eBay обычно
                  на стороне покупателя.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Подозрительно низкая цена?</strong> iPhone 15 за $200 новый =
                  100% развод. Рыночная цена есть рыночная цена.
                </span>
              </li>
            </ul>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы про покупки на eBay
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
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

        {/* Related */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
            Смотрите также
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/marketplace/ebay">
              <Card className="p-5 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                <Award className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  Страница eBay в каталоге
                </h3>
                <p className="text-xs text-slate-500">Базовая карточка с быстрыми ссылками</p>
              </Card>
            </Link>
            <Link href="/#calculator">
              <Card className="p-5 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                <Calculator className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm mb-1">Калькулятор доставки</h3>
                <p className="text-xs text-slate-500">Рассчитайте стоимость для своей посылки</p>
              </Card>
            </Link>
            <Link href="/faq">
              <Card className="p-5 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm mb-1">54 вопроса в FAQ</h3>
                <p className="text-xs text-slate-500">Таможня, запрещёнка, страховка, возвраты</p>
              </Card>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Готовы покупать на eBay?
            </h2>
            <p className="mb-6 text-blue-100 text-lg">
              Поддержка 24/7 ответит в течение 15 минут. Регистрация минуту — адрес склада
              сразу.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer">
                <Button className="h-12 bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-8 gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Открыть eBay
                </Button>
              </a>
              <Link href="/#lead">
                <Button
                  variant="outline"
                  className="h-12 bg-transparent text-white border-white hover:bg-white/10 rounded-xl px-8"
                >
                  <ArrowRight className="w-5 h-5 mr-1" />
                  Оставить заявку
                </Button>
              </Link>
            </div>
          </Card>
        </section>
        <RelatedGuides currentHref="/guides/ebay" />
      </main>

      <Footer />
    </div>
  )
}
