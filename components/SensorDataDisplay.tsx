import React from 'react';
import { useSensorData } from '@/hooks/useSensorData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SensorDataDisplayProps {
  sensorId: string;
  title: string;
  startDate?: Date;
  endDate?: Date;
}

export const SensorDataDisplay: React.FC<SensorDataDisplayProps> = ({
  sensorId,
  title,
  startDate,
  endDate,
}) => {
  const { data, loading, error } = useSensorData(sensorId, startDate, endDate);

  if (loading) {
    return <div>Loading sensor data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const chartData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    value: item.value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <p>Latest reading: {data[0]?.value} {data[0]?.unit}</p>
          <p>Last updated: {new Date(data[0]?.timestamp).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}; 