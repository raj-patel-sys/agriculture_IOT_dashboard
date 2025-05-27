"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  Wind, 
  Clock,
  Battery,
  Signal,
  Settings,
  AlertTriangle,
  Wifi
} from "lucide-react"
import SensorChart from "@/components/dashboard/sensor-chart"
import { generateChartData } from "@/lib/data/mock-sensors"

interface PlantBoxProps {
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

export default function SensorDetailView({ sensor }: { sensor: PlantBoxProps }) {
  const [chartData, setChartData] = useState<any[]>([])
  const [batteryLevel, setBatteryLevel] = useState(87)
  const [signalStrength, setSignalStrength] = useState(92)
  
  useEffect(() => {
    // Generate mock historical data for this sensor
    setChartData(generateChartData())
  }, [sensor.id])

  // Get icon based on sensor type
  const getIcon = () => {
    switch (sensor.type) {
      case "moisture":
        return <Droplets className="text-blue-500 h-8 w-8" />
      case "temperature":
        return <Thermometer className="text-red-500 h-8 w-8" />
      case "light":
        return <Sun className="text-yellow-500 h-8 w-8" />
      case "humidity":
        return <Wind className="text-cyan-500 h-8 w-8" />
      default:
        return <Droplets className="text-blue-500 h-8 w-8" />
    }
  }

  // Check if sensor value is in critical range
  const isCritical =
    (sensor.criticalLow !== undefined && sensor.value < sensor.criticalLow) ||
    (sensor.criticalHigh !== undefined && sensor.value > sensor.criticalHigh)

  return (
    <div className="space-y-6">
      <Card className="bg-black/60 backdrop-blur-md border-green-900/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent opacity-30" />
        
        <div className="relative p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              {getIcon()}
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-green-400">{sensor.name}</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-2">ID: {sensor.id}</span>
                  <Badge className={`${
                    isCritical 
                      ? "bg-red-900/40 text-red-400" 
                      : "bg-green-900/40 text-green-400"
                  }`}>
                    {sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="border-green-900/50 text-green-400 hover:bg-green-900/30">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button variant="outline" className="border-red-900/50 text-red-400 hover:bg-red-900/30">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Reset Alerts
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Reading */}
        <Card className="bg-black/60 backdrop-blur-md border-green-900/50 overflow-hidden lg:col-span-1">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-30" />
          
          <div className="relative p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Current Reading</h3>
            
            <div className="flex flex-col items-center justify-center py-8">
              <div className={`text-7xl font-bold mb-2 transition-all duration-500 ${
                isCritical ? "text-red-500" : "text-green-400"
              }`}>
                {sensor.value}
                <span className="text-3xl ml-1">{sensor.unit}</span>
              </div>
              
              <p className="text-gray-400">
                Normal range: {sensor.minValue} - {sensor.maxValue} {sensor.unit}
              </p>
              
              {isCritical && (
                <div className="mt-4 flex items-center text-red-400">
                  <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
                  <span>Critical reading detected!</span>
                </div>
              )}
              
              <div className="mt-6 flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>Last updated: {sensor.lastUpdated}</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Sensor Status */}
        <Card className="bg-black/60 backdrop-blur-md border-green-900/50 overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-30" />
          
          <div className="relative p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Sensor Status</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Battery */}
              <div className="bg-black/40 rounded-lg p-4 border border-green-900/30">
                <div className="flex items-center mb-2">
                  <Battery className="text-green-400 h-5 w-5 mr-2" />
                  <h4 className="text-sm font-medium text-gray-300">Battery</h4>
                </div>
                <p className="text-2xl font-bold text-white">{batteryLevel}%</p>
                <p className="text-xs text-gray-400 mt-1">Est. 12 days remaining</p>
              </div>
              
              {/* Signal */}
              <div className="bg-black/40 rounded-lg p-4 border border-green-900/30">
                <div className="flex items-center mb-2">
                  <Signal className="text-green-400 h-5 w-5 mr-2" />
                  <h4 className="text-sm font-medium text-gray-300">Signal</h4>
                </div>
                <p className="text-2xl font-bold text-white">{signalStrength}%</p>
                <p className="text-xs text-gray-400 mt-1">Strong connection</p>
              </div>
              
              {/* Status */}
              <div className="bg-black/40 rounded-lg p-4 border border-green-900/30">
                <div className="flex items-center mb-2">
                  <Wifi className="text-green-400 h-5 w-5 mr-2" />
                  <h4 className="text-sm font-medium text-gray-300">Status</h4>
                </div>
                <p className="text-lg font-semibold text-white">Online</p>
                <p className="text-xs text-gray-400 mt-1">Connected for 23 days</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Firmware Version</span>
                <span className="text-sm text-white">v2.4.1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Last Maintenance</span>
                <span className="text-sm text-white">14 days ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Sensor Location</span>
                <span className="text-sm text-white">North Field, Section A</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Historical Data */}
      <Card className="bg-black/60 backdrop-blur-md border-green-900/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-30" />
        
        <div className="relative p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Historical Data</h3>
          
          <Tabs defaultValue="24h" className="w-full">
            <TabsList className="bg-black/60 border border-green-900/50 mb-6">
              <TabsTrigger value="24h">24 Hours</TabsTrigger>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="24h" className="mt-0">
              <SensorChart 
                title={`${sensor.name} - ${sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1)} Readings (24h)`} 
                data={chartData}
                dataKeys={[sensor.type]}
              />
            </TabsContent>
            
            <TabsContent value="7d" className="mt-0">
              <SensorChart 
                title={`${sensor.name} - ${sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1)} Readings (7 Days)`} 
                data={chartData}
                dataKeys={[sensor.type]}
              />
            </TabsContent>
            
            <TabsContent value="30d" className="mt-0">
              <SensorChart 
                title={`${sensor.name} - ${sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1)} Readings (30 Days)`}
                data={chartData}
                dataKeys={[sensor.type]}
              />
            </TabsContent>
            
            <TabsContent value="custom" className="mt-0">
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-400">Custom date range selection coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}