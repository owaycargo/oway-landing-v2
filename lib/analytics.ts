type GtagParams = Record<string, string | number | boolean | undefined>

type GtagWindow = Window & {
  gtag?: (command: "event", event: string, params?: GtagParams) => void
}

export function trackEvent(name: string, params?: GtagParams): void {
  if (typeof window === "undefined") return
  const w = window as GtagWindow
  try {
    w.gtag?.("event", name, params)
  } catch {
    // silent — analytics should never break the UI
  }
}
