import { headers } from "next/headers"
import Image from "next/image"
import { Suspense } from "react"
import { PickupPointsTabs } from "./tabs-client"

const CIS_COUNTRIES = new Set(["RU", "BY", "KZ", "KG", "UZ"])

type TabValue = "usa" | "cis"

async function resolveInitialTab(): Promise<TabValue> {
  const h = await headers()
  const country = h.get("x-vercel-ip-country")?.toUpperCase() ?? ""
  return CIS_COUNTRIES.has(country) ? "cis" : "usa"
}

export async function PickupPointsSection() {
  const initialTab = await resolveInitialTab()

  return (
    <section id="pickup" className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-10 md:mb-12 flex flex-col items-center">
        <Image
          src="/mascots/mascot-cool.webp"
          alt=""
          aria-hidden
          width={1711}
          height={2304}
          sizes="(max-width: 768px) 96px, 128px"
          className="w-24 md:w-32 h-auto mb-4 drop-shadow-[0_15px_25px_rgba(15,23,42,0.15)]"
          />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          Где отправить и где получить
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Привозите посылку в наш пункт в <span className="font-semibold">США</span> и забирайте в{" "}
          <span className="font-semibold">столице своей страны</span> в СНГ.
        </p>
      </div>

      <Suspense fallback={null}>
        <PickupPointsTabs initialTab={initialTab} />
      </Suspense>
    </section>
  )
}
