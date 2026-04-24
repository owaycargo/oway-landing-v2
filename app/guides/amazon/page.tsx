import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  ExternalLink,
  Package,
  ShieldCheck,
  Sparkles,
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
  title: "Как покупать на Amazon из США в СНГ — полный гайд 2026",
  description:
    "Подробный гайд по покупкам на Amazon.com с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO. Prime, Amazon Basics, возвраты, защита покупателя.",
  keywords: [
    "как покупать на Amazon",
    "Amazon из России",
    "Amazon в Казахстан",
    "Amazon Prime",
    "Amazon Basics",
    "доставка с Amazon",
    "OWAY Amazon",
  ],
  alternates: { canonical: "/guides/amazon" },
  openGraph: {
    title: "Как покупать на Amazon из США в СНГ — полный гайд",
    description:
      "Prime, Amazon Basics, защита покупателя и доставка через OWAY CARGO.",
    url: "/guides/amazon",
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
    q: "Нужна ли подписка Amazon Prime для покупок из СНГ?",
    a: "Необязательно, но очень выгодно. Prime стоит $14.99/мес или $139/год. Даёт бесплатную доставку за 1-2 дня НА АДРЕС В США (на наш склад OWAY), эксклюзивные скидки в Prime Day, Prime Video, Amazon Music. Если делаете 3+ покупок в месяц — Prime окупается только на доставке на склад. Месячная подписка $14.99 часто окупается одной покупкой.",
  },
  {
    q: "Что такое Amazon Basics и почему это выгодно?",
    a: "Amazon Basics — собственный бренд Amazon. Те же товары что у дорогих брендов (батарейки, кабели HDMI, постельное, кухонные принадлежности, электроника) — но на 40-60% дешевле. Качество идентичное, часто производят одни и те же заводы. Флагман экономии — особенно на технических аксессуарах.",
  },
  {
    q: "Продавец не отправляет в мой штат — что делать?",
    a: "На Amazon есть 3 типа продавцов: (1) Amazon сам — всегда доставляет на любой адрес в США. (2) FBA (Fulfilled by Amazon) — товар у Amazon на складе, доставляется так же как от самого Amazon. (3) FBM (Fulfilled by Merchant) — продавец отправляет сам, может отказать. Совет: используйте фильтр «Prime» в поиске — это FBA + гарантирует доставку на любой адрес США, включая наш склад в Делавэре.",
  },
  {
    q: "Как работает защита покупателя A-to-z Guarantee?",
    a: "Amazon A-to-z Guarantee — самая сильная защита покупателя в e-commerce. Если товар не пришёл, пришёл не тот, пришёл повреждённый — открываете claim в течение 90 дней, получаете деньги обратно. Работает и для FBM-продавцов. Правило: сначала напишите продавцу, дайте 48 часов. Если молчит или отказ — claim.",
  },
  {
    q: "Сколько стоит доставка с Amazon через OWAY?",
    a: "Внутренняя доставка Amazon → склад OWAY: бесплатно если у вас Prime или заказ свыше $35 (Super Saver). Из США в СНГ через OWAY: $12/кг (Кыргызстан, Казахстан, Узбекистан) или $18/кг (Россия, Беларусь). Для точного расчёта с учётом объёмного веса — калькулятор на главной.",
  },
  {
    q: "Какие лайфхаки покупок на Amazon?",
    a: "1) Установите CamelCamelCamel — сервис отслеживает историю цен, видно когда товар в скидке или завышен. 2) Honey / Rakuten — кешбэк-расширения (до 5% обратно). 3) Добавьте в Wishlist — иногда приходят промо на отложенные товары. 4) Amazon Warehouse Deals — товары с возвратов со скидкой 20-50%, состояние новое или как новое. 5) Subscribe & Save — 5-15% скидка + доставка по графику (для расходников).",
  },
  {
    q: "Можно ли вернуть товар купленный на Amazon?",
    a: "Да — один из самых лояльных возвратов в мире. Большинство товаров — 30 дней бесплатного возврата. Одежда и обувь — 30 дней в original condition. Электроника — 30 дней даже если открыта. Возврат в США бесплатный (Amazon присылает label). Обратно в СНГ через OWAY — за ваш счёт, поэтому лучше выбирать тщательно.",
  },
  {
    q: "Что выгоднее всего покупать на Amazon из СНГ?",
    a: "Топ-7: 1) Электроника (iPhone, MacBook, PlayStation — от официальных продавцов). 2) Витамины и БАДы (NOW, Thorne, Jarrow — в 2-3 раза дешевле). 3) Спортпитание (Optimum Nutrition, Dymatize). 4) Кухонные гаджеты (Vitamix, KitchenAid, Instant Pot). 5) Детские товары (памперсы, Carter's, Fisher-Price). 6) Книги на английском. 7) Amazon Basics — всё.",
  },
  {
    q: "Как избежать подделок на Amazon?",
    a: "Amazon борется с подделками, но они встречаются на FBM. Правила: (1) Покупайте «Sold by Amazon» или «Ships from Amazon» — наименьший риск. (2) Для брендовых товаров — проверяйте «Sold by [бренд]» (например, Nike, Apple). (3) Читайте отзывы на конкретного продавца. (4) Цена на 50% ниже рынка = подделка с 90% вероятностью.",
  },
  {
    q: "Можно ли отправлять iPhone через OWAY с Amazon?",
    a: "Да. Amazon продаёт официальные iPhone от Apple (Sold by Amazon). Это оригиналы, разблокированные, работают с любой SIM в мире. Покупаете → доставляется на наш склад в Делавэре → отправляем в вашу страну. Электроника облагается индивидуальной пошлиной — согласуем до отправки.",
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как купить на Amazon с доставкой в СНГ через OWAY CARGO",
  description:
    "Пошаговая инструкция по покупке на Amazon.com из США с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь.",
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
      name: "Регистрация на Amazon",
      text: "Создайте аккаунт на amazon.com. Добавьте адрес склада OWAY как Shipping Address.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Выбор товара с фильтром Prime",
      text: "Ищите товары с бейджем Prime — гарантия доставки за 1-2 дня на наш склад, бесплатно если у вас Prime-подписка или заказ от $35.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Оформление заказа",
      text: "При checkout выберите адрес OWAY, оплатите картой или Amazon Gift Card. Отслеживайте трекинг.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Отправка в страну через OWAY",
      text: "После поступления на склад OWAY — выберите страну, оплатите тариф, получите посылку в Пункте выдачи.",
    },
  ],
}

export default function AmazonGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Гайды по магазинам", url: "/guides/amazon" },
          { name: "Amazon", url: "/guides/amazon" },
        ]}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-5">
            <span className="text-xl font-black" style={{ color: "#FF9900" }}>
              amazon
            </span>
            <span>Полный гайд 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Как покупать на Amazon из США{" "}
            <span className="text-orange-600">в страны СНГ</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Всё про Amazon Prime, Basics, защиту покупателя A-to-z и доставку через OWAY
            CARGO. Миллионы товаров, сотни брендов, быстрые отгрузки.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              <Button className="h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-8 gap-2">
                <ExternalLink className="w-5 h-5" />
                Открыть Amazon.com
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

        {/* Why Amazon */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему Amazon — магазин №1 для шопинга в США
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Package,
                title: "Миллионы товаров",
                desc: "Всё что существует в США продаётся на Amazon. От iPhone до скрепок. Такого выбора нет нигде.",
              },
              {
                icon: Zap,
                title: "Prime-доставка за 1-2 дня",
                desc: "С Prime-подпиской заказ прилетает на наш склад за 1-2 дня. Дальше — 7-9 дней в КГ/КЗ/УЗ через OWAY.",
              },
              {
                icon: ShieldCheck,
                title: "Защита A-to-z Guarantee",
                desc: "Самая сильная защита покупателя в e-commerce. Не пришло / не то / сломанное — деньги вернут.",
              },
              {
                icon: CreditCard,
                title: "Amazon Basics — дешевле 40%",
                desc: "Собственный бренд Amazon. Качество идентичное, цены в 2 раза ниже. Кабели, батарейки, аксессуары.",
              },
              {
                icon: TrendingDown,
                title: "Лучшие скидки года",
                desc: "Amazon Prime Day (июль), Black Friday, Cyber Monday — до 80% на топовые товары.",
              },
              {
                icon: Sparkles,
                title: "Amazon Warehouse Deals",
                desc: "Товары с возвратов (состояние новое) со скидкой 20-50%. Тот же товар за полцены.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 bg-white border-slate-200">
                <item.icon className="w-7 h-7 text-orange-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Step by step */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Как купить на Amazon из СНГ — 5 шагов
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Регистрация в OWAY CARGO",
                desc: (
                  <>
                    Зайдите на{" "}
                    <Link href="/" className="text-orange-600 hover:text-orange-700">
                      owaycargo.com
                    </Link>{" "}
                    или в Telegram{" "}
                    <a
                      href="https://t.me/Oway1_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700"
                    >
                      @Oway1_bot
                    </a>
                    . Получите OWAY-ID и адрес склада в штате Делавэр.
                  </>
                ),
              },
              {
                title: "Регистрация на Amazon.com",
                desc: (
                  <>
                    Создайте аккаунт на{" "}
                    <a
                      href="https://www.amazon.com/register"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-orange-600 hover:text-orange-700"
                    >
                      amazon.com
                    </a>
                    . Добавьте карту (Visa / Mastercard / American Express) и адрес
                    склада OWAY как Shipping Address в ваш профиль.
                  </>
                ),
              },
              {
                title: "Поиск товара с фильтром Prime",
                desc: (
                  <>
                    Ищите товар, применяйте фильтр <strong>«Prime»</strong> — это
                    гарантирует что товар у Amazon на складе + доставка за 1-2 дня на
                    любой американский адрес, включая наш склад.
                  </>
                ),
              },
              {
                title: "Оформление заказа",
                desc: (
                  <>
                    При checkout выберите адрес OWAY (Делавэр) + ваш OWAY-ID в поле
                    apartment/suite. Оплачивайте картой. Получите tracking number.
                  </>
                ),
              },
              {
                title: "Доставка в страну",
                desc: (
                  <>
                    Посылка приходит на наш склад за 1-2 дня. Получаете уведомление в
                    Telegram. Оплачиваете тариф OWAY ($12-$18/кг), выбираете страну.
                    Через 7-21 день забираете в Пункте выдачи.
                  </>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
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

        {/* Prime section */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Amazon Prime — нужна ли подписка?
                </h2>
                <p className="text-sm text-slate-600">
                  $14.99/мес или $139/год — стоит ли
                </p>
              </div>
            </div>
            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Что даёт Prime:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Бесплатная доставка 1-2 дня на любой адрес США (наш склад)</li>
                <li>Prime Video (как Netflix, но дешевле)</li>
                <li>Prime Music (Spotify-альтернатива)</li>
                <li>Эксклюзивные цены в Prime Day (июль), Prime Big Deal Days (октябрь)</li>
                <li>Early access to Lightning Deals (30 мин раньше других)</li>
                <li>Amazon Photos unlimited storage</li>
              </ul>
              <p className="mt-4">
                <strong>Окупится ли для вас:</strong> если вы делаете 3+ заказов в месяц на
                Amazon → да, на одной бесплатной быстрой доставке окупается. Если 1-2
                заказа в месяц → возможно выгоднее free shipping на заказы от $35.
              </p>
              <p className="text-sm text-slate-600 mt-3">
                💡 Лайфхак: оформите Prime на 1 месяц ($14.99) только перед Amazon Prime
                Day в июле — окупится на одной скидке.
              </p>
            </div>
          </Card>
        </section>

        {/* Top categories */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Что выгодно покупать на Amazon через OWAY
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "📱 Электроника (от Apple, Samsung)",
                items: [
                  "iPhone, iPad, MacBook — Sold by Amazon = оригинал",
                  "PlayStation 5, Xbox Series X",
                  "Samsung TVs, Smart Home",
                  "Наушники Sony, Bose, Apple",
                ],
              },
              {
                title: "💊 Витамины и БАДы",
                items: [
                  "NOW Foods — в 2-3 раза дешевле iHerb",
                  "Thorne, Jarrow Formulas (премиум)",
                  "Спортивное питание: Optimum Nutrition, Dymatize",
                  "Пробиотики (Culturelle, Align)",
                ],
              },
              {
                title: "🍳 Кухонные гаджеты",
                items: [
                  "Vitamix блендеры (эталон качества)",
                  "KitchenAid миксеры",
                  "Instant Pot мультиварки",
                  "Keurig кофемашины",
                ],
              },
              {
                title: "👶 Детские товары",
                items: [
                  "Подгузники Pampers, Huggies (subscribe & save)",
                  "Carter's комплекты",
                  "LEGO (часто дешевле чем lego.com)",
                  "Детские бутылочки, соски",
                ],
              },
              {
                title: "📚 Книги на английском",
                items: [
                  "Технические и профессиональные",
                  "Kindle e-books (покупка + доставка не нужна)",
                  "Редкие издания",
                  "Учебники (Textbooks rental)",
                ],
              },
              {
                title: "🏠 Amazon Basics — всё",
                items: [
                  "Кабели HDMI, USB (в 2-3 раза дешевле брендовых)",
                  "Батарейки AA, AAA",
                  "Постельное бельё, полотенца",
                  "Кухонная утварь (нержавейка)",
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

        {/* Life hacks */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-white border-slate-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Продвинутые лайфхаки для Amazon
                </h2>
                <p className="text-sm text-slate-600">
                  Как сэкономить ещё 10-30% на любой покупке
                </p>
              </div>
            </div>
            <ul className="space-y-4 text-slate-700">
              <li>
                <strong>CamelCamelCamel (camelcamelcamel.com)</strong> — сервис отслеживает
                историю цен на Amazon. Видно: в скидке ли сейчас, или цена завышена.
                Бесплатное расширение для Chrome. Если товар сейчас по максимальной цене
                — ждите, завтра часто падает.
              </li>
              <li>
                <strong>Amazon Warehouse Deals (amazon.com/warehouse-deals)</strong> —
                товары с возвратов. Условия: «Used - Like New», «Used - Very Good».
                Состояние действительно отличное, но цена на 20-50% ниже. Электроника,
                книги, товары для дома — золотая жила.
              </li>
              <li>
                <strong>Subscribe & Save</strong> — для расходников (шампунь, подгузники,
                витамины). 5-15% скидка + доставка по графику. Можно отменить в любое
                время. Лайфхак: подписывайтесь, получаете первую посылку со скидкой,
                отменяете если не нужно продолжать.
              </li>
              <li>
                <strong>Honey / Rakuten расширения</strong> — автоматически ищут промокоды
                + дают кешбэк (1-5% через Rakuten). Работают в браузере бесплатно.
              </li>
              <li>
                <strong>Amazon Outlet</strong> — финальные цены на остатки коллекций.
                Одежда Amazon Essentials, электроника.
              </li>
              <li>
                <strong>Lightning Deals</strong> — скидки на 4-6 часов. В Prime Day —
                скидки по 90%. Подписывайтесь на алерты любимых товаров.
              </li>
            </ul>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы про покупки на Amazon
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
            <Link href="/faq" className="text-orange-600 hover:text-orange-700 text-sm">
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
            <Link href="/marketplace/amazon">
              <Card className="p-5 bg-white border-slate-200 hover:border-orange-300 hover:shadow-md transition-all">
                <DollarSign className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  Страница Amazon в каталоге
                </h3>
                <p className="text-xs text-slate-500">Базовая карточка и быстрые ссылки</p>
              </Card>
            </Link>
            <Link href="/guides/ebay">
              <Card className="p-5 bg-white border-slate-200 hover:border-orange-300 hover:shadow-md transition-all">
                <ArrowRight className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  Гайд по eBay
                </h3>
                <p className="text-xs text-slate-500">Аукционы, Buy It Now, защита</p>
              </Card>
            </Link>
            <Link href="/sales">
              <Card className="p-5 bg-white border-slate-200 hover:border-orange-300 hover:shadow-md transition-all">
                <Clock className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  Календарь распродаж
                </h3>
                <p className="text-xs text-slate-500">Prime Day, Black Friday и др.</p>
              </Card>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto mb-10">
          <Card className="p-8 md:p-10 bg-gradient-to-br from-orange-600 to-orange-700 text-white border-0 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Готовы к покупкам на Amazon?
            </h2>
            <p className="mb-6 text-orange-100 text-lg">
              Регистрация OWAY — 1 минута. Потом сразу указываете наш адрес на Amazon и
              покупаете.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.amazon.com"
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                <Button className="h-12 bg-white text-orange-700 hover:bg-orange-50 rounded-xl px-8 gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Открыть Amazon
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
        <RelatedGuides currentHref="/guides/amazon" />
      </main>

      <Footer />
    </div>
  )
}
