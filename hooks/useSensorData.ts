import { useState, useEffect } from 'react';
import { getSensorData, SensorData } from '@/lib/firebase/sensorService';

export const useSensorData = (sensorId: string, startDate?: Date, endDate?: Date) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sensorData = await getSensorData(sensorId, startDate, endDate);
        // Transform the data to match SensorData interface
        const transformedData: SensorData[] = sensorData.map(item => ({
          sensorId: (item as any).sensorId,
          type: (item as any).type,
          value: (item as any).value,
          unit: (item as any).unit,
          location: (item as any).location,
          timestamp: item.timestamp
        }));
        setData(transformedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch sensor data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sensorId, startDate, endDate]);

  return { data, loading, error };
}; 