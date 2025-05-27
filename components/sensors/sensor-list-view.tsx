"use client"

import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  Wind,
  AlertTriangle,
  Eye
} from "lucide-react"

interface Sensor {
  id: string
  name: string
  type: "moisture" | "temperature" | "light" | "humidity" | "nutrient"
  value: number
  unit: string
  minValue: number
  maxValue: number
  criticalLow?: number
  criticalHigh?: number
  lastUpdated: string
}

interface SensorListViewProps {
  sensors: Sensor[]
  onSelectSensor: (id: string) => void
}

export default function SensorListView({ sensors, onSelectSensor }: SensorListViewProps) {
  // Get icon based on sensor type
  const getIcon = (type: string) => {
    switch (type) {
      case "moisture":
        return <Droplets className="text-blue-500 h-4 w-4" />
      case "temperature":
        return <Thermometer className="text-red-500 h-4 w-4" />
      case "light":
        return <Sun className="text-yellow-500 h-4 w-4" />
      case "humidity":
        return <Wind className="text-cyan-500 h-4 w-4" />
      default:
        return <Droplets className="text-blue-500 h-4 w-4" />
    }
  }
  
  // Check if sensor value is in critical range
  const isCritical = (sensor: Sensor) =>
    (sensor.criticalLow !== undefined && sensor.value < sensor.criticalLow) ||
    (sensor.criticalHigh !== undefined && sensor.value > sensor.criticalHigh)
  
  return (
    <div className="bg-black/60 backdrop-blur-md border border-green-900/50 rounded-md overflow-x-auto">
      <Table>
        <TableHeader className="bg-black/80">
          <TableRow className="hover:bg-transparent border-green-900/30">
            <TableHead className="text-green-400">Sensor</TableHead>
            <TableHead className="text-green-400">Type</TableHead>
            <TableHead className="text-green-400">Current Value</TableHead>
            <TableHead className="text-green-400">Range</TableHead>
            <TableHead className="text-green-400">Status</TableHead>
            <TableHead className="text-green-400">Last Updated</TableHead>
            <TableHead className="text-green-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sensors.map(sensor => (
            <TableRow 
              key={sensor.id} 
              className="hover:bg-green-900/10 border-green-900/30"
            >
              <TableCell className="font-medium text-white">
                <div>
                  {sensor.name}
                  <div className="text-xs text-gray-400">{sensor.id}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getIcon(sensor.type)}
                  <span className="ml-2 text-gray-300 capitalize">
                    {sensor.type}
                  </span>
                </div>
              </TableCell>
              <TableCell className={`font-semibold ${
                isCritical(sensor) ? "text-red-400" : "text-white"
              }`}>
                {sensor.value}{sensor.unit}
                {isCritical(sensor) && (
                  <AlertTriangle className="inline-block ml-2 text-red-500 h-4 w-4" />
                )}
              </TableCell>
              <TableCell className="text-gray-300">
                {sensor.minValue} - {sensor.maxValue}{sensor.unit}
              </TableCell>
              <TableCell>
                <Badge className={`${
                  isCritical(sensor) 
                    ? "bg-red-900/40 text-red-400" 
                    : "bg-green-900/40 text-green-400"
                }`}>
                  {isCritical(sensor) ? "Critical" : "Normal"}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-300">
                {sensor.lastUpdated}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-green-400 hover:bg-green-900/30"
                  onClick={() => onSelectSensor(sensor.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}