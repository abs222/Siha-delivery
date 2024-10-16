import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AvailabilityToggle: React.FC = () => {
  const { user, updateAvailability } = useAuth();

  const handleToggle = (status: 'available' | 'not_available' | 'delivering') => {
    updateAvailability(status);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Availability Status</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => handleToggle('available')}
          className={`px-4 py-2 rounded ${
            user?.status === 'available' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          Available
        </button>
        <button
          onClick={() => handleToggle('not_available')}
          className={`px-4 py-2 rounded ${
            user?.status === 'not_available' ? 'bg-red-500 text-white' : 'bg-gray-200'
          }`}
        >
          Not Available
        </button>
        <button
          onClick={() => handleToggle('delivering')}
          className={`px-4 py-2 rounded ${
            user?.status === 'delivering' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
          }`}
          disabled={user?.status !== 'delivering'}
        >
          Delivering
        </button>
      </div>
    </div>
  );
};

export default AvailabilityToggle;