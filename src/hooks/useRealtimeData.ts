import { useState, useEffect, useCallback } from 'react';
import { DashboardData, Alert, FeedingRecord, SensorData } from '../types';
import { format } from 'date-fns';

const generateRandomData = (): { ph: number; temperature: number } => {
  // Generate realistic aquarium values
  const ph = 6.8 + (Math.random() - 0.5) * 1.4; // 6.1 to 7.5 range
  const temperature = 78 + (Math.random() - 0.5) * 12; // 72 to 84°F range
  return { ph: Number(ph.toFixed(1)), temperature: Number(temperature.toFixed(1)) };
};

const generateInitialHistory = (): SensorData[] => {
  const history: SensorData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000); // Hour intervals
    const data = generateRandomData();
    history.push({
      timestamp,
      ...data
    });
  }
  return history;
};

const generateInitialFeedings = (): FeedingRecord[] => {
  const feedings: FeedingRecord[] = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    feedings.push({
      id: `feed-${i}`,
      timestamp: new Date(now.getTime() - i * 4 * 60 * 60 * 1000), // Every 4 hours
      type: i % 3 === 0 ? 'manual' : 'scheduled',
      status: Math.random() > 0.1 ? 'success' : 'failed'
    });
  }
  return feedings;
};

export const useRealtimeData = () => {
  const [data, setData] = useState<DashboardData>(() => {
    const currentSensors = generateRandomData();
    return {
      currentSensors: {
        ...currentSensors,
        lastUpdated: new Date()
      },
      sensorHistory: generateInitialHistory(),
      feedingHistory: generateInitialFeedings(),
      alerts: []
    };
  });

  const [isFeeding, setIsFeeding] = useState(false);

  const checkAlerts = useCallback((ph: number, temperature: number): Alert[] => {
    const alerts: Alert[] = [];
    const now = new Date();

    // Temperature alerts
    if (temperature < 75) {
      alerts.push({
        id: `temp-low-${now.getTime()}`,
        type: 'temperature',
        message: `Temperature too low: ${temperature}°F (should be 75-85°F)`,
        severity: 'high',
        timestamp: now,
        dismissed: false
      });
    } else if (temperature > 85) {
      alerts.push({
        id: `temp-high-${now.getTime()}`,
        type: 'temperature',
        message: `Temperature too high: ${temperature}°F (should be 75-85°F)`,
        severity: 'high',
        timestamp: now,
        dismissed: false
      });
    }

    // pH alerts
    if (ph < 6.5) {
      alerts.push({
        id: `ph-low-${now.getTime()}`,
        type: 'ph',
        message: `pH too low: ${ph} (should be 6.5-7.5)`,
        severity: 'medium',
        timestamp: now,
        dismissed: false
      });
    } else if (ph > 7.5) {
      alerts.push({
        id: `ph-high-${now.getTime()}`,
        type: 'ph',
        message: `pH too high: ${ph} (should be 6.5-7.5)`,
        severity: 'medium',
        timestamp: now,
        dismissed: false
      });
    }

    // Feeding time alert (every 6 hours)
    const lastFeeding = data.feedingHistory[0];
    if (lastFeeding) {
      const hoursSinceFeeding = (now.getTime() - lastFeeding.timestamp.getTime()) / (1000 * 60 * 60);
      if (hoursSinceFeeding >= 6) {
        alerts.push({
          id: `feeding-time-${now.getTime()}`,
          type: 'feeding',
          message: 'Scheduled feeding time - fish need to be fed',
          severity: 'low',
          timestamp: now,
          dismissed: false
        });
      }
    }

    return alerts;
  }, [data.feedingHistory]);

  const updateSensorData = useCallback(() => {
    const newReading = generateRandomData();
    const now = new Date();
    
    setData(prevData => {
      const newAlerts = checkAlerts(newReading.ph, newReading.temperature);
      
      return {
        ...prevData,
        currentSensors: {
          ...newReading,
          lastUpdated: now
        },
        sensorHistory: [
          ...prevData.sensorHistory.slice(-23), // Keep last 23 readings
          {
            timestamp: now,
            ...newReading
          }
        ],
        alerts: [
          ...newAlerts,
          ...prevData.alerts.filter(alert => !alert.dismissed)
        ]
      };
    });
  }, [checkAlerts]);

  const feedFish = useCallback(async () => {
    if (isFeeding) return;
    
    setIsFeeding(true);
    
    // Simulate feeding process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newFeeding: FeedingRecord = {
      id: `feed-${Date.now()}`,
      timestamp: new Date(),
      type: 'manual',
      status: Math.random() > 0.05 ? 'success' : 'failed' // 95% success rate
    };
    
    setData(prevData => ({
      ...prevData,
      feedingHistory: [newFeeding, ...prevData.feedingHistory.slice(0, 9)]
    }));
    
    setIsFeeding(false);
  }, [isFeeding]);

  const dismissAlert = useCallback((alertId: string) => {
    setData(prevData => ({
      ...prevData,
      alerts: prevData.alerts.map(alert => 
        alert.id === alertId ? { ...alert, dismissed: true } : alert
      )
    }));
  }, []);

  // Poll for updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(updateSensorData, 10000);
    return () => clearInterval(interval);
  }, [updateSensorData]);

  return {
    data,
    isFeeding,
    feedFish,
    dismissAlert
  };
};