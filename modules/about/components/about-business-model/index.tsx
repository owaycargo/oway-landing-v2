import { Network, Users, CheckCircle2 } from "lucide-react"

export function AboutBusinessModel() {
  return (
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
  )
}
