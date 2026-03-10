import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsSubscribeCta() {
  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white text-center">
      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <Bell className="w-7 h-7 text-white" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Будьте в курсе новостей</h2>
      <p className="text-blue-100 mb-8 leading-relaxed">
        Подпишитесь на наш Telegram-канал и первыми узнавайте об акциях, обновлениях маршрутов и
        важных объявлениях OWAY CARGO.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
          <a href="https://t.me/owaycargo" target="_blank" rel="noopener noreferrer">
            Подписаться на Telegram
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold"
        >
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  )
}
