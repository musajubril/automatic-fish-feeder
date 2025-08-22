import React from 'react';
import { Fish, Loader2 } from 'lucide-react';

interface FeedControlProps {
  onFeed: () => void;
  isFeeding: boolean;
}

export const FeedControl: React.FC<FeedControlProps> = ({ onFeed, isFeeding }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Feed Control</h2>
      
      <div className="text-center">
        <button
          onClick={onFeed}
          disabled={isFeeding}
          className={`
            relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg
            transition-all duration-200 transform hover:scale-105 active:scale-95
            ${isFeeding 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {isFeeding ? (
            <>
              <Loader2 size={24} className="mr-2 animate-spin" />
              Feeding Fish...
            </>
          ) : (
            <>
              <Fish size={24} className="mr-2" />
              Feed Fish Now
            </>
          )}
        </button>
        
        <p className="mt-4 text-sm text-gray-500">
          {isFeeding 
            ? 'Dispensing food...' 
            : 'Click to manually feed your fish'
          }
        </p>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Feeding Guidelines</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Feed 2-3 times daily</li>
            <li>• Wait 6 hours between feedings</li>
            <li>• Monitor fish behavior after feeding</li>
          </ul>
        </div>
      </div>
    </div>
  );
};