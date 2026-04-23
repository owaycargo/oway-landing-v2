/**
 * Affiliate link infrastructure для OWAY CARGO.
 *
 * Оборачивает исходящие ссылки на магазины партнёрскими тегами.
 * Если env-переменная не задана — возвращает исходный URL без изменений.
 *
 * Настройка: см. content-docs/affiliate-setup.md
 */

type AffiliateProgram = {
  matches: (url: string) => boolean
  transform: (url: string) => string
}

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG
const EBAY_CAMPID = process.env.NEXT_PUBLIC_EBAY_CAMPAIGN_ID

const programs: AffiliateProgram[] = [
  // Amazon Associates
  {
    matches: (url) => /(?:^|\.)amazon\.com/i.test(new URL(url).hostname),
    transform: (url) => {
      if (!AMAZON_TAG) return url
      try {
        const u = new URL(url)
        u.searchParams.set("tag", AMAZON_TAG)
        return u.toString()
      } catch {
        return url
      }
    },
  },
  // eBay Partner Network (EPN)
  {
    matches: (url) => /(?:^|\.)ebay\.com/i.test(new URL(url).hostname),
    transform: (url) => {
      if (!EBAY_CAMPID) return url
      try {
        const u = new URL(url)
        u.searchParams.set("campid", EBAY_CAMPID)
        u.searchParams.set("mkcid", "1")
        u.searchParams.set("mkrid", "711-53200-19255-0")
        u.searchParams.set("siteid", "0")
        u.searchParams.set("customid", "owaysite")
        u.searchParams.set("toolid", "10001")
        u.searchParams.set("mkevt", "1")
        return u.toString()
      } catch {
        return url
      }
    },
  },
]

export function affiliateUrl(url: string): string {
  if (!url) return url
  try {
    const program = programs.find((p) => {
      try {
        return p.matches(url)
      } catch {
        return false
      }
    })
    return program ? program.transform(url) : url
  } catch {
    return url
  }
}

export function isAffiliateEnabled(): boolean {
  return Boolean(AMAZON_TAG || EBAY_CAMPID)
}
