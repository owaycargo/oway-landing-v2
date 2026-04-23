"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "oway_cookie_consent"
type Consent = "accepted" | "rejected"

type GtagWindow = Window & {
  gtag?: (command: string, ...args: unknown[]) => void
}

function applyConsent(choice: Consent) {
  if (typeof window === "undefined") return
  const w = window as GtagWindow
  w.gtag?.("consent", "update", {
    analytics_storage: choice === "accepted" ? "granted" : "denied",
    ad_storage: choice === "accepted" ? "granted" : "denied",
  })
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null
    if (stored) {
      applyConsent(stored)
    } else {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const save = (choice: Consent) => {
    localStorage.setItem(STORAGE_KEY, choice)
    applyConsent(choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6 pointer-events-none">
      <div
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
        className="mx-auto max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 sm:p-6 pointer-events-auto"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2
              id="cookie-consent-title"
              className="text-base sm:text-lg font-bold text-slate-900 mb-1"
            >
              Мы используем cookies
            </h2>
            <p
              id="cookie-consent-description"
              className="text-sm text-slate-600"
            >
              Сайт использует cookies для аналитики (Google Analytics 4), чтобы
              улучшать сервис. Подробнее — в{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Политике конфиденциальности
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
              <Button
                onClick={() => save("accepted")}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex-1 sm:flex-initial"
              >
                Принять
              </Button>
              <Button
                onClick={() => save("rejected")}
                variant="outline"
                className="rounded-xl flex-1 sm:flex-initial"
              >
                Только необходимые
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => save("rejected")}
            aria-label="Закрыть"
            className="p-1 -m-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
