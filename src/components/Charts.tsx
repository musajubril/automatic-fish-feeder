import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { SensorData } from '../types';

interface ChartsProps {
  sensorHistory: SensorData[];
}

export const Charts: React.FC<ChartsProps> = ({ sensorHistory }) => {
  const chartData = sensorHistory.map(data => ({
    ...data,
    time: format(data.timestamp, 'HH:mm'),
    fullTime: format(data.timestamp, 'MMM d, HH:mm')
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800 mb-2">{data.fullTime}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.name === 'Temperature' ? '°F' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Water Quality Trends</h2>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* pH Chart */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">pH Levels (24 hours)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[6.0, 8.0]}
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="ph"
                  name="pH"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                />
                {/* Optimal range indicators */}
                <Line
                  type="monotone"
                  dataKey={() => 6.5}
                  stroke="#10b981"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey={() => 7.5}
                  stroke="#10b981"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Chart */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Temperature (24 hours)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[70, 90]}
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  name="Temperature"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
                />
                {/* Optimal range indicators */}
                <Line
                  type="monotone"
                  dataKey={() => 75}
                  stroke="#10b981"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey={() => 85}
                  stroke="#10b981"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center">
          <div className="w-4 h-0.5 bg-green-500 mr-2"></div>
          <span>Optimal Range</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
          <span>pH Level</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-0.5 bg-amber-500 mr-2"></div>
          <span>Temperature</span>
        </div>
      </div>
    </div>
  );
};