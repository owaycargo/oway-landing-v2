"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const categories = [
  { id: "marketplaces", name: "Маркетплейсы" },
  { id: "department", name: "Универмаги" },
  { id: "clothing", name: "Одежда" },
  { id: "footwear", name: "Обувь" },
  { id: "massmarket", name: "Массмаркет" },
  { id: "children", name: "Товары для детей" },
  { id: "supplements", name: "БАДы и витамины" },
]

const marketplaces = [
  // Маркетплейсы
  {
    id: "ebay",
    name: "Ebay",
    category: "marketplaces",
    description: "Всемирноизвестный маркетплейс с миллионами товаров от магазинов и частных лиц.",
    logo: "ebay",
  },
  {
    id: "amazon",
    name: "Amazon",
    category: "marketplaces",
    description: "Крупнейший маркетплейс в США и в мире, здесь вы найдете точно абсолютно все.",
    logo: "amazon",
  },
  {
    id: "walmart",
    name: "Walmart",
    category: "marketplaces",
    description: "Онлайн маркетплейс от знаменитой сети магазинов Walmart.",
    logo: "walmart",
  },
  {
    id: "newegg",
    name: "Newegg",
    category: "marketplaces",
    description: "Специализируется на компьютерном оборудовании и бытовой электронике",
    logo: "newegg",
  },
  // Универмаги
  {
    id: "macys",
    name: "Macy's",
    category: "department",
    description: "Крупнейшая сеть универмагов в США с широким ассортиментом товаров.",
    logo: "macys",
  },
  {
    id: "nordstrom",
    name: "Nordstrom",
    category: "department",
    description: "Премиальные бренды и дизайнерская одежда высшего качества.",
    logo: "nordstrom",
  },
  {
    id: "target",
    name: "Target",
    category: "department",
    description: "Популярная сеть универмагов с доступными ценами и качественными товарами.",
    logo: "target",
  },
  {
    id: "kohls",
    name: "Kohl's",
    category: "department",
    description: "Семейный универмаг с отличными скидками и широким выбором.",
    logo: "kohls",
  },
  // Одежда
  {
    id: "zara",
    name: "Zara",
    category: "clothing",
    description: "Современная модная одежда и аксессуары по доступным ценам.",
    logo: "zara",
  },
  {
    id: "h&m",
    name: "H&M",
    category: "clothing",
    description: "Модная одежда для всей семьи в скандинавском стиле.",
    logo: "hm",
  },
  {
    id: "gap",
    name: "Gap",
    category: "clothing",
    description: "Классическая американская одежда и джинсы премиум качества.",
    logo: "gap",
  },
  {
    id: "old-navy",
    name: "Old Navy",
    category: "clothing",
    description: "Стильная и доступная одежда для всей семьи.",
    logo: "oldnavy",
  },
  // Обувь
  {
    id: "nike",
    name: "Nike",
    category: "footwear",
    description: "Легендарные спортивные кроссовки и обувь для активного образа жизни.",
    logo: "nike",
  },
  {
    id: "adidas",
    name: "Adidas",
    category: "footwear",
    description: "Немецкое качество в спортивной обуви и одежде.",
    logo: "adidas",
  },
  {
    id: "foot-locker",
    name: "Foot Locker",
    category: "footwear",
    description: "Крупнейший магазин спортивной обуви и аксессуаров.",
    logo: "footlocker",
  },
  {
    id: "dsw",
    name: "DSW",
    category: "footwear",
    description: "Огромный выбор обуви для мужчин, женщин и детей.",
    logo: "dsw",
  },
  // Массмаркет
  {
    id: "costco",
    name: "Costco",
    category: "massmarket",
    description: "Оптовый клуб с огромным выбором товаров по выгодным ценам.",
    logo: "costco",
  },
  {
    id: "sam-club",
    name: "Sam's Club",
    category: "massmarket",
    description: "Членский оптовый клуб с широким ассортиментом товаров.",
    logo: "samsclub",
  },
  {
    id: "bj-wholesale",
    name: "BJ's Wholesale",
    category: "massmarket",
    description: "Оптовый клуб с качественными товарами для всей семьи.",
    logo: "bjs",
  },
  {
    id: "dollar-general",
    name: "Dollar General",
    category: "massmarket",
    description: "Сеть магазинов с доступными ценами на повседневные товары.",
    logo: "dollargeneral",
  },
  // Товары для детей
  {
    id: "toys-r-us",
    name: "Toys R Us",
    category: "children",
    description: "Крупнейший магазин игрушек и товаров для детей.",
    logo: "toysrus",
  },
  {
    id: "carters",
    name: "Carter's",
    category: "children",
    description: "Одежда и аксессуары для младенцев и детей.",
    logo: "carters",
  },
  {
    id: "children-place",
    name: "The Children's Place",
    category: "children",
    description: "Модная детская одежда и аксессуары по доступным ценам.",
    logo: "childrensplace",
  },
  {
    id: "pottery-barn-kids",
    name: "Pottery Barn Kids",
    category: "children",
    description: "Мебель и декор для детских комнат премиум качества.",
    logo: "potterybarnkids",
  },
  // БАДы и витамины
  {
    id: "vitamin-shoppe",
    name: "The Vitamin Shoppe",
    category: "supplements",
    description: "Широкий выбор витаминов, БАДов и спортивного питания.",
    logo: "vitaminshoppe",
  },
  {
    id: "gnc",
    name: "GNC",
    category: "supplements",
    description: "Ведущий ритейлер витаминов и пищевых добавок.",
    logo: "gnc",
  },
  {
    id: "iherb",
    name: "iHerb",
    category: "supplements",
    description: "Онлайн-магазин натуральных продуктов и добавок.",
    logo: "iherb",
  },
  {
    id: "vitacost",
    name: "Vitacost",
    category: "supplements",
    description: "Витамины, БАДы и натуральные продукты для здоровья.",
    logo: "vitacost",
  },
]

export function MarketplaceSection() {
  const [activeTab, setActiveTab] = useState("marketplaces")

  const filteredMarketplaces = marketplaces.filter((m) => m.category === activeTab)

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          Где покупать товары
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Сотни магазинов и миллионы товаров, которые не продаются в России. Мы собрали для вас лучшие магазины в каждой категории. Выбирайте и наслаждайтесь онлайн шоппингом в США!
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
              <Card
                key={marketplace.id}
                className="p-6 rounded-3xl border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer bg-white"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center mb-4 shadow-sm overflow-hidden">
                    <div className="text-xs font-bold text-slate-700 px-2 text-center leading-tight">
                      {marketplace.logo === "ebay" && (
                        <span className="text-blue-600" style={{ fontSize: "14px" }}>eBay</span>
                      )}
                      {marketplace.logo === "amazon" && (
                        <span className="text-orange-700" style={{ fontSize: "12px" }}>amazon</span>
                      )}
                      {marketplace.logo === "walmart" && (
                        <span className="text-blue-600" style={{ fontSize: "11px" }}>Walmart</span>
                      )}
                      {marketplace.logo === "newegg" && (
                        <span className="text-orange-700" style={{ fontSize: "12px" }}>Newegg</span>
                      )}
                      {marketplace.logo === "macys" && (
                        <span className="text-red-600" style={{ fontSize: "13px" }}>Macy's</span>
                      )}
                      {marketplace.logo === "nordstrom" && (
                        <span className="text-slate-800" style={{ fontSize: "11px" }}>Nordstrom</span>
                      )}
                      {marketplace.logo === "target" && (
                        <span className="text-red-600" style={{ fontSize: "13px" }}>Target</span>
                      )}
                      {marketplace.logo === "kohls" && (
                        <span className="text-blue-600" style={{ fontSize: "13px" }}>Kohl's</span>
                      )}
                      {marketplace.logo === "zara" && (
                        <span className="text-slate-900" style={{ fontSize: "16px" }}>ZARA</span>
                      )}
                      {marketplace.logo === "hm" && (
                        <span className="text-red-600" style={{ fontSize: "18px", fontWeight: "900" }}>H&M</span>
                      )}
                      {marketplace.logo === "gap" && (
                        <span className="text-blue-600" style={{ fontSize: "16px" }}>GAP</span>
                      )}
                      {marketplace.logo === "oldnavy" && (
                        <span className="text-blue-600" style={{ fontSize: "11px" }}>Old Navy</span>
                      )}
                      {marketplace.logo === "nike" && (
                        <span className="text-slate-900" style={{ fontSize: "14px", fontWeight: "900" }}>NIKE</span>
                      )}
                      {marketplace.logo === "adidas" && (
                        <span className="text-slate-900" style={{ fontSize: "12px" }}>adidas</span>
                      )}
                      {marketplace.logo === "footlocker" && (
                        <span className="text-blue-600" style={{ fontSize: "10px" }}>Foot Locker</span>
                      )}
                      {marketplace.logo === "dsw" && (
                        <span className="text-orange-700" style={{ fontSize: "14px", fontWeight: "900" }}>DSW</span>
                      )}
                      {marketplace.logo === "costco" && (
                        <span className="text-red-600" style={{ fontSize: "13px", fontWeight: "700" }}>Costco</span>
                      )}
                      {marketplace.logo === "samsclub" && (
                        <span className="text-blue-600" style={{ fontSize: "11px" }}>Sam's Club</span>
                      )}
                      {marketplace.logo === "bjs" && (
                        <span className="text-blue-600" style={{ fontSize: "14px", fontWeight: "700" }}>BJ's</span>
                      )}
                      {marketplace.logo === "dollargeneral" && (
                        <span className="text-yellow-600" style={{ fontSize: "10px" }}>Dollar General</span>
                      )}
                      {marketplace.logo === "toysrus" && (
                        <span className="text-blue-600" style={{ fontSize: "11px" }}>Toys R Us</span>
                      )}
                      {marketplace.logo === "carters" && (
                        <span className="text-blue-600" style={{ fontSize: "13px" }}>Carter's</span>
                      )}
                      {marketplace.logo === "childrensplace" && (
                        <span className="text-blue-600" style={{ fontSize: "9px" }}>Children's Place</span>
                      )}
                      {marketplace.logo === "potterybarnkids" && (
                        <span className="text-slate-700" style={{ fontSize: "8px" }}>Pottery Barn Kids</span>
                      )}
                      {marketplace.logo === "vitaminshoppe" && (
                        <span className="text-green-600" style={{ fontSize: "9px" }}>Vitamin Shoppe</span>
                      )}
                      {marketplace.logo === "gnc" && (
                        <span className="text-yellow-600" style={{ fontSize: "16px", fontWeight: "900" }}>GNC</span>
                      )}
                      {marketplace.logo === "iherb" && (
                        <span className="text-green-600" style={{ fontSize: "14px", fontWeight: "700" }}>iHerb</span>
                      )}
                      {marketplace.logo === "vitacost" && (
                        <span className="text-green-600" style={{ fontSize: "12px" }}>Vitacost</span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{marketplace.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{marketplace.description}</p>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium py-2.5 cursor-pointer"
                    onClick={() => {
                      // Здесь можно добавить логику перехода на сайт магазина
                      console.log(`Переход на ${marketplace.name}`)
                    }}
                  >
                    Перейти в магазин
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="px-8 py-6 text-base font-medium border-2 border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:border-blue-500 rounded-xl"
            >
              Показать еще
            </Button>
          </div> */}
        </TabsContent>
      </Tabs>
    </section>
  )
}
