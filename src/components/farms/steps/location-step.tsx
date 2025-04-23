"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Loader2, Plus, Minus } from "lucide-react"

// Fix for default marker icons
const createMarkerIcon = () => {
  return L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
}

// Mock location data
const mockLocations = [
  { id: 1, name: "Rabat", region: "Rabat-Salé-Kénitra", coordinates: { lat: 34.0209, lng: -6.8416 } },
  { id: 2, name: "Casablanca", region: "Casablanca-Settat", coordinates: { lat: 33.5731, lng: -7.5898 } },
  { id: 3, name: "Fez", region: "Fès-Meknès", coordinates: { lat: 34.0181, lng: -5.0078 } },
  { id: 4, name: "Tangier", region: "Tanger-Tétouan-Al Hoceïma", coordinates: { lat: 35.7595, lng: -5.834 } },
  { id: 5, name: "Agadir", region: "Souss-Massa", coordinates: { lat: 30.4278, lng: -9.5981 } },
  { id: 6, name: "Marrakesh", region: "Marrakesh-Safi", coordinates: { lat: 31.6295, lng: -7.9811 } },
]

// Dynamic imports
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)

export function LocationStep({ formData, updateFormData, onNext, onBack }: any) {
  const [mounted, setMounted] = useState(false)
  const mapRef = useRef<any>(null)
  const [zoom, setZoom] = useState(7)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState({
    name: formData.location?.split(",")[0] || "Marrakesh",
    region: formData.location?.split(",")[1]?.trim() || "Marrakesh-Safi",
    coordinates: formData.coordinates?.lat ? formData.coordinates : { lat: 31.6295, lng: -7.9811 }
  })
  const searchRef = useRef<HTMLDivElement>(null)

  // Initialize map and fix marker icons
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions(createMarkerIcon().options)
    }
  }, [])

  // Fix map sizing issues
  useEffect(() => {
    if (mounted && mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize()
      }, 100)
    }
  }, [mounted])

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const timer = setTimeout(() => {
      const filtered = mockLocations.filter(loc =>
        loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.region.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(filtered)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLocationSelect = (location: any) => {
    setSelectedLocation({
      name: location.name,
      region: location.region,
      coordinates: location.coordinates
    })
    
    updateFormData({
      location: `${location.name}, ${location.region}`,
      coordinates: location.coordinates
    })

    if (mapRef.current) {
      mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng], 12)
    }
    
    setSearchTerm(location.name)
    setShowResults(false)
  }

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng
    const newLocation = {
      name: "Selected Location",
      region: "Custom Coordinates",
      coordinates: { lat, lng }
    }
    
    setSelectedLocation(newLocation)
    updateFormData({
      location: `Custom Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      coordinates: { lat, lng }
    })
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 1, 15))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 1, 5))

  if (!mounted) {
    return (
      <div className="h-[400px] w-full bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="space-y-2" ref={searchRef}>
        <Label htmlFor="location-search">Search Location</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <Input
            id="location-search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setShowResults(true)
            }}
            onClick={() => setShowResults(true)}
            placeholder="Search for cities in Morocco..."
            className="pl-10"
          />
          {showResults && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
              {isLoading ? (
                <div className="px-4 py-2 text-center text-gray-500">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                </div>
              ) : searchResults.length > 0 ? (
                <ul className="py-1">
                  {searchResults.map((location) => (
                    <li
                      key={location.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-gray-500">{location.region}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : searchTerm.trim() ? (
                <div className="px-4 py-2 text-center text-gray-500">No locations found</div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="space-y-2">
        <Label>Click on the map or search to select a location</Label>
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-300">
          <MapContainer
            ref={mapRef}
            center={[selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
            whenReady={() => mapRef.current?.invalidateSize()}
            onClick={handleMapClick}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              noWrap={true}
            />
            <Marker
              position={[selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]}
              icon={createMarkerIcon()}
            >
              <Popup>
                <div className="font-medium">{selectedLocation.name}</div>
                <div className="text-sm text-gray-500">{selectedLocation.region}</div>
                <div className="text-xs mt-1">
                  {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                </div>
              </Popup>
            </Marker>
          </MapContainer>

          {/* Zoom Controls */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 z-[1000]">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-white shadow-md"
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
              className="h-8 w-8 bg-white shadow-md"
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
            {selectedLocation.name}, {selectedLocation.region}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
          Next
        </Button>
      </div>
    </div>
  )
}