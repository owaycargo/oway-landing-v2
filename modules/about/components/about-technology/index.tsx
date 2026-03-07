import { Monitor, CheckCircle2 } from "lucide-react"

export function AboutTechnology() {
  return (
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
  )
}
