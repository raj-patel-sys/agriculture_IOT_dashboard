"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Settings, 
  Bell, 
  Shield, 
  Database,
  Save,
  User
} from "lucide-react"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [dataSync, setDataSync] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-400 mb-2">Settings</h1>
        <p className="text-gray-400">
          Configure your AgroSense IoT dashboard preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/60 backdrop-blur-md border-green-900/50">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <User className="h-5 w-5 text-green-400 mr-2" />
              Profile Settings
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  className="bg-black/40 border-green-900/50"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com"
                  className="bg-black/40 border-green-900/50"
                />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-black/60 backdrop-blur-md border-green-900/50">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Bell className="h-5 w-5 text-green-400 mr-2" />
              Notification Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Notifications</Label>
                  <p className="text-sm text-gray-400">
                    Receive updates about your sensors
                  </p>
                </div>
                <Switch 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Critical Alerts</Label>
                  <p className="text-sm text-gray-400">
                    Get immediate alerts for critical readings
                  </p>
                </div>
                <Switch 
                  checked={criticalAlerts}
                  onCheckedChange={setCriticalAlerts}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-black/60 backdrop-blur-md border-green-900/50">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 text-green-400 mr-2" />
              Security Settings
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password"
                  className="bg-black/40 border-green-900/50"
                />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  className="bg-black/40 border-green-900/50"
                />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Update Password
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-black/60 backdrop-blur-md border-green-900/50">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Database className="h-5 w-5 text-green-400 mr-2" />
              Data Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Data Sync</Label>
                  <p className="text-sm text-gray-400">
                    Keep sensor data synchronized
                  </p>
                </div>
                <Switch 
                  checked={dataSync}
                  onCheckedChange={setDataSync}
                />
              </div>
              <div>
                <Label>Data Storage</Label>
                <p className="text-sm text-gray-400 mb-4">
                  Currently using: 2.4 GB of 5 GB
                </p>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: '48%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}