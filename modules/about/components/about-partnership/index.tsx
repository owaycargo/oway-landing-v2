import { Handshake, CheckCircle2 } from "lucide-react"

export function AboutPartnership() {
  return (
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
  )
}
