"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FarmMapProps {
  coordinates: {
    lat: number
    lng: number
  }
  name: string
}

export function FarmMap({ coordinates, name }: FarmMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const [zoom, setZoom] = useState(12)
  const [mapReady, setMapReady] = useState(false)

  // Initialize map when component mounts
  useEffect(() => {
    // Skip if running on server or map already exists
    if (typeof window === "undefined" || !mapContainerRef.current || mapRef.current) return

    // Load Leaflet CSS dynamically
    const linkElement = document.createElement("link")
    linkElement.rel = "stylesheet"
    linkElement.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.css"
    document.head.appendChild(linkElement)

    // Load Leaflet JS dynamically
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.js"
    script.async = true

    script.onload = () => {
      // Initialize map after Leaflet is loaded
      initializeMap()
    }

    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      if (document.head.contains(linkElement)) {
        document.head.removeChild(linkElement)
      }
    }
  }, [])

  // Handle window resize to ensure map fills container
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const initializeMap = () => {
    const L = window.L

    // Set marker icon options
    const DefaultIcon = L.icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
    L.Marker.prototype.options.icon = DefaultIcon

    // Create map
    const map = L.map(mapContainerRef.current).setView([coordinates.lat, coordinates.lng], zoom)

    // Add tile layers
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map)

    // Add backup tile layer
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
      maxZoom: 18,
      opacity: 0,
    }).addTo(map)

    // Create initial marker and popup
    const marker = L.marker([coordinates.lat, coordinates.lng]).addTo(map)
    const popupContent = `
      <div class="font-medium">${name}</div>
      <div class="text-xs mt-1">
        ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}
      </div>
    `
    marker.bindPopup(popupContent).openPopup()

    // Fix tiles loading
    setTimeout(() => {
      map.invalidateSize()
      setMapReady(true)
    }, 100)

    // Periodic refresh to ensure tiles load correctly
    const interval = setInterval(() => {
      map.invalidateSize()
      // Small movements to trigger tile loading
      map.panBy([1, 1], { animate: false })
      setTimeout(() => {
        map.panBy([-1, -1], { animate: false })
      }, 50)
    }, 500)

    // Clear the interval after a few seconds
    setTimeout(() => clearInterval(interval), 3000)

    // Store references
    mapRef.current = map
    markerRef.current = marker

    return () => {
      clearInterval(interval)
    }
  }

  const handleZoomIn = () => {
    if (mapRef.current) {
      const newZoom = Math.min(mapRef.current.getZoom() + 1, 18)
      mapRef.current.setZoom(newZoom)
      setZoom(newZoom)
    }
  }

  const handleZoomOut = () => {
    if (mapRef.current) {
      const newZoom = Math.max(mapRef.current.getZoom() - 1, 5)
      mapRef.current.setZoom(newZoom)
      setZoom(newZoom)
    }
  }

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden border border-gray-300">
      {/* Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" id="map-container">
        {!mapReady && (
          <div className="h-full w-full bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {/* Custom Zoom Controls */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 z-[1000]">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-white shadow-md hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation()
            handleZoomIn()
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-white shadow-md hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation()
            handleZoomOut()
          }}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Location Info */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1 text-xs z-[1000]">
        {name} • {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
      </div>
    </div>
  )
}
