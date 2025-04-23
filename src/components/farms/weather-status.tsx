import { Sun, Cloud, Droplets, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function WeatherStatus() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-none shadow-md">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-amber-600 text-sm font-medium">Temperature</p>
            <p className="text-2xl font-bold text-amber-800">28°C</p>
          </div>
          <div className="bg-amber-500 bg-opacity-10 p-2 rounded-full">
            <Sun className="h-8 w-8 text-amber-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-md">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-medium">Humidity</p>
            <p className="text-2xl font-bold text-blue-800">45%</p>
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
            <p className="text-2xl font-bold text-gray-800">12 km/h</p>
          </div>
          <div className="bg-gray-500 bg-opacity-10 p-2 rounded-full">
            <Wind className="h-8 w-8 text-gray-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-none shadow-md">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-indigo-600 text-sm font-medium">Forecast</p>
            <p className="text-2xl font-bold text-indigo-800">Sunny</p>
          </div>
          <div className="bg-indigo-500 bg-opacity-10 p-2 rounded-full">
            <Cloud className="h-8 w-8 text-indigo-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
