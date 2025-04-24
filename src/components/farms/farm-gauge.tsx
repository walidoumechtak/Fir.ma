"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface FarmGaugeProps {
  soilMoisture: number
  waterLevel: number
  systemEfficiency: number
}

export function FarmGauge({ soilMoisture, waterLevel, systemEfficiency }: FarmGaugeProps) {
  // Calculate overall health score (average of the three metrics)
  const overallHealth = Math.round((soilMoisture + waterLevel + systemEfficiency) / 3)

  // Data for the gauge segments
  const data = [
    { name: "Poor", value: 20, color: "#ef4444" }, // Red
    { name: "Fair", value: 20, color: "#f97316" }, // Orange
    { name: "Good", value: 20, color: "#eab308" }, // Yellow
    { name: "Great", value: 20, color: "#84cc16" }, // Light Green
    { name: "Excellent", value: 20, color: "#22c55e" }, // Dark Green
  ]

  // Data for the needle
  const needleValue = overallHealth
  const needleData = [{ value: needleValue }, { value: 100 - needleValue }]

  // Custom active shape for the needle
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    // Calculate the needle angle based on the value
    const needleAngle = -180 + (needleValue / 100) * 180
    const needleLength = outerRadius * 0.95
    const needleRadius = innerRadius * 0.1

    return (
      <g>
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Needle */}
        <path
          d={`M ${cx} ${cy} L ${cx + needleLength * Math.cos((needleAngle * Math.PI) / 180)} ${cy + needleLength * Math.sin((needleAngle * Math.PI) / 180)} L ${cx + needleRadius * Math.cos(((needleAngle + 90) * Math.PI) / 180)} ${cy + needleRadius * Math.sin(((needleAngle + 90) * Math.PI) / 180)} L ${cx + needleRadius * Math.cos(((needleAngle - 90) * Math.PI) / 180)} ${cy + needleRadius * Math.sin(((needleAngle - 90) * Math.PI) / 180)} Z`}
          fill="#374151"
          filter="url(#shadow)"
        />

        {/* Needle center */}
        <circle cx={cx} cy={cy} r={outerRadius * 0.04} fill="#374151" stroke="none" />
      </g>
    )
  }

  // Custom label for the gauge
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 1.15
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="#374151"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {name}
      </text>
    )
  }

  return (
    <div className="space-y-6">
      {/* Gauge Chart */}
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Gauge segments */}
            <Pie
              data={data}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={0}
              dataKey="value"
              label={renderCustomizedLabel}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            {/* Needle */}
            <Pie
              data={needleData}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius="0%"
              outerRadius="0%"
              paddingAngle={0}
              dataKey="value"
              activeIndex={0}
              activeShape={renderActiveShape}
              isAnimationActive={false}
            >
              <Cell fill="transparent" />
              <Cell fill="transparent" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Value and label in the center */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-3xl font-bold text-gray-800">{overallHealth}%</div>
          <div className="text-sm text-gray-600">Overall Health</div>
        </div>

        {/* Min and max labels */}
        <div className="absolute bottom-0 left-0 text-sm text-gray-600">0%</div>
        <div className="absolute bottom-0 right-0 text-sm text-gray-600">100%</div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        <MetricItem label="Soil Moisture" value={soilMoisture} />
        <MetricItem label="Water Level" value={waterLevel} />
        <MetricItem label="System Efficiency" value={systemEfficiency} />
      </div>
    </div>
  )
}

interface MetricItemProps {
  label: string
  value: number
}

function MetricItem({ label, value }: MetricItemProps) {
  // Determine color based on value
  const getColor = (value: number) => {
    if (value >= 80) return "#22c55e" // Dark Green
    if (value >= 60) return "#84cc16" // Light Green
    if (value >= 40) return "#eab308" // Yellow
    if (value >= 20) return "#f97316" // Orange
    return "#ef4444" // Red
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor(value) }} />
        <span className="font-semibold">{value}%</span>
      </div>
    </div>
  )
}
