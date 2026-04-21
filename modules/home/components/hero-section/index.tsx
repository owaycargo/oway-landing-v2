"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTelegramDialog } from "@/components/telegram-dialog-provider"
import { useWhatsAppDialog } from "@/components/whatsapp-dialog-provider"

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

export function HeroSection() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const { openTelegram } = useTelegramDialog()
  const { openWhatsApp } = useWhatsAppDialog()

  return (
    <section className="relative min-h-[85vh] md:min-h-[85vh] w-full bg-gradient-to-br from-white via-blue-50/30 to-blue-100/40 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute top-10 md:top-20 right-5 md:right-10 w-48 h-48 md:w-96 md:h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 md:bottom-20 left-5 md:left-10 w-40 h-40 md:w-80 md:h-80 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-[15px] py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight text-balance">
              Доставка посылок из США <span className="text-orange-600">в страны СНГ</span>
            </h1>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-3 md:gap-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm">
                <div className="flex text-2xl md:text-3xl shrink-0" aria-hidden>🇰🇿🇰🇬🇺🇿</div>
                <div className="text-base md:text-xl font-bold text-slate-900">
                  От <span className="text-orange-600">$12</span>/кг <span className="text-slate-300 mx-1">·</span> <span className="text-slate-700 font-semibold">7–9 дней</span>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm">
                <div className="flex text-2xl md:text-3xl shrink-0" aria-hidden>🇷🇺🇧🇾</div>
                <div className="text-base md:text-xl font-bold text-slate-900">
                  От <span className="text-orange-600">$18</span>/кг <span className="text-slate-300 mx-1">·</span> <span className="text-slate-700 font-semibold">16–21 день</span>
                </div>
              </div>
            </div>

            <p className="text-sm md:text-base text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Без минимального веса</span>
              <span className="text-slate-300">·</span>
              <span>Страхование посылок</span>
              <span className="text-slate-300">·</span>
              <span>15 пунктов приёма в США</span>
            </p>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-slate-500" />
                  <Input
                    type="text"
                    placeholder="Введите трек-номер"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="pl-11 md:pl-14 h-12 md:h-16 text-sm md:text-lg rounded-xl md:rounded-2xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
                <Button className="h-12 md:h-16 px-6 md:px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl md:rounded-2xl text-sm md:text-lg font-bold shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
                  ИСКАТЬ
                </Button>
              </div>
              <p className="text-xs md:text-sm text-slate-600 pl-1">
                Отслеживание без регистрации — отображается только статус посылки
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
              <a href="https://client.owaycargo.com" target="_blank" rel="noopener noreferrer">
                <Button className="h-12 md:h-14 px-6 md:px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all">
                  Оформить посылку
                </Button>
              </a>
              <Button
                onClick={openWhatsApp}
                className="h-12 md:h-14 px-6 md:px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </Button>
              <Button
                onClick={openTelegram}
                className="h-12 md:h-14 px-6 md:px-8 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all gap-2"
              >
                <TelegramIcon className="w-5 h-5" />
                Telegram
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)] blur-2xl" />
              <img
                src="/mascots/mascot-wink.webp"
                alt="OWAY — маскот"
                className="relative w-full max-w-[520px] h-auto mx-auto drop-shadow-[0_25px_40px_rgba(15,23,42,0.25)] animate-[float_6s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
