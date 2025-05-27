"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  Wind, 
  AlertTriangle 
} from "lucide-react"

type SensorType = "moisture" | "temperature" | "light" | "humidity" | "nutrient"

interface PlantBoxProps {
  id: string
  name: string
  type: SensorType
  value: number
  unit: string
  minValue: number
  maxValue: number
  criticalLow?: number
  criticalHigh?: number
  lastUpdated: string
}

export default function PlantBox({
  id,
  name,
  type,
  value,
  unit,
  minValue,
  maxValue,
  criticalLow,
  criticalHigh,
  lastUpdated,
}: PlantBoxProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 2000)
    return () => clearTimeout(timer)
  }, [value])

  // Calculate progress percentage
  const progressValue = ((value - minValue) / (maxValue - minValue)) * 100

  // Determine status
  const isCritical =
    (criticalLow !== undefined && value < criticalLow) ||
    (criticalHigh !== undefined && value > criticalHigh)

  // Determine status color
  const getStatusColor = () => {
    if (isCritical) return "text-red-500"
    
    if (type === "moisture") {
      if (value < minValue + (maxValue - minValue) * 0.3) return "text-yellow-500"
      if (value > maxValue - (maxValue - minValue) * 0.3) return "text-yellow-500"
      return "text-green-500"
    }
    
    if (type === "temperature") {
      if (value < minValue + (maxValue - minValue) * 0.3) return "text-blue-500"
      if (value > maxValue - (maxValue - minValue) * 0.3) return "text-red-500"
      return "text-green-500"
    }
    
    return "text-green-500"
  }

  // Get icon based on sensor type
  const getIcon = () => {
    switch (type) {
      case "moisture":
        return <Droplets className={`${getStatusColor()} h-8 w-8`} />
      case "temperature":
        return <Thermometer className={`${getStatusColor()} h-8 w-8`} />
      case "light":
        return <Sun className={`${getStatusColor()} h-8 w-8`} />
      case "humidity":
        return <Wind className={`${getStatusColor()} h-8 w-8`} />
      default:
        return <Droplets className={`${getStatusColor()} h-8 w-8`} />
    }
  }

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 bg-black/60 backdrop-blur-md border-green-900/50 hover:border-green-500/50 ${
      isCritical ? "border-red-500/50" : ""
    }`}>
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-30" />
      
      <div className="relative p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-green-400">{name}</h3>
            <p className="text-xs text-gray-300">ID: {id}</p>
          </div>
          {getIcon()}
        </div>
        
        <div className={`text-4xl font-bold mb-2 transition-all duration-500 ${
          isAnimating ? "scale-110 text-green-400" : getStatusColor()
        }`}>
          {value}
          <span className="text-lg ml-1">{unit}</span>
          
          {isCritical && (
            <AlertTriangle className="inline-block ml-2 text-red-500 h-5 w-5 animate-pulse" />
          )}
        </div>
        
        <Progress 
          value={progressValue} 
          className={`h-2 mb-3 ${
            isCritical 
              ? "bg-red-500" 
              : progressValue > 70 
                ? "bg-green-500" 
                : progressValue > 30 
                  ? "bg-green-400" 
                  : "bg-yellow-500"
          }`}
        />
        
        <div className="flex justify-between text-xs text-gray-300 mb-3">
          <span>{minValue}{unit}</span>
          <span>{maxValue}{unit}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Range: {minValue}-{maxValue} {unit}
          </span>
          <span className="text-xs text-gray-400">
            Updated: {lastUpdated}
          </span>
        </div>
      </div>
      
      {/* Animated "roots" */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/70 to-transparent" />
    </Card>
  )
}