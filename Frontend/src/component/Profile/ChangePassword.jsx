import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance'; // Use the correct axios instance
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
    } catch (err) {
      setError('Failed to change password');
      toast.error('Invalid Password, Please try again');
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
