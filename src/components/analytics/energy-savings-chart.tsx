"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", before: 65, after: 15 },
  { month: "Feb", before: 70, after: 18 },
  { month: "Mar", before: 60, after: 14 },
  { month: "Apr", before: 75, after: 20 },
  { month: "May", before: 85, after: 22 },
  { month: "Jun", before: 95, after: 25 },
  { month: "Jul", before: 100, after: 28 },
  { month: "Aug", before: 95, after: 26 },
  { month: "Sep", before: 90, after: 24 },
  { month: "Oct", before: 80, after: 20 },
  { month: "Nov", before: 70, after: 18 },
  { month: "Dec", before: 65, after: 15 },
]

export function EnergySavingsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}kWh`}
          />
          <Tooltip />
          <Bar dataKey="before" fill="#fbbf24" radius={[4, 4, 0, 0]} name="Before" />
          <Bar dataKey="after" fill="#22c55e" radius={[4, 4, 0, 0]} name="After" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
