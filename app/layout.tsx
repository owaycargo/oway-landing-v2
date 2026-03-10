import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { StructuredData } from "@/components/structured-data"
import { TelegramDialogProvider } from "@/components/telegram-dialog-provider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"),
  title: {
    default: "OWAY CARGO — Доставка из США в СНГ | Быстрая международная доставка",
    template: "%s | OWAY CARGO",
  },
  description:
    "Надёжная доставка посылок из США в Кыргызстан, Россию и Беларусь. Self-service пункты приёма, авиадоставка, консолидация грузов. Telegram-уведомления. Калькулятор стоимости.",
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
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "OWAY CARGO",
    title: "OWAY CARGO — Доставка из США в СНГ",
    description: "Быстрая и удобная доставка посылок из США в страны СНГ. Self-service пункты приёма, прозрачное отслеживание, доступные цены.",
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
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      "ru": "/",
      "ky": "/",
      "be": "/",
      "x-default": "/",
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <TelegramDialogProvider>
          <StructuredData />
          {children}
          <Analytics />
        </TelegramDialogProvider>
      </body>
    </html>
  )
}
