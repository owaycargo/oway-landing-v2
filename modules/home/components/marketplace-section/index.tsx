"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { categories, marketplaces } from "@/lib/marketplaces"

export function MarketplaceSection() {
  const [activeTab, setActiveTab] = useState("marketplaces")
  const filteredMarketplaces = marketplaces.filter((m) => m.category === activeTab)

  return (
    <section id="marketplace" className="w-full max-w-[1440px] mx-auto px-[15px] py-16 md:py-24">
      <div className="text-center mb-12 flex flex-col items-center">
        <img
          src="/mascots/mascot-love.png"
          alt=""
          aria-hidden
          className="w-24 md:w-32 h-auto mb-4 drop-shadow-[0_15px_25px_rgba(15,23,42,0.15)]"
        />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Где покупать товары</h2>
        <p className="text-lg text-slate-600 max-w-4xl mx-auto">
          Сотни американских магазинов и миллионы товаров, которые в странах СНГ не продаются или стоят значительно дороже, вы можете заказать через OWAY CARGO по реальным ценам из США.
        </p>
        <p className="text-lg text-slate-600 max-w-4xl mx-auto mt-4">
          Выбирайте и наслаждайтесь онлайн-шопингом в США — ниже представлена подборка лучших и проверенных магазинов.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent h-auto p-0">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-6 py-3 rounded-xl text-base font-medium data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none border-b-2 border-transparent hover:text-slate-700 transition-colors cursor-pointer"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMarketplaces.map((marketplace) => (
              <Card key={marketplace.id} className="p-6 rounded-3xl border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-white">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center mb-4 shadow-sm overflow-hidden">
                    <div className="text-xs font-bold text-slate-700 px-2 text-center leading-tight">
                      {marketplace.logo === "ebay" && <span className="text-blue-600" style={{ fontSize: "14px" }}>eBay</span>}
                      {marketplace.logo === "amazon" && <span className="text-orange-700" style={{ fontSize: "12px" }}>amazon</span>}
                      {marketplace.logo === "walmart" && <span className="text-blue-600" style={{ fontSize: "11px" }}>Walmart</span>}
                      {marketplace.logo === "newegg" && <span className="text-orange-700" style={{ fontSize: "12px" }}>Newegg</span>}
                      {marketplace.logo === "macys" && <span className="text-red-600" style={{ fontSize: "13px" }}>Macy&apos;s</span>}
                      {marketplace.logo === "nordstrom" && <span className="text-slate-800" style={{ fontSize: "11px" }}>Nordstrom</span>}
                      {marketplace.logo === "target" && <span className="text-red-600" style={{ fontSize: "13px" }}>Target</span>}
                      {marketplace.logo === "kohls" && <span className="text-blue-600" style={{ fontSize: "13px" }}>Kohl&apos;s</span>}
                      {marketplace.logo === "zara" && <span className="text-slate-900" style={{ fontSize: "16px" }}>ZARA</span>}
                      {marketplace.logo === "hm" && <span className="text-red-600" style={{ fontSize: "18px", fontWeight: "900" }}>H&M</span>}
                      {marketplace.logo === "gap" && <span className="text-blue-600" style={{ fontSize: "16px" }}>GAP</span>}
                      {marketplace.logo === "oldnavy" && <span className="text-blue-600" style={{ fontSize: "11px" }}>Old Navy</span>}
                      {marketplace.logo === "nike" && <span className="text-slate-900" style={{ fontSize: "14px", fontWeight: "900" }}>NIKE</span>}
                      {marketplace.logo === "adidas" && <span className="text-slate-900" style={{ fontSize: "12px" }}>adidas</span>}
                      {marketplace.logo === "footlocker" && <span className="text-blue-600" style={{ fontSize: "10px" }}>Foot Locker</span>}
                      {marketplace.logo === "dsw" && <span className="text-orange-700" style={{ fontSize: "14px", fontWeight: "900" }}>DSW</span>}
                      {marketplace.logo === "costco" && <span className="text-red-600" style={{ fontSize: "13px", fontWeight: "700" }}>Costco</span>}
                      {marketplace.logo === "samsclub" && <span className="text-blue-600" style={{ fontSize: "11px" }}>Sam&apos;s Club</span>}
                      {marketplace.logo === "bjs" && <span className="text-blue-600" style={{ fontSize: "14px", fontWeight: "700" }}>BJ&apos;s</span>}
                      {marketplace.logo === "dollargeneral" && <span className="text-yellow-600" style={{ fontSize: "10px" }}>Dollar General</span>}
                      {marketplace.logo === "toysrus" && <span className="text-blue-600" style={{ fontSize: "11px" }}>Toys R Us</span>}
                      {marketplace.logo === "carters" && <span className="text-blue-600" style={{ fontSize: "13px" }}>Carter&apos;s</span>}
                      {marketplace.logo === "childrensplace" && <span className="text-blue-600" style={{ fontSize: "9px" }}>Children&apos;s Place</span>}
                      {marketplace.logo === "potterybarnkids" && <span className="text-slate-700" style={{ fontSize: "8px" }}>Pottery Barn Kids</span>}
                      {marketplace.logo === "vitaminshoppe" && <span className="text-green-600" style={{ fontSize: "9px" }}>Vitamin Shoppe</span>}
                      {marketplace.logo === "gnc" && <span className="text-yellow-600" style={{ fontSize: "16px", fontWeight: "900" }}>GNC</span>}
                      {marketplace.logo === "iherb" && <span className="text-green-600" style={{ fontSize: "14px", fontWeight: "700" }}>iHerb</span>}
                      {marketplace.logo === "vitacost" && <span className="text-green-600" style={{ fontSize: "12px" }}>Vitacost</span>}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{marketplace.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{marketplace.description}</p>
                  <Link href={`/marketplace/${marketplace.id}`} className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium py-2.5 cursor-pointer">Подробнее</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
