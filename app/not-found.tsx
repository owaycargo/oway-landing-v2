import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Package,
  Home,
  Search,
  MessageCircle,
  ArrowRight,
  MapPin,
  Calculator,
  BookOpen,
} from "lucide-react"

const QUICK_LINKS = [
  {
    href: "/",
    icon: Home,
    label: "Главная",
    description: "Вернуться на главную страницу",
  },
  {
    href: "/#calculator",
    icon: Calculator,
    label: "Калькулятор",
    description: "Рассчитать стоимость доставки",
  },
  {
    href: "/marketplace",
    icon: Search,
    label: "Маркетплейсы",
    description: "Список поддерживаемых магазинов",
  },
  {
    href: "/news",
    icon: BookOpen,
    label: "Новости",
    description: "Последние новости и статьи",
  },
  {
    href: "/about",
    icon: MapPin,
    label: "О нас",
    description: "Информация о компании",
  },
  {
    href: "/faq",
    icon: MessageCircle,
    label: "FAQ",
    description: "Часто задаваемые вопросы",
  },
]

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-4xl mx-auto">

          {/* Hero block */}
          <div className="text-center mb-12 md:mb-16">
            {/* 404 number with decorative background */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <span className="text-[120px] md:text-[180px] font-black text-blue-100 leading-none select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-300">
                  <Package className="w-10 h-10 md:w-14 md:h-14 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Страница не найдена
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-lg mx-auto mb-8">
              Похоже, посылка заблудилась в пути. Страница, которую вы ищете,
              не существует или была перемещена.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all px-8 h-12 md:h-14 text-base"
              >
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  На главную
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-2xl font-bold border-2 border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50 text-slate-900 hover:text-slate-900 h-12 md:h-14 text-base px-8 transition-all"
              >
                <Link href="/#calculator">
                  <Calculator className="w-5 h-5 mr-2" />
                  Рассчитать доставку
                </Link>
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-slate-400 whitespace-nowrap px-2">
              Или перейдите в нужный раздел
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Quick links grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {QUICK_LINKS.map(({ href, icon: Icon, label, description }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-3 p-4 md:p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm md:text-base mb-0.5">
                    {label}
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 leading-snug">
                    {description}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Support hint */}
          <div className="mt-8 md:mt-10 text-center">
            <p className="text-sm text-slate-500">
              Нужна помощь?{" "}
              <Link
                href="https://t.me/owaycargo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4 transition-colors"
              >
                Напишите нам в Telegram
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
