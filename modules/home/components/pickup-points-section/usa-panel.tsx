"use client"

import { useState, useMemo } from "react"
import { MapPin, Clock, Navigation } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

type UsaState = { name: string; code: string }
type PickupPoint = {
  id: number
  state: string
  city: string
  address: string
  hours: string
  lat: number
  lng: number
}

const states: UsaState[] = [
  { name: "Washington", code: "WA" },
  { name: "Oregon", code: "OR" },
  { name: "California", code: "CA" },
  { name: "Illinois", code: "IL" },
  { name: "Minnesota", code: "MN" },
  { name: "Ohio", code: "OH" },
  { name: "Pennsylvania", code: "PA" },
  { name: "Maryland", code: "MD" },
  { name: "New York", code: "NY" },
]

const pickupPoints: PickupPoint[] = [
  { id: 1, state: "WA", city: "Seattle", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 47.6062, lng: -122.3321 },
  { id: 2, state: "OR", city: "Portland", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 45.5152, lng: -122.6784 },
  { id: 3, state: "CA", city: "San Francisco", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 37.7749, lng: -122.4194 },
  { id: 4, state: "CA", city: "Sacramento", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 38.5816, lng: -121.4944 },
  { id: 5, state: "CA", city: "Los Angeles", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 34.0522, lng: -118.2437 },
  { id: 6, state: "CA", city: "Irvine", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 33.6846, lng: -117.8265 },
  { id: 7, state: "CA", city: "San Diego", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 32.7157, lng: -117.1611 },
  { id: 8, state: "IL", city: "Chicago", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 41.8781, lng: -87.6298 },
  { id: 9, state: "MN", city: "Minneapolis", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 44.9778, lng: -93.265 },
  { id: 10, state: "OH", city: "Cincinnati", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 39.1031, lng: -84.512 },
  { id: 11, state: "PA", city: "Pittsburgh", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 40.4406, lng: -79.9959 },
  { id: 12, state: "PA", city: "Philadelphia", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 39.9526, lng: -75.1652 },
  { id: 13, state: "MD", city: "Baltimore", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 39.2904, lng: -76.6122 },
  { id: 14, state: "NY", city: "New York", address: "[УТОЧНИТЬ]", hours: "[УТОЧНИТЬ]", lat: 40.7128, lng: -74.006 },
]

export function UsaPanel() {
  const [selectedState, setSelectedState] = useState<string>("all")
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  const filteredPoints = useMemo(() => {
    return selectedState === "all"
      ? pickupPoints
      : pickupPoints.filter((point) => point.state === selectedState)
  }, [selectedState])

  const selectedPointData = useMemo(() => {
    return pickupPoints.find((point) => point.id === selectedPoint) || null
  }, [selectedPoint])

  const pointsWord = (n: number) =>
    n === 1 ? "пункт" : n >= 2 && n <= 4 ? "пункта" : "пунктов"

  return (
    <div>
      <div className="mb-6 max-w-xs">
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="h-12 rounded-xl" aria-label="Выберите штат">
            <SelectValue placeholder="Выберите штат" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все штаты</SelectItem>
            {states.map((state) => (
              <SelectItem key={state.code} value={state.code}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="rounded-3xl overflow-hidden border-slate-200 h-[500px] md:h-[600px] relative shadow-lg bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Navigation className="w-5 h-5 text-blue-600" />
              <p className="text-slate-900 font-bold text-lg">Карта пунктов в США</p>
            </div>
            <p className="text-slate-600 text-sm font-medium">
              {filteredPoints.length} {pointsWord(filteredPoints.length)}
            </p>
          </div>

          <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{ scale: 1000 }}
            width={800}
            height={600}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
              {({ geographies }: { geographies: { rsmKey: string }[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#e2e8f0"
                    stroke="#cbd5e1"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#cbd5e1", outline: "none", cursor: "default" },
                      pressed: { fill: "#94a3b8", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {filteredPoints.map((point) => {
              const isSelected = selectedPoint === point.id
              const isHovered = hoveredPoint === point.id
              const scale = isSelected ? 1.3 : isHovered ? 1.1 : 1
              const glowScale = isSelected ? 1.4 : isHovered ? 1.2 : 1
              return (
                <Marker key={point.id} coordinates={[point.lng, point.lat]}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <g
                        onClick={() => setSelectedPoint(point.id)}
                        onMouseEnter={() => setHoveredPoint(point.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className="cursor-pointer"
                        style={{ pointerEvents: "all" }}
                      >
                        <circle
                          r={16}
                          fill={isSelected ? "#f97316" : "#2563eb"}
                          opacity={isSelected ? 0.25 : isHovered ? 0.2 : 0.15}
                          transform={`scale(${glowScale})`}
                          style={{ transition: "transform 0.2s ease, opacity 0.2s ease" }}
                        />
                        {isSelected && (
                          <circle
                            r={16}
                            fill="#f97316"
                            opacity={0.15}
                            transform="scale(1.4)"
                            style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
                          />
                        )}
                        <circle r={9} fill="rgba(0,0,0,0.2)" transform={`translate(1, 1) scale(${scale})`} style={{ transition: "transform 0.2s ease" }} />
                        <circle
                          r={9}
                          fill={isSelected ? "#f97316" : "#2563eb"}
                          stroke="white"
                          strokeWidth={isSelected ? 3.5 : isHovered ? 3 : 2.5}
                          transform={`scale(${scale})`}
                          style={{ transition: "transform 0.2s ease, fill 0.2s ease, stroke-width 0.2s ease" }}
                        />
                        <circle r={4} fill="white" transform={`scale(${scale})`} style={{ transition: "transform 0.2s ease" }} />
                      </g>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-900 text-white border-0 shadow-lg" sideOffset={8} avoidCollisions>
                      <p className="font-semibold">{point.city}, {point.state}</p>
                      <p className="text-xs text-slate-300 mt-1">Нажмите для подробностей</p>
                    </TooltipContent>
                  </Tooltip>
                </Marker>
              )
            })}
          </ComposableMap>
        </Card>

        <div className="space-y-4 max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2">
          {filteredPoints.map((point) => (
            <Card
              key={point.id}
              className={`p-6 rounded-2xl cursor-pointer transition-all ${
                selectedPoint === point.id
                  ? "border-orange-500 border-2 bg-orange-50 shadow-lg"
                  : "border-slate-200 hover:border-blue-300 hover:shadow-md"
              }`}
              onClick={() => setSelectedPoint(point.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{point.city}, {point.state}</h3>
                  <p className="text-sm text-slate-600">США</p>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <p className="text-sm text-slate-700">{point.hours}</p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs text-blue-600 font-medium">Сообщите партнёру: &quot;Я для OWAY Cargo&quot;</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={selectedPoint !== null && selectedPointData !== null} onOpenChange={(open) => !open && setSelectedPoint(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {selectedPointData?.city}, {selectedPointData?.state}
            </DialogTitle>
          </DialogHeader>
          {selectedPointData && (
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 mb-1">Адрес:</p>
                  <p className="text-sm text-slate-600">{selectedPointData.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 mb-1">Часы работы:</p>
                  <p className="text-sm text-slate-600">{selectedPointData.hours}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-700 font-medium">Сообщите партнёру: &quot;Я для OWAY Cargo&quot;</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => { const url = `https://www.google.com/maps/search/?api=1&query=${selectedPointData.lat},${selectedPointData.lng}`; window.open(url, "_blank") }}
                >
                  Открыть в Google Maps
                </Button>
                <Button variant="outline" onClick={() => setSelectedPoint(null)}>Закрыть</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
