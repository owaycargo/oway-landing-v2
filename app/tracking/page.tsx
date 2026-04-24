import type { Metadata } from "next"
import Link from "next/link"
import { Search, Package, MessageCircle, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Отследить посылку из США — OWAY CARGO",
  description:
    "Проверьте статус вашей посылки из США. Отслеживание через Telegram-бот @Oway1_bot или личный кабинет OWAY CARGO. Уведомления на каждом этапе.",
  keywords: [
    "отследить посылку из США",
    "трекинг посылки из Америки",
    "OWAY CARGO отслеживание",
    "статус посылки из США",
    "track parcel USA Russia",
  ],
  alternates: { canonical: "/tracking" },
  openGraph: {
    title: "Отследить посылку из США — OWAY CARGO",
    description: "Статус вашей посылки в реальном времени через Telegram-бот или личный кабинет.",
    url: "/tracking",
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

const TRACKING_STEPS = [
  { icon: "📦", label: "Принято на склад США", desc: "Посылка зарегистрирована, взвешена и сфотографирована" },
  { icon: "✈️", label: "Вылет из США", desc: "Посылка в авиарейсе по направлению к вашей стране" },
  { icon: "🛬", label: "Прилёт в страну назначения", desc: "Посылка прошла таможню и передана местному перевозчику" },
  { icon: "🚚", label: "Передана курьеру / в ПВЗ", desc: "Посылка в пункте выдачи или в пути к вашему адресу" },
  { icon: "✅", label: "Выдано получателю", desc: "Доставка завершена успешно" },
]

export default function TrackingPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Как отследить посылку из США через OWAY CARGO",
    description: "Пошаговая инструкция по отслеживанию посылки из США в СНГ",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Откройте Telegram-бот",
        text: "Напишите /start боту @Oway1_bot в Telegram",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Войдите в аккаунт",
        text: "Введите номер телефона, привязанный к аккаунту OWAY CARGO",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Выберите посылку",
        text: "Нажмите «Мои посылки» — увидите список всех отправлений с текущим статусом",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Получайте уведомления",
        text: "Включите push-уведомления — бот сообщит о каждом изменении статуса автоматически",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://owaycargo.com" },
          { name: "Отслеживание посылки", url: "https://owaycargo.com/tracking" },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Отследить посылку из США</h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto">
              Статус вашего отправления в реальном времени — через Telegram-бот или личный кабинет OWAY CARGO
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* Main tracking options */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 bg-white border-slate-200 flex flex-col">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Telegram-бот</h2>
              <p className="text-slate-600 text-sm mb-6 flex-1">
                Самый быстрый способ. Статусы, фото посылки и push-уведомления о каждом этапе — прямо в Telegram.
              </p>
              <a
                href="https://t.me/Oway1_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Открыть @Oway1_bot
                </Button>
              </a>
            </Card>

            <Card className="p-8 bg-white border-slate-200 flex flex-col">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-slate-700" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Личный кабинет</h2>
              <p className="text-slate-600 text-sm mb-6 flex-1">
                Полная история отправлений, документы, фотографии и трекинг-номера авиарейсов в одном месте.
              </p>
              <a
                href="https://my.owaycargo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Войти в кабинет
                </Button>
              </a>
            </Card>
          </div>

          {/* Status stages */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Этапы доставки</h2>
            <div className="space-y-4">
              {TRACKING_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center flex-shrink-0 text-xl">
                    {step.icon}
                  </div>
                  <div className="pt-1">
                    <div className="font-semibold text-slate-900">{step.label}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* How to track */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Как отследить посылку: пошагово</h2>
            <ol className="space-y-4 text-slate-700">
              <li className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                <div>
                  <span className="font-semibold">Откройте Telegram-бот </span>
                  <a href="https://t.me/Oway1_bot" className="text-blue-600 font-semibold" target="_blank" rel="noopener noreferrer">@Oway1_bot</a>
                  {" "}и нажмите /start
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                <div>Введите номер телефона, привязанный к аккаунту OWAY CARGO</div>
              </li>
              <li className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                <div>Нажмите <span className="font-semibold">«Мои посылки»</span> — список всех отправлений с текущим статусом</div>
              </li>
              <li className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                <div>Включите уведомления — бот сообщит о каждом изменении статуса автоматически</div>
              </li>
            </ol>
          </Card>

          {/* FAQ inline */}
          <Card className="p-8 bg-white border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Частые вопросы об отслеживании</h2>
            <div className="space-y-5">
              {[
                {
                  q: "Посылка не обновляет статус уже несколько дней — что делать?",
                  a: "Авиарейс может занимать 2–5 дней без обновлений статуса — это норма. Если статус не менялся более 14 дней, напишите в поддержку @Oway1_bot.",
                },
                {
                  q: "Как долго добирается посылка?",
                  a: "Кыргызстан, Казахстан, Узбекистан — 7–9 дней. Россия, Беларусь — 16–21 день. Отсчёт с момента прибытия на наш склад в США.",
                },
                {
                  q: "Есть ли трекинг-номер авиарейса?",
                  a: "Да. Трекинг-номер доступен в личном кабинете после отправки посылки из США. Можно проверить на сайте авиаперевозчика.",
                },
                {
                  q: "Почему не приходят уведомления в Telegram?",
                  a: "Проверьте, что бот @Oway1_bot не заблокирован в вашем Telegram. Если проблема сохраняется — напишите в поддержку.",
                },
              ].map((item, i) => (
                <div key={i} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <div className="font-semibold text-slate-900 mb-1">{item.q}</div>
                  <div className="text-sm text-slate-600">{item.a}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/faq" className="text-sm text-blue-600 hover:text-blue-700">
                Все 50+ вопросов в FAQ →
              </Link>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <p className="text-slate-600 mb-4">Ещё не зарегистрированы? Получите адрес склада США за 1 минуту</p>
            <Link href="/#lead">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10">
                Начать отправку из США
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
