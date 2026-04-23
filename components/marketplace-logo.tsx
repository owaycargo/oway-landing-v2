type LogoStyle = {
  text?: string
  color?: string
  fontSize: string
  fontWeight?: string
}

const LOGO_STYLES: Record<string, LogoStyle> = {
  // Маркетплейсы
  ebay: { text: "eBay", color: "text-blue-600", fontSize: "14px" },
  amazon: { text: "amazon", color: "text-orange-700", fontSize: "12px" },
  walmart: { text: "Walmart", color: "text-blue-600", fontSize: "11px" },
  target: { text: "Target", color: "text-red-600", fontSize: "13px" },
  newegg: { text: "Newegg", color: "text-orange-700", fontSize: "12px" },

  // Универмаги
  macys: { text: "Macy's", color: "text-red-600", fontSize: "13px" },
  nordstrom: { text: "Nordstrom", color: "text-slate-800", fontSize: "11px" },
  kohls: { text: "Kohl's", color: "text-blue-600", fontSize: "13px" },
  bloomingdales: { text: "Bloomingdale's", color: "text-slate-800", fontSize: "9px" },
  jcpenney: { text: "JCPenney", color: "text-red-600", fontSize: "11px" },
  saks: { text: "SAKS", color: "text-slate-900", fontSize: "16px", fontWeight: "900" },
  neimanmarcus: { text: "Neiman Marcus", color: "text-slate-900", fontSize: "9px" },
  dillards: { text: "Dillard's", color: "text-slate-900", fontSize: "12px" },

  // Одежда
  zara: { text: "ZARA", color: "text-slate-900", fontSize: "16px" },
  hm: { text: "H&M", color: "text-red-600", fontSize: "18px", fontWeight: "900" },
  gap: { text: "GAP", color: "text-blue-600", fontSize: "16px" },
  oldnavy: { text: "Old Navy", color: "text-blue-600", fontSize: "11px" },
  bananarepublic: { text: "BANANA REPUBLIC", color: "text-slate-800", fontSize: "7px" },
  ralphlauren: { text: "Ralph Lauren", color: "text-slate-900", fontSize: "9px" },
  levis: { text: "LEVI'S", color: "text-red-600", fontSize: "13px", fontWeight: "900" },
  abercrombie: { text: "A&F", color: "text-slate-900", fontSize: "18px", fontWeight: "900" },
  hollister: { text: "Hollister", color: "text-blue-800", fontSize: "10px" },
  americaneagle: { text: "AEO", color: "text-blue-600", fontSize: "18px", fontWeight: "900" },
  forever21: { text: "F21", color: "text-slate-900", fontSize: "18px", fontWeight: "900" },
  nordstromrack: { text: "NR", color: "text-slate-800", fontSize: "18px", fontWeight: "900" },

  // Обувь
  nike: { text: "NIKE", color: "text-slate-900", fontSize: "14px", fontWeight: "900" },
  adidas: { text: "adidas", color: "text-slate-900", fontSize: "12px" },
  footlocker: { text: "Foot Locker", color: "text-blue-600", fontSize: "10px" },
  dsw: { text: "DSW", color: "text-orange-700", fontSize: "14px", fontWeight: "900" },
  zappos: { text: "zappos", color: "text-blue-600", fontSize: "12px" },
  finishline: { text: "Finish Line", color: "text-red-600", fontSize: "10px" },
  newbalance: { text: "NB", color: "text-red-600", fontSize: "18px", fontWeight: "900" },
  allenedmonds: { text: "Allen Edmonds", color: "text-slate-900", fontSize: "8px" },

  // Дети
  carters: { text: "Carter's", color: "text-blue-600", fontSize: "13px" },
  childrensplace: { text: "Children's Place", color: "text-blue-600", fontSize: "9px" },
  oshkosh: { text: "OshKosh", color: "text-blue-600", fontSize: "12px" },
  potterybarnkids: { text: "Pottery Barn Kids", color: "text-slate-700", fontSize: "8px" },
  gymboree: { text: "Gymboree", color: "text-pink-600", fontSize: "11px" },
  gapkids: { text: "Gap Kids", color: "text-blue-600", fontSize: "11px" },
  janieandjack: { text: "Janie and Jack", color: "text-slate-700", fontSize: "8px" },

  // БАДы
  vitaminshoppe: { text: "Vitamin Shoppe", color: "text-green-600", fontSize: "9px" },
  gnc: { text: "GNC", color: "text-yellow-600", fontSize: "16px", fontWeight: "900" },
  iherb: { text: "iHerb", color: "text-green-600", fontSize: "14px", fontWeight: "700" },
  vitacost: { text: "Vitacost", color: "text-green-600", fontSize: "12px" },
  bodybuildingcom: { text: "Bodybuilding", color: "text-orange-700", fontSize: "9px" },
  swansonvitamins: { text: "Swanson", color: "text-green-700", fontSize: "12px" },
  nowfoods: { text: "NOW", color: "text-green-600", fontSize: "18px", fontWeight: "900" },

  // Красота и парфюм
  sephora: { text: "SEPHORA", color: "text-slate-900", fontSize: "11px", fontWeight: "900" },
  ulta: { text: "ULTA", color: "text-slate-900", fontSize: "16px", fontWeight: "900" },
  victoriassecret: { text: "VS", color: "text-pink-700", fontSize: "18px", fontWeight: "900" },
  bathandbodyworks: { text: "Bath & Body Works", color: "text-pink-600", fontSize: "7px" },
  maccosmetics: { text: "MAC", color: "text-slate-900", fontSize: "18px", fontWeight: "900" },
  sallybeauty: { text: "Sally Beauty", color: "text-pink-600", fontSize: "9px" },
  lookfantastic: { text: "Look Fantastic", color: "text-slate-800", fontSize: "8px" },
  thefragranceshop: { text: "FragranceX", color: "text-slate-800", fontSize: "10px" },

  // Электроника
  bestbuy: { text: "Best Buy", color: "text-blue-600", fontSize: "11px" },
  bhphoto: { text: "B&H", color: "text-slate-900", fontSize: "18px", fontWeight: "900" },
  applestore: { text: "Apple", color: "text-slate-900", fontSize: "14px" },
  dell: { text: "DELL", color: "text-blue-600", fontSize: "16px", fontWeight: "900" },
  microcenter: { text: "Micro Center", color: "text-red-600", fontSize: "9px" },
  hp: { text: "HP", color: "text-blue-600", fontSize: "18px", fontWeight: "900" },
  monoprice: { text: "Monoprice", color: "text-red-600", fontSize: "10px" },
  bose: { text: "BOSE", color: "text-slate-900", fontSize: "14px", fontWeight: "900" },

  // Спорт
  rei: { text: "REI", color: "text-green-700", fontSize: "18px", fontWeight: "900" },
  dicks: { text: "Dick's", color: "text-green-700", fontSize: "12px" },
  underarmour: { text: "UA", color: "text-slate-900", fontSize: "18px", fontWeight: "900" },
  academy: { text: "Academy", color: "text-green-700", fontSize: "11px" },
  backcountry: { text: "Backcountry", color: "text-slate-800", fontSize: "9px" },
  moosejaw: { text: "Moosejaw", color: "text-slate-800", fontSize: "10px" },
  patagonia: { text: "Patagonia", color: "text-slate-900", fontSize: "9px" },
  columbia: { text: "Columbia", color: "text-blue-700", fontSize: "10px" },

  // Дом
  homedepot: { text: "Home Depot", color: "text-orange-600", fontSize: "9px" },
  ikeaUs: { text: "IKEA", color: "text-blue-600", fontSize: "16px", fontWeight: "900" },
  bedbathandbeyond: { text: "BBB", color: "text-blue-600", fontSize: "18px", fontWeight: "900" },
  potterybarn: { text: "Pottery Barn", color: "text-slate-700", fontSize: "9px" },
  williamssonoma: { text: "Williams Sonoma", color: "text-slate-800", fontSize: "8px" },
  wayfair: { text: "wayfair", color: "text-purple-600", fontSize: "11px" },
  crateandbarrel: { text: "Crate & Barrel", color: "text-slate-800", fontSize: "8px" },
  worldmarket: { text: "World Market", color: "text-red-600", fontSize: "9px" },

  // Автозапчасти
  rockauto: { text: "RockAuto", color: "text-orange-700", fontSize: "11px" },
  autozone: { text: "AutoZone", color: "text-red-600", fontSize: "11px" },
  oreilly: { text: "O'Reilly", color: "text-green-700", fontSize: "11px" },
  advanceauto: { text: "Advance Auto", color: "text-red-600", fontSize: "9px" },
  partsgeek: { text: "PartsGeek", color: "text-blue-600", fontSize: "10px" },
  tirerack: { text: "Tire Rack", color: "text-slate-800", fontSize: "11px" },
  summitracing: { text: "Summit Racing", color: "text-red-600", fontSize: "9px" },
  "4wheelparts": { text: "4Wheel Parts", color: "text-slate-800", fontSize: "10px" },
  jegs: { text: "JEGS", color: "text-red-600", fontSize: "16px", fontWeight: "900" },
  carid: { text: "CARiD", color: "text-red-600", fontSize: "14px", fontWeight: "900" },

  // Книги
  barnesandnoble: { text: "B&N", color: "text-green-700", fontSize: "18px", fontWeight: "900" },
  thriftbooks: { text: "ThriftBooks", color: "text-slate-800", fontSize: "10px" },
  abebooks: { text: "AbeBooks", color: "text-slate-800", fontSize: "11px" },
  powells: { text: "Powell's", color: "text-slate-800", fontSize: "12px" },

  // Игрушки
  toysrus: { text: "Toys R Us", color: "text-blue-600", fontSize: "11px" },
  legostore: { text: "LEGO", color: "text-red-600", fontSize: "16px", fontWeight: "900" },
  mattel: { text: "MATTEL", color: "text-red-600", fontSize: "13px", fontWeight: "900" },
  buildabear: { text: "Build-A-Bear", color: "text-slate-800", fontSize: "9px" },
  americangirl: { text: "American Girl", color: "text-red-600", fontSize: "9px" },

  // Хобби
  michaels: { text: "Michaels", color: "text-red-600", fontSize: "12px" },
  hobbylobby: { text: "Hobby Lobby", color: "text-orange-700", fontSize: "10px" },
  joann: { text: "JOANN", color: "text-red-600", fontSize: "16px", fontWeight: "900" },
  blick: { text: "BLICK", color: "text-red-600", fontSize: "14px", fontWeight: "900" },
  guitarcenter: { text: "Guitar Center", color: "text-red-600", fontSize: "9px" },
}

export function MarketplaceLogo({ logo }: { logo: string }) {
  const style = LOGO_STYLES[logo]
  if (!style) {
    return <span className="text-slate-700 text-xs font-medium">{logo}</span>
  }
  return (
    <span
      className={style.color ?? "text-slate-700"}
      style={{ fontSize: style.fontSize, fontWeight: style.fontWeight ?? "700" }}
    >
      {style.text ?? logo}
    </span>
  )
}
