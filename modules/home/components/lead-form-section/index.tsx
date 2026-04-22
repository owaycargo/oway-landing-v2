"use client"

import { useState } from "react"
import { Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const countries = [
  { value: "RU", label: "🇷🇺 Россия" },
  { value: "BY", label: "🇧🇾 Беларусь" },
  { value: "KZ", label: "🇰🇿 Казахстан" },
  { value: "KG", label: "🇰🇬 Кыргызстан" },
  { value: "UZ", label: "🇺🇿 Узбекистан" },
]

type Status = "idle" | "loading" | "success" | "error"

export function LeadFormSection() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorText, setErrorText] = useState("")
  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: "",
    city: "",
    message: "",
    website: "",
  })

  const canSubmit =
    form.name.trim().length >= 2 &&
    form.phone.replace(/\D/g, "").length >= 7 &&
    form.country !== ""

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || status === "loading") return

    setStatus("loading")
    setErrorText("")

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Не удалось отправить заявку")
      }
      setStatus("success")

      const w = window as Window & {
        gtag?: (command: string, event: string, params: Record<string, unknown>) => void
      }
      w.gtag?.("event", "form_submit", {
        form_name: "lead_callback",
        country: form.country,
      })
    } catch (err) {
      setStatus("error")
      setErrorText(err instanceof Error ? err.message : "Неизвестная ошибка")

      const w = window as Window & {
        gtag?: (command: string, event: string, params: Record<string, unknown>) => void
      }
      w.gtag?.("event", "form_submit_error", {
        form_name: "lead_callback",
        error: err instanceof Error ? err.message : "unknown",
      })
    }
  }

  return (
    <section
      id="lead"
      className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-orange-50"
    >
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-5">
              <Phone className="w-4 h-4 text-blue-700" />
              <span className="text-sm font-semibold text-blue-700">Обратный звонок</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Оставьте заявку — <span className="text-blue-600">перезвоним в течение часа</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Не хотите писать в мессенджеры? Заполните короткую форму — менеджер свяжется
              с вами и ответит на все вопросы по доставке.
            </p>
          </div>

          <Card className="p-6 md:p-10 rounded-3xl border-slate-200 bg-white shadow-lg">
            {status === "success" ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Заявка отправлена!</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Менеджер свяжется с вами в течение часа в рабочее время.
                  Если заявка вечером или в выходной — ответим утром в понедельник.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="lead-website">Не заполняйте это поле</label>
                  <input
                    id="lead-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="lead-name">Имя *</Label>
                    <Input
                      id="lead-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12 rounded-xl"
                      placeholder="Как к вам обращаться"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-phone">Телефон *</Label>
                    <Input
                      id="lead-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="h-12 rounded-xl"
                      placeholder="+7 999 123 45 67"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="lead-country">Страна получения *</Label>
                    <select
                      id="lead-country"
                      required
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base md:text-sm outline-none focus-visible:border-blue-400 focus-visible:ring-[3px] focus-visible:ring-blue-400/30"
                    >
                      <option value="" disabled>
                        Выберите страну
                      </option>
                      {countries.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-city">Город (необязательно)</Label>
                    <Input
                      id="lead-city"
                      type="text"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="h-12 rounded-xl"
                      placeholder="Например, Бишкек"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lead-message">Что отправляете (необязательно)</Label>
                  <textarea
                    id="lead-message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base md:text-sm outline-none focus-visible:border-blue-400 focus-visible:ring-[3px] focus-visible:ring-blue-400/30 resize-none"
                    placeholder="Например: одежда, электроника, 5 кг"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">
                      {errorText || "Что-то пошло не так. Попробуйте ещё раз или напишите в Telegram."}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!canSubmit || status === "loading"}
                  className="w-full h-13 md:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Отправка…
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
                </p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
