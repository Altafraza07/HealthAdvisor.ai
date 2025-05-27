import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Sidebar = ({ onSelect }) => {
  const { logout } = useContext(AuthContext); // use logout function

  const handleLogout = async () => {
    await logout(); // context logout
    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/login";
    }, 2500);
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-2xl font-semibold p-4 text-left">User Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => onSelect("view")}
            className="w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
          >
            View Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelect("edit")}
            className="w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
          >
            Edit Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelect("password")}
            className="w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
          >
            Change Password
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-400 py-2 px-4 hover:bg-gray-700 rounded"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
