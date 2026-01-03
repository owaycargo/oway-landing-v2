"use client"

import { useState, useMemo, useEffect } from "react"
import { Calculator, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Маппинг стран на коды валют для API
const countryCurrencyMap: Record<string, { code: string; name: string }> = {
  BY: { code: "BYN", name: "белорусских рублей" },
  RU: { code: "RUB", name: "российских рублей" },
  KG: { code: "KGS", name: "сомов" },
}

const deliveryExamples: Record<string, Array<{
  category: string
  route: string
  weight: string
  duration: string
  price: string
  bgColor: string
}>> = {
  RU: [
    {
      category: "Электроника",
      route: "Нью-Йорк → Москва",
      weight: "2.5 кг",
      duration: "7 дней",
      price: "$45",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      category: "Одежда",
      route: "Лос-Анджелес → Санкт-Петербург",
      weight: "3.2 кг",
      duration: "9 дней",
      price: "$52",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      category: "Спортивные товары",
      route: "Майами → Новосибирск",
      weight: "5.8 кг",
      duration: "12 дней",
      price: "$78",
      bgColor: "from-orange-50 to-amber-50",
    },
    {
      category: "Косметика",
      route: "Чикаго → Екатеринбург",
      weight: "1.5 кг",
      duration: "8 дней",
      price: "$38",
      bgColor: "from-pink-50 to-rose-50",
    },
  ],
  KG: [
    {
      category: "Электроника",
      route: "Нью-Йорк → Бишкек",
      weight: "2.5 кг",
      duration: "10 дней",
      price: "$48",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      category: "Одежда",
      route: "Лос-Анджелес → Бишкек",
      weight: "4.2 кг",
      duration: "12 дней",
      price: "$65",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      category: "Спортивные товары",
      route: "Майами → Ош",
      weight: "6.5 кг",
      duration: "14 дней",
      price: "$85",
      bgColor: "from-orange-50 to-amber-50",
    },
    {
      category: "Косметика",
      route: "Чикаго → Бишкек",
      weight: "1.8 кг",
      duration: "11 дней",
      price: "$42",
      bgColor: "from-pink-50 to-rose-50",
    },
  ],
  BY: [
    {
      category: "Электроника",
      route: "Нью-Йорк → Минск",
      weight: "2.5 кг",
      duration: "8 дней",
      price: "$46",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      category: "Одежда",
      route: "Лос-Анджелес → Минск",
      weight: "3.8 кг",
      duration: "10 дней",
      price: "$58",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      category: "Спортивные товары",
      route: "Майами → Гомель",
      weight: "7.2 кг",
      duration: "11 дней",
      price: "$92",
      bgColor: "from-orange-50 to-amber-50",
    },
    {
      category: "Косметика",
      route: "Чикаго → Минск",
      weight: "1.6 кг",
      duration: "9 дней",
      price: "$40",
      bgColor: "from-pink-50 to-rose-50",
    },
  ],
}

export function CalculatorSection() {
  const [country, setCountry] = useState("")
  const [weight, setWeight] = useState("")
  const [insurance, setInsurance] = useState(false)
  const [express, setExpress] = useState(false)
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [loadingRates, setLoadingRates] = useState(true)

  // Загрузка актуальных курсов валют
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        // Используем бесплатный API для получения курсов валют
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
        const data = await response.json()
        
        if (data.rates) {
          setExchangeRates({
            BYN: data.rates.BYN || 3.3, // Fallback если API не вернул курс
            RUB: data.rates.RUB || 90,
            KGS: data.rates.KGS || 89,
          })
        }
      } catch (error) {
        console.error("Ошибка загрузки курсов валют:", error)
        // Используем fallback значения при ошибке
        setExchangeRates({
          BYN: 3.3,
          RUB: 90,
          KGS: 89,
        })
      } finally {
        setLoadingRates(false)
      }
    }

    fetchExchangeRates()
    
    // Обновляем курсы каждые 30 минут
    const interval = setInterval(fetchExchangeRates, 30 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const examples = useMemo(() => {
    return country ? (deliveryExamples[country] || []) : []
  }, [country])

  const calculatePrice = () => {
    if (!weight || !country) return null
    const basePrice = Number.parseFloat(weight) * 12
    const insurancePrice = insurance ? 5 : 0
    const expressPrice = express ? 20 : 0
    return (basePrice + insurancePrice + expressPrice).toFixed(2)
  }

  const price = calculatePrice()
  
  const convertedPrice = useMemo(() => {
    if (!price || !country || loadingRates) return null
    const currencyInfo = countryCurrencyMap[country]
    if (!currencyInfo) return null
    
    const rate = exchangeRates[currencyInfo.code]
    if (!rate) return null
    
    const converted = (Number.parseFloat(price) * rate).toFixed(2)
    return { amount: converted, code: currencyInfo.code, name: currencyInfo.name, rate }
  }, [price, country, exchangeRates, loadingRates])

  return (
    <section id="calculator" className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24 bg-slate-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Калькулятор доставки</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Рассчитайте примерную стоимость доставки вашей посылки
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Калькулятор */}
        <Card className="p-8 rounded-3xl border-slate-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Расчёт стоимости</h3>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="country" className="text-slate-700">
                Страна получения
              </Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country" className="mt-2 h-12 rounded-xl">
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KG">Кыргызстан</SelectItem>
                  <SelectItem value="RU">Россия</SelectItem>
                  <SelectItem value="BY">Беларусь</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="weight" className="text-slate-700">
                Вес (кг)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="Введите вес"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-2 h-12 rounded-xl"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700">Дополнительные услуги</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insurance"
                  checked={insurance}
                  onCheckedChange={(checked) => setInsurance(checked as boolean)}
                />
                <label htmlFor="insurance" className="text-sm text-slate-600 cursor-pointer">
                  Страхование груза (+$5)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="express" checked={express} onCheckedChange={(checked) => setExpress(checked as boolean)} />
                <label htmlFor="express" className="text-sm text-slate-600 cursor-pointer">
                  Экспресс-доставка (+$20)
                </label>
              </div>
            </div>

            {price && (
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-700 font-medium">Примерная стоимость:</span>
                  <span className="text-3xl font-bold text-blue-600">${price}</span>
                </div>
                {convertedPrice && (
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-slate-600">или</span>
                    <span className="font-semibold text-slate-700">
                      {convertedPrice.amount} {convertedPrice.code} ({convertedPrice.name})
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t border-blue-200">
                  <span className="text-slate-600">Срок доставки:</span>
                  <span className="font-semibold text-slate-700">{express ? "5-7 дней" : "10-14 дней"}</span>
                </div>
                <p className="text-xs text-slate-600 mt-4 italic">
                  * Окончательная стоимость подтверждается менеджером после проверки габаритов
                </p>
              </Card>
            )}

            <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-lg font-semibold">
              Оформить доставку
            </Button>
          </div>
        </Card>

        {/* Примеры доставок */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Примеры реальных доставок</h3>
          {country ? (
            <div className="space-y-4">
              {examples.map((example, index) => (
                <Card
                  key={index}
                  className={`p-6 rounded-3xl border-slate-200 hover:shadow-xl transition-all overflow-hidden relative`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${example.bgColor} opacity-50`} />

                  <div className="relative">
                    <Badge className="mb-4 bg-white text-slate-700 hover:bg-white">{example.category}</Badge>

                    <div className="flex items-center gap-2 mb-6">
                      <span className="font-semibold text-slate-900 text-lg">{example.route.split(" → ")[0]}</span>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-slate-900 text-lg">{example.route.split(" → ")[1]}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Вес:</span>
                        <span className="font-semibold text-slate-900">{example.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Срок:</span>
                        <span className="font-semibold text-slate-900">{example.duration}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-300">
                        <span className="text-slate-700 font-medium">Стоимость:</span>
                        <span className="text-2xl font-bold text-blue-600">{example.price}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 rounded-3xl border-slate-200 border-2 border-dashed text-center">
              <p className="text-slate-600 text-lg">
                Выберите страну в калькуляторе, чтобы увидеть примеры доставок
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
