import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OpenTelegramButton } from "@/components/open-telegram-button"
import {
  HeroSection,
  UsaMapSection,
  ServicesSection,
  HowItWorksSection,
  CalculatorSection,
  MarketplaceSection,
  CaseStudiesSection,
  ClientsBusinessSection,
} from "@/modules/home"
import { getSeoPage, parseKeywords, getStrapiImageUrl } from "@/lib/seo"

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com")

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoPage("home")
  if (!seo) {
    return {
      metadataBase,
      alternates: { canonical: "/" },
      robots: { index: true, follow: true },
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
        <UsaMapSection />
        <div className="max-w-2xl mx-auto mt-6 mb-2 px-4 text-center space-y-3">
          <p className="text-xl md:text-2xl text-slate-600 font-medium">
            <span className="text-red-500" aria-hidden>🔴</span> Нет пункта OWAY в вашем городе?
          </p>
          <p className="text-xl md:text-2xl text-slate-600">
            Откройте ПВЗ OWAY Cargo или станьте нашим представителем в своём городе.
          </p>
          <OpenTelegramButton />
        </div>
        <ServicesSection />
        <HowItWorksSection />
        <CalculatorSection />
        <MarketplaceSection />
        <ClientsBusinessSection />
      </main>
      <Footer />
    </div>
  )
}
