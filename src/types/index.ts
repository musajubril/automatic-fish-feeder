export interface SensorData {
  timestamp: Date;
  ph: number;
  temperature: number;
}

export interface FeedingRecord {
  id: string;
  timestamp: Date;
  type: 'manual' | 'scheduled';
  status: 'success' | 'failed';
}

export interface Alert {
  id: string;
  type: 'temperature' | 'ph' | 'feeding';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  dismissed: boolean;
}

export interface DashboardData {
  currentSensors: {
    ph: number;
    temperature: number;
    lastUpdated: Date;
  };
  sensorHistory: SensorData[];
  feedingHistory: FeedingRecord[];
  alerts: Alert[];
}