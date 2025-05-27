import { createContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for token and fetch user on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/profile"); // Protected route to get user data
        setUser(response.data); // Set user data in context
      } catch (error) {
        console.log("User is not authenticated or token expired.");
      }
    };

    fetchUser(); // Fetch user data on component mount (page load)
  }, []);

  const login = async (email, password) => {
    console.log("Login payload:", { email, password });
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      console.log("✅ Login successful:", response.data);

      // Store token in cookie
      document.cookie = `token=${response.data.token}; path=/; max-age=2592000`;

      // ✅ Fetch user profile after login
      const { data } = await axiosInstance.get("/user/profile");
      setUser(data);
      console.log("✅ User set in context:", data);

      // Navigate after user is set
      navigate("/");
    } catch (error) {
      console.error("❌ Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    const { data } = await axiosInstance.post("/user/register", {
      name,
      email,
      password,
    });
    setUser(data.user);
  };

  const logout = async () => {
    await axiosInstance.get("/user/logout");
    setUser(null);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
