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
  website?: string
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 5
const rateLimitMap = new Map<string, { count: number; firstAt: number }>()

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now - record.firstAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstAt: now })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  record.count += 1
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count }
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

  if (clean(body.website, 200)) {
    console.warn("[lead] honeypot triggered — bot detected")
    return NextResponse.json({ ok: true, delivered: false })
  }

  const h = await headers()
  const ip =
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip") ||
    h.get("x-vercel-ip") ||
    "unknown"

  const limit = checkRateLimit(ip)
  if (!limit.allowed) {
    console.warn(`[lead] rate limit exceeded for ${ip}`)
    return NextResponse.json(
      { error: "Слишком много заявок. Попробуйте через 15 минут или напишите в Telegram." },
      { status: 429 },
    )
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
  const chatIdsRaw = process.env.TELEGRAM_LEADS_CHAT_ID
  const chatIds = (chatIdsRaw || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  if (!token || chatIds.length === 0) {
    console.warn("[lead] TELEGRAM_BOT_TOKEN/TELEGRAM_LEADS_CHAT_ID not set — lead logged only")
    console.info("[lead]", { name, phone: phoneRaw, country, city, message })
    return NextResponse.json({ ok: true, delivered: false })
  }

  const results = await Promise.allSettled(
    chatIds.map(async (id) => {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: id,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      })
      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`chat_id ${id}: ${errText}`)
      }
      return id
    }),
  )

  const delivered = results.filter((r) => r.status === "fulfilled").length
  const failed = results.filter((r) => r.status === "rejected")
  if (failed.length > 0) {
    failed.forEach((r) => console.error("[lead] Telegram send failed:", (r as PromiseRejectedResult).reason))
  }

  if (delivered === 0) {
    return NextResponse.json({ error: "Ошибка доставки" }, { status: 502 })
  }
  return NextResponse.json({ ok: true, delivered: true, recipients: delivered, failed: failed.length })
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}
