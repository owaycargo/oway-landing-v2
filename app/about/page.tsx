import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Package,
  Users,
  Globe,
  Shield,
  MapPin,
  Building2,
  Network,
  Briefcase,
  Lock,
  Monitor,
  Handshake,
  Target,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "О компании OWAY CARGO | Международная логистика из США в СНГ",
  description:
    "OWAY Cargo — международный логистический сервис доставки посылок из США в страны СНГ. Автономная логистика, self-service пункты приёма, прозрачное отслеживание. Узнайте о нашей модели работы, географии и технологиях.",
  keywords: [
    "OWAY Cargo о компании",
    "логистика из США",
    "доставка в СНГ",
    "международная доставка",
    "self-service доставка",
    "автономная логистика",
    "доставка посылок",
    "логистический сервис",
    "доставка в Россию",
    "доставка в Беларусь",
    "доставка в Кыргызстан",
  ],
  authors: [{ name: "OWAY CARGO" }],
  creator: "OWAY CARGO",
  publisher: "OWAY CARGO",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "О компании OWAY CARGO | Международная логистика",
    description:
      "Узнайте о OWAY Cargo — международном логистическом сервисе доставки посылок из США в страны СНГ. Автономная логистика, self-service пункты приёма, прозрачное отслеживание.",
    url: "/about",
    siteName: "OWAY CARGO",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "О компании OWAY CARGO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "О компании OWAY CARGO",
    description: "Международный логистический сервис доставки посылок из США в страны СНГ",
    images: ["/banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-balance">О компании OWAY Cargo</h1>
          <p className="text-lg text-slate-600 text-pretty leading-relaxed">
            OWAY Cargo — это международный логистический сервис, специализирующийся на доставке посылок и товаров из
            США в страны СНГ. Компания построена как гибкая распределённая логистическая система, объединяющая
            автономные пункты приёма, консолидационные хабы и партнёрские сети доставки.
          </p>
        </div>

        {/* About Company */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">О компании</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed mb-4">
              OWAY Cargo — это международный логистический сервис, специализирующийся на доставке посылок и товаров из
              США в страны СНГ. Компания построена как гибкая распределённая логистическая система, объединяющая
              автономные пункты приёма, консолидационные хабы и партнёрские сети доставки.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Мы работаем с частными клиентами, онлайн-покупателями, байерами и бизнесом, обеспечивая прозрачную,
              понятную и контролируемую доставку на каждом этапе.
            </p>
          </div>
        </div>

        {/* R.O.W. - Regions of Work */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Globe className="w-4 h-4" />
              R.O.W. — Regions of Work
            </div>
            <h2 className="text-3xl font-bold text-slate-900">География работы</h2>
          </div>

          <div className="space-y-6">
            {/* USA */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Соединённые Штаты Америки (USA)</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Широкая сеть автономных пунктов приёма (Self-Service PUDO)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Пункты расположены в ключевых штатах и городах</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Отсутствие собственных офисов → ниже издержки → быстрее приём</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Забор посылок осуществляется по регулярным маршрутам</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="font-semibold text-slate-900 mb-2">Основные хабы в США:</p>
                    <ul className="space-y-1 text-slate-600">
                      <li>• Delaware (East Hub) — восток, центр и юг США</li>
                      <li>• Los Angeles (West Hub) — западное побережье США</li>
                    </ul>
                    <p className="text-sm text-slate-500 mt-2">
                      Все посылки проходят через один из этих хабов перед международной отправкой.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kyrgyzstan */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Network className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Кыргызстан (Central Transit Hub)</h3>
                  <p className="text-slate-600 mb-4">
                    Кыргызстан является единым транзитным и распределительным узлом OWAY Cargo.
                  </p>
                  <p className="font-semibold text-slate-900 mb-2">Здесь происходит:</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>приём всех международных рейсов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>сортировка посылок по направлениям</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>внутренние доставки по Кыргызстану</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>подготовка грузов для отправки в Россию и Беларусь</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-500 mt-4 p-3 bg-blue-50 rounded-lg">
                    📌 Для клиентов из РФ и РБ Кыргызстан отображается как «транзитная зона» без детализации.
                  </p>
                </div>
              </div>
            </div>

            {/* Russia */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Россия</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Все посылки доставляются через московский распределительный склад</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Финальная доставка осуществляется через партнёрскую сеть СДЭК</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Клиент получает отдельный трек-номер СДЭК</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>OWAY Cargo отвечает за международный сегмент доставки</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Belarus */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Беларусь</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Доставка осуществляется через Россию</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Финальный оператор доставки — СДЭК</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Полное отслеживание до вручения получателю</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Model */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Модель работы OWAY Cargo</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Network className="w-6 h-6 text-blue-600" />
                Автономная логистика
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                OWAY Cargo не использует классическую офисную модель. Вместо этого мы строим систему партнёрских
                локаций, self-service пунктов и централизованного контроля через IT-платформу.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">Это позволяет:</p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>масштабироваться без потери качества</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>снижать операционные расходы</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>быстро открывать новые регионы</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Self-Service как стандарт
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Все пункты приёма в США работают в режиме самообслуживания:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>клиент самостоятельно оформляет посылку</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>использует планшет, весы и принтер</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>получает трек-номер сразу</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>не зависит от операторов и очередей</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Client Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Типы клиентов</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Частные клиенты</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Покупки в американских интернет-магазинах</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Отправка личных вещей</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Простое оформление и отслеживание</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">PRO / Байеры / Бизнес</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Оптовые и регулярные отправки</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Массовые партии (bulk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Персональное сопровождение (в перспективе)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Рабочие Telegram-чаты</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Приоритетная обработка</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Transparency & Security */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Lock className="w-8 h-8 text-blue-600" />
            Прозрачность и безопасность
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            OWAY Cargo придерживается принципов минимального хранения финансовых данных, отсутствия онлайн-оплат на
            сайте, разделения операционной логики и бухгалтерии, понятных и честных статусов доставки.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">Все ключевые этапы отслеживаются, а клиент всегда понимает:</p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>где находится посылка</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>что происходит дальше</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>какие действия от него требуются</span>
            </li>
          </ul>
        </div>

        {/* Technology & Control */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Monitor className="w-8 h-8 text-blue-600" />
            Контроль и технологии
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            OWAY Cargo использует собственную IT-платформу для:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>управления посылками и маршрутами</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>отслеживания статусов</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>уведомлений клиентов</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>работы с контентом и инструкциями</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>аналитики по регионам (без раскрытия финансов)</span>
            </li>
          </ul>
        </div>

        {/* Partnership Model */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Handshake className="w-8 h-8 text-blue-600" />
            Партнёрская модель
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">Мы сотрудничаем с:</p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>локальными бизнесами в США (пункты приёма)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>международными авиаперевозчиками</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>региональными курьерскими службами</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>крупными операторами последней мили (СДЭК)</span>
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-6">
            Это позволяет предоставлять стабильный сервис без привязки к одному рынку или оператору.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">
              Сделать доставку из США в страны СНГ простой, понятной, доступной и прозрачной без сложной бюрократии,
              скрытых этапов и перегруженных офисов.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8 text-left">
              {["простой", "понятной", "доступной", "прозрачной"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
