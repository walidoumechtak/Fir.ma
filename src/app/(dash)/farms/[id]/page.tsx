import type { Metadata } from "next"
import { FarmDetailsPage } from "@/components/farms/farm-details-page"

export const metadata: Metadata = {
  title: "Farm Details | Smart Irrigation System",
  description: "View detailed information about your farm",
}

export default function FarmDetails({ params }: { params: { id: string } }) {
  return <FarmDetailsPage farmId={params.id} />
}
