import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "OWAY CARGO — Доставка из США в страны СНГ"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
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

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Доставка из США в СНГ
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#475569",
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            От $12/кг · 5–21 день · Без минимального веса
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
