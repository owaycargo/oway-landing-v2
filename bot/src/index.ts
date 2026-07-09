import { Bot, InlineKeyboard, Keyboard, InputFile } from "grammy"
import { commitPost } from "./github.ts"
import { slugify } from "./slugify.ts"
import { generateArticle, generateProductPost, editImage } from "./ai.ts"
import type { InputImage } from "./ai.ts"

// Telegram channel to publish product posts to (e.g. @owaycargo_news or -100...)
const CHANNEL_ID = process.env.CHANNEL_ID

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

// Persistent menu shown at the bottom (no need to type commands)
const mainMenu = new Keyboard()
  .text("📝 Новая статья")
  .row()
  .text("🛍️ Пост о товаре")
  .text("🎨 Обработать фото")
  .row()
  .text("❓ Помощь")
  .resized()
  .persistent()

// ── State machine ─────────────────────────────────────────────────────────────

type Step =
  | "idle" | "title" | "mode" | "card_desc" | "category" | "body" | "preview" | "refine"
  | "product_url" | "product_refine"
  | "image_collect" | "image_refine"

interface Draft {
  step: Step
  title?: string
  card_desc?: string
  category?: string
  body?: string
  aiMode?: boolean
  altTitles?: string[]
  // product post
  productUrl?: string
  productImage?: string
  productPost?: string
  // image editing
  photos?: InputImage[]
  editedImage?: InputImage
}

const drafts = new Map<number, Draft>()

// ── Bot ───────────────────────────────────────────────────────────────────────

const bot = new Bot(BOT_TOKEN)

// Auth middleware
bot.use(async (ctx, next) => {
  // Only respond in private chats with the bot. Ignore channel posts and group
  // messages entirely — otherwise, once the bot is a channel admin, every post
  // triggers a "Нет доступа" reply straight into the channel (spam).
  if (ctx.chat?.type !== 'private') return
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
    `📋 *Что умеет бот:*\n\n` +
    `📝 *Новая статья* (для сайта)\n` +
    `1. Выбери готовую тему или введи свою\n` +
    `2. 🤖 AI пишет статью / ✍️ пишешь сам\n` +
    `3. Можно сменить заголовок, доработать комментарием\n` +
    `4. ✅ Опубликовать → сайт обновится (~2 мин)\n\n` +
    `🛍️ *Пост о товаре* (для канала)\n` +
    `1. Кинь ссылку на товар из США\n` +
    `2. Бот берёт фото + Claude пишет продающий пост\n` +
    `3. 💬 Доработать → ✅ Опубликовать в канал\n\n` +
    `🎨 *Обработать фото* (Gemini)\n` +
    `1. Пришли 1–4 фото\n` +
    `2. Напиши, что сделать (единый стиль, убрать фон…)\n` +
    `3. Получишь готовую картинку → 💬 доработать`,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function startProduct(ctx: any) {
  const id = ctx.from!.id
  drafts.set(id, { step: "product_url" })
  await ctx.reply(
    `🛍️ *Пост о товаре*\n\nКинь ссылку на товар из США (Amazon, Crocs, любой магазин) — я возьму фото и напишу продающий пост для канала.`,
    { parse_mode: "Markdown" }
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function startImage(ctx: any) {
  const id = ctx.from!.id
  drafts.set(id, { step: "image_collect", photos: [] })
  await ctx.reply(
    `🎨 *Обработать фото*\n\nПришли 1–4 фото (по одному или альбомом). Потом напиши, что сделать — например:\n` +
    `• «объедини в один кадр, единый стиль»\n` +
    `• «убери фон, поставь чистый студийный»\n` +
    `• «надень эти очки на модель»\n\n` +
    `Картинку сделает Google Gemini.`,
    { parse_mode: "Markdown" }
  )
}

bot.command("new", (ctx) => startNewArticle(ctx))
bot.command("product", (ctx) => startProduct(ctx))
bot.command("image", (ctx) => startImage(ctx))

// Persistent-menu buttons (tap instead of typing commands)
bot.hears("📝 Новая статья", (ctx) => startNewArticle(ctx))
bot.hears("🛍️ Пост о товаре", (ctx) => startProduct(ctx))
bot.hears("🎨 Обработать фото", (ctx) => startImage(ctx))
bot.hears("❓ Помощь", (ctx) => showHelp(ctx))

// Download a Telegram photo as base64
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function tgPhotoToBase64(ctx: any, fileId: string): Promise<InputImage> {
  const file = await ctx.api.getFile(fileId)
  const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`
  const res = await fetch(url)
  const buf = Buffer.from(await res.arrayBuffer())
  return { mimeType: "image/jpeg", data: buf.toString("base64") }
}

// Collect photos for the image-editing flow
bot.on("message:photo", async (ctx) => {
  const id = ctx.from!.id
  const draft = drafts.get(id)
  if (!draft || draft.step !== "image_collect") {
    await ctx.reply("Чтобы обработать фото — жми «🎨 Обработать фото».")
    return
  }
  if (!draft.photos) draft.photos = []
  if (draft.photos.length >= 4) {
    await ctx.reply("Уже 4 фото. Напиши, что сделать.")
    return
  }
  const sizes = ctx.message.photo
  const largest = sizes[sizes.length - 1]
  try {
    const img = await tgPhotoToBase64(ctx, largest.file_id)
    draft.photos.push(img)
    await ctx.reply(`📷 Фото ${draft.photos.length} принято. Пришли ещё (до 4) или напиши, что сделать.`)
  } catch (err) {
    console.error(err)
    await ctx.reply(`❌ Не смог скачать фото (${String(err)})`)
  }
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

    case "product_url": {
      if (!/^https?:\/\//i.test(text)) {
        await ctx.reply("Это не похоже на ссылку. Кинь ссылку на товар (начинается с http).")
        break
      }
      await ctx.reply("🔎 Открываю страницу товара и пишу пост через Claude... ~20-40 секунд.")
      try {
        const meta = await fetchProductMeta(text)
        const post = await generateProductPost({
          url: text,
          title: meta.ogTitle,
          description: meta.ogDescription,
          pageText: meta.pageText,
        })
        draft.productUrl = text
        draft.productImage = meta.ogImage
        draft.productPost = post
        draft.step = "preview"
        await sendProductPreview(ctx, draft)
      } catch (err) {
        console.error(err)
        drafts.delete(id)
        await ctx.reply(`❌ Не удалось обработать ссылку (${String(err)}). Попробуй другую или /product ещё раз.`)
      }
      break
    }

    case "product_refine": {
      if (!draft.productUrl || !draft.productPost) {
        await ctx.reply("Сначала пришли ссылку на товар через /product.")
        break
      }
      await ctx.reply("🤖 Дорабатываю пост... ~20 секунд.")
      try {
        const post = await generateProductPost(
          { url: draft.productUrl },
          text,
          draft.productPost,
        )
        draft.productPost = post
        draft.step = "preview"
        await sendProductPreview(ctx, draft)
      } catch (err) {
        console.error(err)
        draft.step = "preview"
        await ctx.reply(`❌ Не удалось доработать (${String(err)}). Попробуй ещё раз.`)
      }
      break
    }

    case "image_collect": {
      if (!draft.photos || draft.photos.length === 0) {
        await ctx.reply("Сначала пришли хотя бы одно фото.")
        break
      }
      await ctx.reply(`🎨 Обрабатываю ${draft.photos.length} фото через Gemini... ~20-40 секунд.`)
      try {
        const prompt =
          `Профессиональное брендовое изображение для OwayCargo (доставка товаров из США в страны СНГ). ` +
          `Объедини/обработай присланные фото в единый чистый рекламный стиль, аккуратно и реалистично. ` +
          `Задача: ${text}`
        const out = await editImage(draft.photos, prompt)
        draft.editedImage = out
        draft.step = "preview"
        await sendImageResult(ctx, draft)
      } catch (err) {
        console.error(err)
        draft.step = "image_collect"
        await ctx.reply(`❌ Не удалось обработать (${String(err)}). Попробуй другую инструкцию или фото.`)
      }
      break
    }

    case "image_refine": {
      if (!draft.editedImage) {
        await ctx.reply("Сначала обработай фото.")
        break
      }
      await ctx.reply("🎨 Дорабатываю картинку... ~20-40 секунд.")
      try {
        const out = await editImage(
          [draft.editedImage],
          `Доработай это изображение для бренда OwayCargo: ${text}`,
        )
        draft.editedImage = out
        draft.step = "preview"
        await sendImageResult(ctx, draft)
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

// ── Product post callbacks ──────────────────────────────────────────────────────

bot.callbackQuery("pub_channel", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || !draft.productPost) { await ctx.answerCallbackQuery(); return }
  if (!CHANNEL_ID) {
    await ctx.answerCallbackQuery()
    await ctx.reply(
      "⚠️ Канал не настроен. Нужно: 1) добавить бота админом в канал, 2) задать переменную CHANNEL_ID (@username канала или -100…).\n\nПока можешь скопировать текст поста выше и опубликовать вручную."
    )
    return
  }
  await ctx.answerCallbackQuery("Публикую в канал...")
  try {
    const post = draft.productPost
    if (draft.productImage) {
      await ctx.api.sendPhoto(CHANNEL_ID, draft.productImage, { caption: post.slice(0, 1024) })
      if (post.length > 1024) await ctx.api.sendMessage(CHANNEL_ID, post.slice(1024))
    } else {
      await ctx.api.sendMessage(CHANNEL_ID, post)
    }
    drafts.delete(id)
    await ctx.editMessageText("🚀 Опубликовано в канал!")
  } catch (err) {
    console.error(err)
    await ctx.reply(`❌ Не удалось опубликовать (${String(err)}). Проверь, что бот — админ канала и CHANNEL_ID верный.`)
  }
})

bot.callbackQuery("img_refine", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || !draft.editedImage) { await ctx.answerCallbackQuery(); return }
  draft.step = "image_refine"
  await ctx.answerCallbackQuery()
  await ctx.reply("💬 Напиши, что поправить на картинке (например: «фон светлее», «добавь логотип», «убери лишнее»).")
})

bot.callbackQuery("img_regen", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || !draft.photos || draft.photos.length === 0) { await ctx.answerCallbackQuery(); return }
  draft.step = "image_collect"
  await ctx.answerCallbackQuery()
  await ctx.reply("🔄 Ок. Напиши инструкцию заново — переделаю из исходных фото. (Или пришли другие фото.)")
})

bot.callbackQuery("prod_refine", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || !draft.productPost) { await ctx.answerCallbackQuery(); return }
  draft.step = "product_refine"
  await ctx.answerCallbackQuery()
  await ctx.reply(
    "💬 Напиши, что изменить в посте (например: «короче», «больше про цену», «добавь юмора»). Перепишу."
  )
})

bot.callbackQuery("prod_regen", async (ctx) => {
  const id = ctx.from.id
  const draft = drafts.get(id)
  if (!draft || !draft.productUrl) { await ctx.answerCallbackQuery(); return }
  await ctx.answerCallbackQuery("Переписываю...")
  await ctx.reply("🤖 Переписываю пост заново... ~20 секунд.")
  try {
    const meta = await fetchProductMeta(draft.productUrl)
    const post = await generateProductPost({
      url: draft.productUrl,
      title: meta.ogTitle,
      description: meta.ogDescription,
      pageText: meta.pageText,
    })
    draft.productImage = meta.ogImage
    draft.productPost = post
    draft.step = "preview"
    await sendProductPreview(ctx, draft)
  } catch (err) {
    console.error(err)
    await ctx.reply(`❌ Не удалось переписать (${String(err)}).`)
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendImageResult(ctx: any, draft: Draft) {
  const buf = Buffer.from(draft.editedImage!.data, "base64")
  const kb = new InlineKeyboard()
    .text("💬 Доработать", "img_refine")
    .text("🔄 Заново", "img_regen")
  await ctx.replyWithPhoto(new InputFile(buf, "oway.png"), {
    caption: "🎨 Готово! Скачай картинку или доработай.",
    reply_markup: kb,
  })
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

async function fetchProductMeta(url: string): Promise<{
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  pageText?: string
}> {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36",
      "accept-language": "ru,en;q=0.9",
    },
    redirect: "follow",
  })
  const html = await res.text()

  const metaContent = (prop: string): string | undefined => {
    const m =
      html.match(
        new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)["']`, "i")
      ) ||
      html.match(
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${prop}["']`, "i")
      )
    return m ? decodeEntities(m[1]) : undefined
  }

  const ogImage = metaContent("og:image") || metaContent("twitter:image")
  const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]
  const ogTitle = metaContent("og:title") || (titleTag ? decodeEntities(titleTag) : undefined)
  const ogDescription = metaContent("og:description") || metaContent("description")

  const pageText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 4000)

  return { ogImage, ogTitle, ogDescription, pageText }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendProductPreview(ctx: any, draft: Draft) {
  const kb = new InlineKeyboard()
    .text("✅ Опубликовать в канал", "pub_channel").row()
    .text("💬 Доработать", "prod_refine")
    .text("🔄 Заново", "prod_regen")

  const post = draft.productPost!
  if (draft.productImage) {
    try {
      await ctx.replyWithPhoto(draft.productImage, { caption: post.slice(0, 1024) })
      if (post.length > 1024) await ctx.reply(post.slice(1024))
    } catch {
      // Image URL not accepted by Telegram — fall back to text
      await ctx.reply(post)
    }
  } else {
    await ctx.reply("⚠️ Не нашёл фото на странице — пост без картинки.\n\n" + post)
  }
  await ctx.reply("👆 Так выглядит пост. Что делаем?", { reply_markup: kb })
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
