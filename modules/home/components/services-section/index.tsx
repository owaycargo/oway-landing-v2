import { Package, Plane, Boxes, MessageSquare, Bell, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const services = [
  {
    icon: Package,
    title: "Self-service пункты приёма",
    description: "Доступные и удобные точки приёма в городах по штатам США.",
    href: null,
  },
  {
    icon: Plane,
    title: "Авиа-доставка и доставка внутри страны",
    description: "Быстрая доставка из США в страны СНГ с последующей доставкой по городам. Тариф от $12/кг.",
    href: "/calculator",
    linkLabel: "Рассчитать стоимость →",
  },
  {
    icon: Boxes,
    title: "Консолидация посылок",
    description: "Объединяем несколько заказов в одну отправку, чтобы вы платили меньше за доставку. Бесплатно.",
    href: "/consolidation",
    linkLabel: "Как работает консолидация →",
  },
  {
    icon: MessageSquare,
    title: "Поддержка 24/7",
    description: "Наши менеджеры работают по времени США и стран СНГ. Вы можете обратиться в любое время суток.",
    href: null,
  },
  {
    icon: Bell,
    title: "Отслеживание и уведомления",
    description: "Статус посылки в реальном времени через личный кабинет и Telegram-бот @Oway1_bot.",
    href: "/tracking",
    linkLabel: "Отследить посылку →",
  },
  {
    icon: ShoppingCart,
    title: "Выкуп товаров из США",
    description: "Карта не принимается? Выкупаем товары из любых американских магазинов. Комиссия от 10%.",
    href: "/purchase",
    linkLabel: "Подробнее о выкупе →",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24 bg-slate-50">
      <div className="text-center mb-12 flex flex-col items-center">
        <Image
          src="/mascots/mascot-party.webp"
          alt=""
          aria-hidden
          width={2658}
          height={2936}
          sizes="(max-width: 768px) 96px, 128px"
          className="w-24 md:w-32 h-auto mb-4 drop-shadow-[0_15px_25px_rgba(15,23,42,0.15)]"
          />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Наши сервисы</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Полный спектр услуг для удобной и быстрой доставки из США
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className="p-6 rounded-3xl border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <service.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-slate-600 flex-1">{service.description}</p>
            {service.href && (
              <Link
                href={service.href}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {service.linkLabel}
              </Link>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
