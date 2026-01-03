import { Package, Plane, Boxes, Truck, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"

const services = [
  {
    icon: Package,
    title: "Self-service пункты приёма",
    description: "Удобные точки приёма по всей территории США с круглосуточным доступом",
  },
  {
    icon: Plane,
    title: "Авиа-доставка",
    description: "Быстрая авиадоставка ваших посылок из США в страны СНГ",
  },
  {
    icon: Boxes,
    title: "Консолидация (DE / LA)",
    description: "Объединение нескольких посылок в одну для экономии на доставке",
  },
  {
    icon: Truck,
    title: "Доставка в страны СНГ",
    description: "Надёжная доставка до двери через проверенных партнёров",
  },
  {
    icon: MessageSquare,
    title: "Telegram-уведомления",
    description: "Получайте обновления о статусе вашей посылки в реальном времени",
  },
  
]

export function ServicesSection() {
  return (
    <section id="services" className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24 bg-slate-50">
      <div className="text-center mb-12">
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
