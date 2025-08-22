import React from 'react';
import { Thermometer, Droplets, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface SensorReadingsProps {
  ph: number;
  temperature: number;
  lastUpdated: Date;
}

const getSensorStatus = (value: number, min: number, max: number) => {
  if (value < min || value > max) return 'danger';
  if (value < min + 0.3 || value > max - 0.3) return 'warning';
  return 'good';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'danger': return 'text-red-600 bg-red-50 border-red-200';
    case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'good': return 'text-green-600 bg-green-50 border-green-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const SensorReadings: React.FC<SensorReadingsProps> = ({
  ph,
  temperature,
  lastUpdated
}) => {
  const phStatus = getSensorStatus(ph, 6.5, 7.5);
  const tempStatus = getSensorStatus(temperature, 75, 85);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Water Quality</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          {format(lastUpdated, 'HH:mm:ss')}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* pH Reading */}
        <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${getStatusColor(phStatus)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Droplets size={20} className="mr-2" />
              <span className="font-medium">pH Level</span>
            </div>
            <span className="text-2xl font-bold">{ph}</span>
          </div>
          <div className="text-sm opacity-75">
            Optimal: 6.5 - 7.5
          </div>
          <div className="mt-2 w-full bg-white bg-opacity-50 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(Math.max((ph - 6.0) / 2.0 * 100, 0), 100)}%`,
                backgroundColor: phStatus === 'good' ? '#10b981' : phStatus === 'warning' ? '#f59e0b' : '#ef4444'
              }}
            />
          </div>
        </div>

        {/* Temperature Reading */}
        <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${getStatusColor(tempStatus)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Thermometer size={20} className="mr-2" />
              <span className="font-medium">Temperature</span>
            </div>
            <span className="text-2xl font-bold">{temperature}°F</span>
          </div>
          <div className="text-sm opacity-75">
            Optimal: 75 - 85°F
          </div>
          <div className="mt-2 w-full bg-white bg-opacity-50 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(Math.max((temperature - 70) / 20 * 100, 0), 100)}%`,
                backgroundColor: tempStatus === 'good' ? '#10b981' : tempStatus === 'warning' ? '#f59e0b' : '#ef4444'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};