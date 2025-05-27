"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  MapPin,
  RefreshCw
} from "lucide-react"
import PlantBox from "@/components/sensors/plant-box"
import { sensorData } from "@/lib/data/mock-sensors"

// Dynamically import components that might cause hydration issues
const SensorDetailView = dynamic(
  () => import("@/components/sensors/sensor-detail-view"),
  { ssr: false }
)

const SensorListView = dynamic(
  () => import("@/components/sensors/sensor-list-view"),
  { ssr: false }
)

export default function SensorsPage() {
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<"grid" | "list" | "map">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter sensors based on search and type
  const filteredSensors = sensorData.filter(sensor => {
    const matchesSearch = 
      searchTerm === "" || 
      sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = 
      selectedType === null || 
      sensor.type === selectedType
    
    return matchesSearch && matchesType
  })

  // Simulate refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-400 mb-2">Sensor Management</h1>
          <p className="text-gray-400">
            Monitor and manage all your agricultural IoT sensors
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button 
            variant="outline" 
            className="border-green-700 text-green-400 hover:bg-green-900/30"
            onClick={handleRefresh}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Sensor
          </Button>
        </div>
      </div>
      
      {mounted && (
        <>
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10 bg-black/40 border-green-900/50 focus-visible:ring-green-500"
                placeholder="Search sensors by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-green-900/50">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filter
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black/90 backdrop-blur-md border-green-900/50">
                  <DropdownMenuItem 
                    className="focus:bg-green-900/30 cursor-pointer"
                    onClick={() => setSelectedType(null)}
                  >
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="focus:bg-green-900/30 cursor-pointer"
                    onClick={() => setSelectedType("moisture")}
                  >
                    Moisture Sensors
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="focus:bg-green-900/30 cursor-pointer"
                    onClick={() => setSelectedType("temperature")}
                  >
                    Temperature Sensors
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="focus:bg-green-900/30 cursor-pointer"
                    onClick={() => setSelectedType("humidity")}
                  >
                    Humidity Sensors
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="focus:bg-green-900/30 cursor-pointer"
                    onClick={() => setSelectedType("light")}
                  >
                    Light Sensors
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Tabs defaultValue="grid" onValueChange={(value) => setView(value as any)}>
                <TabsList className="bg-black/60 border border-green-900/50">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Active Filters */}
          {selectedType && (
            <div className="mb-4 flex items-center">
              <span className="text-sm text-gray-400 mr-2">Active Filters:</span>
              <Badge 
                className="bg-green-900/40 text-green-400 hover:bg-green-900/60 cursor-pointer"
                onClick={() => setSelectedType(null)}
              >
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Sensors
                <span className="ml-1">×</span>
              </Badge>
            </div>
          )}
          
          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-gray-400">
              Showing {filteredSensors.length} of {sensorData.length} sensors
              {selectedType ? ` of type ${selectedType}` : ""}
              {searchTerm ? ` matching "${searchTerm}"` : ""}
            </p>
          </div>
          
          {selectedSensor ? (
            <div className="mb-6">
              <Button 
                variant="ghost" 
                className="text-green-400 hover:bg-green-900/30 mb-4"
                onClick={() => setSelectedSensor(null)}
              >
                ← Back to sensors
              </Button>
              <SensorDetailView 
                sensor={sensorData.find(s => s.id === selectedSensor)!} 
              />
            </div>
          ) : (
            <div>
              {/* Grid View */}
              {view === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSensors.map(sensor => (
                    <div 
                      key={sensor.id} 
                      className="cursor-pointer transition-transform hover:scale-[1.02]"
                      onClick={() => setSelectedSensor(sensor.id)}
                    >
                      <PlantBox {...sensor} />
                    </div>
                  ))}
                </div>
              )}
              
              {/* List View */}
              {view === "list" && (
                <SensorListView 
                  sensors={filteredSensors} 
                  onSelectSensor={(id) => setSelectedSensor(id)} 
                />
              )}
              
              {/* Map View */}
              {view === "map" && (
                <Card className="bg-black/60 backdrop-blur-md border-green-900/50 p-8 h-[500px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent opacity-30" />
                  <div className="relative h-full flex flex-col items-center justify-center">
                    <MapPin className="h-16 w-16 text-green-500/50 mb-4" />
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Sensor Map View</h3>
                    <p className="text-gray-400 text-center max-w-md">
                      A geographic view of your sensor locations will be available in the upcoming version.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}