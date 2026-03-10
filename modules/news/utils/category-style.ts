import type { CategoryStyle } from "@/modules/news/types"
import { CATEGORY_STYLES, FALLBACK_STYLE } from "./constants"

export function getCategoryStyle(name: string): CategoryStyle {
  return CATEGORY_STYLES[name] ?? FALLBACK_STYLE
}
