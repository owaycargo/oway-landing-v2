"use client"

import { createContext, useContext, useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { trackEvent } from "@/lib/analytics"

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

const TELEGRAM_OPTIONS = [
  { id: "channel", title: "OWAY CARGO — Новости и акции", handle: "@owaycargo", href: "https://t.me/owaycargo" },
  { id: "manager_sng", title: "Менеджер по СНГ", handle: "@owaymanagersng", href: "https://t.me/owaymanagersng" },
  { id: "manager_usa", title: "Менеджер по США", handle: "@owaymanagerusa", href: "https://t.me/owaymanagerusa" },
]

type TelegramDialogContextValue = {
  openTelegram: () => void
}

const TelegramDialogContext = createContext<TelegramDialogContextValue | null>(null)

export function useTelegramDialog() {
  const ctx = useContext(TelegramDialogContext)
  if (!ctx) throw new Error("useTelegramDialog must be used within TelegramDialogProvider")
  return ctx
}

export function TelegramDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openTelegram = useCallback(() => {
    trackEvent("dialog_open", { channel: "telegram" })
    setOpen(true)
  }, [])

  return (
    <TelegramDialogContext.Provider value={{ openTelegram }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-200 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Написать в Telegram</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 pt-2">
            {TELEGRAM_OPTIONS.map((option) => (
              <a
                key={option.href}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("contact_click", {
                    channel: "telegram",
                    option_id: option.id,
                  })
                }
                className="flex items-start gap-3 p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#0088cc]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <TelegramIcon className="w-5 h-5 text-[#0088cc]" />
                </div>
                <div className="text-left min-w-0">
                  <div className="font-medium text-white">{option.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{option.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </TelegramDialogContext.Provider>
  )
}
