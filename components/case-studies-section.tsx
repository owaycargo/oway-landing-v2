import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const cases = [
  {
    category: "Электроника",
    route: "Нью-Йорк → Москва",
    weight: "2.5 кг",
    duration: "7 дней",
    price: "$45",
    bgColor: "from-blue-50 to-cyan-50",
  },
  {
    category: "Одежда",
    route: "Лос-Анджелес → Бишкек",
    weight: "5 кг",
    duration: "12 дней",
    price: "$68",
    bgColor: "from-purple-50 to-pink-50",
  },
  {
    category: "Спортивные товары",
    route: "Майами → Минск",
    weight: "8 кг",
    duration: "10 дней",
    price: "$98",
    bgColor: "from-orange-50 to-amber-50",
  },
]

export function CaseStudiesSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Примеры реальных доставок</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Посмотрите, как мы доставляем посылки наших клиентов</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cases.map((caseItem, index) => (
          <Card
            key={index}
            className={`p-6 rounded-3xl border-slate-200 hover:shadow-xl transition-all overflow-hidden relative`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${caseItem.bgColor} opacity-50`} />

            <div className="relative">
              <Badge className="mb-4 bg-white text-slate-700 hover:bg-white">{caseItem.category}</Badge>

              <div className="flex items-center gap-2 mb-6">
                <span className="font-semibold text-slate-900 text-lg">{caseItem.route.split(" → ")[0]}</span>
                <ArrowRight className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900 text-lg">{caseItem.route.split(" → ")[1]}</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Вес:</span>
                  <span className="font-semibold text-slate-900">{caseItem.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Срок:</span>
                  <span className="font-semibold text-slate-900">{caseItem.duration}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-300">
                  <span className="text-slate-700 font-medium">Стоимость:</span>
                  <span className="text-2xl font-bold text-blue-600">{caseItem.price}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
