"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import type { UserProfile } from "@/components/profile/profile-page"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save, X } from "lucide-react"

interface UpdateProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: UserProfile
  onUpdate: (updatedProfile: UserProfile) => void
}

export function UpdateProfileModal({ isOpen, onClose, profile, onUpdate }: UpdateProfileModalProps) {
  const [formData, setFormData] = useState<UserProfile>({ ...profile })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Helper function to get initials from full name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to a server
      // For this demo, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setFormData((prev) => ({ ...prev, profileImage: imageUrl }))
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto border-none shadow-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="bg-gradient-to-r from-green-600 to-green-700 -mx-6 -mt-6 px-6 py-6 rounded-t-lg">
            <DialogTitle className="text-white text-2xl">Edit Your Profile</DialogTitle>
            <DialogDescription className="text-green-100">
              Update your personal information and preferences
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4 -mt-12">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
                  <AvatarImage src={previewImage || formData.profileImage} alt={formData.fullName} />
                  <AvatarFallback className="text-xl bg-green-100 text-green-800">
                    {getInitials(formData.fullName)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-md"
                  onClick={triggerFileInput}
                >
                  <Camera className="h-5 w-5" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <span className="text-sm text-gray-500">Click the camera icon to change your profile picture</span>
            </div>

            {/* Basic Information */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 border-l-4 border-green-600 pl-2">Basic Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Communication & Language */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 border-l-4 border-green-600 pl-2">
                Communication & Language
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="communicationChannel" className="text-gray-700">
                    Preferred Communication Channel
                  </Label>
                  <Select
                    value={formData.communicationChannel}
                    onValueChange={(value) => handleSelectChange("communicationChannel", value)}
                  >
                    <SelectTrigger id="communicationChannel" className="border-gray-300 focus:ring-green-500">
                      <SelectValue placeholder="Select preferred channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobile-app">Mobile App</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="voice-calls">Voice Calls</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-700">
                    Language & Dialect
                  </Label>
                  <Select value={formData.language} onValueChange={(value) => handleSelectChange("language", value)}>
                    <SelectTrigger id="language" className="border-gray-300 focus:ring-green-500">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arabic-darija">Arabic (Darija)</SelectItem>
                      <SelectItem value="amazigh">Amazigh</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 border-l-4 border-green-600 pl-2">Location</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-gray-700">
                    Region / Province
                  </Label>
                  <Input
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpsCoordinates" className="text-gray-700">
                    GPS Coordinates (optional)
                  </Label>
                  <Input
                    id="gpsCoordinates"
                    name="gpsCoordinates"
                    value={formData.gpsCoordinates}
                    onChange={handleInputChange}
                    placeholder="e.g. 31.6295° N, 7.9811° W"
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmName" className="text-gray-700">
                  Farm name / village
                </Label>
                <Input
                  id="farmName"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            {/* User Type */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 border-l-4 border-green-600 pl-2">User Type</h3>
              <div className="space-y-2">
                <Select value={formData.userType} onValueChange={(value) => handleSelectChange("userType", value)}>
                  <SelectTrigger id="userType" className="border-gray-300 focus:ring-green-500">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="advisor">Advisor / Engineer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.userType === "other" && (
                <div className="space-y-2">
                  <Label htmlFor="otherUserType" className="text-gray-700">
                    Please specify
                  </Label>
                  <Input
                    id="otherUserType"
                    name="otherUserType"
                    value={formData.otherUserType || ""}
                    onChange={handleInputChange}
                    placeholder="Specify your user type"
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
