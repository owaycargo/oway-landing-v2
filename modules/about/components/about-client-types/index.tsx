import { Users, Briefcase, CheckCircle2 } from "lucide-react"

export function AboutClientTypes() {
  return (
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
  )
}
