"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Rainfall", value: 60, color: "#3b82f6" },
  { name: "Groundwater", value: 25, color: "#22c55e" },
  { name: "Reservoir", value: 10, color: "#a855f7" },
  { name: "Recycled", value: 5, color: "#f97316" },
]

export function WaterSourceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
        </PieChart>
      </ResponsiveContainer>
      {/* <div className="mt-4 flex justify-center gap-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs">{entry.name}</span>
          </div>
        ))}
      </div> */}
    </div>
  )
}
