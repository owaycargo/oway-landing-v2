import { NextResponse } from "next/server"
import { headers } from "next/headers"

const COUNTRY_LABELS: Record<string, string> = {
  RU: "🇷🇺 Россия",
  BY: "🇧🇾 Беларусь",
  KZ: "🇰🇿 Казахстан",
  KG: "🇰🇬 Кыргызстан",
  UZ: "🇺🇿 Узбекистан",
}

type LeadBody = {
  name?: string
  phone?: string
  country?: string
  city?: string
  message?: string
}

function clean(v: unknown, max = 500): string {
  if (typeof v !== "string") return ""
  return v.trim().slice(0, max)
}

export async function POST(req: Request) {
  let body: LeadBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 })
  }

  const name = clean(body.name, 100)
  const phoneRaw = clean(body.phone, 40)
  const country = clean(body.country, 4)
  const city = clean(body.city, 100)
  const message = clean(body.message, 1000)

  const phoneDigits = phoneRaw.replace(/\D/g, "")
  if (name.length < 2 || phoneDigits.length < 7 || !COUNTRY_LABELS[country]) {
    return NextResponse.json({ error: "Проверьте имя, телефон и страну" }, { status: 400 })
  }

  const h = await headers()
  const ipCountry = h.get("x-vercel-ip-country") || ""
  const ipCity = h.get("x-vercel-ip-city") || ""
  const ua = h.get("user-agent") || ""

  const text = [
    "🔔 <b>Новая заявка с owaycargo.com</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phoneRaw)}`,
    `<b>Страна:</b> ${COUNTRY_LABELS[country]}`,
    city && `<b>Город:</b> ${escapeHtml(city)}`,
    message && `<b>Отправка:</b> ${escapeHtml(message)}`,
    "",
    `<i>Геолокация IP: ${ipCountry || "?"}${ipCity ? ", " + ipCity : ""}</i>`,
    `<i>UA: ${escapeHtml(ua.slice(0, 120))}</i>`,
  ]
    .filter(Boolean)
    .join("\n")

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_LEADS_CHAT_ID

  if (!token || !chatId) {
    console.warn("[lead] TELEGRAM_BOT_TOKEN/TELEGRAM_LEADS_CHAT_ID not set — lead logged only")
    console.info("[lead]", { name, phone: phoneRaw, country, city, message })
    return NextResponse.json({ ok: true, delivered: false })
  }

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    })
    if (!tgRes.ok) {
      const errText = await tgRes.text()
      console.error("[lead] Telegram API error:", errText)
      return NextResponse.json({ error: "Ошибка доставки" }, { status: 502 })
    }
    return NextResponse.json({ ok: true, delivered: true })
  } catch (err) {
    console.error("[lead] Telegram fetch failed:", err)
    return NextResponse.json({ error: "Ошибка доставки" }, { status: 502 })
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}
