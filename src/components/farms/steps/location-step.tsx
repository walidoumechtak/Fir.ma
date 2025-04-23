"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Loader2, Plus, Minus } from "lucide-react"

// Mock location data
const mockLocations = [
  { id: 1, name: "Rabat", region: "Rabat-Salé-Kénitra", coordinates: { lat: 34.0209, lng: -6.8416 } },
  { id: 2, name: "Casablanca", region: "Casablanca-Settat", coordinates: { lat: 33.5731, lng: -7.5898 } },
  { id: 3, name: "Fez", region: "Fès-Meknès", coordinates: { lat: 34.0181, lng: -5.0078 } },
  { id: 4, name: "Tangier", region: "Tanger-Tétouan-Al Hoceïma", coordinates: { lat: 35.7595, lng: -5.834 } },
  { id: 5, name: "Agadir", region: "Souss-Massa", coordinates: { lat: 30.4278, lng: -9.5981 } },
  { id: 6, name: "Marrakesh", region: "Marrakesh-Safi", coordinates: { lat: 31.6295, lng: -7.9811 } },
]

export function LocationStep({ formData, updateFormData, onNext, onBack }) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const popupRef = useRef(null)
  const searchRef = useRef(null)
  const searchResultsRef = useRef(null)
  
  const [zoom, setZoom] = useState(7)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState({
    name: formData.location?.split(",")[0] || "Marrakesh",
    region: formData.location?.split(",")[1]?.trim() || "Marrakesh-Safi",
    coordinates: formData.coordinates?.lat ? formData.coordinates : { lat: 31.6295, lng: -7.9811 }
  })
  const [mapReady, setMapReady] = useState(false)

  // Initialize map when component mounts
  useEffect(() => {
    // Skip if running on server or map already exists
    if (typeof window === "undefined" || !mapContainerRef.current || mapRef.current) return;

    // Load Leaflet CSS dynamically
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.css';
    document.head.appendChild(linkElement);
    
    // Load Leaflet JS dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize map after Leaflet is loaded
      initializeMap();
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      document.body.removeChild(script);
      document.head.removeChild(linkElement);
    };
  }, []);

  const initializeMap = () => {
    const L = window.L;
    
    // Set marker icon options
    const DefaultIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    
    // Create map
    const map = L.map(mapContainerRef.current).setView(
      [selectedLocation.coordinates.lat, selectedLocation.coordinates.lng], 
      zoom
    );
    
    // Add tile layers
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);
    
    // Add backup tile layer
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
      maxZoom: 18,
      opacity: 0
    }).addTo(map);
    
    // Create initial marker and popup
    const marker = L.marker([selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]).addTo(map);
    const popupContent = `
      <div class="font-medium">${selectedLocation.name}</div>
      <div class="text-sm text-gray-500">${selectedLocation.region}</div>
      <div class="text-xs mt-1">
        ${selectedLocation.coordinates.lat.toFixed(4)}, ${selectedLocation.coordinates.lng.toFixed(4)}
      </div>
    `;
    marker.bindPopup(popupContent);
    
    // Handle map click
    map.on('click', (e) => {
      handleMapClick(e, map, marker);
    });
    
    // Fix tiles loading
    setTimeout(() => {
      map.invalidateSize();
      setMapReady(true);
    }, 100);
    
    // Periodic refresh to ensure tiles load correctly
    const interval = setInterval(() => {
      map.invalidateSize();
      // Small movements to trigger tile loading
      map.panBy([1, 1], { animate: false });
      setTimeout(() => {
        map.panBy([-1, -1], { animate: false });
      }, 50);
    }, 500);
    
    // Clear the interval after a few seconds
    setTimeout(() => clearInterval(interval), 3000);
    
    // Store references
    mapRef.current = map;
    markerRef.current = marker;
    
    return () => {
      clearInterval(interval);
    };
  };

  // Update map when selectedLocation changes
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;

    const map = mapRef.current;
    const marker = markerRef.current;
    
    // Update marker position
    marker.setLatLng([selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]);
    
    // Update popup content
    const popupContent = `
      <div class="font-medium">${selectedLocation.name}</div>
      <div class="text-sm text-gray-500">${selectedLocation.region}</div>
      <div class="text-xs mt-1">
        ${selectedLocation.coordinates.lat.toFixed(4)}, ${selectedLocation.coordinates.lng.toFixed(4)}
      </div>
    `;
    marker.unbindPopup();
    marker.bindPopup(popupContent);
    
    // Pan to the new location
    map.panTo([selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]);
  }, [selectedLocation]);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = mockLocations.filter(loc =>
        loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(e.target) &&
          searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation({
      name: location.name,
      region: location.region,
      coordinates: location.coordinates
    });
    
    updateFormData({
      location: `${location.name}, ${location.region}`,
      coordinates: location.coordinates
    });

    if (mapRef.current) {
      mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng], 12);
    }
    
    setSearchTerm(location.name);
    setShowResults(false);
  };

  const handleMapClick = (e, map = mapRef.current, marker = markerRef.current) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const newLocation = {
      name: "Selected Location",
      region: "Custom Coordinates",
      coordinates: { lat, lng }
    };
    
    setSelectedLocation(newLocation);
    updateFormData({
      location: `Custom Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      coordinates: { lat, lng }
    });
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      const newZoom = Math.min(mapRef.current.getZoom() + 1, 18);
      mapRef.current.setZoom(newZoom);
      setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const newZoom = Math.max(mapRef.current.getZoom() - 1, 5);
      mapRef.current.setZoom(newZoom);
      setZoom(newZoom);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <Label htmlFor="location-search">Search Location</Label>
        <div className="relative" ref={searchRef}>
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
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onClick={() => setShowResults(true)}
            placeholder="Search for cities in Morocco..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Interactive Map with Search Results inside */}
      <div className="space-y-2">
        <Label>Click on the map or search to select a location</Label>
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-300">
          {/* Search Results - Fixed position inside map container */}
          {showResults && (
            <div 
              ref={searchResultsRef}
              className="absolute top-0 left-0 right-0 bg-white z-[2000] max-h-48 overflow-y-auto shadow-md"
            >
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
          
          {/* Map Container */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-full"
            id="map-container"
          >
            {!mapReady && (
              <div className="h-full w-full bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
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
                e.stopPropagation();
                handleZoomIn();
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-white shadow-md hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
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