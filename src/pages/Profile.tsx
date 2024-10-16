import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Status:</strong> {user?.status}</p>
      </div>
    </div>
  );
};

export default Profile;