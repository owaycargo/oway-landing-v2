import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Geist } from "next/font/google"
import { StructuredData } from "@/components/structured-data"
import { TelegramDialogProvider } from "@/components/telegram-dialog-provider"
import { WhatsAppDialogProvider } from "@/components/whatsapp-dialog-provider"
import { FloatingContacts } from "@/components/floating-contacts"
import { CookieConsent } from "@/components/cookie-consent"
import "./globals.css"

const GA_MEASUREMENT_ID = "G-4G1RFW231V"

const geist = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://owaycargo.com"),
  title: {
    default: "OWAY CARGO — Доставка из США в СНГ | Быстрая международная доставка",
    template: "%s | OWAY CARGO",
  },
  description:
    "Надёжная доставка посылок из США в Россию, Беларусь, Кыргызстан, Казахстан и Узбекистан. От $12/кг, без минимального веса. 15 пунктов приёма в США. Telegram-уведомления, калькулятор стоимости.",
  keywords: [
    "доставка из США",
    "посылки в СНГ",
    "OWAY Cargo",
    "международная доставка",
    "США Россия",
    "США Кыргызстан",
    "США Беларусь",
    "США Казахстан",
    "США Узбекистан",
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
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
      <head>
        <Script id="ga4-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var stored = null;
            try { stored = localStorage.getItem('oway_cookie_consent'); } catch (e) {}
            var granted = stored === 'accepted';
            gtag('consent', 'default', {
              analytics_storage: granted ? 'granted' : 'denied',
              ad_storage: granted ? 'granted' : 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${geist.variable} font-sans antialiased`}>
        <TelegramDialogProvider>
          <WhatsAppDialogProvider>
            <StructuredData />
            {children}
            <FloatingContacts />
            <CookieConsent />
          </WhatsAppDialogProvider>
        </TelegramDialogProvider>
      </body>
    </html>
  )
}
