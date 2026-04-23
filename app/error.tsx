"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle, RefreshCw, Home, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[app error]", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="max-w-lg text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-9 h-9 text-red-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Что-то пошло не так
        </h1>
        <p className="text-slate-600 mb-8">
          Мы уже знаем об ошибке и исправим её. Попробуйте обновить страницу или вернуться на главную.
          Если проблема повторяется — напишите нам в Telegram.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Обновить страницу
          </Button>
          <Link href="/">
            <Button variant="outline" className="rounded-xl gap-2 w-full sm:w-auto">
              <Home className="w-4 h-4" />
              На главную
            </Button>
          </Link>
          <a href="https://t.me/owaycargo" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-xl gap-2 w-full sm:w-auto">
              <MessageCircle className="w-4 h-4" />
              Telegram
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
