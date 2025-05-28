
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserProfile from '@/components/UserProfile';
import ProtectedRoute from '@/components/ProtectedRoute';

const Profile = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12 mt-[100px]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-bpower-blue mb-8">
              My Profile
            </h1>
            <UserProfile />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
