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
        availableLanguage: ["Russian", "English"],
        url: "https://t.me/owaycargo",
      },
    ],
    sameAs: [
      "https://t.me/owaycargo",
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
    description: "Международная доставка посылок из США в страны СНГ: Россия, Беларусь, Кыргызстан, Казахстан, Узбекистан",
    priceRange: "$$",
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
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Авиадоставка из США",
            description: "Доставка посылок авиатранспортом из США в страны СНГ",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Консолидация посылок",
            description: "Объединение нескольких заказов в одну отправку",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Выкуп товаров",
            description: "Выкуп товаров из американских магазинов",
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
      description: "от $12 за кг",
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

