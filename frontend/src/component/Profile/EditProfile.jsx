import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/profile');
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError('Password is required to update profile.');
      toast.error('Password is required to update profile.');
      return;
    }

    try {
      const updateData = { ...user, password };
      await axiosInstance.put('/user/profile', updateData);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Invalid Password');
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Edit Profile</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password (required to update)</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
