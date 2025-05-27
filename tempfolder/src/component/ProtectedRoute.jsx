import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);  // Get user from context
  
  if (!user) {
    console.log("🚫 No user found, redirecting to login");
    return <Navigate to="/login" />;  // Redirect to login if no user
  }

  return children;  // Return protected component if user is found
};

export default ProtectedRoute;
