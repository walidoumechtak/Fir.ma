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
      name: "Atlas Olive Farm",
      size: "30 hectares",
      location: "Marrakesh-Safi",
      coordinates: { lat: 31.6345, lng: -8.0000 },
      crops: ["Olives", "Argan"],
      status: "good",
    },
    {
      id: "2",
      name: "Zagora Date Farm",
      size: "15 hectares",
      location: "Drâa-Tafilalet",
      coordinates: { lat: 30.3322, lng: -5.8385 },
      crops: ["Dates", "Figs"],
      status: "attention",
    },
    {
      id: "3",
      name: "Sous Valley Citrus Farm",
      size: "20 hectares",
      location: "Souss-Massa",
      coordinates: { lat: 30.4000, lng: -9.6000 },
      crops: ["Oranges", "Lemons", "Mandarins"],
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

        <FarmsList
          farms={farms}
          onAddFarmClick={() => setIsModalOpen(true)}
          onDeleteFarm={(id: string) => setFarms(farms.filter((farm) => farm.id !== id))}
        />
      </div>

      <AddFarmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddFarm={addFarm} />
    </div>
  )
}
