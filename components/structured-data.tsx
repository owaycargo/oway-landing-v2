export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OWAY CARGO",
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    description: "Международный логистический сервис доставки посылок из США в страны СНГ",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Russian"],
    },
    sameAs: [
      // Add social media links here when available
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OWAY CARGO",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Международная доставка посылок",
    provider: {
      "@type": "Organization",
      name: "OWAY CARGO",
    },
    areaServed: ["US", "RU", "BY", "KG"],
    description: "Доставка посылок из США в страны СНГ (Россия, Беларусь, Кыргызстан)",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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

