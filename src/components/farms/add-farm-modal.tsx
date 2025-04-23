"use client"

import { useState } from "react"
import type { Farm } from "@/components/farms/farms-page"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FarmDetailsStep } from "@/components/farms/steps/farm-details-step"
import { LocationStep } from "@/components/farms/steps/location-step"
import { CropsStep } from "@/components/farms/steps/crops-step"

interface AddFarmModalProps {
  isOpen: boolean
  onClose: () => void
  onAddFarm: (farm: Omit<Farm, "id">) => void
}

export function AddFarmModal({ isOpen, onClose, onAddFarm }: AddFarmModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Omit<Farm, "id">>({
    name: "",
    size: "",
    location: "Marrakesh Region",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    crops: [],
    status: "good",
  })

  const updateFormData = (data: Partial<Omit<Farm, "id">>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleFinish = () => {
    onAddFarm(formData)
    setStep(1)
    setFormData({
      name: "",
      size: "",
      location: "Marrakesh Region",
      coordinates: { lat: 31.6295, lng: -7.9811 },
      crops: [],
      status: "good",
    })
  }

  const handleClose = () => {
    onClose()
    setStep(1)
    setFormData({
      name: "",
      size: "",
      location: "Marrakesh Region",
      coordinates: { lat: 31.6295, lng: -7.9811 },
      crops: [],
      status: "good",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800">
            {step === 1 && "Add New Farm"}
            {step === 2 && "Choose Location"}
            {step === 3 && "Select Crops"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="relative mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-sm font-medium text-gray-600">Farm Details</div>
            <div className="text-sm font-medium text-gray-600">Location</div>
            <div className="text-sm font-medium text-gray-600">Crops</div>
          </div>
          <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-200">
            <div
              className="bg-green-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="py-4">
          {step === 1 && <FarmDetailsStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />}
          {step === 2 && (
            <LocationStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />
          )}
          {step === 3 && (
            <CropsStep
              formData={formData}
              updateFormData={updateFormData}
              onFinish={handleFinish}
              onBack={handleBack}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
