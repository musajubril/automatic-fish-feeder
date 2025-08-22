import React from 'react';
import { Clock, CheckCircle, XCircle, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { FeedingRecord } from '../types';

interface FeedingLogProps {
  feedingHistory: FeedingRecord[];
}

export const FeedingLog: React.FC<FeedingLogProps> = ({ feedingHistory }) => {
  const getStatusIcon = (status: string) => {
    return status === 'success' ? (
      <CheckCircle className="text-green-500" size={16} />
    ) : (
      <XCircle className="text-red-500" size={16} />
    );
  };

  const getTypeIcon = (type: string) => {
    return type === 'manual' ? (
      <User className="text-blue-500" size={16} />
    ) : (
      <Clock className="text-gray-500" size={16} />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Feeding History</h2>
      
      {feedingHistory.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500">No feeding records yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {feedingHistory.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(record.type)}
                  {getStatusIcon(record.status)}
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">
                      {record.type === 'manual' ? 'Manual Feed' : 'Scheduled Feed'}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      record.status === 'success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {format(record.timestamp, 'MMM d, yyyy • HH:mm:ss')}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-gray-600">
                  {format(record.timestamp, 'HH:mm')}
                </div>
                <div className="text-xs text-gray-400">
                  {format(record.timestamp, 'MMM d')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-blue-700">
            <CheckCircle size={14} className="mr-1 text-green-500" />
            <span>Success Rate: </span>
          </div>
          <span className="font-medium text-blue-800">
            {feedingHistory.length > 0 
              ? `${Math.round(feedingHistory.filter(r => r.status === 'success').length / feedingHistory.length * 100)}%`
              : '0%'
            }
          </span>
        </div>
      </div>
    </div>
  );
};