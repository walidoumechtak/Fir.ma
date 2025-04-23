import type { Metadata } from "next"
import { ProfilePage } from "@/components/profile/profile-page"

export const metadata: Metadata = {
  title: "Profile | Smart Irrigation System",
  description: "View and update your profile information",
}

export default function page() {
  return <ProfilePage />
}
