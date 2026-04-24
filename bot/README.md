# OWAY Content Bot

Telegram бот для публикации статей на сайт без GitHub и технических знаний.

## Как работает

```
Менеджер пишет боту → Бот собирает статью → /approve → Коммит в GitHub → Railway деплоит сайт (~2 мин)
```

## Запуск (Railway)

1. Создай новый сервис в Railway из этой папки (`/bot`)
2. Добавь переменные окружения из `.env.example`
3. Start command: `npm start`

## Настройка

### 1. Telegram Bot Token
- Напиши @BotFather в Telegram
- `/newbot` → дай имя → получи токен
- Вставь в `BOT_TOKEN`

### 2. Разрешённые пользователи
- Узнай свой Telegram ID через @userinfobot
- Вставь в `ALLOWED_USER_IDS` через запятую

### 3. GitHub Token
- GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained
- Выбери репо `oway-landing-v2`, разрешения: **Contents → Read and write**
- Вставь в `GITHUB_TOKEN`

## Команды бота

| Команда | Действие |
|---|---|
| `/new` | Начать новую статью |
| `/cancel` | Отменить текущую |
| `/help` | Инструкция |

## Категории

`how-to` · `новости` · `советы` · `акции` · `обзор`
