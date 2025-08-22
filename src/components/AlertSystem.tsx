import React from 'react';
import { AlertTriangle, X, Thermometer, Droplets, Clock } from 'lucide-react';
import { Alert } from '../types';
import { format } from 'date-fns';

interface AlertSystemProps {
  alerts: Alert[];
  onDismiss: (alertId: string) => void;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'temperature': return <Thermometer size={16} />;
    case 'ph': return <Droplets size={16} />;
    case 'feeding': return <Clock size={16} />;
    default: return <AlertTriangle size={16} />;
  }
};

const getAlertStyles = (severity: string) => {
  switch (severity) {
    case 'high': return 'bg-red-50 border-red-200 text-red-800';
    case 'medium': return 'bg-amber-50 border-amber-200 text-amber-800';
    case 'low': return 'bg-blue-50 border-blue-200 text-blue-800';
    default: return 'bg-gray-50 border-gray-200 text-gray-800';
  }
};

export const AlertSystem: React.FC<AlertSystemProps> = ({ alerts, onDismiss }) => {
  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  if (activeAlerts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">System Status</h2>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-600 font-medium">All Systems Normal</p>
            <p className="text-sm text-gray-500 mt-1">No active alerts</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Active Alerts</h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {activeAlerts.length} active
        </span>
      </div>
      
      <div className="space-y-3">
        {activeAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-2 ${getAlertStyles(alert.severity)} transition-all duration-200`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm opacity-75 mt-1">
                    {format(alert.timestamp, 'MMM d, HH:mm:ss')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDismiss(alert.id)}
                className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};