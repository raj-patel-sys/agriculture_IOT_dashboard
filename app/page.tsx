"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PlantBox from "@/components/sensors/plant-box"
import StatusOverview from "@/components/dashboard/status-overview"
import { 
  sensorData, 
  moistureChartData, 
  temperatureChartData,
  combinedChartData 
} from "@/lib/data/mock-sensors"

// Dynamically import SensorChart with SSR disabled
const SensorChart = dynamic(
  () => import("@/components/dashboard/sensor-chart"),
  { ssr: false }
)

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="px-20 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-400 mb-2">Agriculture IoT Dashboard</h1>
          <p className="text-gray-300">
            Monitor and optimize your crop health with real-time sensor data
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 bg-black/40 backdrop-blur-sm rounded-md border border-green-900/50 px-4 py-2">
          <p className="text-sm text-gray-200">
            Last system update: <span className="text-green-400 font-medium">Today, 15:42</span>
          </p>
        </div>
      </div>
      
      {mounted && (
        <>
          {/* Status Overview */}
          <div className="mb-8">
            <StatusOverview />
          </div>
          
          {/* Sensor Grid */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Sensor Readings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sensorData.map(sensor => (
                <PlantBox key={sensor.id} {...sensor} />
              ))}
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Sensor Analytics</h2>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-black/60 border border-green-900/50 mb-6">
                <TabsTrigger value="all" className="text-gray-200">All Metrics</TabsTrigger>
                <TabsTrigger value="moisture" className="text-gray-200">Moisture</TabsTrigger>
                <TabsTrigger value="temperature" className="text-gray-200">Temperature</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <SensorChart 
                  title="Combined Sensor Data (24h)" 
                  data={combinedChartData}
                  dataKeys={["moisture", "temperature", "humidity", "light"]}
                />
              </TabsContent>
              
              <TabsContent value="moisture" className="mt-0">
                <SensorChart 
                  title="Soil Moisture Levels (24h)" 
                  data={moistureChartData}
                  dataKeys={["moisture"]}
                />
              </TabsContent>
              
              <TabsContent value="temperature" className="mt-0">
                <SensorChart 
                  title="Temperature Readings (24h)" 
                  data={temperatureChartData}
                  dataKeys={["temperature"]}
                />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  )
}