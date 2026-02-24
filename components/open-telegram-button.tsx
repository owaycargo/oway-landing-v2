"use client"

import { Button } from "@/components/ui/button"
import { useTelegramDialog } from "@/components/telegram-dialog-provider"

export function OpenTelegramButton() {
  const { openTelegram } = useTelegramDialog()
  return (
    <Button
      size="lg"
      className="bg-[#0088cc] hover:bg-[#0077b5]"
      onClick={openTelegram}
    >
      Написать
    </Button>
  )
}
