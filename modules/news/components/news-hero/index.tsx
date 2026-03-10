import { Newspaper } from "lucide-react"

export function NewsHero() {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Newspaper className="w-8 h-8 text-blue-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-balance">
        Новости OWAY CARGO
      </h1>
      <p className="text-lg text-slate-600 text-pretty leading-relaxed">
        Следите за последними обновлениями, акциями и событиями компании. Мы регулярно публикуем
        новости о маршрутах, тарифах и улучшениях сервиса.
      </p>
    </div>
  )
}
