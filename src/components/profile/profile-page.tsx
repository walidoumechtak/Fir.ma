"use client"

import { useState } from "react"
import { ProfileCard } from "@/components/profile/profile-card"
import { UpdateProfileModal } from "@/components/profile/update-profile-modal"
import { Button } from "@/components/ui/button"
import { Edit3 } from "lucide-react"

// Define the user profile type
export interface UserProfile {
  fullName: string
  email: string
  profileImage: string
  communicationChannel: "mobile-app" | "whatsapp" | "sms" | "voice-calls"
  language: "arabic-darija" | "amazigh" | "french"
  region: string
  gpsCoordinates: string
  farmName: string
  userType: "farmer" | "technician" | "advisor" | "other"
  otherUserType?: string
}

export function ProfilePage() {
  // Sample user data - in a real app, this would come from an API or database
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "Mohammed Alami",
    email: "mohammed.alami@example.com",
    profileImage: "/placeholder.svg?height=200&width=200",
    communicationChannel: "whatsapp",
    language: "arabic-darija",
    region: "Marrakech-Safi",
    gpsCoordinates: "31.6295° N, 7.9811° W",
    farmName: "Alami Olive Farm",
    userType: "farmer",
  })
  

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile)
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-800">My Profile</h1>
        <Button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white">
          <Edit3 className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <ProfileCard profile={profile} />

      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
        onUpdate={handleUpdateProfile}
      />
    </div>
  )
}
