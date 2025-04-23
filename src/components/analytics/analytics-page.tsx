"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WaterUsageChart } from "@/components/analytics/water-usage-chart"
import { EnergySavingsChart } from "@/components/analytics/energy-savings-chart"
import { WaterSourceChart } from "@/components/analytics/water-source-chart"
import { CropEfficiencyChart } from "@/components/analytics/crop-efficiency-chart"

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Tabs defaultValue="weekly">
          <TabsList>
        <TabsTrigger value="daily">Daily</TabsTrigger>
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Top Row Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Water Usage Over Time</CardTitle>
            <CardDescription>Compare water usage with and without smart irrigation</CardDescription>
          </CardHeader>
          <CardContent>
            <WaterUsageChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Savings</CardTitle>
            <CardDescription>Monthly energy consumption comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <EnergySavingsChart />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Water Source Distribution</CardTitle>
            <CardDescription>Breakdown of water sources used for irrigation</CardDescription>
          </CardHeader>
          <CardContent>
            <WaterSourceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Irrigation Efficiency by Crop</CardTitle>
            <CardDescription>Efficiency metrics across different crop types</CardDescription>
          </CardHeader>
          <CardContent>
            <CropEfficiencyChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
