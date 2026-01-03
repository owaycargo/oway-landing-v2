"use client"

import { useState, useEffect, useMemo } from "react"
import { MapPin, Copy, Clock, X, Navigation } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const states = [
  { name: "Florida", code: "FL" },
  { name: "Texas", code: "TX" },
  { name: "California", code: "CA" },
  { name: "New York", code: "NY" },
  { name: "Illinois", code: "IL" },
]

const pickupPoints = [
  {
    id: 1,
    state: "FL",
    city: "Miami",
    address: "1234 Ocean Drive, Miami Beach, FL 33139",
    hours: "Пн-Пт: 9:00-18:00, Сб-Вс: 10:00-16:00",
    lat: 25.7617,
    lng: -80.1918,
  },
  {
    id: 2,
    state: "FL",
    city: "Orlando",
    address: "5678 International Drive, Orlando, FL 32819",
    hours: "Пн-Пт: 8:00-20:00, Сб-Вс: 10:00-18:00",
    lat: 28.5383,
    lng: -81.3792,
  },
  {
    id: 3,
    state: "TX",
    city: "Houston",
    address: "9012 Westheimer Road, Houston, TX 77063",
    hours: "Пн-Пт: 9:00-19:00, Сб: 10:00-17:00",
    lat: 29.7604,
    lng: -95.3698,
  },
  {
    id: 4,
    state: "CA",
    city: "Los Angeles",
    address: "3456 Wilshire Blvd, Los Angeles, CA 90010",
    hours: "Пн-Сб: 8:00-20:00, Вс: 10:00-18:00",
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: 5,
    state: "NY",
    city: "New York",
    address: "7890 Broadway, New York, NY 10003",
    hours: "Пн-Вс: 8:00-22:00",
    lat: 40.7128,
    lng: -74.006,
  },
]

export function UsaMapSection() {
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

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
  }

  return (
    <section id="map" className="w-full max-w-[1440px] mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          Пункты приёма OWAY Cargo в США
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Выберите штат или город и найдите ближайший пункт приёма посылок. Все точки работают в режиме{" "}
          <span className="font-semibold text-blue-600">self-service</span>
        </p>
      </div>

      <div className="mb-6 max-w-xs mx-auto">
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="h-12 rounded-xl" aria-label="Выберите штат для фильтрации пунктов приёма">
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
        {/* Interactive Map */}
        <Card className="rounded-3xl overflow-hidden border-slate-200 h-[600px] relative shadow-lg bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Navigation className="w-5 h-5 text-blue-600" />
              <p className="text-slate-900 font-bold text-lg">Интерактивная карта США</p>
            </div>
            <p className="text-slate-600 text-sm font-medium">
              {filteredPoints.length} {filteredPoints.length === 1 ? "пункт" : filteredPoints.length < 5 ? "пункта" : "пунктов"} приёма
            </p>
          </div>
          
          <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{
              scale: 1000,
            }}
            width={800}
            height={600}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => (
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
              const shouldScale = isSelected || isHovered
              
              return (
                <Marker
                  key={point.id}
                  coordinates={[point.lng, point.lat]}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <g
                        onClick={() => setSelectedPoint(point.id)}
                        onMouseEnter={() => setHoveredPoint(point.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className="cursor-pointer"
                        style={{ 
                          transformOrigin: "center",
                          transform: shouldScale ? "scale(1.3)" : "scale(1)",
                          transition: "transform 0.2s ease",
                          pointerEvents: "all",
                        }}
                      >
                        {/* Outer glow effect */}
                        <circle
                          r={isSelected ? 22 : isHovered ? 18 : 16}
                          fill={isSelected ? "#f97316" : "#2563eb"}
                          opacity={isSelected ? 0.2 : isHovered ? 0.18 : 0.15}
                        />
                        {/* Pulse animation for selected */}
                        {isSelected && (
                          <circle
                            r={22}
                            fill="#f97316"
                            opacity={0.1}
                            style={{
                              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                            }}
                          />
                        )}
                        {/* Pin shadow */}
                        <circle
                          r={isSelected ? 13 : isHovered ? 10 : 9}
                          fill="rgba(0,0,0,0.2)"
                          transform="translate(1, 1)"
                        />
                        {/* Main pin circle */}
                        <circle
                          r={isSelected ? 13 : isHovered ? 10 : 9}
                          fill={isSelected ? "#f97316" : "#2563eb"}
                          stroke="white"
                          strokeWidth={isSelected ? 3.5 : isHovered ? 3 : 2.5}
                        />
                        {/* Inner white dot */}
                        <circle
                          r={isSelected ? 5.5 : isHovered ? 4.5 : 4}
                          fill="white"
                        />
                      </g>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-900 text-white border-0 shadow-lg">
                      <p className="font-semibold">{point.city}, {point.state}</p>
                      <p className="text-xs text-slate-300 mt-1">Нажмите для подробностей</p>
                    </TooltipContent>
                  </Tooltip>
                </Marker>
              )
            })}
          </ComposableMap>
        </Card>

        {/* Points list */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
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
                  <h3 className="font-bold text-lg text-slate-900">
                    {point.city}, {point.state}
                  </h3>
                  <p className="text-sm text-slate-600">США</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-slate-700">{point.address}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyAddress(point.address)
                    }}
                    className="ml-auto"
                    aria-label="Копировать адрес"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <p className="text-sm text-slate-700">{point.hours}</p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs text-blue-600 font-medium">💡 Сообщите партнёру: "Я для OWAY Cargo"</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog с информацией о выбранном пункте */}
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
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyAddress(selectedPointData.address)}
                    className="mt-2"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Копировать адрес
                  </Button>
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
                  <p className="text-xs text-blue-700 font-medium">
                    💡 Сообщите партнёру: "Я для OWAY Cargo"
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${selectedPointData.lat},${selectedPointData.lng}`
                    window.open(url, "_blank")
                  }}
                >
                  Открыть в Google Maps
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedPoint(null)}
                >
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
