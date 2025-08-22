import React from 'react';
import { Activity, Wifi } from 'lucide-react';
import { SensorReadings } from './SensorReadings';
import { FeedControl } from './FeedControl';
import { AlertSystem } from './AlertSystem';
import { Charts } from './Charts';
import { FeedingLog } from './FeedingLog';
import { useRealtimeData } from '../hooks/useRealtimeData';

export const Dashboard: React.FC = () => {
  const { data, isFeeding, feedFish, dismissAlert } = useRealtimeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  AquaFeed Monitor
                </h1>
                <p className="text-sm text-gray-600">
                  Automatic Fish Feeder & Water Quality System
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-green-600">
              <Wifi size={16} />
              <span className="text-sm font-medium">Connected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Controls and Sensors */}
          <div className="lg:col-span-5 space-y-6">
            <SensorReadings
              ph={data.currentSensors.ph}
              temperature={data.currentSensors.temperature}
              lastUpdated={data.currentSensors.lastUpdated}
            />
            
            <FeedControl
              onFeed={feedFish}
              isFeeding={isFeeding}
            />
          </div>

          {/* Right Column - Alerts */}
          <div className="lg:col-span-7">
            <AlertSystem
              alerts={data.alerts}
              onDismiss={dismissAlert}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8">
          <Charts sensorHistory={data.sensorHistory} />
        </div>

        {/* Feeding Log Section */}
        <div className="mt-8">
          <FeedingLog feedingHistory={data.feedingHistory} />
        </div>
      </main>
    </div>
  );
};