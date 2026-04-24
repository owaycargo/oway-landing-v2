import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ExternalLink,
  ShoppingCart,
  Truck,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { RelatedGuides } from "@/app/guides/_components/related-guides"

export const metadata: Metadata = {
  title: "Как покупать на Walmart из США в СНГ — гайд 2026",
  description:
    "Гайд по покупкам на Walmart.com с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь через OWAY CARGO. Что выгодно, как заказать, Walmart+.",
  keywords: [
    "как покупать на Walmart",
    "Walmart из России",
    "Walmart в Казахстан",
    "Walmart+",
    "OWAY Walmart",
  ],
  alternates: { canonical: "/guides/walmart" },
  openGraph: {
    title: "Как покупать на Walmart из США в СНГ",
    description: "Дешевле чем Amazon на ряд категорий. Гайд через OWAY CARGO.",
    url: "/guides/walmart",
    type: "article",
  },
  robots: { index: true, follow: true },
}

const faqItems = [
  {
    q: "Чем Walmart отличается от Amazon?",
    a: "Walmart — физическая сеть супермаркетов, которая также торгует онлайн. Часто дешевле Amazon на бытовые товары (подгузники, моющие средства), детское питание, витамины. Но ассортимент электроники меньше, и много товаров доступно только для самовывоза в магазинах США (не отправляют на адреса).",
  },
  {
    q: "Что такое Walmart+ и нужна ли она?",
    a: "Walmart+ — аналог Amazon Prime. $12.95/мес или $98/год. Даёт: бесплатную доставку без минимальной суммы, экономию на бензине, стриминг Paramount+. Для заказов в OWAY важно только бесплатная доставка на наш склад. Если делаете 3+ заказов/мес — окупается.",
  },
  {
    q: "Товары Walmart которые нельзя отправить на наш склад",
    a: "Пометка «Pickup only» или «Store exclusive» — товар доступен только для самовывоза в магазине Walmart. Отправлять не будут. Смотрите на кнопке: должно быть «Ship to» а не «Pickup». Это ограничение часто для крупногабарита и алкоголя.",
  },
  {
    q: "Что выгодно покупать на Walmart vs Amazon?",
    a: "Walmart часто дешевле на: 1) Детские товары (памперсы Pampers, детское питание Similac). 2) Бытовая химия (Tide, Downy). 3) Вода и напитки (для самовывоза — нам не подходит). 4) Витамины собственной марки Equate. Amazon часто дешевле на электронику, книги, Amazon Basics.",
  },
  {
    q: "Работает ли защита покупателя на Walmart?",
    a: "Да — Walmart.com Returns policy похожа на Amazon A-to-z. Большинство товаров — 30-90 дней возврат. Для электроники — 30 дней. Процесс: открываете claim в личном кабинете, получаете return label (работает только в США). Для международных возвратов через OWAY — за ваш счёт.",
  },
  {
    q: "Какие категории Walmart не стоит заказывать через OWAY?",
    a: "1) Тяжёлые товары для дома (матрасы, мебель, крупные бытовые приборы) — невыгодно по весу. 2) Еда в заморозке/охлаждении — не доедет. 3) Алкоголь и табак — запрещены через OWAY. 4) Оружие и всё связанное с охотой (в Walmart есть такой отдел) — тоже запрещено.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

export default function WalmartGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Гайды по магазинам", url: "/guides/walmart" },
          { name: "Walmart", url: "/guides/walmart" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-5">
            <span className="text-xl font-black" style={{ color: "#0071CE" }}>
              Walmart
            </span>
            <span>Гайд 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Как покупать на Walmart{" "}
            <span className="text-blue-600">из США в СНГ</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Walmart часто дешевле Amazon на бытовые товары, детское питание, витамины.
            Как правильно выбирать «Ship to» товары и заказывать через OWAY.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href="https://www.walmart.com"
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 gap-2">
                <ExternalLink className="w-5 h-5" />
                Открыть Walmart.com
              </Button>
            </a>
            <Link href="/#calculator">
              <Button variant="outline" className="h-12 rounded-xl px-8 gap-2">
                <Calculator className="w-5 h-5" />
                Калькулятор
              </Button>
            </Link>
          </div>
        </div>

        {/* Why Walmart */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Когда Walmart выгоднее Amazon
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: ShoppingCart,
                title: "Детские товары",
                desc: "Подгузники Pampers, смесь Similac, детская одежда — часто на 10-20% дешевле Amazon. Equate-бренд витаминов — дешевле всех.",
              },
              {
                icon: Truck,
                title: "Walmart+ доставка",
                desc: "Walmart+ даёт free shipping без минимальной суммы. Удобно для мелких заказов — в Amazon без Prime нужно от $35.",
              },
              {
                icon: CheckCircle2,
                title: "Бытовая химия",
                desc: "Крупные упаковки Tide, Downy, Lysol — в разы дешевле локальных аналогов в СНГ. Запас на год за месячный бюджет.",
              },
              {
                icon: ShoppingCart,
                title: "Витамины Equate",
                desc: "Собственная марка Walmart. Качество сопоставимое с NOW Foods, но цены на 30-50% ниже.",
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

        {/* Important: Ship to vs Pickup only */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-orange-50 border-orange-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              ⚠️ Важно: «Ship to» vs «Pickup only»
            </h2>
            <p className="text-slate-700 mb-4">
              У Walmart есть товары которые можно отправить на адрес США (наш склад) и
              товары только для самовывоза в магазине. Перед покупкой ВСЕГДА проверяйте:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>«Ship to [Делавэр]»</strong> — можно заказать через OWAY</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 text-xl leading-none">×</span>
                <span>
                  <strong>«Pickup at store»</strong> или «Store-only» — нельзя отправить.
                  Обычно это: алкоголь, табак, крупногабарит, определённые товары для дома
                </span>
              </li>
            </ul>
            <p className="text-sm text-slate-600 mt-4 italic">
              💡 Если видите только «Pickup» — попробуйте искать аналогичный товар у
              другого продавца на Walmart или на Amazon.
            </p>
          </Card>
        </section>

        {/* Top categories */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Что покупать на Walmart через OWAY
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "👶 Детское",
                items: [
                  "Подгузники Pampers, Huggies (крупные упаковки)",
                  "Формула Similac Pro-Advance, Enfamil",
                  "Carter's одежда (Walmart часто дешевле Carter's.com)",
                  "Детская посуда, бутылочки, игрушки",
                ],
              },
              {
                title: "🧴 Красота и уход",
                items: [
                  "Шампуни Pantene, Head & Shoulders",
                  "Cerave, CeraVe (дерматологическая косметика)",
                  "Olay уход за лицом",
                  "Maybelline, L'Oreal декоративка",
                ],
              },
              {
                title: "💊 Витамины (Equate и др.)",
                items: [
                  "Equate витамины — дешевле всех",
                  "Витаминные воды, протеиновые батончики",
                  "Nature's Bounty, Spring Valley",
                ],
              },
              {
                title: "🏠 Дом",
                items: [
                  "Tide, Downy в гигантских упаковках",
                  "Текстиль (полотенца, простыни)",
                  "Посуда, кухонные принадлежности",
                  "Электрочайники, тостеры (небольшие)",
                ],
              },
            ].map((cat) => (
              <Card key={cat.title} className="p-6 bg-white border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">{cat.title}</h3>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы про Walmart
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
        </section>

        {/* Related */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
            Смотрите также
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/guides/amazon">
              <Card className="p-5 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Гайд по Amazon</h3>
                <p className="text-xs text-slate-500">Prime, Basics, защита A-to-z</p>
              </Card>
            </Link>
            <Link href="/guides/ebay">
              <Card className="p-5 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Гайд по eBay</h3>
                <p className="text-xs text-slate-500">Аукционы, sniping, защита</p>
              </Card>
            </Link>
            <Link href="/marketplace/walmart">
              <Card className="p-5 bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  Walmart в каталоге
                </h3>
                <p className="text-xs text-slate-500">Базовая карточка</p>
              </Card>
            </Link>
          </div>
        </section>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 text-center">
            <h2 className="text-2xl font-bold mb-3">Готовы к покупкам на Walmart?</h2>
            <p className="mb-6 text-blue-100">
              Regular мелкий заказ = 1-3 кг. Доставка OWAY $12-54 + пошлина обычно не
              превышает беспошлинный лимит.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.walmart.com"
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                <Button className="h-12 bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-8 gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Walmart.com
                </Button>
              </a>
              <Link href="/#lead">
                <Button
                  variant="outline"
                  className="h-12 bg-transparent text-white border-white hover:bg-white/10 rounded-xl px-8 gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  Оставить заявку
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        <RelatedGuides currentHref="/guides/walmart" />
      </main>

      <Footer />
    </div>
  )
}
