import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FiUser, FiEdit, FiLock, FiLogOut } from "react-icons/fi";

const Sidebar = ({ onSelect }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2500);
  };

  const menuItems = [
    { key: "view", icon: <FiUser />, label: "View Profile" },
    { key: "edit", icon: <FiEdit />, label: "Edit Profile" },
    { key: "password", icon: <FiLock />, label: "Change Password" },
  ];

  return (
    <div className="bg-gray-800 text-white p-2 w-16 md:w-64 h-full md:min-h-full flex flex-col">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 hidden md:block px-2">
        User Dashboard
      </h2>
      <ul className="space-y-6 flex flex-col flex-grow">
        {menuItems.map(({ key, icon, label }) => (
          <li key={key}>
            <button
              onClick={() => onSelect(key)}
              className="w-full flex items-center py-3 px-2 hover:bg-gray-700 rounded transition"
            >
              <span className="text-3xl sm:text-lg mr-0 sm:mr-2 flex justify-center w-6 md:w-12">
                {icon}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          </li>
        ))}
        <li className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center py-3 px-2 text-red-400 hover:bg-gray-700 rounded transition"
          >
            <span className="text-3xl sm:text-lg mr-0 sm:mr-2 flex justify-center w-6 md:w-12">
              <FiLogOut />
            </span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
