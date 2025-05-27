"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  AlertTriangle 
} from "lucide-react"
import SensorChart from "@/components/dashboard/sensor-chart"
import { generateChartData } from "@/lib/data/mock-sensors"

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    setChartData(generateChartData())
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-400 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">
          Comprehensive analysis of your agricultural sensor data
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-black/60 border border-green-900/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/60 backdrop-blur-md border-green-900/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart className="h-5 w-5 text-green-400 mr-2" />
                  Sensor Distribution
                </h3>
                <SensorChart
                  title="Sensor Types Distribution"
                  data={chartData}
                  dataKeys={["moisture", "temperature", "humidity", "light"]}
                />
              </div>
            </Card>

            <Card className="bg-black/60 backdrop-blur-md border-green-900/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <LineChart className="h-5 w-5 text-green-400 mr-2" />
                  Performance Metrics
                </h3>
                <SensorChart
                  title="Sensor Performance"
                  data={chartData}
                  dataKeys={["moisture"]}
                />
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="bg-black/60 backdrop-blur-md border-green-900/50">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                Trend Analysis
              </h3>
              <SensorChart
                title="Long-term Trends"
                data={chartData}
                dataKeys={["moisture", "temperature"]}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card className="bg-black/60 backdrop-blur-md border-green-900/50">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                Alert History
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="bg-black/40 p-4 rounded-lg border border-green-900/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-white">High Temperature Alert</span>
                      </div>
                      <span className="text-gray-400 text-sm">2 hours ago</span>
                    </div>
                    <p className="text-gray-400 mt-2 text-sm">
                      Temperature exceeded threshold in Greenhouse 1
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-black/60 backdrop-blur-md border-green-900/50">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <PieChart className="h-5 w-5 text-green-400 mr-2" />
                Generated Reports
              </h3>
              <div className="text-center py-8">
                <p className="text-gray-400">Report generation feature coming soon</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}