import type { Metadata } from "next"
import { FarmsPage } from "@/components/farms/farms-page"

export const metadata: Metadata = {
  title: "My Farms | Smart Irrigation System",
  description: "Manage your farms and irrigation projects",
}

export default function Farms() {
  return <FarmsPage />
}
