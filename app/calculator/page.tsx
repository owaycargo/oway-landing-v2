import type { Metadata } from "next"
import Link from "next/link"
import { Calculator, CheckCircle2, Info, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { COUNTRY_LANDINGS } from "@/lib/countries"

export const metadata: Metadata = {
  title: "Калькулятор доставки из США — OWAY CARGO",
  description:
    "Рассчитайте стоимость доставки из США онлайн. Тарифы: $12/кг в Казахстан, Кыргызстан, Узбекистан; $18/кг в Россию и Беларусь. Объёмный вес, консолидация, без скрытых платежей.",
  keywords: [
    "калькулятор доставки из США",
    "рассчитать доставку из Америки",
    "стоимость доставки США Россия",
    "стоимость доставки США Казахстан",
    "тариф карго США СНГ",
    "объёмный вес калькулятор",
    "OWAY CARGO калькулятор",
  ],
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Калькулятор доставки из США — OWAY CARGO",
    description: "Рассчитайте стоимость доставки из США за 30 секунд. Тариф от $12/кг.",
    url: "/calculator",
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

const WEIGHT_EXAMPLES = [
  { label: "Одежда, 1 кг", ru: "$18", other: "$12", items: "Футболка, кепка, носки" },
  { label: "Кроссовки, 2 кг", ru: "$36", other: "$24", items: "Nike / Adidas в коробке" },
  { label: "iPhone 15, 0.5 кг", ru: "$9", other: "$6", items: "Объёмный вес ≈ реальному" },
  { label: "Ноутбук MacBook, 3 кг", ru: "$54", other: "$36", items: "С коробкой и зарядкой" },
  { label: "Витамины iHerb, 2 кг", ru: "$36", other: "$24", items: "4-5 упаковок БАДов" },
  { label: "Парфюм (2 флакона), 1 кг", ru: "$18", other: "$12", items: "В защитной упаковке" },
]

const HOW_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как рассчитать стоимость доставки из США через OWAY CARGO",
  description: "Пошаговая инструкция по расчёту стоимости доставки посылки из США",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Узнайте вес посылки",
      text: "Запросите у магазина вес и размеры коробки. Если размеры крупные — нужно считать объёмный вес.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Проверьте объёмный вес",
      text: "Формула: Длина × Ширина × Высота (в см) ÷ 5000. Сравните с реальным весом — берётся большее.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Выберите страну доставки",
      text: "Казахстан, Кыргызстан, Узбекистан — $12/кг (7–9 дней). Россия, Беларусь — $18/кг (16–21 день).",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Умножьте вес на тариф",
      text: "Итоговая стоимость = итоговый вес × тариф страны. Минимального веса нет.",
    },
  ],
}

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOW_SCHEMA) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://owaycargo.com" },
          { name: "Калькулятор доставки", url: "https://owaycargo.com/calculator" },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Калькулятор доставки из США
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto mb-8">
              Тариф от $12/кг. Без минимального веса. Без скрытых сборов.
            </p>
            <Link href="/#calculator">
              <Button className="h-12 bg-white text-blue-700 hover:bg-blue-50 px-10 text-base font-semibold">
                Открыть калькулятор →
              </Button>
            </Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* Tariffs */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Тарифы по странам</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {COUNTRY_LANDINGS.map((c) => (
                <Link key={c.slug} href={`/delivery/${c.slug}`} className="block group">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <div className="font-semibold text-slate-900">{c.name}</div>
                        <div className="text-sm text-slate-500">{c.days} дней</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">${c.price}</div>
                      <div className="text-xs text-slate-500">за кг</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* How to calculate */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Как рассчитать стоимость</h2>
            <div className="space-y-5">
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                <div>
                  <div className="font-semibold text-slate-900">Узнайте вес посылки</div>
                  <p className="text-sm text-slate-600 mt-1">Запросите у магазина вес и размеры коробки. Важно: если посылка крупная, применяется объёмный вес.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                <div>
                  <div className="font-semibold text-slate-900">Проверьте объёмный вес</div>
                  <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-sm text-slate-700">
                    Объёмный вес = (Д × Ш × В см) ÷ 5000
                  </div>
                  <p className="text-sm text-slate-600 mt-2">Для оплаты берётся большее из двух: реальный или объёмный вес.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                <div>
                  <div className="font-semibold text-slate-900">Умножьте вес на тариф</div>
                  <p className="text-sm text-slate-600 mt-1">Итог = вес × тариф страны. Например: 2 кг в Казахстан = 2 × $12 = <strong>$24</strong>.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Examples table */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Примеры расчёта</h2>
            <p className="text-sm text-slate-500 mb-6">Россия/Беларусь — $18/кг. Казахстан/Кыргызстан/Узбекистан — $12/кг.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="pb-3 font-semibold text-slate-700">Посылка</th>
                    <th className="pb-3 font-semibold text-slate-700">Что внутри</th>
                    <th className="pb-3 font-semibold text-blue-700">RU/BY</th>
                    <th className="pb-3 font-semibold text-blue-700">KZ/KG/UZ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {WEIGHT_EXAMPLES.map((ex) => (
                    <tr key={ex.label}>
                      <td className="py-3 font-medium text-slate-900">{ex.label}</td>
                      <td className="py-3 text-slate-500">{ex.items}</td>
                      <td className="py-3 font-bold text-slate-900">{ex.ru}</td>
                      <td className="py-3 font-bold text-slate-900">{ex.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* What's included */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Что включено в тариф</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Приём посылки на склад в США",
                "Взвешивание и фотографирование",
                "Хранение до 30 дней бесплатно",
                "Бесплатный repack (уменьшение объёма)",
                "Бесплатная консолидация посылок",
                "Таможенное оформление (кроме электроники)",
                "Telegram-уведомления на каждом этапе",
                "Базовая страховка до $500",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex gap-2 text-sm text-orange-800">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Для электроники (смартфоны, ноутбуки, планшеты, смарт-часы) пошлина рассчитывается отдельно — OWAY согласует сумму с вами до отправки.</span>
            </div>
          </Card>

          {/* FAQ */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Часто задаваемые вопросы</h2>
            <div className="space-y-5">
              {[
                {
                  q: "Есть ли минимальный вес?",
                  a: "Нет. Можно отправить посылку любого веса — хоть 100 грамм. Платите только за фактический вес.",
                },
                {
                  q: "Когда применяется объёмный вес?",
                  a: "Если объёмный вес (Д×Ш×В÷5000) больше реального — берётся объёмный. Актуально для крупных лёгких товаров: подушки, игрушки, коробки с обувью.",
                },
                {
                  q: "Сколько стоит консолидация нескольких посылок?",
                  a: "Бесплатно. Мы объединяем несколько ваших посылок в одну коробку и убираем лишнюю упаковку — вы экономите на объёмном весе 20–40%.",
                },
                {
                  q: "Входит ли доставка 'последней мили' (до двери) в тариф?",
                  a: "Нет. Тариф $12/$18 — до пункта выдачи в вашем городе. Доставка до двери оплачивается дополнительно (в среднем $5–15 в зависимости от города).",
                },
              ].map((item, i) => (
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

          {/* CTA */}
          <div className="text-center pb-4">
            <p className="text-slate-600 mb-4 text-lg">Готовы рассчитать точную стоимость?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#calculator">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-12 text-base">
                  <Calculator className="w-5 h-5 mr-2" />
                  Калькулятор на главной
                </Button>
              </Link>
              <Link href="/#lead">
                <Button variant="outline" className="h-12 px-10">
                  Написать менеджеру
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
