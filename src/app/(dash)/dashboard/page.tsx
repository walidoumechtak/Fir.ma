import type { Metadata } from "next"
import { DashboardPage } from "@/components/dashboard/dashboard-page"

export const metadata: Metadata = {
  title: "Dashboard | Smart Irrigation System",
  description: "Monitor your farm's irrigation efficiency and manage tasks",
}

export default function Dashboard() {
  return <DashboardPage />
}
