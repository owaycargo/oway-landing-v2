import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { UsaMapSection } from "@/components/usa-map-section"
import { ServicesSection } from "@/components/services-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { CalculatorSection } from "@/components/calculator-section"
import { MarketplaceSection } from "@/components/marketplace-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { ClientsBusinessSection } from "@/components/clients-business-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { OpenTelegramButton } from "@/components/open-telegram-button"

export const metadata: Metadata = {
  title: "OWAY CARGO — Доставка из США в СНГ | Быстрая международная доставка",
  description:
    "Надёжная доставка посылок из США в Кыргызстан, Россию и Беларусь. Self-service пункты приёма, авиадоставка, консолидация грузов. Telegram-уведомления. Калькулятор стоимости доставки.",
  keywords: [
    "доставка из США",
    "посылки в СНГ",
    "OWAY Cargo",
    "международная доставка",
    "США Россия",
    "США Кыргызстан",
    "США Беларусь",
    "доставка посылок",
    "логистика из США",
    "авиадоставка",
    "консолидация грузов",
    "self-service доставка",
  ],
  authors: [{ name: "OWAY CARGO" }],
  creator: "OWAY CARGO",
  publisher: "OWAY CARGO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OWAY CARGO — Доставка из США в СНГ",
    description: "Быстрая и удобная доставка посылок из США в страны СНГ. Self-service пункты приёма, прозрачное отслеживание, доступные цены.",
    url: "/",
    siteName: "OWAY CARGO",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "OWAY CARGO — Доставка из США в СНГ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OWAY CARGO — Доставка из США в СНГ",
    description: "Быстрая и удобная доставка посылок из США в страны СНГ",
    images: ["/banner.jpg"],
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
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
