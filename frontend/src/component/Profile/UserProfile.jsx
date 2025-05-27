// UserProfile.js
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user's profile when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/profile'); // Make sure /profile is the correct route
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-8">{user.name}'s Profile</h1>
        <div className="space-y-4 px-20">
          <div className="flex justify-between">
            <span className="font-medium text-lg text-gray-600">Email:</span>
            <span className="text-gray-800 text-lg">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-lg text-gray-600">Joined on:</span>
            <span className="text-gray-800 text-lg">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-lg text-gray-600">Profile Updated:</span>
            <span className="text-gray-800 text-lg">{new Date(user.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default UserProfile;
