import Anthropic from "@anthropic-ai/sdk"

// Reads ANTHROPIC_API_KEY from the environment.
const client = new Anthropic()

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
