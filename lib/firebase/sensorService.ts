import { db } from './config';
import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';

export interface SensorData {
  sensorId: string;
  type: 'temperature' | 'humidity' | 'soil_moisture' | 'light';
  value: number;
  unit: string;
  timestamp: Date;
  location: string;
}

export const addSensorData = async (data: Omit<SensorData, 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'sensor_data'), {
      ...data,
      timestamp: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding sensor data:', error);
    throw error;
  }
};

export const getSensorData = async (
  sensorId: string,
  startDate?: Date,
  endDate?: Date
) => {
  try {
    let q = query(
      collection(db, 'sensor_data'),
      where('sensorId', '==', sensorId),
      orderBy('timestamp', 'desc')
    );

    if (startDate && endDate) {
      q = query(
        q,
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        where('timestamp', '<=', Timestamp.fromDate(endDate))
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    }));
  } catch (error) {
    console.error('Error getting sensor data:', error);
    throw error;
  }
}; 