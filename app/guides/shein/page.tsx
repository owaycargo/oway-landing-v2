import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Package,
  Percent,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  Zap,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { RelatedGuides } from "@/app/guides/_components/related-guides"

export const metadata: Metadata = {
  title: "Как покупать на SHEIN из США в СНГ — полный гайд 2026",
  description:
    "Подробный гайд по покупкам на SHEIN с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO. Таблицы размеров, промокоды, возвраты, лайфхаки экономии.",
  keywords: [
    "SHEIN Россия",
    "SHEIN доставка СНГ",
    "как заказать SHEIN",
    "SHEIN промокод",
    "SHEIN таблица размеров",
    "SHEIN через OWAY",
    "SHEIN доставка Казахстан",
  ],
  alternates: { canonical: "/guides/shein" },
  openGraph: {
    title: "Как покупать на SHEIN из США в СНГ — полный гайд 2026",
    description: "Промокоды, таблицы размеров, возвраты и доставка через OWAY CARGO.",
    url: "/guides/shein",
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
    q: "SHEIN из США и SHEIN.com — это одно и то же?",
    a: "Да и нет. SHEIN глобально переориентировался — основной домен shein.com теперь обслуживает US рынок с американским складом. Цены в USD, оплата картой любой страны. Товары те же, но иногда ассортимент и цены отличаются от региональных версий. Через OWAY вы заказываете именно с американского сайта — с американскими ценами и без региональных ограничений.",
  },
  {
    q: "Как определить правильный размер на SHEIN?",
    a: "SHEIN работает в азиатской размерной сетке — всегда берите на 1-2 размера больше привычного. На каждом товаре есть кнопка «Size Guide» — там точные замеры в сантиметрах. Снимите свои мерки (грудь, талия, бёдра) и сверьтесь с таблицей. Читайте отзывы — покупатели часто пишут «берите на размер больше» или «размер в размер». При заказе через OWAY можно заказать два размера и вернуть ненужный.",
  },
  {
    q: "Можно ли вернуть товар с SHEIN через OWAY?",
    a: "SHEIN даёт 35 дней на возврат. Алгоритм: (1) инициируйте возврат в приложении SHEIN, (2) OWAY принимает возврат на своём складе, (3) отправляет в SHEIN. Возврат стоит ~$8-15 (доставка от вас до склада OWAY не нужна — просто не забирайте посылку). Важно: возврат возможен только для товаров, не помеченных как final sale.",
  },
  {
    q: "Безопасно ли платить на SHEIN картой?",
    a: "SHEIN — публичная компания с оборотом $45 млрд в год. Сайт использует SSL, Stripe для платежей. Принимает Visa, Mastercard, PayPal, Apple Pay, Google Pay. Для заказа через OWAY достаточно любой карты с возможностью онлайн-оплат. Если карта не проходит — используйте PayPal или попросите помощи у менеджера OWAY.",
  },
  {
    q: "Сколько стоит доставка SHEIN через OWAY?",
    a: "SHEIN доставляет на склад OWAY в Делавэре бесплатно (при заказе от $29) или за $3.99 (меньше $29). Далее OWAY → ваша страна: Россия/Беларусь от $18/кг, Казахстан/КГ/УЗ от $12/кг. Одежда лёгкая — блузка весит 200-300г, платье 400-600г. 5 вещей обычно ~1.5-2 кг = $18-36 доставка OWAY. Итого экономия vs местный ресейл: 40-70%.",
  },
  {
    q: "Что такое SHEIN Points и как их использовать?",
    a: "SHEIN Points — внутренняя программа лояльности. 100 points = $1 скидка. Начисляются за: покупки (1 point за $1), отзывы с фото (+3-5 points), ежедневный вход в приложение (+1 point), участие в акциях. Накапливаются и применяются при следующем заказе. Реально экономят 5-10% от суммы при активном использовании.",
  },
]

const tips = [
  {
    icon: Percent,
    title: "Flash Sales каждый день",
    text: "Открывай SHEIN в 10:00 и 22:00 — именно тогда начинаются дневные и ночные флеш-распродажи. Скидки 60-90% на ограниченное количество позиций.",
    color: "bg-red-50 border-red-200 text-red-700",
    iconBg: "bg-red-100",
  },
  {
    icon: Tag,
    title: "Промокоды каждый заказ",
    text: "Перед оплатой всегда ищи промокод. Сайты: honey.com (расширение), retailmenot.com, dealspotr.com. Новые пользователи получают 15-20% на первый заказ автоматически.",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    iconBg: "bg-orange-100",
  },
  {
    icon: Ruler,
    title: "Читай отзывы с фото",
    text: "Фильтр «With Photos» в отзывах — главный инструмент. Покупатели показывают реальный вид вещи на себе, пишут о качестве ткани и соответствии размера. 5 минут на отзывы = правильный выбор.",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    icon: Zap,
    title: "Добавляй в вишлист заранее",
    text: "Добавь понравившиеся вещи в вишлист за 2-3 недели до покупки. Цены на SHEIN снижаются — товар из вишлиста часто попадает в акцию. Получишь уведомление со скидкой.",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconBg: "bg-purple-100",
  },
]

const sizeChart = [
  { shein: "XS", ru: "40-42", us: "0-2", bust: "80-84", waist: "60-64", hips: "86-90" },
  { shein: "S", ru: "42-44", us: "4-6", bust: "84-88", waist: "64-68", hips: "90-94" },
  { shein: "M", ru: "44-46", us: "8-10", bust: "88-93", waist: "68-73", hips: "94-99" },
  { shein: "L", ru: "46-48", us: "12-14", bust: "93-98", waist: "73-78", hips: "99-104" },
  { shein: "XL", ru: "48-50", us: "16-18", bust: "98-104", waist: "78-84", hips: "104-110" },
  { shein: "XXL", ru: "50-52", us: "20-22", bust: "104-110", waist: "84-90", hips: "110-116" },
]

export default function SheinGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://owaycargo.com" },
          { name: "Гайды", url: "https://owaycargo.com/guides" },
          { name: "SHEIN", url: "https://owaycargo.com/guides/shein" },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-slate-50">

        {/* Hero */}
        <section className="bg-gradient-to-br from-pink-500 to-rose-600 text-white py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Link href="/guides" className="text-pink-200 text-sm hover:text-white transition-colors">
                ← Все гайды
              </Link>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">👗</span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1 block">Шопинг-гайд</span>
                <h1 className="text-3xl md:text-5xl font-bold">SHEIN из США в СНГ</h1>
              </div>
            </div>
            <p className="text-lg text-pink-100 max-w-2xl">
              Одежда по $3-15, скидки до 90%, бесплатная доставка на склад. Как покупать правильно — без ошибок с размерами и с максимальной экономией.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {["Скидки до 90%", "Бесплатная доставка от $29", "35 дней на возврат", "35 000+ новинок в день"].map((t) => (
                <span key={t} className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium">{t}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

          {/* Why SHEIN */}
          <section className="bg-white rounded-2xl p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Почему SHEIN через OWAY — выгоднее</h2>
            <p className="text-slate-600 mb-5">
              SHEIN в США работает с американских складов и предлагает цены в долларах без региональной наценки. Платье за <strong>$8-15</strong> в российском ресейле стоит <strong>1 500–3 000 ₽</strong> (~$18-35). Через OWAY вы платите $8-15 + $3-5 доставки = итого дешевле в 2 раза.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Средняя цена топа", shein: "$5–12", resell: "$15–25" },
                { label: "Средняя цена платья", shein: "$8–20", resell: "$25–60" },
                { label: "Средняя цена джинсов", shein: "$15–30", resell: "$40–80" },
              ].map((row) => (
                <div key={row.label} className="bg-slate-50 rounded-xl p-4 text-sm">
                  <p className="text-slate-500 mb-2">{row.label}</p>
                  <p className="text-green-600 font-bold">SHEIN US: {row.shein}</p>
                  <p className="text-red-500">Ресейл: {row.resell}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Size Chart */}
          <section className="bg-white rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Ruler className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl font-bold text-slate-900">Таблица размеров SHEIN → Россия</h2>
            </div>
            <p className="text-slate-600 mb-4 text-sm">
              <strong>Правило №1:</strong> берите на 1 размер больше привычного. Азиатская сетка меньше европейской.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-pink-50">
                    <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">SHEIN</th>
                    <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">RU</th>
                    <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">US</th>
                    <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Грудь (см)</th>
                    <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Талия (см)</th>
                    <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Бёдра (см)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row, i) => (
                    <tr key={row.shein} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="p-3 font-bold text-pink-600 border-b border-slate-100">{row.shein}</td>
                      <td className="p-3 text-slate-700 border-b border-slate-100">{row.ru}</td>
                      <td className="p-3 text-slate-700 border-b border-slate-100">{row.us}</td>
                      <td className="p-3 text-slate-700 border-b border-slate-100">{row.bust}</td>
                      <td className="p-3 text-slate-700 border-b border-slate-100">{row.waist}</td>
                      <td className="p-3 text-slate-700 border-b border-slate-100">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">4 лайфхака для максимальной экономии</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip) => (
                <Card key={tip.title} className={`p-5 border ${tip.color}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${tip.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                      <tip.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{tip.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{tip.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* How to order */}
          <section className="bg-white rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Как заказать SHEIN через OWAY</h2>
            </div>
            <ol className="space-y-5">
              {[
                { step: "1", title: "Зарегистрируйся в OWAY", text: "Получи персональный адрес склада в Делавэре (штат США без налога с продаж). Займёт 1 минуту." },
                { step: "2", title: "Выбери товары на SHEIN", text: "Зайди на shein.com. Используй фильтры «Flash Sale» и «New In». Читай отзывы с фото. Проверь таблицу размеров на каждом товаре." },
                { step: "3", title: "Укажи адрес склада OWAY", text: "При оформлении заказа вставь адрес склада OWAY в поле доставки. В поле apt/suite — твой OWAY ID. Оплати картой." },
                { step: "4", title: "SHEIN доставит на склад", text: "SHEIN доставляет на американские адреса за 5-8 дней. При заказе от $29 — бесплатно. Ты получишь уведомление когда посылка появится на складе." },
                { step: "5", title: "OWAY доставит тебе", text: "В личном кабинете OWAY выбери страну доставки и оплати. Доставка 14-21 день авиа. Трекинг на каждом этапе." },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* What not to buy */}
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
            <h2 className="text-xl font-bold text-amber-900 mb-4">⚠️ Что лучше не заказывать на SHEIN</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Нижнее бельё — размерная сетка непредсказуема",
                "Обувь — материал часто отличается от фото",
                "Электроника и аксессуары — низкое качество",
                "Товары без отзывов с фото — риск несовпадения",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-amber-800 text-sm">
                  <span className="mt-0.5 shrink-0">✗</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* What to buy */}
          <section className="bg-green-50 border border-green-200 rounded-2xl p-7">
            <h2 className="text-xl font-bold text-green-900 mb-4">✅ Что покупать на SHEIN выгодно</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Повседневная одежда — футболки, топы, блузки",
                "Домашняя одежда и пижамы",
                "Купальники и пляжная одежда",
                "Аксессуары: сумки, ремни, головные уборы",
                "Спортивная одежда (леггинсы, спортивные топы)",
                "Декор для дома и мелочи",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-green-800 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping costs */}
          <section className="bg-white rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Truck className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Стоимость доставки через OWAY</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left p-3 font-semibold text-slate-700">Страна</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Тариф</th>
                    <th className="text-left p-3 font-semibold text-slate-700">5 вещей (~1.5 кг)</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Срок</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { country: "Россия", rate: "$18/кг", example: "~$27", days: "14-21 дней" },
                    { country: "Беларусь", rate: "$18/кг", example: "~$27", days: "14-21 дней" },
                    { country: "Казахстан", rate: "$12/кг", example: "~$18", days: "10-18 дней" },
                    { country: "Кыргызстан", rate: "$12/кг", example: "~$18", days: "10-18 дней" },
                    { country: "Узбекистан", rate: "$12/кг", example: "~$18", days: "12-20 дней" },
                  ].map((row) => (
                    <tr key={row.country}>
                      <td className="p-3 font-medium text-slate-900">{row.country}</td>
                      <td className="p-3 text-slate-700">{row.rate}</td>
                      <td className="p-3 text-green-600 font-semibold">{row.example}</td>
                      <td className="p-3 text-slate-500">{row.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Частые вопросы</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-200 rounded-xl px-4">
                  <AccordionTrigger className="text-left text-sm font-semibold text-slate-900 py-4 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 text-center text-white">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-pink-200" />
            <h2 className="text-2xl font-bold mb-2">Готовы заказать с SHEIN?</h2>
            <p className="text-pink-100 mb-6">Рассчитайте стоимость доставки или напишите менеджеру — ответим за 15 минут</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#calculator">
                <Button className="bg-white text-pink-600 hover:bg-pink-50 px-8 font-semibold">
                  Рассчитать стоимость
                </Button>
              </Link>
              <a href="https://t.me/owaycargo" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white/10 px-8">
                  Написать в Telegram
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-pink-100">
              {[
                { icon: CheckCircle2, text: "Без предоплаты" },
                { icon: ArrowRight, text: "Трекинг на каждом этапе" },
                { icon: ShieldCheck, text: "Страховка включена" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4" />
                  {text}
                </span>
              ))}
            </div>
          </section>

          <RelatedGuides currentHref="/guides/shein" />
        </div>
      </main>
      <Footer />
    </>
  )
}
