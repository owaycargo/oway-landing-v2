"use client"

import { Calculator, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { GoodsCategory } from "@/modules/home/types"
import {
  COUNTRIES,
  MAX_WEIGHT_KG,
  MAX_DIMENSION_CM,
  MAX_CHARGEABLE_KG,
  MAX_DECLARED_VALUE,
} from "@/modules/home/constants"
import { clampInput } from "@/modules/home/utils"
import { useCalculator } from "@/modules/home/hooks"

export function CalculatorSection() {
  const {
    country,
    setCountry,
    weight,
    setWeight,
    length,
    setLength,
    width,
    setWidth,
    height,
    setHeight,
    insurance,
    setInsurance,
    declaredValue,
    setDeclaredValue,
    goodsCategory,
    setGoodsCategory,
    examples,
    chargeableWeightKg,
    price,
    convertedPrice,
  } = useCalculator()

  return (
    <section id="calculator" className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24 bg-slate-50">
      <div className="text-center mb-12 flex flex-col items-center">
        <img
          src="/mascots/mascot-money.webp"
          alt=""
          aria-hidden
          className="w-24 md:w-32 h-auto mb-4 drop-shadow-[0_15px_25px_rgba(15,23,42,0.15)]"
        />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Калькулятор доставки</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Рассчитайте примерную стоимость доставки вашей посылки</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8 rounded-3xl border-slate-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Расчёт стоимости</h3>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="country" className="text-slate-700">Страна получателя</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country" className="mt-2 h-12 rounded-xl">
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="weight" className="text-slate-700">Вес (кг)</Label>
              <Input id="weight" type="number" min="0.1" max={MAX_WEIGHT_KG} step="0.1" placeholder={`До ${MAX_WEIGHT_KG} кг`} value={weight} onChange={(e) => setWeight(clampInput(e.target.value, MAX_WEIGHT_KG, 1))} className="mt-2 h-12 rounded-xl" />
              <p className="text-xs text-slate-500 mt-1">Макс. {MAX_WEIGHT_KG} кг для расчёта</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="length" className="text-slate-700">Длина (см)</Label>
                <Input id="length" type="number" min="0" max={MAX_DIMENSION_CM} step="1" placeholder={`до ${MAX_DIMENSION_CM}`} value={length} onChange={(e) => setLength(clampInput(e.target.value, MAX_DIMENSION_CM))} className="mt-2 h-12 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="width" className="text-slate-700">Ширина (см)</Label>
                <Input id="width" type="number" min="0" max={MAX_DIMENSION_CM} step="1" placeholder={`до ${MAX_DIMENSION_CM}`} value={width} onChange={(e) => setWidth(clampInput(e.target.value, MAX_DIMENSION_CM))} className="mt-2 h-12 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="height" className="text-slate-700">Высота (см)</Label>
                <Input id="height" type="number" min="0" max={MAX_DIMENSION_CM} step="1" placeholder={`до ${MAX_DIMENSION_CM}`} value={height} onChange={(e) => setHeight(clampInput(e.target.value, MAX_DIMENSION_CM))} className="mt-2 h-12 rounded-xl" />
              </div>
            </div>
            <p className="text-xs text-slate-500">Габариты: макс. {MAX_DIMENSION_CM} см по каждой стороне. Учитываемый вес — не более {MAX_CHARGEABLE_KG} кг.</p>
            {chargeableWeightKg != null && weight && (
              <p className="text-xs text-slate-600">
                Учитываемый вес для расчёта: <strong>{chargeableWeightKg.toFixed(2)} кг</strong>
                {length && width && height && Number(weight) !== chargeableWeightKg && " (учтён объёмный вес)"}
              </p>
            )}

            <div className="space-y-3">
              <Label className="text-slate-700">Дополнительные услуги</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="insurance" checked={insurance} onCheckedChange={(checked) => setInsurance(checked as boolean)} />
                <label htmlFor="insurance" className="text-sm text-slate-600 cursor-pointer">Страхование груза (до $500 — бесплатно)</label>
              </div>
              {insurance && (
                <div className="pl-6 space-y-3 border-l-2 border-slate-200">
                  <div>
                    <Label htmlFor="declaredValue" className="text-slate-600 text-sm">Объявленная стоимость ($)</Label>
                    <Input id="declaredValue" type="number" min="0" max={MAX_DECLARED_VALUE} step="1" placeholder={`До ${MAX_DECLARED_VALUE.toLocaleString("ru")} $`} value={declaredValue} onChange={(e) => setDeclaredValue(clampInput(e.target.value, MAX_DECLARED_VALUE))} className="mt-1 h-10 rounded-lg" />
                  </div>
                  <div>
                    <Label className="text-slate-600 text-sm mb-1 block">Категория товара</Label>
                    <Select value={goodsCategory} onValueChange={(v) => setGoodsCategory(v as GoodsCategory)}>
                      <SelectTrigger className="h-10 rounded-lg"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Обычные товары (одежда, обувь, косметика и т.д.) — 3%</SelectItem>
                        <SelectItem value="electronics">Электроника и техника — 5%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            {price && (
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-700 font-medium">Примерная стоимость до города назначения:</span>
                  <span className="text-3xl font-bold text-blue-600">${price}</span>
                </div>
                {convertedPrice && (
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-slate-600">или</span>
                    <span className="font-semibold text-slate-700">{convertedPrice.amount} {convertedPrice.code} ({convertedPrice.name})</span>
                  </div>
                )}
                <p className="text-xs text-slate-600 mt-3">
                  {country === "RU" || country === "BY" ? "* Стоимость до Москвы/Минска. Доставка по РФ/РБ через СДЭК рассчитывается отдельно (интеграция в разработке)." : "* Окончательная стоимость подтверждается менеджером после проверки габаритов."}
                </p>
              </Card>
            )}

            <a href="https://client.owaycargo.com" target="_blank" rel="noopener noreferrer"><Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-lg font-semibold">Оформить доставку</Button></a>
          </div>
        </Card>

        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Примеры реальных доставок</h3>
          {country ? (
            <div className="space-y-4">
              {examples.map((example, index) => (
                <Card key={index} className="p-6 rounded-3xl border-slate-200 hover:shadow-xl transition-all overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${example.bgColor} opacity-50`} />
                  <div className="relative">
                    <Badge className="mb-4 bg-white text-slate-700 hover:bg-white">{example.category}</Badge>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="font-semibold text-slate-900 text-lg">{example.route.split(" → ")[0]}</span>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-slate-900 text-lg">{example.route.split(" → ")[1]}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-slate-600">Вес:</span><span className="font-semibold text-slate-900">{example.weight}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600">Срок:</span><span className="font-semibold text-slate-900">{example.duration}</span></div>
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
              <p className="text-slate-600 text-lg">Выберите страну в калькуляторе, чтобы увидеть примеры доставок</p>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
