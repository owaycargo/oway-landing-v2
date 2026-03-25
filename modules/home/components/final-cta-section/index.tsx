import { ArrowRight, MessageCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FinalCtaSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl text-white text-center shadow-2xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
          Готовы отправить посылку из США?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Начните отправку прямо сейчас или получите консультацию нашего специалиста
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://client.owaycargo.com" target="_blank" rel="noopener noreferrer">
            <Button className="h-14 px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-lg font-semibold">
              Оформить посылку
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <a href="https://client.owaycargo.com" target="_blank" rel="noopener noreferrer">
            <Button className="h-14 px-8 bg-white hover:bg-slate-100 text-blue-600 rounded-2xl text-lg font-semibold">
              Получить консультацию
              <MessageCircle className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </Card>
    </section>
  )
}
