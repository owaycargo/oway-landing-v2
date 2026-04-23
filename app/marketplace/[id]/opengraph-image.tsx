import { ImageResponse } from "next/og"
import { getMarketplaceById } from "@/lib/marketplaces"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Заказ из США через OWAY CARGO"

export default async function MarketplaceOgImage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const marketplace = getMarketplaceById(id)
  const name = marketplace?.name ?? "Магазин США"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #fff7ed 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 36,
              fontWeight: 900,
            }}
          >
            O
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: -1,
            }}
          >
            OWAY CARGO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#2563eb",
              letterSpacing: -0.5,
            }}
          >
            Заказ и доставка из США
          </div>
          <div
            style={{
              fontSize: 90,
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#475569",
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            От $12/кг до 5 стран СНГ
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              fontSize: 54,
              lineHeight: 1,
            }}
          >
            <span>🇷🇺</span>
            <span>🇧🇾</span>
            <span>🇰🇬</span>
            <span>🇰🇿</span>
            <span>🇺🇿</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#2563eb",
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            owaycargo.com
          </div>
        </div>
      </div>
    ),
    size,
  )
}
