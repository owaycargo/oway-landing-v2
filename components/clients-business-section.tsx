"use client"
import { User, Briefcase, ShoppingBag, Package, BarChart, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ClientsBusinessSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24 bg-slate-50">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Для кого наш сервис</h2>
      </div>

      <Tabs defaultValue="clients" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 h-12 md:h-14 mb-8 rounded-2xl">
          <TabsTrigger value="clients" className="text-sm md:text-lg rounded-xl">
            <User className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
            Для клиентов
          </TabsTrigger>
          <TabsTrigger value="business" className="text-sm md:text-lg rounded-xl">
            <Briefcase className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
            Для PRO / бизнеса
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Покупки в США</h3>
              <p className="text-sm md:text-base text-slate-600">
                Заказывайте товары из американских интернет-магазинов и отправляйте через OWAY Cargo
              </p>
            </Card>

            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Личные посылки</h3>
              <p className="text-sm md:text-base text-slate-600">Отправляйте подарки и личные вещи родным и близким в СНГ</p>
            </Card>

            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Онлайн-отслеживание</h3>
              <p className="text-sm md:text-base text-slate-600">Следите за статусом посылки в режиме реального времени</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Оптовые отправки</h3>
              <p className="text-sm md:text-base text-slate-600">Специальные тарифы для регулярных и крупных отправлений</p>
            </Card>

            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Bulk-заказы</h3>
              <p className="text-sm md:text-base text-slate-600">Обработка больших объёмов грузов с персональным менеджером</p>
            </Card>

            <Card className="p-6 rounded-3xl border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Рабочие чаты</h3>
              <p className="text-sm md:text-base text-slate-600">Прямая связь с командой через Telegram для бизнес-клиентов</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
