import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Coins,
  ExternalLink,
  HandCoins,
  Handshake,
  Home,
  MapPin,
  MessageCircle,
  Package,
  Target,
  TrendingUp,
  Users,
  Warehouse,
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

export const metadata: Metadata = {
  title: "Партнёрская программа OWAY CARGO — открыть пункт выдачи",
  description:
    "Станьте партнёром OWAY CARGO в своём городе. Открытие пункта выдачи от 5-10 м², без инвестиций в товар. Стабильный поток клиентов, еженедельные выплаты.",
  keywords: [
    "партнёрская программа OWAY",
    "открыть пункт выдачи OWAY",
    "франшиза доставки",
    "бизнес с OWAY CARGO",
    "пункт выдачи посылок",
  ],
  alternates: { canonical: "/partner" },
  openGraph: {
    title: "Партнёрская программа OWAY CARGO",
    description:
      "Откройте пункт выдачи в своём городе. От 5 м², без инвестиций в товар, стабильный поток клиентов.",
    url: "/partner",
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

const faqItems = [
  {
    q: "Что нужно чтобы стать партнёром OWAY?",
    a: "Минимум: помещение от 5-10 м² в вашем городе, возможность работать 6 дней в неделю (режим обсуждается), 1-2 человека персонала (вы или сотрудник), базовый компьютер с интернетом. НЕ нужно: закупать товар, вкладывать большие инвестиции, иметь опыт в логистике.",
  },
  {
    q: "В каких городах есть возможность открыть пункт?",
    a: "Мы рассматриваем партнёрство во всех 5 странах: Россия, Беларусь, Казахстан, Кыргызстан, Узбекистан. Приоритет — города с населением 100 000+ где нет нашего представительства. После первичной заявки менеджер согласует условия индивидуально.",
  },
  {
    q: "Сколько можно заработать на партнёрстве?",
    a: "Доход зависит от оборота посылок — растёт вместе с количеством клиентов. На старте (первые 1-3 месяца) приходит поток от существующей клиентской базы OWAY. Конкретные цифры обсуждаются индивидуально на интервью — слишком много факторов (город, проходимость, ваша активность в маркетинге).",
  },
  {
    q: "Какие инвестиции нужны на старте?",
    a: "Минимальные: аренда помещения (5-10 м², обычно $200-800/мес в зависимости от города), мебель и базовое оборудование (стол, стеллажи, сканер штрих-кодов — $500-1500), вывеска OWAY CARGO ($100-300 изготовление + установка). Общий старт: $800-2500. Без закупки товара.",
  },
  {
    q: "Кто поставляет посылки?",
    a: "Мы. OWAY CARGO каждую неделю отправляет из США в ваш город авиадоставку. Вы принимаете посылки, сортируете, выдаёте клиентам. Наша логистическая цепочка работает — вы занимаетесь только локальной работой с клиентами.",
  },
  {
    q: "Как происходит выдача посылок клиентам?",
    a: "Клиент видит в личном кабинете / Telegram-боте что посылка готова. Приходит к вам с документом, удостоверяющим личность. Вы сверяете код посылки в системе, отдаёте. Всё. Плюс оплата дополнительных услуг если нужно (доставка до двери).",
  },
  {
    q: "Нужна ли регистрация ИП или юр.лица?",
    a: "Да, для легальной работы нужна регистрация предпринимателя в вашей стране. Мы помогаем сориентироваться по процессу. В некоторых странах можно начать как физлицо с последующей регистрацией.",
  },
  {
    q: "Как быстро начну зарабатывать?",
    a: "Первый поток посылок — сразу после запуска, из существующей клиентской базы OWAY в вашем городе. Полная окупаемость обычно 6-12 месяцев (зависит от города и активности). Мы помогаем с локальным маркетингом.",
  },
  {
    q: "Что если я в маленьком городе?",
    a: "Это не обязательно проблема. В малых городах конкуренция ниже и вы сразу становитесь «единственным». Главное — чтобы город был достаточно крупным для окупаемости (обычно от 100 тыс. населения).",
  },
  {
    q: "Нужно ли платить OWAY за партнёрство?",
    a: "Нет роялти, нет паушальных взносов. Нам интересен объём посылок, не плата за вход. Вы зарабатываете % от каждой обработанной посылки + бонусы за рост клиентской базы.",
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

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Партнёрская программа", url: "/partner" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-5">
            <Handshake className="w-4 h-4" />
            <span>Партнёрская программа</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Открой{" "}
            <span className="text-blue-600">пункт выдачи OWAY</span>{" "}
            в своём городе
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            От 5 м². Без инвестиций в товар. Стабильный поток клиентов из нашей клиентской
            базы. Еженедельные отправления посылок из США.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href="https://t.me/owaymanagersng"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 gap-2">
                <MessageCircle className="w-5 h-5" />
                Связаться с менеджером
              </Button>
            </a>
            <Link href="#form">
              <Button variant="outline" className="h-12 rounded-xl px-8">
                Оставить заявку
              </Button>
            </Link>
          </div>
        </div>

        {/* Key numbers */}
        <section className="max-w-5xl mx-auto mb-14">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Warehouse, value: "5–10 м²", label: "достаточно для старта" },
              { icon: Users, value: "Готовая", label: "клиентская база" },
              { icon: Package, value: "Еженедельные", label: "поставки из США" },
              { icon: Coins, value: "0", label: "паушальных взносов" },
            ].map((stat) => (
              <Card key={stat.label} className="p-5 bg-white border-slate-200 text-center">
                <stat.icon className="w-7 h-7 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Почему становятся партнёрами OWAY
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Users,
                title: "Готовая клиентская база",
                desc: "У OWAY уже есть тысячи клиентов в 5 странах. Вы получаете поток сразу после открытия — не нужно с нуля искать клиентов.",
              },
              {
                icon: Package,
                title: "Без инвестиций в товар",
                desc: "Не нужно закупать товары или складские запасы. Посылки приходят от OWAY, вы только обрабатываете и выдаёте.",
              },
              {
                icon: Warehouse,
                title: "Минимальное помещение",
                desc: "5-10 м² достаточно. Не нужен огромный склад. Подходит даже часть офиса или магазина.",
              },
              {
                icon: TrendingUp,
                title: "Рост с каждым месяцем",
                desc: "Количество посылок растёт вместе с известностью OWAY в вашем городе. Мы активно маркетим в соцсетях.",
              },
              {
                icon: HandCoins,
                title: "Еженедельные выплаты",
                desc: "Расчёт раз в неделю — прозрачно и стабильно. Никаких месячных задержек.",
              },
              {
                icon: Target,
                title: "Маркетинговая поддержка",
                desc: "Локальная реклама, таргет в соцсетях, SEO-трафик в вашем городе. Мы помогаем, не оставляем в одиночестве.",
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

        {/* How it works */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Как устроено партнёрство
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Вы находите помещение",
                desc: "5-10 м² в вашем городе с адекватной проходимостью. Можно в офисе, торговом центре, отдельно стоящем здании.",
              },
              {
                title: "Мы согласуем условия",
                desc: "Обсуждаем локальную специфику: режим работы, тарифы на доп. услуги, ожидаемый оборот. Подписываем договор.",
              },
              {
                title: "Регистрация и подготовка",
                desc: "Регистрируете ИП/ООО в своей стране. Оформляете помещение, делаете вывеску OWAY (мы предоставляем макет).",
              },
              {
                title: "Подключение к системе",
                desc: "Получаете доступ к CRM OWAY — видите все посылки идущие в ваш город, статусы, клиентов.",
              },
              {
                title: "Первые посылки",
                desc: "Наша логистика начинает отправлять посылки в ваш город. Вы принимаете, сортируете, выдаёте клиентам.",
              },
              {
                title: "Маркетинг и масштаб",
                desc: "OWAY делает локальную рекламу в вашем городе. Количество клиентов растёт. Вы зарабатываете больше с каждым месяцем.",
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

        {/* Who fits */}
        <section className="max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Кому подходит партнёрство
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">✅ Подходит если вы:</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Владеете или арендуете помещение от 5 м² в своём городе</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Готовы работать 6 дней в неделю (режим обсуждается)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Хотите свой бизнес без больших инвестиций</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Умеете работать с клиентами и компьютером</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Живёте в городе 100 000+ населения</span>
                </li>
              </ul>
            </Card>
            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">❌ Возможно не подойдёт:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>Если ищете пассивный доход без работы</li>
                <li>Если хотите «быстро разбогатеть за месяц»</li>
                <li>Если готовы работать только удалённо</li>
                <li>Если нет легальной возможности зарегистрировать ИП</li>
                <li>Если город с населением менее 50 тыс. (низкий потенциал)</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Form/CTA */}
        <section id="form" className="max-w-3xl mx-auto mb-14 scroll-mt-20">
          <Card className="p-8 md:p-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
            <div className="text-center mb-6">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-white" />
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Готовы стать партнёром?</h2>
              <p className="text-blue-100">
                Напишите нам в Telegram с информацией о вашем городе — менеджер свяжется в
                течение 15 минут.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6">
              <div className="text-sm text-blue-50 mb-2 font-semibold">
                Что написать менеджеру:
              </div>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-blue-100">
                <li>Имя и контакт для связи</li>
                <li>Город / страна где хотите открыть пункт</li>
                <li>Есть ли уже помещение (или ищете)</li>
                <li>Какой опыт в бизнесе / работе с клиентами</li>
              </ol>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://t.me/owaymanagersng"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="h-12 bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-8 gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Telegram СНГ
                </Button>
              </a>
              <a
                href="https://t.me/owaymanagerusa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-12 bg-transparent text-white border-white hover:bg-white/10 rounded-xl px-8 gap-2 w-full"
                >
                  <MessageCircle className="w-5 h-5" />
                  Telegram США
                </Button>
              </a>
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Частые вопросы про партнёрство
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
