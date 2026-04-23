"use client"

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type PickupPoint = {
  id: number
  state: string
  city: string
  address: string
  hours: string
  lat: number
  lng: number
}

type Props = {
  points: PickupPoint[]
  selectedPoint: number | null
  hoveredPoint: number | null
  onSelect: (id: number) => void
  onHover: (id: number | null) => void
}

export default function UsaMap({ points, selectedPoint, hoveredPoint, onSelect, onHover }: Props) {
  return (
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
      {points.map((point) => {
        const isSelected = selectedPoint === point.id
        const isHovered = hoveredPoint === point.id
        const scale = isSelected ? 1.3 : isHovered ? 1.1 : 1
        const glowScale = isSelected ? 1.4 : isHovered ? 1.2 : 1
        return (
          <Marker key={point.id} coordinates={[point.lng, point.lat]}>
            <Tooltip>
              <TooltipTrigger asChild>
                <g
                  onClick={() => onSelect(point.id)}
                  onMouseEnter={() => onHover(point.id)}
                  onMouseLeave={() => onHover(null)}
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
  )
}
