"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsaPanel } from "./usa-panel"
import { CisPanel } from "./cis-panel"

type TabValue = "usa" | "cis"

export function PickupPointsTabs({ initialTab }: { initialTab: TabValue }) {
  const [value, setValue] = useState<TabValue>(initialTab)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const param = searchParams.get("pickup")
    if (param === "usa" || param === "cis") {
      if (param !== value) setValue(param)
    }
  }, [searchParams, value])

  const handleChange = useCallback(
    (next: string) => {
      if (next !== "usa" && next !== "cis") return
      setValue(next)
      const params = new URLSearchParams(searchParams.toString())
      params.set("pickup", next)
      router.replace(`?${params.toString()}#pickup`, { scroll: false })
    },
    [router, searchParams],
  )

  return (
    <Tabs value={value} onValueChange={handleChange} className="w-full">
      <TabsList
        className="grid grid-cols-2 w-full max-w-xl mx-auto h-auto p-1.5 bg-slate-100 rounded-2xl mb-10"
        aria-label="Выбор страны пункта приёма или выдачи"
      >
        <TabsTrigger
          value="usa"
          className="h-12 md:h-14 rounded-xl text-sm md:text-base font-bold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 text-slate-600 flex items-center gap-2"
        >
          <span className="text-xl md:text-2xl" aria-hidden>🇺🇸</span>
          <span>Отправить из США</span>
        </TabsTrigger>
        <TabsTrigger
          value="cis"
          className="h-12 md:h-14 rounded-xl text-sm md:text-base font-bold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-orange-700 text-slate-600 flex items-center gap-2"
        >
          <span className="text-xl md:text-2xl" aria-hidden>🌍</span>
          <span>Получить в СНГ</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="usa" forceMount className="data-[state=inactive]:hidden">
        <UsaPanel />
      </TabsContent>
      <TabsContent value="cis" forceMount className="data-[state=inactive]:hidden">
        <CisPanel />
      </TabsContent>
    </Tabs>
  )
}
