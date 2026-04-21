"use client"

import { MapPin, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTelegramDialog } from "@/components/telegram-dialog-provider"
import { useWhatsAppDialog } from "@/components/whatsapp-dialog-provider"

type CisPoint = {
  id: string
  flag: string
  country: string
  city: string
  address: string
  hours: string
  deliveryDays: string
  priceFrom: string
}

const cisPoints: CisPoint[] = [
  {
    id: "kg",
    flag: "🇰🇬",
    country: "Кыргызстан",
    city: "Бишкек",
    address: "[УТОЧНИТЬ]",
    hours: "[УТОЧНИТЬ]",
    deliveryDays: "7–9 дней",
    priceFrom: "$12/кг",
  },
  {
    id: "kz",
    flag: "🇰🇿",
    country: "Казахстан",
    city: "Алматы",
    address: "[УТОЧНИТЬ]",
    hours: "[УТОЧНИТЬ]",
    deliveryDays: "7–9 дней",
    priceFrom: "$12/кг",
  },
  {
    id: "uz",
    flag: "🇺🇿",
    country: "Узбекистан",
    city: "Ташкент",
    address: "[УТОЧНИТЬ]",
    hours: "[УТОЧНИТЬ]",
    deliveryDays: "7–9 дней",
    priceFrom: "$12/кг",
  },
  {
    id: "ru",
    flag: "🇷🇺",
    country: "Россия",
    city: "Москва",
    address: "[УТОЧНИТЬ]",
    hours: "[УТОЧНИТЬ]",
    deliveryDays: "16–21 день",
    priceFrom: "$18/кг",
  },
  {
    id: "by",
    flag: "🇧🇾",
    country: "Беларусь",
    city: "Минск",
    address: "[УТОЧНИТЬ]",
    hours: "[УТОЧНИТЬ]",
    deliveryDays: "16–21 день",
    priceFrom: "$18/кг",
  },
]

export function CisPanel() {
  const { openTelegram } = useTelegramDialog()
  const { openWhatsApp } = useWhatsAppDialog()

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
        <div className="text-2xl shrink-0" aria-hidden>ℹ️</div>
        <p className="text-sm md:text-base text-slate-700">
          Мы доставляем посылки в <span className="font-semibold">5 стран СНГ</span>. Ниже — пункты выдачи в столицах.
          Подробный адрес и часы работы уточняйте в Telegram или WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cisPoints.map((point) => (
          <Card
            key={point.id}
            className="p-6 rounded-2xl border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-white flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl" aria-hidden>{point.flag}</div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">{point.city}</h3>
                  <p className="text-sm text-slate-600">{point.country}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-700">{point.address}</p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-700">{point.hours}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-slate-200">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
                от {point.priceFrom}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {point.deliveryDays}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={openTelegram}
                className="flex-1 bg-[#0088cc] hover:bg-[#0077b3] text-white h-10 rounded-xl text-sm font-semibold"
              >
                Telegram
              </Button>
              <Button
                onClick={openWhatsApp}
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white h-10 rounded-xl text-sm font-semibold"
              >
                WhatsApp
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
