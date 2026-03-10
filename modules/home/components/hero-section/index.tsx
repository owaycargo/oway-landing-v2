"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  const [trackingNumber, setTrackingNumber] = useState("")

  return (
    <section className="relative min-h-[85vh] md:min-h-[85vh] w-full bg-gradient-to-br from-white via-blue-50/30 to-blue-100/40 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute top-10 md:top-20 right-5 md:right-10 w-48 h-48 md:w-96 md:h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 md:bottom-20 left-5 md:left-10 w-40 h-40 md:w-80 md:h-80 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-[15px] py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight text-balance">
              OWAY CARGO — ДОСТАВКА ИЗ США В СНГ
            </h1>

            <p className="text-base md:text-2xl text-slate-600 leading-relaxed text-pretty max-w-xl">
              Быстрая и удобная доставка посылок из США в Кыргызстан, Россию и Беларусь через автономные пункты приёма
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
              <Button className="h-12 md:h-14 px-6 md:px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all">
                Оформить посылку
              </Button>
              <Button className="h-12 md:h-14 px-6 md:px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all">
                Получить консультацию
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="/banner.jpg"
                  alt="OWAY Cargo - Доставка из США в СНГ"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
