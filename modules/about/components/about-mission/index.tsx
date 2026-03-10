import { Target, CheckCircle2 } from "lucide-react"

const MISSION_ITEMS = ["простой", "понятной", "доступной", "прозрачной"]

export function AboutMission() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
        <p className="text-blue-100 text-lg leading-relaxed mb-6">
          Сделать доставку из США в страны СНГ простой, понятной, доступной и прозрачной без сложной бюрократии,
          скрытых этапов и перегруженных офисов.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-8 text-left">
          {MISSION_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
              <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
              <span className="text-white">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
