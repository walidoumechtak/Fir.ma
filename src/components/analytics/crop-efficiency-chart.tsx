"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { subject: "Corn", efficiency: 85, fullMark: 100 },
  { subject: "Wheat", efficiency: 90, fullMark: 100 },
  { subject: "Soybeans", efficiency: 78, fullMark: 100 },
  { subject: "Tomatoes", efficiency: 92, fullMark: 100 },
  { subject: "Lettuce", efficiency: 95, fullMark: 100 },
  { subject: "Potatoes", efficiency: 88, fullMark: 100 },
]

export function CropEfficiencyChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Efficiency" dataKey="efficiency" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          <Tooltip formatter={(value) => [`${value}%`, "Efficiency"]} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
