import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NewsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="h-10 w-3/4 mx-auto bg-slate-200 rounded-xl animate-pulse mb-4" />
          <div className="h-5 w-5/6 mx-auto bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-3 flex-wrap justify-center mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-24 bg-slate-200 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden"
            >
              <div className="h-48 bg-slate-200 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
