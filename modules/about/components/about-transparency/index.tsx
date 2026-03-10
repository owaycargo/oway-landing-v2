import { Lock, CheckCircle2 } from "lucide-react"

export function AboutTransparency() {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-12">
      <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <Lock className="w-8 h-8 text-blue-600" />
        Прозрачность и безопасность
      </h2>
      <p className="text-slate-600 leading-relaxed mb-6">
        OWAY Cargo придерживается принципов минимального хранения финансовых данных, отсутствия онлайн-оплат на
        сайте, разделения операционной логики и бухгалтерии, понятных и честных статусов доставки.
      </p>
      <p className="text-slate-600 leading-relaxed mb-4">Все ключевые этапы отслеживаются, а клиент всегда понимает:</p>
      <ul className="space-y-2 text-slate-600">
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <span>где находится посылка</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <span>что происходит дальше</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <span>какие действия от него требуются</span>
        </li>
      </ul>
    </div>
  )
}
