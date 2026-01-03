declare module "react-simple-maps" {
  import * as React from "react"

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: Record<string, any>
    width?: number
    height?: number
    style?: React.CSSProperties
    children?: React.ReactNode
  }

  export interface GeographiesProps {
    geography: string | object
    children: (props: { geographies: any[] }) => React.ReactNode
  }

  export interface GeographyProps {
    geography: any
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
    key?: string | number
  }

  export interface MarkerProps {
    coordinates: [number, number]
    children?: React.ReactNode
    key?: string | number
  }

  export const ComposableMap: React.FC<ComposableMapProps>
  export const Geographies: React.FC<GeographiesProps>
  export const Geography: React.FC<GeographyProps>
  export const Marker: React.FC<MarkerProps>
}

