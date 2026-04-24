import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Guide {
  href: string
  logo: string
  name: string
  description: string
  badge: string
}

const ALL_GUIDES: Guide[] = [
  {
    href: "/guides/amazon",
    logo: "🛒",
    name: "Amazon",
    badge: "Самый популярный",
    description: "Prime, Amazon Basics −40%, A-to-z Guarantee",
  },
  {
    href: "/guides/ebay",
    logo: "🔖",
    name: "eBay",
    badge: "Б/у и редкие товары",
    description: "Аукционы, Best Offer, брендовые вещи по $1",
  },
  {
    href: "/guides/walmart",
    logo: "🏪",
    name: "Walmart",
    badge: "Дешевле Amazon",
    description: "Детские товары, Equate бренд, Walmart+",
  },
  {
    href: "/guides/iherb",
    logo: "🌿",
    name: "iHerb",
    badge: "Витамины и БАДы",
    description: "−20% новым, Rewards 5%, Daily Deals",
  },
  {
    href: "/guides/shein",
    logo: "👗",
    name: "SHEIN",
    badge: "Одежда и мода",
    description: "Скидки до 90%, промокоды, таблица размеров",
  },
]

interface RelatedGuidesProps {
  currentHref: string
}

export function RelatedGuides({ currentHref }: RelatedGuidesProps) {
  const related = ALL_GUIDES.filter((g) => g.href !== currentHref).slice(0, 3)

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Другие гайды по шопингу</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {related.map((g) => (
          <Link key={g.href} href={g.href} className="group block">
            <Card className="h-full p-5 border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{g.logo}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900">{g.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">{g.badge}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{g.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
