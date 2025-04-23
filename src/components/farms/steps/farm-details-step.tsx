"use client"

import type React from "react"

import type { Farm } from "@/components/farms/farms-page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface FarmDetailsStepProps {
  formData: Omit<Farm, "id">
  updateFormData: (data: Partial<Omit<Farm, "id">>) => void
  onNext: () => void
}

export function FarmDetailsStep({ formData, updateFormData, onNext }: FarmDetailsStepProps) {
  const [errors, setErrors] = useState({
    name: "",
    size: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleNext = () => {
    const newErrors = {
      name: "",
      size: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Farm name is required"
    }

    if (!formData.size.trim()) {
      newErrors.size = "Farm size is required"
    }

    if (newErrors.name || newErrors.size) {
      setErrors(newErrors)
      return
    }

    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700">
            Farm Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter farm name"
            className={`border-gray-300 focus:border-green-500 focus:ring-green-500 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="size" className="text-gray-700">
            Farm Size
          </Label>
          <Input
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="e.g. 25 hectares"
            className={`border-gray-300 focus:border-green-500 focus:ring-green-500 ${
              errors.size ? "border-red-500" : ""
            }`}
          />
          {errors.size && <p className="text-sm text-red-500">{errors.size}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
          Next
        </Button>
      </div>
    </div>
  )
}
