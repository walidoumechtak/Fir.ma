"use client"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", traditional: 120, smart: 40 },
  { month: "Feb", traditional: 130, smart: 45 },
  { month: "Mar", traditional: 110, smart: 35 },
  { month: "Apr", traditional: 140, smart: 50 },
  { month: "May", traditional: 170, smart: 60 },
  { month: "Jun", traditional: 190, smart: 65 },
  { month: "Jul", traditional: 210, smart: 70 },
  { month: "Aug", traditional: 200, smart: 65 },
  { month: "Sep", traditional: 180, smart: 60 },
  { month: "Oct", traditional: 150, smart: 50 },
  { month: "Nov", traditional: 130, smart: 45 },
  { month: "Dec", traditional: 120, smart: 40 },
]

export function WaterUsageChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}k`}
          />
          <Tooltip />
          <Line type="monotone" dataKey="traditional" stroke="#ef4444" strokeWidth={2} name="Traditional" />
          <Line type="monotone" dataKey="smart" stroke="#3b82f6" strokeWidth={2} name="Smart Irrigation" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
