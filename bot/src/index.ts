import { Bot, InlineKeyboard } from "grammy"
import { commitPost } from "./github.ts"
import { slugify } from "./slugify.ts"

// ── Config ────────────────────────────────────────────────────────────────────

const BOT_TOKEN = process.env.BOT_TOKEN
if (!BOT_TOKEN) throw new Error("BOT_TOKEN is required")

// Allowed Telegram user IDs (comma-separated in env)
const ALLOWED_IDS = (process.env.ALLOWED_USER_IDS || "")
  .split(",")
  .map((s) => parseInt(s.trim()))
  .filter(Boolean)

const CATEGORIES = ["how-to", "новости", "советы", "акции", "обзор"]

// ── State machine ─────────────────────────────────────────────────────────────

type Step = "idle" | "title" | "card_desc" | "category" | "body" | "preview"

interface Draft {
  step: Step
  title?: string
  card_desc?: string
  category?: string
  body?: string
}

const drafts = new Map<number, Draft>()

// ── Bot ───────────────────────────────────────────────────────────────────────

const bot = new Bot(BOT_TOKEN)

// Auth middleware
bot.use(async (ctx, next) => {
  const id = ctx.from?.id
  if (!id || (ALLOWED_IDS.length > 0 && !ALLOWED_IDS.includes(id))) {
    await ctx.reply("⛔️ Нет доступа.")
    return
  }
  await next()
})

// ── Commands ──────────────────────────────────────────────────────────────────

bot.command("start", async (ctx) => {
  await ctx.reply(
    `👋 *OWAY CARGO — контент-бот*\n\n` +
    `Команды:\n` +
    `/new — написать новую статью\n` +
    `/cancel — отменить текущую\n` +
    `/help — показать это сообщение`,
    { parse_mode: "Markdown" }
  )
})

bot.command("help", async (ctx) => {
  await ctx.reply(
    `📋 *Как добавить статью:*\n\n` +
    `1. /new — начать\n` +
    `2. Введи заголовок\n` +
    `3. Введи краткое описание (для карточки)\n` +
    `4. Выбери категорию\n` +
    `5. Напиши текст статьи (поддерживается Markdown: **жирный**, *курсив*, ## заголовок)\n` +
    `6. Нажми ✅ Опубликовать\n\n` +
    `После публикации сайт обновляется автоматически (~2 мин).`,
    { parse_mode: "Markdown" }
  )
})

bot.command("cancel", async (ctx) => {
  const id = ctx.from!.id
  drafts.delete(id)
  await ctx.reply("❌ Отменено. Напиши /new чтобы начать заново.")
})

bot.command("new", async (ctx) => {
  const id = ctx.from!.id
  drafts.set(id, { step: "title" })
  await ctx.reply(
    `📝 *Новая статья*\n\nШаг 1/4 — Введи заголовок статьи:`,
    { parse_mode: "Markdown" }
  )
})

// ── Message handler ───────────────────────────────────────────────────────────

bot.on("message:text", async (ctx) => {
  const id = ctx.from!.id
  const text = ctx.message.text.trim()
  const draft = drafts.get(id)

  if (!draft || draft.step === "idle") {
    await ctx.reply("Напиши /new чтобы начать новую статью.")
    return
  }

  if (text === "/cancel") return // handled by command

  switch (draft.step) {
    case "title": {
      draft.title = text
      draft.step = "card_desc"
      await ctx.reply(
        `✅ Заголовок: *${text}*\n\nШаг 2/4 — Краткое описание для карточки (1-2 предложения, до 200 символов):`,
        { parse_mode: "Markdown" }
      )
      break
    }

    case "card_desc": {
      draft.card_desc = text.slice(0, 300)
      draft.step = "category"

      const kb = new InlineKeyboard()
      CATEGORIES.forEach((cat, i) => {
        kb.text(cat, `cat:${cat}`)
        if (i % 2 === 1) kb.row()
      })

      await ctx.reply(
        `✅ Описание сохранено.\n\nШаг 3/4 — Выбери категорию:`,
        { reply_markup: kb }
      )
      break
    }

    case "body": {
      draft.body = text
      draft.step = "preview"
      await sendPreview(ctx, draft)
      break
    }

    default:
      await ctx.reply("Нажми кнопку или напиши /cancel.")
  }
})

// ── Callback: category selection ──────────────────────────────────────────────

bot.callbackQuery(/^cat:(.+)$/, async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || draft.step !== "category") {
    await ctx.answerCallbackQuery()
    return
  }

  draft.category = ctx.match[1]
  draft.step = "body"
  await ctx.answerCallbackQuery()
  await ctx.editMessageText(
    `✅ Категория: *${draft.category}*\n\nШаг 4/4 — Напиши текст статьи.\n\nПоддерживается Markdown:\n• \`**жирный**\`\n• \`*курсив*\`\n• \`## Заголовок\`\n• \`- список\`\n• Ссылки: \`[текст](url)\``,
    { parse_mode: "Markdown" }
  )
})

// ── Callback: approve / edit ──────────────────────────────────────────────────

bot.callbackQuery("approve", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || draft.step !== "preview") {
    await ctx.answerCallbackQuery()
    return
  }

  await ctx.answerCallbackQuery("Публикую...")
  await ctx.editMessageText("⏳ Публикую статью...")

  try {
    const filename = buildFilename(draft.title!)
    const content = buildMarkdown(draft)
    const url = await commitPost(filename, content)

    drafts.delete(id)
    await ctx.editMessageText(
      `🚀 *Статья опубликована!*\n\n` +
      `Сайт обновится через ~2 минуты.\n` +
      `👉 ${url}`,
      { parse_mode: "Markdown" }
    )
  } catch (err) {
    console.error(err)
    await ctx.editMessageText(
      `❌ Ошибка при публикации. Попробуй ещё раз или напиши разработчику.\n\nОшибка: ${String(err)}`
    )
  }
})

bot.callbackQuery("edit_body", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft) { await ctx.answerCallbackQuery(); return }

  draft.step = "body"
  await ctx.answerCallbackQuery()
  await ctx.editMessageText("✏️ Отправь новый текст статьи:")
})

bot.callbackQuery("edit_all", async (ctx) => {
  const id = ctx.from.id
  drafts.set(id, { step: "title" })
  await ctx.answerCallbackQuery()
  await ctx.editMessageText("🔄 Начинаем сначала. Введи заголовок:")
})

// ── Helpers ───────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendPreview(ctx: any, draft: Draft) {
  const slug = slugify(draft.title!)
  const preview =
    `📄 *Превью статьи*\n\n` +
    `*Заголовок:* ${draft.title}\n` +
    `*Категория:* ${draft.category}\n` +
    `*Описание:* ${draft.card_desc}\n` +
    `*URL:* /news/${slug}\n\n` +
    `*Текст (начало):*\n${draft.body!.slice(0, 300)}${draft.body!.length > 300 ? "..." : ""}`

  const kb = new InlineKeyboard()
    .text("✅ Опубликовать", "approve").row()
    .text("✏️ Изменить текст", "edit_body")
    .text("🔄 Начать заново", "edit_all")

  await ctx.reply(preview, { parse_mode: "Markdown", reply_markup: kb })
}

function buildFilename(title: string): string {
  const date = new Date().toISOString().slice(0, 10)
  const slug = slugify(title)
  return `${date}-${slug}.md`
}

function buildMarkdown(draft: Draft): string {
  const slug = slugify(draft.title!)
  const date = new Date().toISOString().slice(0, 10)

  return [
    `---`,
    `date: ${date}`,
    `title: "${draft.title}"`,
    `card_description: "${draft.card_desc}"`,
    `slug: ${slug}`,
    `category: ${draft.category}`,
    `---`,
    ``,
    draft.body!.trim(),
    ``,
  ].join("\n")
}

// ── Start ─────────────────────────────────────────────────────────────────────

bot.start()
console.log("🤖 OWAY content bot is running...")
