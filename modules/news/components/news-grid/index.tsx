import type { NewsItem } from "@/modules/news/types"
import { NewsCard } from "@/modules/news/components/news-card"

interface NewsGridProps {
  items: NewsItem[]
}

export function NewsGrid({ items }: NewsGridProps) {
  return (
    <div className="max-w-5xl mx-auto mb-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
