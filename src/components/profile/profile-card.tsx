import type { UserProfile } from "@/components/profile/profile-page"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, MessageSquare, MessageCircle, Phone, MapPin, User, Mail, Globe2 } from "lucide-react"

interface ProfileCardProps {
  profile: UserProfile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  // Helper function to get initials from full name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Helper function to get communication channel icon
  const getCommunicationIcon = (channel: string) => {
    switch (channel) {
      case "mobile-app":
        return <Smartphone className="h-5 w-5" />
      case "whatsapp":
        return <MessageSquare className="h-5 w-5" />
      case "sms":
        return <MessageCircle className="h-5 w-5" />
      case "voice-calls":
        return <Phone className="h-5 w-5" />
      default:
        return null
    }
  }

  // Helper function to format communication channel name
  const formatCommunicationChannel = (channel: string) => {
    switch (channel) {
      case "mobile-app":
        return "Mobile App"
      case "whatsapp":
        return "WhatsApp"
      case "sms":
        return "SMS"
      case "voice-calls":
        return "Voice Calls"
      default:
        return channel
    }
  }

  // Helper function to format language name
  const formatLanguage = (language: string) => {
    switch (language) {
      case "arabic-darija":
        return "Arabic (Darija)"
      case "amazigh":
        return "Amazigh"
      case "french":
        return "French"
      default:
        return language
    }
  }

  // Helper function to format user type
  const formatUserType = (userType: string, otherUserType?: string) => {
    switch (userType) {
      case "farmer":
        return "Farmer"
      case "technician":
        return "Technician"
      case "advisor":
        return "Advisor / Engineer"
      case "other":
        return otherUserType || "Other"
      default:
        return userType
    }
  }

  // Helper function to get user type color
  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "farmer":
        return "bg-green-100 text-green-800"
      case "technician":
        return "bg-blue-100 text-blue-800"
      case "advisor":
        return "bg-purple-100 text-purple-800"
      case "other":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Profile Image and Basic Info - Left Column */}
      <Card className="md:col-span-1 overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-b from-green-600 to-green-700 pt-8 pb-16 px-4 flex flex-col items-center">
          <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
            <AvatarImage src={profile.profileImage || "/placeholder.svg"} alt={profile.fullName} />
            <AvatarFallback className="text-2xl bg-green-100 text-green-800">
              {getInitials(profile.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardContent className="pt-0 relative">
          <div className="bg-white rounded-lg shadow-md p-6 -mt-12 text-center space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">{profile.fullName}</h2>
            <div className="flex items-center justify-center text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-sm">{profile.email}</span>
            </div>
            <div
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 mx-auto"
              style={{
                backgroundColor: getUserTypeColor(profile.userType).split(" ")[0],
                color: getUserTypeColor(profile.userType).split(" ")[1],
              }}
            >
              {formatUserType(profile.userType, profile.otherUserType)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details - Right Column */}
      <Card className="md:col-span-2 border-none shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Communication & Language */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-600" />
                  Communication Preference
                </h3>
                <div className="bg-green-50 rounded-lg p-4 flex items-center">
                  <div className="bg-white p-2 rounded-full mr-3">
                    {getCommunicationIcon(profile.communicationChannel)}
                  </div>
                  <span className="text-gray-700">{formatCommunicationChannel(profile.communicationChannel)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Globe2 className="h-5 w-5 mr-2 text-green-600" />
                  Language & Dialect
                </h3>
                <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                  <div className="bg-white p-2 rounded-full mr-3">
                    <span className="text-lg font-bold text-blue-600">
                      {formatLanguage(profile.language).charAt(0)}
                    </span>
                  </div>
                  <span className="text-gray-700">{formatLanguage(profile.language)}</span>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Farm Location
              </h3>
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <span className="text-sm text-gray-500">Region / Province</span>
                    <p className="font-medium text-gray-800">{profile.region}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-gray-500">Farm / Village</span>
                    <p className="font-medium text-gray-800">{profile.farmName}</p>
                  </div>
                </div>
                {profile.gpsCoordinates && (
                  <div className="mt-3 pt-3 border-t border-amber-200">
                    <span className="text-sm text-gray-500">GPS Coordinates</span>
                    <p className="font-medium text-gray-600">{profile.gpsCoordinates}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
