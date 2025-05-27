import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      setError('Both fields are required');
      return;
    }

    try {
      await axiosInstance.put('/user/profile/password', { oldPassword, newPassword });
      toast.success('Password changed successfully!');
      setError(null);
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setError('Failed to change password');
      toast.error('Invalid Password, Please try again');
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Change Password</h2>
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
