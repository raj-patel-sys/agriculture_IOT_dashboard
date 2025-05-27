"use client"

import { Card } from "@/components/ui/card"
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts"

interface SensorReading {
  time: string
  moisture?: number
  temperature?: number
  light?: number
  humidity?: number
}

interface SensorChartProps {
  title: string
  data: SensorReading[]
  dataKeys: string[]
}

export default function SensorChart({ title, data, dataKeys }: SensorChartProps) {
  // Colors from our design theme
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))"
  ]

  return (
    <Card className="bg-black/60 backdrop-blur-md border-green-900/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent opacity-30" />
      
      <div className="relative p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: "rgba(255,255,255,0.7)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.3)" }}
              />
              <YAxis 
                tick={{ fill: "rgba(255,255,255,0.7)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.3)" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(0,0,0,0.8)", 
                  border: "1px solid rgba(74, 222, 128, 0.5)",
                  borderRadius: "4px",
                  color: "#fff"
                }}
              />
              <Legend 
                wrapperStyle={{ color: "rgba(255,255,255,0.8)" }}
              />
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}