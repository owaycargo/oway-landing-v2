import { Globe, Package, Zap, Bell } from "lucide-react"
import type { CategoryStyle } from "@/modules/news/types"

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "Новости компании": { bg: "bg-blue-100", text: "text-blue-700", icon: Globe },
  "Обновления доставки": {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: Package,
  },
  Акции: { bg: "bg-orange-100", text: "text-orange-700", icon: Zap },
  Объявления: { bg: "bg-purple-100", text: "text-purple-700", icon: Bell },
}

export const FALLBACK_STYLE: CategoryStyle = {
  bg: "bg-slate-100",
  text: "text-slate-600",
  icon: Globe,
}
