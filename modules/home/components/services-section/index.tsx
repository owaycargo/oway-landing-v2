import { Package, Plane, Boxes, MessageSquare, Bell, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

const services = [
  {
    icon: Package,
    title: "Self-service пункты приёма",
    description: "Доступные и удобные точки приёма в городах по штатам США.",
  },
  {
    icon: Plane,
    title: "Авиа-доставка и доставка внутри страны",
    description: "Быстрая доставка из США в страны СНГ с последующей доставкой по городам внутри страны. Работаем по выгодным тарифам с проверенными курьерскими службами.",
  },
  {
    icon: Boxes,
    title: "Консолидация посылок",
    description: "Объединяем несколько заказов в одну отправку, чтобы вы платили меньше за доставку. Подходит для личных покупок и бизнеса.",
  },
  {
    icon: MessageSquare,
    title: "Поддержка 24/7",
    description: "Наши менеджеры работают по времени США и стран СНГ, что обеспечивает круглосуточное обслуживание. Вы можете обратиться к нам в любое время суток и получить оперативную помощь.",
  },
  {
    icon: Bell,
    title: "Отслеживание и уведомления",
    description: "Статус посылки в реальном времени через личный кабинет и Telegram-бот. Получайте уведомления о каждом этапе доставки и полную информацию по вашей отправке.",
  },
  {
    icon: ShoppingCart,
    title: "Услуга выкупа товаров",
    description: "Выкупаем товары онлайн и офлайн в США — как для частных клиентов, так и для бизнеса. Работаем с интернет-магазинами, аутлетами и розничными точками.",
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
            className="p-6 rounded-3xl border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <service.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-slate-600">{service.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
