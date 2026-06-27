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
  card_description: string
  body: string
}

const SYSTEM = `Ты — опытный контент-маркетолог компании OwayCargo.
OwayCargo — сервис доставки посылок из США в страны СНГ (Кыргызстан, Казахстан, Узбекистан, Россия, Беларусь): виртуальный адрес в США, выкуп товаров, консолидация, трекинг, страхование.

Твоя задача — написать готовую SEO-статью для раздела «Новости» на сайте по заданной теме и категории.

Требования к статье:
- Язык: русский, живой и понятный, без канцелярита и «воды».
- Объём: 500–900 слов.
- Формат: Markdown. Используй ## подзаголовки, **жирный** для акцентов, маркированные списки, где уместно.
- Структура: цепляющее вступление → 2–4 смысловых блока с подзаголовками → практический вывод/призыв.
- Тон по категории: how-to/советы — пошагово и полезно; новости — информативно; акции — продающе; обзор — экспертно.
- Ненавязчиво упоминай преимущества OwayCargo там, где это уместно (виртуальный адрес, выкуп, страхование, трекинг), без агрессивной рекламы.
- Не выдумывай конкретные цены, сроки и цифры, если их нет в теме — пиши обтекаемо («от нескольких дней», «выгодные тарифы»).
- Не вставляй заголовок H1 (он берётся отдельно). Начинай сразу с вступления или первого ## подзаголовка.

Также напиши card_description — краткое описание для карточки статьи: 1–2 предложения, до 200 символов, цепляющее.`

const SCHEMA = {
  type: "object",
  properties: {
    card_description: {
      type: "string",
      description: "Краткое описание для карточки, до 200 символов",
    },
    body: {
      type: "string",
      description: "Полный текст статьи в Markdown",
    },
  },
  required: ["card_description", "body"],
  additionalProperties: false,
}

export async function generateArticle(input: GenerateInput): Promise<GeneratedArticle> {
  const userContent =
    input.feedback && input.previousBody
      ? `Заголовок статьи: ${input.title}\nКатегория: ${input.category}\n\n` +
        `Текущая версия статьи:\n\n${input.previousBody}\n\n` +
        `---\nПерепиши статью с учётом правок: «${input.feedback}»\n` +
        `Сохрани тему, но примени правки. Верни обновлённую статью и краткое описание для карточки.`
      : `Заголовок статьи: ${input.title}\nКатегория: ${input.category}\n\nНапиши статью и краткое описание для карточки.`

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
    card_description: (parsed.card_description ?? "").slice(0, 300),
    body: parsed.body.trim(),
  }
}
