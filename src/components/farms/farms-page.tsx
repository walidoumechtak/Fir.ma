"use client"

import { useState } from "react"
import { FarmsList } from "@/components/farms/farms-list"
import { WeatherStatus } from "@/components/farms/weather-status"
import { AddFarmModal } from "@/components/farms/add-farm-modal"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Farm {
  id: string
  name: string
  size: string
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  crops: string[]
  status: "good" | "attention"
}

export function FarmsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [farms, setFarms] = useState<Farm[]>([
    {
      id: "1",
      name: "Olive Grove",
      size: "25 hectares",
      location: "Marrakesh Region",
      coordinates: { lat: 31.6295, lng: -7.9811 },
      crops: ["Olives", "Citrus"],
      status: "good",
    },
    {
      id: "2",
      name: "Valley Vineyard",
      size: "12 hectares",
      location: "Meknes Region",
      coordinates: { lat: 33.8935, lng: -5.5547 },
      crops: ["Grapes", "Figs"],
      status: "attention",
    },
    {
      id: "3",
      name: "Citrus Orchard",
      size: "18 hectares",
      location: "Agadir Region",
      coordinates: { lat: 30.4278, lng: -9.5981 },
      crops: ["Oranges", "Lemons", "Limes"],
      status: "good",
    },
  ])

  const addFarm = (farm: Omit<Farm, "id">) => {
    const newFarm = {
      ...farm,
      id: Date.now().toString(),
    }
    setFarms([...farms, newFarm])
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl font-bold text-green-800">Hello, Mohammed</h1>
          <p className="text-gray-600 mt-2">Welcome to your farm management dashboard</p>
        </div>
        <WeatherStatus />
      </div>

      {/* Farms Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">My Farms</h2>
          <Button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Farm
          </Button>
        </div>

        <FarmsList farms={farms} />
      </div>

      <AddFarmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddFarm={addFarm} />
    </div>
  )
}
