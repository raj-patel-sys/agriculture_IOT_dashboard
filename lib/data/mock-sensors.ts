// Generate timestamps for the last 24 hours
const generateTimepoints = (count: number) => {
  const timepoints = []
  const now = new Date()
  
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000) // Every hour
    timepoints.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  }
  
  return timepoints
}

// Generate random data within specified range
const generateRandomData = (
  count: number,
  min: number,
  max: number,
  variation: number = 0.1
) => {
  const data = []
  // Start with a random value within range
  let value = min + Math.random() * (max - min)
  
  for (let i = 0; i < count; i++) {
    // Add some random variation but keep within range
    const change = (Math.random() - 0.5) * 2 * variation * (max - min)
    value += change
    
    // Ensure value stays within range
    value = Math.max(min, Math.min(max, value))
    data.push(Number(value.toFixed(1)))
  }
  
  return data
}

// Create chart data for 24 hours
export const generateChartData = () => {
  const timepoints = generateTimepoints(24)
  const moisture = generateRandomData(24, 40, 80)
  const temperature = generateRandomData(24, 18, 32)
  const light = generateRandomData(24, 300, 800)
  const humidity = generateRandomData(24, 60, 85)
  
  return timepoints.map((time, index) => ({
    time,
    moisture: moisture[index],
    temperature: temperature[index],
    light: light[index],
    humidity: humidity[index]
  }))
}

// Create sensor data
export const sensorData = [
  {
    id: "soil-001",
    name: "Tomato Field A",
    type: "moisture" as const,
    value: 62.5,
    unit: "%",
    minValue: 40,
    maxValue: 80,
    criticalLow: 45,
    criticalHigh: 75,
    lastUpdated: "3 min ago"
  },
  {
    id: "temp-001",
    name: "Greenhouse 1",
    type: "temperature" as const,
    value: 24.7,
    unit: "°C",
    minValue: 18,
    maxValue: 32,
    criticalLow: 15,
    criticalHigh: 35,
    lastUpdated: "1 min ago"
  },
  {
    id: "light-001",
    name: "Lettuce Beds",
    type: "light" as const,
    value: 650,
    unit: "lux",
    minValue: 300,
    maxValue: 800,
    lastUpdated: "5 min ago"
  },
  {
    id: "hum-001",
    name: "Cucumber Zone",
    type: "humidity" as const,
    value: 78.3,
    unit: "%",
    minValue: 60,
    maxValue: 85,
    criticalHigh: 90,
    lastUpdated: "2 min ago"
  },
  {
    id: "soil-002",
    name: "Pepper Field",
    type: "moisture" as const,
    value: 52.8,
    unit: "%",
    minValue: 40,
    maxValue: 80,
    lastUpdated: "7 min ago"
  },
  {
    id: "temp-002",
    name: "Greenhouse 2",
    type: "temperature" as const,
    value: 27.5,
    unit: "°C",
    minValue: 18,
    maxValue: 32,
    criticalHigh: 35,
    lastUpdated: "4 min ago"
  },
  {
    id: "soil-003",
    name: "Herb Garden",
    type: "moisture" as const,
    value: 41.2,
    unit: "%",
    minValue: 40,
    maxValue: 80,
    criticalLow: 45,
    lastUpdated: "6 min ago"
  },
  {
    id: "hum-002",
    name: "Strawberry Patch",
    type: "humidity" as const,
    value: 68.7,
    unit: "%",
    minValue: 60,
    maxValue: 85,
    lastUpdated: "3 min ago"
  }
]

// Generate chart data for each type
export const moistureChartData = generateChartData().map(point => ({
  time: point.time,
  moisture: point.moisture
}))

export const temperatureChartData = generateChartData().map(point => ({
  time: point.time,
  temperature: point.temperature
}))

export const combinedChartData = generateChartData()