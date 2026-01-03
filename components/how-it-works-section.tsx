import { FileText, MapPin, Plane, Truck } from "lucide-react"

const steps = [
  {
    icon: FileText,
    number: "1",
    title: "Создание посылки",
    description: "Оформляете посылку на сайте или в пункте приёма. Вводите данные отправителя и получателя, выбираете страну назначения",
  },
  {
    icon: MapPin,
    number: "2",
    title: "Сдача в пункт приёма",
    description: "Приносите посылку в self-service пункт приёма в США. Самостоятельно вводите вес, габариты и наклеиваете штрих-код",
  },
  {
    icon: Plane,
    number: "3",
    title: "Консолидация и отправка",
    description: "Посылки собираются на складах в Delaware или Los Angeles, консолидируются и отправляются в страну назначения",
  },
  {
    icon: Truck,
    number: "4",
    title: "Доставка в СНГ",
    description: "Получаете посылку через СДЭК (Россия/Беларусь) или в пункте выдачи (Кыргызстан). Отслеживание в реальном времени",
  },
  
]

export function HowItWorksSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Этапы работы</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Простой и понятный процесс доставки в 4 шага</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative items-stretch">
        {steps.map((step, index) => (
          <div key={index} className="relative flex">
            <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-lg w-full flex flex-col">
              <div className="relative mb-6 flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center flex-shrink-0">{step.title}</h3>
              <p className="text-slate-600 text-center text-sm flex-grow">{step.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-blue-200 z-10" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
