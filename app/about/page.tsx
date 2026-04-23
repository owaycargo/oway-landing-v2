import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { getSeoPage, parseKeywords, getStrapiImageUrl } from "@/lib/seo"
import {
  AboutHero,
  AboutGeography,
  AboutBusinessModel,
  AboutClientTypes,
  AboutTransparency,
  AboutTechnology,
  AboutPartnership,
  AboutMission,
} from "@/modules/about"

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com")

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoPage("about")
  if (!seo) {
    return {
      metadataBase,
      alternates: { canonical: "/about" },
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
    metadataBase,
    alternates: { canonical: "/about" },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: "/about",
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
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "О компании", url: "/about" },
        ]}
      />
      <Header />

      <main className="container mx-auto px-4 py-16">
        <AboutHero />
        <AboutGeography />
        <AboutBusinessModel />
        <AboutClientTypes />
        <AboutTransparency />
        <AboutTechnology />
        <AboutPartnership />
        <AboutMission />
      </main>

      <Footer />
    </div>
  )
}
