import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NewsArticleLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse mb-8" />
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            <article className="space-y-6">
              <div className="h-6 w-24 bg-slate-200 rounded-full animate-pulse" />
              <div className="h-12 w-full bg-slate-200 rounded-xl animate-pulse" />
              <div className="h-12 w-3/4 bg-slate-200 rounded-xl animate-pulse" />
              <div className="h-64 w-full bg-slate-200 rounded-2xl animate-pulse" />
              <div className="space-y-3 pt-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-slate-200 rounded animate-pulse"
                    style={{ width: `${70 + ((i * 13) % 30)}%` }}
                  />
                ))}
              </div>
            </article>
            <aside className="space-y-4">
              <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-4" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2"
                >
                  <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                </div>
              ))}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
