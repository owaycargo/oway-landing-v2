import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ExternalLink,
  Heart,
  Leaf,
  Pill,
  TrendingDown,
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
  title: "Как покупать на iHerb из США в СНГ — гайд 2026",
  description:
    "Гайд по покупкам на iHerb.com с доставкой через OWAY CARGO. Промокоды новым клиентам, Rewards, что выгоднее брать на iHerb vs Vitacost vs Amazon.",
  keywords: [
    "как покупать на iHerb",
    "iHerb из России",
    "iHerb в Казахстан",
    "iHerb Rewards",
    "OWAY iHerb",
  ],
  alternates: { canonical: "/guides/iherb" },
  openGraph: {
    title: "Как покупать на iHerb из США в СНГ",
    description: "БАДы, витамины, натуральная косметика со скидкой через OWAY.",
    url: "/guides/iherb",
    type: "article",
  },
  robots: { index: true, follow: true },
}

const faqItems = [
  {
    q: "Почему iHerb популярнее Vitacost и Amazon для БАДов?",
    a: "iHerb имеет самый широкий ассортимент натуральных и Asian-брендов: Doctor's Best, California Gold Nutrition, Madre Labs. Удобный интерфейс, отзывы на каждый продукт, детальные описания. Но для американских брендов (NOW Foods, Jarrow) часто дешевле на Vitacost.",
  },
  {
    q: "Как получить скидку 20% новым клиентам iHerb?",
    a: "Промокод для новых клиентов меняется регулярно, но обычно 20% на первый заказ. Ищите в Google «iHerb new customer code» + текущий месяц. Максимальная скидка обычно $10 от заказа. Обратите внимание: промо действует один раз на аккаунт.",
  },
  {
    q: "Работает ли iHerb Rewards программа лояльности?",
    a: "Да. iHerb Rewards возвращает 5% от каждой покупки баллами. Баллы копятся и применяются к следующим заказам. Плюс 10% скидка на следующий заказ после каждой публикации честного отзыва на купленный товар.",
  },
  {
    q: "Какие бренды на iHerb самые надёжные?",
    a: "Топ-10 проверенных: 1) NOW Foods — классика, широкий ассортимент. 2) Jarrow Formulas — премиум. 3) Thorne Research — самое премиум. 4) Nature's Way — веганские формы. 5) Doctor's Best — хорошее соотношение цена/качество. 6) Life Extension — anti-aging. 7) Sports Research. 8) Solgar. 9) Source Naturals. 10) Pure Encapsulations — идеальная чистота.",
  },
  {
    q: "Можно ли через iHerb заказать в Россию напрямую?",
    a: "iHerb отправляет напрямую в Россию, но есть ограничения: многие товары блокируются российской таможней (особенно травяные БАДы), сроки 30-45 дней. Через OWAY: сразу на склад США, мы отправляем своим авиаканалом за 16-21 день в РФ, 7-9 дней в КЗ/КГ/УЗ, обычно без таможенных проблем.",
  },
  {
    q: "Какие БАДы с iHerb запрещены к ввозу в РФ?",
    a: "Избегайте: 1) Мелатонин >3 мг (в РФ строго регулируется). 2) Адаптогены в концентрированных экстрактах (родиола, женьшень высокой дозировки). 3) CBD-продукты (запрещены в РФ). 4) Травяные сборы с каннабисом/коноплёй. 5) Эфедра, йохимбе. Для КЗ, КГ, УЗ правила немного мягче — проверяйте через менеджера OWAY.",
  },
  {
    q: "iHerb vs Amazon — где лучше брать один и тот же бренд?",
    a: "Зависит от бренда. Amazon часто дешевле на массовые американские (NOW Foods, Jarrow). iHerb дешевле на Asian-бренды и эксклюзивы. Совет: проверяйте цены в обоих перед покупкой. Разница может быть 15-30%.",
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

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Как покупать на iHerb из США в СНГ — витамины и БАДы 2026",
  description:
    "Топ-10 брендов, промокод −20% новым, Rewards 5% и Daily Deals. Почему через OWAY дешевле чем напрямую в Россию.",
  author: { "@type": "Organization", name: "OWAY CARGO", url: "https://owaycargo.com" },
  publisher: {
    "@type": "Organization",
    name: "OWAY CARGO",
    logo: { "@type": "ImageObject", url: "https://owaycargo.com/favicon.svg" },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://owaycargo.com/guides/iherb" },
  inLanguage: "ru",
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как купить на iHerb с доставкой в СНГ через OWAY CARGO",
  description:
    "Пошаговая инструкция по заказу витаминов и БАДов на iHerb.com с доставкой в Россию, Казахстан, Кыргызстан, Узбекистан, Беларусь.",
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
      name: "Регистрация на iHerb",
      text: "Создайте аккаунт на iherb.com. Новым клиентам доступен промокод на 20% скидку на первый заказ.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Выбор товаров",
      text: "Используйте Daily Deals и фильтры по брендам. Проверьте отзывы и сертификаты. Добавьте товары в корзину.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Оформление заказа",
      text: "При оформлении укажите адрес склада OWAY в Делавэре. iHerb доставляет на американские адреса бесплатно от $20.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Отправка в страну через OWAY",
      text: "После поступления посылки на склад OWAY выберите страну назначения, оплатите тариф ($12/кг — КЗ/КГ/УЗ, $18/кг — РФ/BY) и получите заказ.",
    },
  ],
}

export default function IHerbGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Гайды", url: "/guides" },
          { name: "iHerb", url: "/guides/iherb" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-5">
            <Leaf className="w-4 h-4" />
            <span>iHerb гайд 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Как покупать на iHerb{" "}
            <span className="text-green-600">из США в СНГ</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            БАДы, витамины, натуральная косметика. Промокоды новым клиентам,
            Rewards программа. Надёжнее чем напрямую в РФ — через склад OWAY в Делавэре.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href="https://www.iherb.com"
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              <Button className="h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 gap-2">
                <ExternalLink className="w-5 h-5" />
                Открыть iHerb.com
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

        {/* Why iHerb via OWAY */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему через OWAY, а не напрямую в РФ?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">❌ iHerb напрямую в РФ</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Срок: 30-45 дней</li>
                <li>• Таможня часто задерживает/возвращает</li>
                <li>• Не все бренды доставляют напрямую</li>
                <li>• Travel-размеры стали ограниченные</li>
                <li>• Непрозрачная пошлина</li>
              </ul>
            </Card>
            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">✅ iHerb через OWAY</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Срок: 16-21 день в РФ, 7-9 дней в КЗ/КГ/УЗ</li>
                <li>• Таможня проходит через наш профессиональный канал</li>
                <li>• Любые бренды (iHerb → склад Делавэр → ваша страна)</li>
                <li>• Консолидация: 5 заказов = 1 посылка</li>
                <li>• Пошлина согласуется до отправки</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Top brands */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Топ-брендов на iHerb
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "NOW Foods", desc: "Классика, широкий ассортимент, дешевле всех" },
              { name: "Jarrow Formulas", desc: "Премиум, отличный контроль качества" },
              { name: "Thorne Research", desc: "Топ-премиум, используется врачами" },
              { name: "Doctor's Best", desc: "Хорошее соотношение цена/качество" },
              { name: "California Gold Nutrition", desc: "Собственный бренд iHerb" },
              { name: "Nature's Way", desc: "Веганские формы витаминов" },
              { name: "Life Extension", desc: "Anti-aging и долголетие" },
              { name: "Sports Research", desc: "Коллаген, omega-3, MCT oil" },
              { name: "Solgar", desc: "Полный цикл (B-complex, multi и др.)" },
            ].map((brand) => (
              <Card key={brand.name} className="p-5 bg-white border-slate-200">
                <Pill className="w-5 h-5 text-green-600 mb-2" />
                <h3 className="font-bold text-slate-900 mb-1">{brand.name}</h3>
                <p className="text-xs text-slate-600">{brand.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Life hacks */}
        <section className="max-w-4xl mx-auto mb-14">
          <Card className="p-6 md:p-8 bg-green-50 border-green-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              💡 Лайфхаки экономии на iHerb
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-2">
                <TrendingDown className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Промокод новому клиенту</strong>: 20% скидка на первый заказ
                  ($10 max). Ищите в Google «iHerb new customer code».
                </span>
              </li>
              <li className="flex gap-2">
                <Heart className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>iHerb Rewards</strong>: 5% от покупок возвращается баллами.
                  Копятся и применяются к следующим заказам.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>10% за отзыв</strong>: после публикации честного отзыва на
                  купленный товар — 10% скидка на следующий заказ.
                </span>
              </li>
              <li className="flex gap-2">
                <TrendingDown className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Trial Size</strong>: маленькие упаковки по $2-5, чтобы
                  попробовать новый бренд. Отлично если не уверены в продукте.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Daily Deals</strong>: каждый день 1-2 товара со скидкой 50%+.
                  Подпишитесь на email-рассылку.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Сравнивайте с Vitacost</strong>: на американские бренды (NOW,
                  Jarrow) часто дешевле. Для Asian-брендов — остаётся iHerb.
                </span>
              </li>
            </ul>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы про iHerb
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
            <Link href="/category/supplements">
              <Card className="p-5 bg-white border-slate-200 hover:border-green-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  БАДы и витамины — категория
                </h3>
                <p className="text-xs text-slate-500">Все магазины и выгодные товары</p>
              </Card>
            </Link>
            <Link href="/marketplace/vitacost">
              <Card className="p-5 bg-white border-slate-200 hover:border-green-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  Vitacost — альтернатива iHerb
                </h3>
                <p className="text-xs text-slate-500">Часто дешевле на NOW, Jarrow</p>
              </Card>
            </Link>
            <Link href="/guides/amazon">
              <Card className="p-5 bg-white border-slate-200 hover:border-green-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  Amazon для БАДов
                </h3>
                <p className="text-xs text-slate-500">Subscribe & Save, Prime</p>
              </Card>
            </Link>
          </div>
        </section>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-green-600 to-green-700 text-white border-0 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Готовы закупиться витаминами?
            </h2>
            <p className="mb-6 text-green-100">
              Типичный заказ iHerb — 2-3 кг. Через OWAY $24-36 доставка + обычно без
              пошлины (в беспошлинный лимит).
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.iherb.com"
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                <Button className="h-12 bg-white text-green-700 hover:bg-green-50 rounded-xl px-8 gap-2">
                  <ExternalLink className="w-5 h-5" />
                  iHerb.com
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
        <RelatedGuides currentHref="/guides/iherb" />
      </main>

      <Footer />
    </div>
  )
}
