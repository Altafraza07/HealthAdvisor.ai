import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance'; // Use the correct axios instance
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/profile'); // Make sure the endpoint is correct
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
    setPassword(e.target.value); // Update password state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError('Password is required to update profile.');
      toast.error('Password is required to update profile.');
      return;
    }

    try {
      const updateData = { ...user, password }; // Include the password field
      await axiosInstance.put('/user/profile', updateData); // Make sure the endpoint is correct
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Invalid Password');
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Password Field */}
        <div className="flex flex-col">
          <label className="font-medium">Password (required to update)</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
