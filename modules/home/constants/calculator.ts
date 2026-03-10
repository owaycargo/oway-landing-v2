import type { DeliveryExample } from "@/modules/home/types"

export const COUNTRIES = [
  { value: "RU", label: "Россия" },
  { value: "KZ", label: "Казахстан" },
  { value: "KG", label: "Кыргызстан" },
  { value: "BY", label: "Беларусь" },
] as const

export const PRICE_PER_KG: Record<string, number> = {
  RU: 18,
  BY: 18,
  KZ: 12,
  KG: 12,
}

export const COUNTRY_CURRENCY_MAP: Record<string, { code: string; name: string }> = {
  BY: { code: "BYN", name: "белорусских рублей" },
  RU: { code: "RUB", name: "российских рублей" },
  KZ: { code: "KZT", name: "тенге" },
  KG: { code: "KGS", name: "сомов" },
}

export const MAX_WEIGHT_KG = 100
export const MAX_DIMENSION_CM = 300
export const MAX_CHARGEABLE_KG = 200
export const MAX_DECLARED_VALUE = 20_000

export const DELIVERY_EXAMPLES: Record<string, DeliveryExample[]> = {
  RU: [
    { category: "Электроника", route: "США → Москва", weight: "2.5 кг", duration: "7–10 дней", price: "$45", bgColor: "from-blue-50 to-cyan-50" },
    { category: "Одежда", route: "США → Москва", weight: "3.2 кг", duration: "9 дней", price: "$58", bgColor: "from-purple-50 to-pink-50" },
    { category: "Спортивные товары", route: "США → Москва", weight: "5.8 кг", duration: "12 дней", price: "$104", bgColor: "from-orange-50 to-amber-50" },
    { category: "Косметика", route: "США → Москва", weight: "1.5 кг", duration: "8 дней", price: "$27", bgColor: "from-pink-50 to-rose-50" },
  ],
  BY: [
    { category: "Электроника", route: "США → Минск", weight: "2.5 кг", duration: "8 дней", price: "$45", bgColor: "from-blue-50 to-cyan-50" },
    { category: "Одежда", route: "США → Минск", weight: "3.8 кг", duration: "10 дней", price: "$68", bgColor: "from-purple-50 to-pink-50" },
    { category: "Спортивные товары", route: "США → Минск", weight: "5 кг", duration: "11 дней", price: "$90", bgColor: "from-orange-50 to-amber-50" },
    { category: "Косметика", route: "США → Минск", weight: "1.6 кг", duration: "9 дней", price: "$29", bgColor: "from-pink-50 to-rose-50" },
  ],
  KZ: [
    { category: "Электроника", route: "США → Алматы", weight: "2.5 кг", duration: "10 дней", price: "$30", bgColor: "from-blue-50 to-cyan-50" },
    { category: "Одежда", route: "США → Алматы", weight: "3 кг", duration: "12 дней", price: "$36", bgColor: "from-purple-50 to-pink-50" },
    { category: "Спортивные товары", route: "США → Алматы", weight: "6.5 кг", duration: "14 дней", price: "$78", bgColor: "from-orange-50 to-amber-50" },
    { category: "Косметика", route: "США → Алматы", weight: "1.8 кг", duration: "11 дней", price: "$22", bgColor: "from-pink-50 to-rose-50" },
  ],
  KG: [
    { category: "Электроника", route: "США → Бишкек", weight: "2.5 кг", duration: "10 дней", price: "$30", bgColor: "from-blue-50 to-cyan-50" },
    { category: "Одежда", route: "США → Бишкек", weight: "4.2 кг", duration: "12 дней", price: "$50", bgColor: "from-purple-50 to-pink-50" },
    { category: "Спортивные товары", route: "США → Бишкек", weight: "6.5 кг", duration: "14 дней", price: "$78", bgColor: "from-orange-50 to-amber-50" },
    { category: "Косметика", route: "США → Бишкек", weight: "1.8 кг", duration: "11 дней", price: "$22", bgColor: "from-pink-50 to-rose-50" },
  ],
}
