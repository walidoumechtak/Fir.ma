import type { Farm } from "@/components/farms/farms-page"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, AlertTriangle, CheckCircle, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FarmsListProps {
  farms: Farm[]
  onAddFarmClick: () => void
}

export function FarmsList({ farms, onAddFarmClick }: FarmsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {farms.map((farm) => (
      <FarmCard key={farm.id} farm={farm} />
      ))}
      <div onClick={onAddFarmClick}>
        <AddFarmCard />
      </div>
    </div>
  )
}

function FarmCard({ farm }: { farm: Farm }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none shadow-md">
      <div
        className="h-3 w-full"
        style={{
          backgroundColor: farm.status === "good" ? "#22c55e" : "#ef4444",
        }}
      />
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{farm.name}</h3>
            <div className="flex items-center text-gray-500 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{farm.location}</span>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-full">
            {farm.status === "good" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">Size: {farm.size}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {farm.crops.map((crop, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className={`text-sm font-medium ${farm.status === "good" ? "text-green-600" : "text-red-600"}`}>
            {farm.status === "good" ? "All systems normal" : "Needs attention"}
          </span>
            <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => window.location.href = `/farms/${farm.id}`}
            >
            View
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AddFarmCard() {
  return (
    <Card className="border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center h-[250px]">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <div className="bg-green-100 p-3 rounded-full mb-3">
          <PlusCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="font-medium text-gray-700">Add New Farm</h3>
        <p className="text-sm text-gray-500 mt-1">Click to create a new farm project</p>
      </CardContent>
    </Card>
  )
}
