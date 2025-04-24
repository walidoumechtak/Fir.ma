"use client"

import { useState, useEffect } from "react"
import { MapPin, Droplets, Thermometer, Wind, Sun, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FarmMap } from "@/components/farms/farm-map"
import { FarmGauge } from "@/components/farms/farm-gauge"
import { FarmAdvice } from "@/components/farms/farm-advice"
import type { Farm } from "@/components/farms/farms-page"

interface FarmDetailsPageProps {
  farmId: string
}

// Mock farm data
const mockFarm: Farm = {
  id: "1",
  name: "Olive Grove Estate",
  size: "25 hectares",
  location: "Marrakesh Region, Morocco",
  coordinates: { lat: 31.6295, lng: -7.9811 },
  crops: ["Olives", "Citrus", "Figs"],
  status: "good",
}

// Mock weather data
const weatherData = {
  current: {
    temperature: 28,
    humidity: 45,
    windSpeed: 12,
    condition: "Sunny",
  },
  forecast: "Light rain expected in 2 hours",
  soilMoisture: 42,
  waterLevel: 78,
  systemEfficiency: 92,
}

// Mock advice data
const adviceData = [
  {
    id: "1",
    text: "Adjust irrigation schedule due to upcoming rain",
    isCompleted: false,
    priority: "high",
  },
  {
    id: "2",
    text: "Check soil moisture sensors in the eastern section",
    isCompleted: true,
    priority: "medium",
  },
  {
    id: "3",
    text: "Apply organic fertilizer to citrus trees this week",
    isCompleted: false,
    priority: "medium",
  },
  {
    id: "4",
    text: "Inspect irrigation pipes for potential leaks",
    isCompleted: false,
    priority: "high",
  },
  {
    id: "5",
    text: "Prune olive trees in the northern section",
    isCompleted: true,
    priority: "low",
  },
]

export function FarmDetailsPage({ farmId }: FarmDetailsPageProps) {
  const [farm, setFarm] = useState<Farm | null>(null)
  const [advice, setAdvice] = useState(adviceData)

  // Simulate fetching farm data
  useEffect(() => {
    // In a real app, you would fetch the farm data from an API
    setFarm(mockFarm)
  }, [farmId])

  const toggleAdviceCompletion = (id: string) => {
    setAdvice((prevAdvice) =>
      prevAdvice.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)),
    )
  }

  if (!farm) {
    return <div className="p-8 text-center">Loading farm details...</div>
  }

  return (
    <div className="space-y-8">
      {/* Farm Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-800">{farm.name}</h1>
          <div className="flex items-center gap-2">
            {farm.status === "good" ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">All systems normal</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-red-600 font-medium">Needs attention</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-1 text-gray-500" />
          <span>{farm.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {farm.crops.map((crop, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {crop}
            </span>
          ))}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {farm.size}
          </span>
        </div>
      </div>

      {/* Main Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-1 overflow-hidden border-none shadow-md ">
          <CardContent className="p-0 h-full">
            <FarmMap coordinates={farm.coordinates} name={farm.name} />
          </CardContent>
        </Card>

        {/* Weather and Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weather Components */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-none shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-amber-600 text-sm font-medium">Temperature</p>
                  <p className="text-2xl font-bold text-amber-800">{weatherData.current.temperature}°C</p>
                </div>
                <div className="bg-amber-500 bg-opacity-10 p-2 rounded-full">
                  <Thermometer className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Humidity</p>
                  <p className="text-2xl font-bold text-blue-800">{weatherData.current.humidity}%</p>
                </div>
                <div className="bg-blue-500 bg-opacity-10 p-2 rounded-full">
                  <Droplets className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-none shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Wind</p>
                  <p className="text-2xl font-bold text-gray-800">{weatherData.current.windSpeed} km/h</p>
                </div>
                <div className="bg-gray-500 bg-opacity-10 p-2 rounded-full">
                  <Wind className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-none shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-sm font-medium">Condition</p>
                  <p className="text-2xl font-bold text-indigo-800">{weatherData.current.condition}</p>
                </div>
                <div className="bg-indigo-500 bg-opacity-10 p-2 rounded-full">
                  <Sun className="h-8 w-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Farm Status Gauge */}
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Farm Health Status</h3>
              <FarmGauge
                soilMoisture={weatherData.soilMoisture}
                waterLevel={weatherData.waterLevel}
                systemEfficiency={weatherData.systemEfficiency}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weather Forecast */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-800">
          Weather Forecast: <span className="text-blue-700">{weatherData.forecast}</span>
        </h2>
        <p className="mt-2 text-gray-600">
          Plan your irrigation schedule accordingly. The system will automatically adjust based on weather conditions.
        </p>
      </div>

      {/* Good to Know Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Good to Know:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advice.map((item) => (
            <FarmAdvice key={item.id} advice={item} onToggleCompletion={() => toggleAdviceCompletion(item.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}
