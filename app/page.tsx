import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  HeroSection,
  PickupPointsSection,
  ServicesSection,
  HowItWorksSection,
  CalculatorSection,
  LeadFormSection,
} from "@/modules/home"
import { getSeoPage, parseKeywords, getStrapiImageUrl } from "@/lib/seo"

const MarketplaceSection = dynamic(() =>
  import("@/modules/home/components/marketplace-section").then((m) => m.MarketplaceSection),
)
const ClientsBusinessSection = dynamic(() =>
  import("@/modules/home/components/clients-business-section").then((m) => m.ClientsBusinessSection),
)
const PartnerSection = dynamic(() =>
  import("@/modules/home/components/partner-section").then((m) => m.PartnerSection),
)

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com")

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoPage("home")
  if (!seo) {
    return {
      title: "OWAY CARGO — Доставка из США в Россию, Казахстан, Кыргызстан, Беларусь, Узбекистан",
      description:
        "Карго-доставка из США в 5 стран СНГ. Склад в Делавэре (0% sales tax). Тариф от $12/кг. Авиа 7–21 день. Выкуп, консолидация, страхование.",
      keywords: [
        "доставка из США",
        "карго из Америки",
        "OWAY CARGO",
        "доставка США Россия",
        "доставка США Казахстан",
        "доставка США Кыргызстан",
        "склад в Делавэре",
        "форвардинг из США",
      ],
      authors: [{ name: "OWAY CARGO" }],
      creator: "OWAY CARGO",
      publisher: "OWAY CARGO",
      formatDetection: { email: false, address: false, telephone: false },
      metadataBase,
      alternates: { canonical: "/" },
      openGraph: {
        title: "OWAY CARGO — Доставка из США в СНГ",
        description: "Карго из США: от $12/кг, склад в Делавэре (0% налог), авиа 7–21 день в 5 стран.",
        url: "/",
        siteName: "OWAY CARGO",
        locale: "ru_RU",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "OWAY CARGO — Доставка из США в СНГ",
        description: "Карго из США: от $12/кг, склад в Делавэре (0% налог), авиа 7–21 день в 5 стран.",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    }
  }

  const keywords = parseKeywords(seo.keywords)
  const ogImage = seo.image?.[0]
  const imageUrl = ogImage ? getStrapiImageUrl(ogImage.url) : undefined
  const imageAlt = ogImage?.alternativeText || seo.title

  return {
    title: seo.title,
    description: seo.description,
    ...(keywords.length > 0 && { keywords }),
    authors: [{ name: "OWAY CARGO" }],
    creator: "OWAY CARGO",
    publisher: "OWAY CARGO",
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase,
    alternates: { canonical: "/" },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: "/",
      siteName: "OWAY CARGO",
      locale: "ru_RU",
      type: "website",
      ...(imageUrl && {
        images: [
          { url: imageUrl, width: ogImage?.width ?? 1200, height: ogImage?.height ?? 630, alt: imageAlt },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <PickupPointsSection />
        <CalculatorSection />
        <LeadFormSection />
        <ServicesSection />
        <MarketplaceSection />
        <ClientsBusinessSection />
        <PartnerSection />
      </main>
      <Footer />
    </div>
  )
}
