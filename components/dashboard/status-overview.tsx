"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Leaf, 
  ThermometerSun, 
  Droplets, 
  AlertCircle,
  CheckCircle2
} from "lucide-react"

interface SystemStatus {
  online: boolean
  sensorsActive: number
  sensorsTotal: number
  lastSync: string
  alerts: number
}

export default function StatusOverview() {
  const [status, setStatus] = useState<SystemStatus>({
    online: true,
    sensorsActive: 24,
    sensorsTotal: 26,
    lastSync: "2 min ago",
    alerts: 2
  })

  // Mock status update every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        lastSync: "Just now",
        sensorsActive: Math.floor(Math.random() * 2) + 25,
        alerts: Math.floor(Math.random() * 3)
      }))
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-black/60 backdrop-blur-md border-green-900/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent opacity-30" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-white">System Status</h3>
          </div>
          
          <Badge variant={status.online ? "default" : "destructive"} className={status.online ? "bg-green-600" : ""}>
            {status.online ? "Online" : "Offline"}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <ThermometerSun className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Sensors Active</p>
              <p className="font-semibold text-white">
                {status.sensorsActive}/{status.sensorsTotal}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">Last Sync</p>
              <p className="font-semibold text-white">{status.lastSync}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {status.alerts > 0 ? (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
            <div>
              <p className="text-sm text-gray-400">Alerts</p>
              <p className="font-semibold text-white">{status.alerts}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}