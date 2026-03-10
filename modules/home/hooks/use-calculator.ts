"use client"

import { useState, useMemo, useEffect } from "react"
import type { GoodsCategory } from "@/modules/home/types"
import {
  PRICE_PER_KG,
  COUNTRY_CURRENCY_MAP,
  MAX_WEIGHT_KG,
  MAX_DIMENSION_CM,
  MAX_CHARGEABLE_KG,
  MAX_DECLARED_VALUE,
  DELIVERY_EXAMPLES,
} from "@/modules/home/constants"
import { getVolumetricWeightKg, clampNum } from "@/modules/home/utils"

const EXCHANGE_RATES_REFRESH_MS = 30 * 60 * 1000
const FALLBACK_RATES = { BYN: 3.3, RUB: 90, KZT: 450, KGS: 89 }

export function useCalculator() {
  const [country, setCountry] = useState("")
  const [weight, setWeight] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [insurance, setInsurance] = useState(false)
  const [declaredValue, setDeclaredValue] = useState("")
  const [goodsCategory, setGoodsCategory] = useState<GoodsCategory>("regular")
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [loadingRates, setLoadingRates] = useState(true)

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
        const data = await response.json()
        if (data.rates) {
          setExchangeRates({
            BYN: data.rates.BYN ?? FALLBACK_RATES.BYN,
            RUB: data.rates.RUB ?? FALLBACK_RATES.RUB,
            KZT: data.rates.KZT ?? FALLBACK_RATES.KZT,
            KGS: data.rates.KGS ?? FALLBACK_RATES.KGS,
          })
        }
      } catch {
        setExchangeRates(FALLBACK_RATES)
      } finally {
        setLoadingRates(false)
      }
    }
    fetchExchangeRates()
    const interval = setInterval(fetchExchangeRates, EXCHANGE_RATES_REFRESH_MS)
    return () => clearInterval(interval)
  }, [])

  const examples = useMemo(
    () => (country ? (DELIVERY_EXAMPLES[country] || []) : []),
    [country]
  )

  const chargeableWeightKg = useMemo(() => {
    const rawActual = Number.parseFloat(weight)
    if (!Number.isFinite(rawActual) || rawActual <= 0) return null
    const actual = clampNum(rawActual, 0.1, MAX_WEIGHT_KG)
    const l = clampNum(Number.parseFloat(length), 0, MAX_DIMENSION_CM)
    const w = clampNum(Number.parseFloat(width), 0, MAX_DIMENSION_CM)
    const h = clampNum(Number.parseFloat(height), 0, MAX_DIMENSION_CM)
    if (l > 0 && w > 0 && h > 0) {
      const vol = getVolumetricWeightKg(l, w, h)
      return Math.min(MAX_CHARGEABLE_KG, Math.max(actual, vol))
    }
    return Math.min(MAX_CHARGEABLE_KG, actual)
  }, [weight, length, width, height])

  const price = useMemo(() => {
    if (!country || chargeableWeightKg == null || chargeableWeightKg <= 0) return null
    const rate = PRICE_PER_KG[country] ?? 12
    const basePrice = chargeableWeightKg * rate
    let insuranceCost = 0
    if (insurance) {
      const value = clampNum(Number.parseFloat(declaredValue), 0, MAX_DECLARED_VALUE)
      if (value > 500) {
        insuranceCost = goodsCategory === "electronics" ? value * 0.05 : value * 0.03
      }
    }
    return (basePrice + insuranceCost).toFixed(2)
  }, [country, chargeableWeightKg, insurance, declaredValue, goodsCategory])

  const convertedPrice = useMemo(() => {
    if (!price || !country || loadingRates) return null
    const currencyInfo = COUNTRY_CURRENCY_MAP[country]
    if (!currencyInfo) return null
    const rate = exchangeRates[currencyInfo.code]
    if (!rate) return null
    return {
      amount: (Number.parseFloat(price) * rate).toFixed(2),
      code: currencyInfo.code,
      name: currencyInfo.name,
      rate,
    }
  }, [price, country, exchangeRates, loadingRates])

  return {
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
    loadingRates,
    examples,
    chargeableWeightKg,
    price,
    convertedPrice,
  }
}
