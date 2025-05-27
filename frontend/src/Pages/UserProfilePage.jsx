// UserProfilePage.js
import { useState } from 'react';
import UserProfile from '../component/Profile/UserProfile';
import EditProfile from '../component/Profile/EditProfile';
import ChangePassword from '../component/Profile/ChangePassword';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Sidebar from '../component/Profile/Sidebar';

const UserProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState('view'); // Default is 'view' (view profile)

  // Function to handle which component to render based on the selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case 'view':
        return <UserProfile />;
      case 'edit':
        return <EditProfile />;
      case 'password':
        return <ChangePassword />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-[80vh]">
        <Sidebar onSelect={setSelectedTab} />  {/* Sidebar to select tab */}
        <div className="flex-1 p-6">
          {renderContent()}  {/* Dynamically renders the content based on selected tab */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
