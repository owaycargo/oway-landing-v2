export const categories = [
  { id: "marketplaces", name: "Маркетплейсы" },
  { id: "department", name: "Универмаги" },
  { id: "clothing", name: "Одежда" },
  { id: "footwear", name: "Обувь" },
  { id: "children", name: "Товары для детей" },
  { id: "supplements", name: "БАДы и витамины" },
]

export interface Marketplace {
  id: string
  name: string
  category: string
  description: string
  logo: string
  url: string
}

export const marketplaces: Marketplace[] = [
  // Маркетплейсы
  {
    id: "ebay",
    name: "Ebay",
    category: "marketplaces",
    description: "Всемирноизвестный маркетплейс с миллионами товаров от магазинов и частных лиц.",
    logo: "ebay",
    url: "https://www.ebay.com",
  },
  {
    id: "amazon",
    name: "Amazon",
    category: "marketplaces",
    description: "Крупнейший маркетплейс в США и в мире, здесь вы найдете точно абсолютно все.",
    logo: "amazon",
    url: "https://www.amazon.com",
  },
  {
    id: "walmart",
    name: "Walmart",
    category: "marketplaces",
    description: "Онлайн маркетплейс от знаменитой сети магазинов Walmart.",
    logo: "walmart",
    url: "https://www.walmart.com",
  },
  {
    id: "newegg",
    name: "Newegg",
    category: "marketplaces",
    description: "Специализируется на компьютерном оборудовании и бытовой электронике",
    logo: "newegg",
    url: "https://www.newegg.com",
  },
  // Универмаги
  {
    id: "macys",
    name: "Macy's",
    category: "department",
    description: "Крупнейшая сеть универмагов в США с широким ассортиментом товаров.",
    logo: "macys",
    url: "https://www.macys.com",
  },
  {
    id: "nordstrom",
    name: "Nordstrom",
    category: "department",
    description: "Премиальные бренды и дизайнерская одежда высшего качества.",
    logo: "nordstrom",
    url: "https://www.nordstrom.com",
  },
  {
    id: "target",
    name: "Target",
    category: "department",
    description: "Популярная сеть универмагов с доступными ценами и качественными товарами.",
    logo: "target",
    url: "https://www.target.com",
  },
  {
    id: "kohls",
    name: "Kohl's",
    category: "department",
    description: "Семейный универмаг с отличными скидками и широким выбором.",
    logo: "kohls",
    url: "https://www.kohls.com",
  },
  {
    id: "costco",
    name: "Costco",
    category: "department",
    description: "Оптовый клуб с огромным выбором товаров по выгодным ценам.",
    logo: "costco",
    url: "https://www.costco.com",
  },
  {
    id: "sam-club",
    name: "Sam's Club",
    category: "department",
    description: "Членский оптовый клуб с широким ассортиментом товаров.",
    logo: "samsclub",
    url: "https://www.samsclub.com",
  },
  {
    id: "bj-wholesale",
    name: "BJ's Wholesale",
    category: "department",
    description: "Оптовый клуб с качественными товарами для всей семьи.",
    logo: "bjs",
    url: "https://www.bjs.com",
  },
  {
    id: "dollar-general",
    name: "Dollar General",
    category: "department",
    description: "Сеть магазинов с доступными ценами на повседневные товары.",
    logo: "dollargeneral",
    url: "https://www.dollargeneral.com",
  },
  // Одежда
  {
    id: "zara",
    name: "Zara",
    category: "clothing",
    description: "Современная модная одежда и аксессуары по доступным ценам.",
    logo: "zara",
    url: "https://www.zara.com/us",
  },
  {
    id: "h&m",
    name: "H&M",
    category: "clothing",
    description: "Модная одежда для всей семьи в скандинавском стиле.",
    logo: "hm",
    url: "https://www.hm.com/us",
  },
  {
    id: "gap",
    name: "Gap",
    category: "clothing",
    description: "Классическая американская одежда и джинсы премиум качества.",
    logo: "gap",
    url: "https://www.gap.com",
  },
  {
    id: "old-navy",
    name: "Old Navy",
    category: "clothing",
    description: "Стильная и доступная одежда для всей семьи.",
    logo: "oldnavy",
    url: "https://www.oldnavy.com",
  },
  // Обувь
  {
    id: "nike",
    name: "Nike",
    category: "footwear",
    description: "Легендарные спортивные кроссовки и обувь для активного образа жизни.",
    logo: "nike",
    url: "https://www.nike.com",
  },
  {
    id: "adidas",
    name: "Adidas",
    category: "footwear",
    description: "Немецкое качество в спортивной обуви и одежде.",
    logo: "adidas",
    url: "https://www.adidas.com/us",
  },
  {
    id: "foot-locker",
    name: "Foot Locker",
    category: "footwear",
    description: "Крупнейший магазин спортивной обуви и аксессуаров.",
    logo: "footlocker",
    url: "https://www.footlocker.com",
  },
  {
    id: "dsw",
    name: "DSW",
    category: "footwear",
    description: "Огромный выбор обуви для мужчин, женщин и детей.",
    logo: "dsw",
    url: "https://www.dsw.com",
  },
  // Товары для детей
  {
    id: "toys-r-us",
    name: "Toys R Us",
    category: "children",
    description: "Крупнейший магазин игрушек и товаров для детей.",
    logo: "toysrus",
    url: "https://www.toysrus.com",
  },
  {
    id: "carters",
    name: "Carter's",
    category: "children",
    description: "Одежда и аксессуары для младенцев и детей.",
    logo: "carters",
    url: "https://www.carters.com",
  },
  {
    id: "children-place",
    name: "The Children's Place",
    category: "children",
    description: "Модная детская одежда и аксессуары по доступным ценам.",
    logo: "childrensplace",
    url: "https://www.childrensplace.com",
  },
  {
    id: "pottery-barn-kids",
    name: "Pottery Barn Kids",
    category: "children",
    description: "Мебель и декор для детских комнат премиум качества.",
    logo: "potterybarnkids",
    url: "https://www.potterybarnkids.com",
  },
  // БАДы и витамины
  {
    id: "vitamin-shoppe",
    name: "The Vitamin Shoppe",
    category: "supplements",
    description: "Широкий выбор витаминов, БАДов и спортивного питания.",
    logo: "vitaminshoppe",
    url: "https://www.vitaminshoppe.com",
  },
  {
    id: "gnc",
    name: "GNC",
    category: "supplements",
    description: "Ведущий ритейлер витаминов и пищевых добавок.",
    logo: "gnc",
    url: "https://www.gnc.com",
  },
  {
    id: "iherb",
    name: "iHerb",
    category: "supplements",
    description: "Онлайн-магазин натуральных продуктов и добавок.",
    logo: "iherb",
    url: "https://www.iherb.com",
  },
  {
    id: "vitacost",
    name: "Vitacost",
    category: "supplements",
    description: "Витамины, БАДы и натуральные продукты для здоровья.",
    logo: "vitacost",
    url: "https://www.vitacost.com",
  },
]

export function getMarketplaceById(id: string): Marketplace | undefined {
  return marketplaces.find((m) => m.id === id)
}

export function getMarketplacesByCategory(category: string): Marketplace[] {
  return marketplaces.filter((m) => m.category === category)
}

