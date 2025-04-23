import type { Metadata } from "next"
import { AnalyticsPage } from "@/components/analytics/analytics-page"

export const metadata: Metadata = {
  title: "Analytics | Smart Irrigation System",
  description: "View detailed analytics about your farm's irrigation system",
}

export default function Analytics() {
  return <AnalyticsPage />
}
