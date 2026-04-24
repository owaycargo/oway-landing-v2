const DELIVERY_OFFERS = [
  { country: "Kyrgyzstan", code: "KG", price: "12", days: "7-9" },
  { country: "Kazakhstan", code: "KZ", price: "12", days: "7-9" },
  { country: "Uzbekistan", code: "UZ", price: "12", days: "7-9" },
  { country: "Russia", code: "RU", price: "18", days: "16-21" },
  { country: "Belarus", code: "BY", price: "18", days: "16-21" },
]

export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OWAY CARGO",
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    description: "Международный логистический сервис доставки посылок из США в страны СНГ",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        telephone: "+1-213-276-6898",
        availableLanguage: ["Russian", "English"],
        url: "https://t.me/owaycargo",
      },
    ],
    sameAs: [
      "https://t.me/owaycargo",
      "https://www.instagram.com/oway.cargo",
      "https://www.tiktok.com/@owaycargo",
      "https://threads.net/@owaycargo",
    ],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: "OWAY CARGO",
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    image: `${baseUrl}/banner.jpg`,
    telephone: "+1-213-276-6898",
    description: "Международная доставка посылок из США в страны СНГ: Россия, Беларусь, Кыргызстан, Казахстан, Узбекистан",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressRegion: "DE",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "412",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Russia" },
      { "@type": "Country", name: "Belarus" },
      { "@type": "Country", name: "Kyrgyzstan" },
      { "@type": "Country", name: "Kazakhstan" },
      { "@type": "Country", name: "Uzbekistan" },
    ],
    serviceArea: {
      "@type": "GeoShape",
      addressCountry: ["US", "RU", "BY", "KG", "KZ", "UZ"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги доставки",
      itemListElement: [
        ...DELIVERY_OFFERS.map((offer) => ({
          "@type": "Offer",
          priceCurrency: "USD",
          price: offer.price,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: offer.price,
            priceCurrency: "USD",
            unitCode: "KGM",
          },
          eligibleRegion: { "@type": "Country", name: offer.country },
          itemOffered: {
            "@type": "Service",
            name: `Авиадоставка из США в ${offer.country}`,
            description: `$${offer.price}/кг, ${offer.days} дней`,
          },
        })),
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Консолидация посылок",
            description: "Объединение нескольких заказов в одну отправку — бесплатно",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Выкуп товаров из США",
            description: "Выкуп товаров из американских магазинов для клиента (10% физ, 5% бизнес)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Обмен валюты",
            description: "USD ↔ RUB/KGS/KZT/UZS/BYN",
          },
        },
      ],
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OWAY CARGO",
    url: baseUrl,
    inLanguage: "ru",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/marketplace?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Международная доставка посылок OWAY CARGO",
    serviceType: "Международная доставка посылок",
    provider: {
      "@type": "Organization",
      name: "OWAY CARGO",
      url: baseUrl,
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Russia" },
      { "@type": "Country", name: "Belarus" },
      { "@type": "Country", name: "Kyrgyzstan" },
      { "@type": "Country", name: "Kazakhstan" },
      { "@type": "Country", name: "Uzbekistan" },
    ],
    description: "Доставка посылок из США в страны СНГ (Россия, Беларусь, Кыргызстан, Казахстан, Узбекистан)",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "12",
      highPrice: "18",
      offerCount: DELIVERY_OFFERS.length,
      description: "От $12/кг (KG, KZ, UZ) до $18/кг (RU, BY)",
      offers: DELIVERY_OFFERS.map((offer) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: offer.price,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: offer.price,
          priceCurrency: "USD",
          unitCode: "KGM",
        },
        eligibleRegion: { "@type": "Country", name: offer.country },
        deliveryLeadTime: {
          "@type": "QuantitativeValue",
          minValue: offer.days.split("-")[0],
          maxValue: offer.days.split("-")[1],
          unitCode: "DAY",
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  )
}

