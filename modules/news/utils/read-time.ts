export function calculateReadTime(text: string | null | undefined): number {
  if (!text) return 1
  const plainText = text
    .replace(/[#*`_~[\]()]/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "$1")
  const words = plainText.split(/\s+/).filter(Boolean)
  return Math.max(1, Math.ceil(words.length / 220))
}
