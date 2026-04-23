"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"
import { affiliateUrl } from "@/lib/affiliate"

type Props = {
  marketplaceId: string
  url: string
}

export function ShopLinkButton({ marketplaceId, url }: Props) {
  const finalUrl = affiliateUrl(url)
  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="flex-1"
      onClick={() =>
        trackEvent("shop_visit", {
          marketplace_id: marketplaceId,
          location: "marketplace_page",
          affiliate: finalUrl !== url ? "yes" : "no",
        })
      }
    >
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-medium py-6">
        <ExternalLink className="w-5 h-5 mr-2" />
        Перейти на сайт магазина
      </Button>
    </a>
  )
}
