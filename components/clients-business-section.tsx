"use client"
import { User, Briefcase, ShoppingBag, Package, BarChart, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ClientsBusinessSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24 bg-slate-50">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Для кого подходит наш сервис</h2>
      </div>

      <Tabs defaultValue="clients" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 min-h-14 h-auto py-2 md:h-14 md:py-[3px] mb-4 rounded-2xl">
          <TabsTrigger value="clients" className="text-xs md:text-lg rounded-xl h-auto min-h-10 min-w-0 py-2 px-2 md:px-3 whitespace-normal text-center leading-tight flex items-center justify-center gap-1.5 md:gap-2 [&_svg]:shrink-0">
            <User className="w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="min-w-0">Для частных клиентов</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="text-xs md:text-lg rounded-xl h-auto min-h-10 min-w-0 py-2 px-2 md:px-3 whitespace-normal text-center leading-tight flex items-center justify-center gap-1.5 md:gap-2 [&_svg]:shrink-0">
            <Briefcase className="w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="min-w-0">Для бизнеса и продавцов</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
          <p className="text-center text-slate-600 mb-6 text-sm md:text-base">
            Для личных покупок и отправок между США и странами СНГ
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Покупки в США</h3>
              <p className="text-sm md:text-base text-slate-600">
                Заказывайте товары из американских интернет-магазинов и брендов. Мы принимаем, проверяем и отправляем ваши заказы в страны СНГ.
              </p>
            </Card>

            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Личные посылки и подарки</h3>
              <p className="text-sm md:text-base text-slate-600">
                Отправляйте личные вещи, подарки и посылки родным и близким из США в страны СНГ — быстро и надёжно.
              </p>
            </Card>

            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Онлайн-отслеживание</h3>
              <p className="text-sm md:text-base text-slate-600">
                Отслеживайте статус посылки на каждом этапе доставки в личном кабинете.
              </p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business">
          <p className="text-center text-slate-600 mb-6 text-sm md:text-base">
            Для байеров, продавцов и компаний, работающих с США и СНГ
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Отправки для клиентов в СНГ</h3>
              <p className="text-sm md:text-base text-slate-600">
                Вы находитесь в США и отправляете товары своим клиентам в страны СНГ. Мы берём на себя логистику, консолидацию и доставку.
              </p>
            </Card>

            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Закупки из США под продажу</h3>
              <p className="text-sm md:text-base text-slate-600">
                Вы находитесь в СНГ и заказываете товары из США для своих покупателей. OWAY Cargo — ваш логистический партнёр в Америке.
              </p>
            </Card>

            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Решения для байеров и компаний</h3>
              <p className="text-sm md:text-base text-slate-600">
                Гибкие условия, регулярные отправки, работа с объёмами и поддержка бизнеса на всех этапах.
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
