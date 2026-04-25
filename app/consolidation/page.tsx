import type { Metadata } from "next"
import Link from "next/link"
import { Boxes, Calculator, CheckCircle2, ArrowRight, TrendingDown } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Консолидация посылок из США — бесплатно | OWAY CARGO",
  description:
    "Бесплатная консолидация посылок из США: объединяем несколько заказов в одну коробку, убираем лишнюю упаковку. Экономия 20–40% на стоимости доставки. Хранение на складе 30 дней бесплатно.",
  keywords: [
    "консолидация посылок из США",
    "объединить посылки из США",
    "сэкономить на доставке из США",
    "repack посылок",
    "склад в США для покупок",
    "OWAY CARGO консолидация",
  ],
  alternates: { canonical: "/consolidation" },
  openGraph: {
    title: "Консолидация посылок из США — бесплатно",
    description: "Объединяем несколько заказов в одну коробку. Экономия 20–40% на доставке. Бесплатно.",
    url: "/consolidation",
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

const STEPS = [
  { n: "01", title: "Делайте покупки в разных магазинах", desc: "Заказывайте товары из Amazon, Nike, iHerb, Target — каждый со своей доставкой. Все посылки приходят на ваш адрес на складе OWAY." },
  { n: "02", title: "Все посылки собираются на складе", desc: "Мы получаем каждую посылку, взвешиваем, фотографируем и регистрируем в вашем кабинете. Хранение до 30 дней — бесплатно." },
  { n: "03", title: "Запрашиваете консолидацию", desc: "В личном кабинете или в боте @Oway1_bot выбираете посылки для объединения и нажимаете «Консолидировать»." },
  { n: "04", title: "Мы перепаковываем", desc: "Укладываем все товары в одну коробку, убираем лишний картон и воздушные подушки. Объёмный вес падает на 20–40%." },
  { n: "05", title: "Отправляете одной посылкой", desc: "Одна отправка вместо 4–5 отдельных. Платите один раз и меньше." },
]

const EXAMPLES = [
  {
    title: "Без консолидации",
    items: [
      { name: "Nike Air Force 1 (коробка)", weight: "1.5 кг" },
      { name: "iHerb × 4 банки", weight: "2 кг" },
      { name: "Amazon — одежда × 3", weight: "1 кг" },
    ],
    total: "4.5 кг × 3 отправки = платите за ~13.5 кг объёмного веса",
    cost: "≈ $162–243",
    highlight: false,
  },
  {
    title: "С консолидацией ✓",
    items: [
      { name: "Nike + iHerb + одежда", weight: "в одной коробке" },
      { name: "Убрана лишняя упаковка", weight: "−30% объёма" },
      { name: "Итоговый вес", weight: "3.5 кг" },
    ],
    total: "3.5 кг × 1 отправка",
    cost: "≈ $42–63",
    highlight: true,
  },
]

const FAQ_ITEMS = [
  {
    q: "Сколько стоит консолидация?",
    a: "Бесплатно. Это стандартная услуга OWAY CARGO — без доплат, без скрытых сборов. У большинства конкурентов консолидация стоит $3–8 за посылку.",
  },
  {
    q: "Сколько посылок можно объединить?",
    a: "Любое количество. Нет ни минимума, ни максимума. Мы регулярно объединяем 10–15 посылок от клиентов, которые делают крупные закупки.",
  },
  {
    q: "Что такое repack и чем отличается от консолидации?",
    a: "Консолидация — объединение нескольких отдельных посылок в одну. Repack (перепаковка) — это удаление лишней упаковки из одной посылки (например, достать iPhone из большой подарочной коробки, сэкономив на объёмном весе). Оба сервиса бесплатны.",
  },
  {
    q: "Повреждаются ли товары при перепаковке?",
    a: "Нет. Мы используем профессиональную защитную упаковку: пупырчатая плёнка, поролон для хрупких предметов, воздушные подушки для электроники. Все операции фиксируются на фото.",
  },
  {
    q: "Как долго можно хранить посылки перед консолидацией?",
    a: "30 дней бесплатно. Этого достаточно, чтобы дособрать все заказы. После 30 дней — $0.5 в сутки за каждую коробку. Предупреждаем за 3 дня.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Консолидация посылок из США",
  serviceType: "Консолидация и перепаковка посылок",
  description: "Бесплатное объединение нескольких заказов из американских магазинов в одну отправку для экономии на доставке",
  provider: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Консолидация посылок — бесплатно",
  },
}

export default function ConsolidationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://owaycargo.com" },
          { name: "Консолидация посылок", url: "https://owaycargo.com/consolidation" },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Boxes className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Консолидация посылок из США
            </h1>
            <p className="text-xl font-semibold text-white mb-2">Бесплатно</p>
            <p className="text-lg text-blue-100 max-w-xl mx-auto mb-8">
              Объединяем несколько заказов в одну коробку — вы экономите 20–40% на стоимости доставки
            </p>
            <Link href="/#lead">
              <Button className="h-12 bg-white text-blue-700 hover:bg-blue-50 px-10 text-base font-semibold">
                Начать заказывать →
              </Button>
            </Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* Key facts */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "Бесплатно", label: "консолидация и repack" },
              { value: "20–40%", label: "экономия на весе" },
              { value: "30 дней", label: "хранение бесплатно" },
            ].map((s) => (
              <Card key={s.label} className="p-5 bg-white border-slate-200 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{s.value}</div>
                <div className="text-xs text-slate-600">{s.label}</div>
              </Card>
            ))}
          </div>

          {/* Example comparison */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              Пример: экономия на реальном заказе
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {EXAMPLES.map((ex) => (
                <div key={ex.title} className={`rounded-xl border-2 p-5 ${ex.highlight ? "border-green-400 bg-green-50" : "border-slate-200 bg-slate-50"}`}>
                  <div className={`font-bold text-lg mb-3 ${ex.highlight ? "text-green-800" : "text-slate-700"}`}>{ex.title}</div>
                  <div className="space-y-2 mb-4">
                    {ex.items.map((item) => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span className="text-slate-700">{item.name}</span>
                        <span className="text-slate-500">{item.weight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-current border-opacity-20 pt-3">
                    <div className="text-xs text-slate-600 mb-1">{ex.total}</div>
                    <div className={`text-2xl font-bold ${ex.highlight ? "text-green-700" : "text-slate-700"}`}>{ex.cost}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* How it works */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Как работает консолидация</h2>
            <div className="space-y-5">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold text-sm">
                    {s.n}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{s.title}</div>
                    <div className="text-sm text-slate-600 mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* What's included */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Все включено — ничего не нужно доплачивать</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Приём каждой посылки на склад",
                "Фото содержимого по запросу",
                "Хранение до 30 дней",
                "Объединение в одну коробку",
                "Удаление лишней упаковки (repack)",
                "Профессиональная упаковка товаров",
                "Взвешивание до и после",
                "Отправка в ближайший рейс",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          {/* FAQ */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Частые вопросы</h2>
            <div className="space-y-5">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <div className="font-semibold text-slate-900 mb-1">{item.q}</div>
                  <div className="text-sm text-slate-600">{item.a}</div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Link href="/faq" className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                Все вопросы в FAQ <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>

          {/* Related pages */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: "/calculator", title: "Калькулятор доставки", desc: "Рассчитайте стоимость с учётом консолидации" },
              { href: "/purchase",   title: "Выкуп товаров",        desc: "Карта не принимается — купим за вас" },
              { href: "/tracking",   title: "Отслеживание",         desc: "Статус посылки в реальном времени" },
            ].map((p) => (
              <Link key={p.href} href={p.href}>
                <Card className="p-5 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all h-full">
                  <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1">
                    {p.title} <ArrowRight className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="text-sm text-slate-500">{p.desc}</div>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center pb-4">
            <p className="text-slate-600 mb-4">Зарегистрируйтесь и получите адрес склада в США за 1 минуту</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#lead">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-12 gap-2">
                  <Calculator className="w-4 h-4" />
                  Начать доставку из США
                </Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline" className="h-12 px-10">
                  Рассчитать стоимость
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
