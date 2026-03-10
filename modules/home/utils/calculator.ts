export function getVolumetricWeightKg(length: number, width: number, height: number): number {
  return (length * width * height) / 5000
}

export function clampNum(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

export function clampInput(value: string, max: number, decimals = 0): string {
  if (value === "" || value === "-" || value.endsWith(".")) return value
  const n = Number.parseFloat(value)
  if (Number.isNaN(n) || n <= max) return value
  return decimals > 0 ? Math.min(max, n).toFixed(decimals) : String(Math.min(max, Math.round(n)))
}
