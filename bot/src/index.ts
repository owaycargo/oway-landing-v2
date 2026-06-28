import { Bot, InlineKeyboard, Keyboard } from "grammy"
import { commitPost } from "./github.ts"
import { slugify } from "./slugify.ts"
import { generateArticle } from "./ai.ts"

// ── Config ────────────────────────────────────────────────────────────────────

const BOT_TOKEN = process.env.BOT_TOKEN
if (!BOT_TOKEN) throw new Error("BOT_TOKEN is required")

// Allowed Telegram user IDs (comma-separated in env)
const ALLOWED_IDS = (process.env.ALLOWED_USER_IDS || "")
  .split(",")
  .map((s) => parseInt(s.trim()))
  .filter(Boolean)

const CATEGORIES = ["how-to", "новости", "советы", "акции", "обзор"]

// Ready-made topic ideas (tap instead of typing)
const TOPIC_IDEAS = [
  "Как выкупить товары с Amazon в страны СНГ",
  "Сколько идёт посылка из США и от чего зависит срок",
  "Что нельзя отправлять посылкой из США",
  "Как сэкономить на доставке: консолидация посылок",
  "Как работает виртуальный адрес в США",
  "Как отслеживать посылку из США до получения",
]

// Persistent menu shown at the bottom (no need to type /new)
const mainMenu = new Keyboard()
  .text("📝 Новая статья")
  .row()
  .text("❓ Помощь")
  .resized()
  .persistent()

// ── State machine ─────────────────────────────────────────────────────────────

type Step = "idle" | "title" | "mode" | "card_desc" | "category" | "body" | "preview" | "refine"

interface Draft {
  step: Step
  title?: string
  card_desc?: string
  category?: string
  body?: string
  aiMode?: boolean
  altTitles?: string[]
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function showHelp(ctx: any) {
  await ctx.reply(
    `📋 *Как добавить статью:*\n\n` +
    `1. Жми «📝 Новая статья» (или /new)\n` +
    `2. Выбери готовую тему или введи свою\n` +
    `3. Выбери режим:\n` +
    `   🤖 *AI* — выбираешь категорию, Claude пишет готовую статью\n` +
    `   ✍️ *Вручную* — пишешь описание и текст сам\n` +
    `4. Проверь полный текст → можно перегенерировать или изменить\n` +
    `5. Нажми ✅ Опубликовать\n\n` +
    `После публикации сайт обновляется автоматически (~2 мин).`,
    { parse_mode: "Markdown" }
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function startNewArticle(ctx: any) {
  const id = ctx.from!.id
  drafts.set(id, { step: "title" })
  const kb = new InlineKeyboard()
  TOPIC_IDEAS.forEach((t, i) => kb.text(t, `topic:${i}`).row())
  kb.text("✍️ Своя тема", "topic_custom")
  await ctx.reply(
    `📝 *Новая статья*\n\n💡 Выбери готовую тему или введи свою сообщением:`,
    { parse_mode: "Markdown", reply_markup: kb }
  )
}

bot.command("start", async (ctx) => {
  await ctx.reply(
    `👋 *OWAY CARGO — контент-бот*\n\n` +
    `Пишу готовые статьи через AI (Claude) 🤖\n\n` +
    `Жми кнопку «📝 Новая статья» внизу — и поехали.`,
    { parse_mode: "Markdown", reply_markup: mainMenu }
  )
})

bot.command("help", (ctx) => showHelp(ctx))

bot.command("cancel", async (ctx) => {
  const id = ctx.from!.id
  drafts.delete(id)
  await ctx.reply("❌ Отменено. Жми «📝 Новая статья» чтобы начать заново.", {
    reply_markup: mainMenu,
  })
})

bot.command("new", (ctx) => startNewArticle(ctx))

// Persistent-menu buttons (tap instead of typing commands)
bot.hears("📝 Новая статья", (ctx) => startNewArticle(ctx))
bot.hears("❓ Помощь", (ctx) => showHelp(ctx))

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
      draft.step = "mode"
      await ctx.reply(
        `✅ Заголовок: *${text}*\n\nКак подготовить статью?`,
        { parse_mode: "Markdown", reply_markup: modeKeyboard() }
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

    case "refine": {
      if (!draft.title || !draft.category || !draft.body) {
        await ctx.reply("Сначала сгенерируй статью через /new.")
        break
      }
      await ctx.reply("🤖 Дорабатываю статью через Claude... ~20-40 секунд.")
      try {
        const result = await generateArticle({
          title: draft.title,
          category: draft.category,
          feedback: text,
          previousBody: draft.body,
        })
        draft.title = result.title
        draft.altTitles = result.alt_titles
        draft.card_desc = result.card_description
        draft.body = result.body
        draft.step = "preview"
        await sendPreview(ctx, draft)
      } catch (err) {
        console.error(err)
        draft.step = "preview"
        await ctx.reply(`❌ Не удалось доработать (${String(err)}). Попробуй ещё раз.`)
      }
      break
    }

    default:
      await ctx.reply("Нажми кнопку или напиши /cancel.")
  }
})

// ── Callback: topic selection ───────────────────────────────────────────────────

function modeKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text("🤖 Сгенерировать через AI", "mode:ai")
    .row()
    .text("✍️ Написать самому", "mode:manual")
}

bot.callbackQuery(/^topic:(\d+)$/, async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft) { await ctx.answerCallbackQuery(); return }
  const title = TOPIC_IDEAS[parseInt(ctx.match[1])]
  if (!title) { await ctx.answerCallbackQuery(); return }
  draft.title = title
  draft.step = "mode"
  await ctx.answerCallbackQuery()
  await ctx.editMessageText(`✅ Тема: *${title}*\n\nКак подготовить статью?`, {
    parse_mode: "Markdown",
    reply_markup: modeKeyboard(),
  })
})

bot.callbackQuery(/^usetitle:(\d+)$/, async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || !draft.altTitles) { await ctx.answerCallbackQuery(); return }
  const t = draft.altTitles[parseInt(ctx.match[1])]
  if (!t) { await ctx.answerCallbackQuery(); return }
  draft.title = t
  await ctx.answerCallbackQuery("Заголовок обновлён ✅")
  const slug = slugify(t)
  await ctx.editMessageText(
    `📄 *Превью статьи*\n\n*Заголовок:* ${t}\n*Категория:* ${draft.category}\n*Описание:* ${draft.card_desc}\n*URL:* /news/${slug}\n\n✅ Заголовок выбран. Текст статьи — выше, кнопки действий — ниже.`,
    { parse_mode: "Markdown" }
  )
})

bot.callbackQuery("topic_custom", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft) { await ctx.answerCallbackQuery(); return }
  draft.step = "title"
  await ctx.answerCallbackQuery()
  await ctx.editMessageText("✍️ Введи свою тему/заголовок статьи сообщением:")
})

// ── Callback: mode selection (AI vs manual) ─────────────────────────────────────

function categoryKeyboard(): InlineKeyboard {
  const kb = new InlineKeyboard()
  CATEGORIES.forEach((cat, i) => {
    kb.text(cat, `cat:${cat}`)
    if (i % 2 === 1) kb.row()
  })
  return kb
}

bot.callbackQuery("mode:ai", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || draft.step !== "mode") {
    await ctx.answerCallbackQuery()
    return
  }
  draft.aiMode = true
  draft.step = "category"
  await ctx.answerCallbackQuery()
  await ctx.editMessageText("🤖 Режим AI.\n\nВыбери категорию — и я напишу статью:", {
    reply_markup: categoryKeyboard(),
  })
})

bot.callbackQuery("mode:manual", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || draft.step !== "mode") {
    await ctx.answerCallbackQuery()
    return
  }
  draft.aiMode = false
  draft.step = "card_desc"
  await ctx.answerCallbackQuery()
  await ctx.editMessageText(
    "✍️ Ручной режим.\n\nВведи краткое описание для карточки (1-2 предложения, до 200 символов):"
  )
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

  // AI mode — generate the article now
  if (draft.aiMode) {
    await ctx.answerCallbackQuery("Генерирую...")
    await ctx.editMessageText(
      `✅ Категория: *${draft.category}*\n\n🤖 Пишу статью через Claude... это займёт ~20-40 секунд.`,
      { parse_mode: "Markdown" }
    )
    try {
      const result = await generateArticle({ title: draft.title!, category: draft.category })
      draft.title = result.title
      draft.altTitles = result.alt_titles
      draft.card_desc = result.card_description
      draft.body = result.body
      draft.step = "preview"
      await sendPreview(ctx, draft)
    } catch (err) {
      console.error(err)
      draft.step = "body"
      await ctx.reply(
        `❌ Не удалось сгенерировать (${String(err)}).\n\nНапиши текст статьи вручную или попробуй /new ещё раз.`
      )
    }
    return
  }

  // Manual mode — ask for body
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

bot.callbackQuery("regen", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || !draft.title || !draft.category) {
    await ctx.answerCallbackQuery()
    return
  }
  await ctx.answerCallbackQuery("Генерирую заново...")
  await ctx.editMessageText("🤖 Переписываю статью через Claude... ~20-40 секунд.")
  try {
    const result = await generateArticle({ title: draft.title, category: draft.category })
    draft.title = result.title
    draft.altTitles = result.alt_titles
    draft.card_desc = result.card_description
    draft.body = result.body
    draft.step = "preview"
    await sendPreview(ctx, draft)
  } catch (err) {
    console.error(err)
    await ctx.reply(`❌ Не удалось перегенерировать (${String(err)}). Попробуй ещё раз.`)
  }
})

bot.callbackQuery("refine", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || !draft.body) { await ctx.answerCallbackQuery(); return }
  draft.step = "refine"
  await ctx.answerCallbackQuery()
  await ctx.editMessageText(
    "💬 Напиши, что изменить — я перепишу эту же статью с учётом правок.\n\n" +
    "Примеры: «сделай короче, для минутного чтения», «больше продающий», «добавь призыв в конце», «убери воду»."
  )
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
  const meta =
    `📄 *Превью статьи*\n\n` +
    `*Заголовок:* ${draft.title}\n` +
    `*Категория:* ${draft.category}\n` +
    `*Описание:* ${draft.card_desc}\n` +
    `*URL:* /news/${slug}`

  // Alternative title suggestions from Claude — tap to swap
  let metaKb: InlineKeyboard | undefined
  if (draft.aiMode && draft.altTitles && draft.altTitles.length > 0) {
    metaKb = new InlineKeyboard()
    draft.altTitles.forEach((t, i) => metaKb!.text(`📝 ${t}`.slice(0, 60), `usetitle:${i}`).row())
  }
  await ctx.reply(
    metaKb ? `${meta}\n\n💡 Или выбери другой заголовок:` : meta,
    { parse_mode: "Markdown", reply_markup: metaKb }
  )

  // Full article body, plain text, chunked (Telegram limit ~4096 chars/msg)
  const body = draft.body!.trim()
  for (let i = 0; i < body.length; i += 3800) {
    await ctx.reply(body.slice(i, i + 3800))
  }

  const kb = new InlineKeyboard()
    .text("✅ Опубликовать", "approve").row()
  if (draft.aiMode) {
    kb.text("💬 Доработать (комментарий)", "refine").row()
    kb.text("🔄 Перегенерировать", "regen").row()
  }
  kb.text("✏️ Изменить текст", "edit_body").text("🔄 Начать заново", "edit_all")

  await ctx.reply("👆 Это полный текст статьи. Что делаем?", { reply_markup: kb })
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
