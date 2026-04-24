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
      title: "О компании OWAY CARGO — Карго-доставка из США с 2019 года",
      description:
        "OWAY CARGO — международная карго-служба доставки товаров из США в Россию, Казахстан, Кыргызстан, Беларусь, Узбекистан. Склад в Делавэре, команда в 5 странах, 50 000+ клиентов.",
      keywords: [
        "о компании OWAY CARGO",
        "карго из США отзывы",
        "OWAY CARGO надёжность",
        "склад Делавэр США",
        "доставка из США официальная компания",
      ],
      authors: [{ name: "OWAY CARGO" }],
      creator: "OWAY CARGO",
      publisher: "OWAY CARGO",
      metadataBase,
      alternates: { canonical: "/about" },
      openGraph: {
        title: "О компании OWAY CARGO — Карго из США",
        description: "Международная карго-служба с 2019 года. 50 000+ клиентов, 5 стран СНГ, склад в Делавэре.",
        url: "/about",
        siteName: "OWAY CARGO",
        locale: "ru_RU",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "О компании OWAY CARGO — Карго из США",
        description: "Международная карго-служба с 2019 года. 50 000+ клиентов, 5 стран СНГ, склад в Делавэре.",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
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
