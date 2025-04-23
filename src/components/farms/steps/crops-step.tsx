"use client"

import { useState } from "react"
import type { Farm } from "@/components/farms/farms-page"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CropsStepProps {
  formData: Omit<Farm, "id">
  updateFormData: (data: Partial<Omit<Farm, "id">>) => void
  onFinish: () => void
  onBack: () => void
}

// List of crop options
const cropOptions = [
  "Wheat",
  "Barley",
  "Corn",
  "Rice",
  "Olives",
  "Grapes",
  "Citrus",
  "Apples",
  "Tomatoes",
  "Potatoes",
  "Onions",
  "Carrots",
  "Beans",
  "Peas",
  "Sunflowers",
]

export function CropsStep({ formData, updateFormData, onFinish, onBack }: CropsStepProps) {
  const [selectedCrop, setSelectedCrop] = useState<string>("")
  const [error, setError] = useState("")

  const handleCropSelect = (value: string) => {
    setSelectedCrop(value)
    setError("")
  }

  const addCrop = () => {
    if (!selectedCrop) {
      return
    }

    if (formData.crops.includes(selectedCrop)) {
      setError("This crop is already selected")
      return
    }

    updateFormData({
      crops: [...formData.crops, selectedCrop],
    })
    setSelectedCrop("")
  }

  const removeCrop = (crop: string) => {
    updateFormData({
      crops: formData.crops.filter((c) => c !== crop),
    })
  }

  const handleFinish = () => {
    if (formData.crops.length === 0) {
      setError("Please select at least one crop")
      return
    }

    onFinish()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="crop-select" className="text-gray-700">
            Select Crops
          </Label>
          <div className="flex gap-2">
            <Select value={selectedCrop} onValueChange={handleCropSelect}>
              <SelectTrigger id="crop-select" className="border-gray-300 focus:ring-green-500">
                <SelectValue placeholder="Choose a crop" />
              </SelectTrigger>
              <SelectContent>
                {cropOptions.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={addCrop}
              type="button"
              className="bg-green-600 hover:bg-green-700"
              disabled={!selectedCrop}
            >
              Add
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Selected Crops */}
        <div className="mt-4">
          <Label className="text-gray-700 mb-2 block">Selected Crops</Label>
          {formData.crops.length === 0 ? (
            <p className="text-sm text-gray-500">No crops selected yet</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {formData.crops.map((crop) => (
                <div key={crop} className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800">
                  <span className="text-sm font-medium">{crop}</span>
                  <button
                    type="button"
                    onClick={() => removeCrop(crop)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
          Finish
        </Button>
      </div>
    </div>
  )
}
