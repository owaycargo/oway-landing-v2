import Anthropic from "@anthropic-ai/sdk"

// Reads ANTHROPIC_API_KEY from the environment.
const client = new Anthropic()

// ── Image editing via Google Gemini (Nano Banana) ──────────────────────────────
// Claude can't make images; Gemini 2.5 Flash Image edits/composites them.

export interface InputImage {
  mimeType: string
  data: string // base64
}

export async function editImage(
  images: InputImage[],
  instruction: string,
): Promise<InputImage> {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error("GEMINI_API_KEY не задан")
  const model = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image"

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parts: any[] = [{ text: instruction }]
  for (const img of images) {
    parts.push({ inline_data: { mime_type: img.mimeType, data: img.data } })
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ contents: [{ parts }] }),
    },
  )
  if (!res.ok) {
    const t = await res.text().catch(() => "")
    throw new Error(`Gemini ${res.status}: ${t.slice(0, 300)}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = (await res.json()) as any
  const outParts = json?.candidates?.[0]?.content?.parts ?? []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imgPart = outParts.find((p: any) => p.inline_data?.data || p.inlineData?.data)
  const inline = imgPart?.inline_data || imgPart?.inlineData
  if (!inline?.data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textPart = outParts.find((p: any) => p.text)?.text
    throw new Error(
      textPart ? `Gemini не вернул картинку: ${textPart.slice(0, 200)}` : "Gemini не вернул картинку",
    )
  }
  return { mimeType: inline.mime_type || inline.mimeType || "image/png", data: inline.data }
}

export interface GenerateInput {
  title: string
  category: string
  feedback?: string // refinement instruction from the user
  previousBody?: string // current article to rewrite when feedback is given
}

export interface GeneratedArticle {
  title: string
  alt_titles: string[]
  card_description: string
  body: string
}

const SYSTEM = `Ты — опытный контент-маркетолог компании OwayCargo.
OwayCargo — сервис доставки посылок из США в страны СНГ (Кыргызстан, Казахстан, Узбекистан, Россия, Беларусь): виртуальный адрес в США, выкуп товаров, консолидация, трекинг, страхование.

Твоя задача — написать готовую SEO-статью для раздела «Новости» на сайте по заданной теме и категории.

Главный принцип — КОРОТКО и ЛЕГКО ЧИТАЕТСЯ. Человек должен прочитать за 1.5–2 минуты и не устать. Лучше меньше, но по делу.

Требования к статье:
- Язык: русский, живой, разговорный, без канцелярита и «воды».
- Объём: 300–550 слов (≈1.5–2 минуты чтения). Не растягивай — если мысль высказана, иди дальше.
- Читабельность: короткие абзацы по 2–3 предложения, много «воздуха», списки вместо длинных перечислений. Текст должен легко сканироваться глазами.
- Формат: Markdown. ## подзаголовки каждые 2–3 абзаца, **жирный** для ключевых мыслей, маркированные списки.
- Структура: цепляющее вступление (1 абзац) → 2–3 коротких блока с подзаголовками → короткий вывод с мягким призывом.
- Тон по категории: how-to/советы — пошагово; новости — бодро и по делу; акции — продающе; обзор — экспертно, но просто.
- Ненавязчиво упоминай OwayCargo (виртуальный адрес, выкуп, страхование, трекинг), без агрессивной рекламы.
- Не выдумывай конкретные цены/сроки, если их нет в теме — пиши обтекаемо.
- Не вставляй H1. Начинай сразу с вступления или первого ## подзаголовка.

Также верни:
- title — отполированный, цепляющий заголовок статьи (из темы пользователя сделай хороший заголовок). Если в правках просят сменить заголовок — поменяй.
- alt_titles — 2–3 АЛЬТЕРНАТИВНЫХ варианта заголовка на выбор (разные по подаче: один по делу, один цепляющий/эмоциональный, один с цифрой или вопросом).
- card_description — краткое описание для карточки: 1–2 предложения, до 200 символов, цепляющее.`

const SCHEMA = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Отполированный цепляющий заголовок статьи",
    },
    alt_titles: {
      type: "array",
      items: { type: "string" },
      description: "2–3 альтернативных заголовка на выбор",
    },
    card_description: {
      type: "string",
      description: "Краткое описание для карточки, до 200 символов",
    },
    body: {
      type: "string",
      description: "Полный текст статьи в Markdown (300–550 слов)",
    },
  },
  required: ["title", "alt_titles", "card_description", "body"],
  additionalProperties: false,
}

export async function generateArticle(input: GenerateInput): Promise<GeneratedArticle> {
  const userContent =
    input.feedback && input.previousBody
      ? `Тема: ${input.title}\nКатегория: ${input.category}\n\n` +
        `Текущая версия статьи:\n\n${input.previousBody}\n\n` +
        `---\nПерепиши статью с учётом правок: «${input.feedback}»\n` +
        `Сохрани тему, примени правки. Если правка касается заголовка — поменяй title. Верни обновлённые title, alt_titles, card_description и body.`
      : `Тема от пользователя: ${input.title}\nКатегория: ${input.category}\n\nСделай из темы хороший заголовок и напиши статью.`

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 8000,
    system: SYSTEM,
    output_config: { format: { type: "json_schema", schema: SCHEMA } },
    messages: [{ role: "user", content: userContent }],
  })

  const textBlock = response.content.find((b) => b.type === "text")
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Пустой ответ от Claude")
  }

  const parsed = JSON.parse(textBlock.text) as GeneratedArticle
  if (!parsed.body?.trim()) throw new Error("Claude вернул пустой текст")
  return {
    title: (parsed.title ?? input.title).trim(),
    alt_titles: Array.isArray(parsed.alt_titles) ? parsed.alt_titles.slice(0, 3) : [],
    card_description: (parsed.card_description ?? "").slice(0, 300),
    body: parsed.body.trim(),
  }
}

// ── Product post for the Telegram channel ──────────────────────────────────────

export interface ProductMeta {
  url: string
  title?: string
  description?: string
  pageText?: string
}

const PRODUCT_SYSTEM = `Ты — SMM-маркетолог OwayCargo (доставка товаров из США в страны СНГ: виртуальный адрес в США, выкуп товаров, консолидация, страхование, трекинг).

Напиши короткий продающий пост для Telegram-канала о товаре из США.

Требования:
- Язык: русский, живой, с лёгким хайпом, но без перебора.
- Длина: до ~700 знаков (это подпись под фото в Telegram).
- Структура: 🔥 цепляющий первый строкой-заголовком с эмодзи → 1–2 коротких абзаца (что за товар, чем крут) → цена, если известна → мягкий призыв заказать через OwayCargo (виртуальный адрес/выкуп/доставка из США).
- В самом конце добавь блок контактов ровно так:
📦 Заказать:
Из СНГ → @owaymanagersng
С США → @owaymanager
- Эмодзи в меру (3–6 на пост).
- Если цена неизвестна — напиши «цена — по ссылке», не выдумывай.
- ВАЖНО: обычный текст с эмодзи и переносами строк. Без markdown-разметки (никаких **, ##, [текст](ссылка)). Ссылку на товар не вставляй в текст — её прикрепим отдельной кнопкой.

Верни ТОЛЬКО текст поста, без пояснений.`

export async function generateProductPost(
  meta: ProductMeta,
  feedback?: string,
  previous?: string,
): Promise<string> {
  const facts = [
    `Ссылка: ${meta.url}`,
    meta.title ? `Название: ${meta.title}` : "",
    meta.description ? `Описание: ${meta.description}` : "",
    meta.pageText ? `Текст со страницы товара:\n${meta.pageText.slice(0, 3500)}` : "",
  ]
    .filter(Boolean)
    .join("\n")

  const content =
    feedback && previous
      ? `Данные о товаре:\n${facts}\n\nТекущий пост:\n${previous}\n\n---\nПерепиши пост с учётом правок: «${feedback}». Верни только текст поста.`
      : `Данные о товаре:\n${facts}\n\nНапиши пост для канала. Верни только текст поста.`

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 2000,
    system: PRODUCT_SYSTEM,
    messages: [{ role: "user", content }],
  })

  const textBlock = response.content.find((b) => b.type === "text")
  if (!textBlock || textBlock.type !== "text") throw new Error("Пустой ответ от Claude")
  return textBlock.text.trim()
}
