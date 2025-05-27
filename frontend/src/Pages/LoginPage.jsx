import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import { useLoader } from "../assets/loader/LoaderContext.jsx";

const Login = () => {
  const { user, login } = useContext(AuthContext); // Login function from context
  const [email, setEmail] = useState("");
  const { showLoader, hideLoader } = useLoader(); // Access loader control
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigating
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("👤 User in Login.jsx useEffect:", user); // Add this
    if (user) {
      navigate("/"); // Navigate to home page if user is logged in
      localStorage.setItem("justLoggedIn", "true");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    showLoader(); // Show loader before making the login request
    try {
      const success = await login(email, password); // this now returns true/false
      
      if (success) {
        navigate("/"); // Navigate to home if login is successful
        localStorage.setItem("justLoggedIn", "true");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!"); // Trigger error toast
    } finally {
      hideLoader(); // Hide loader once the login request is complete
    }
  };

 

  return (
    <section
      id="login"
      className="bg-white py-16 h-screen flex items-center justify-center relative"
    >
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-2xl shadow-teal-500/50 relative z-10 w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-teal-700 mb-6">
          Health Advisor
        </h2>
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-black mb-6">
          Welcome Back!
        </h3>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 shadow-sm hover:shadow-lg"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 shadow-sm hover:shadow-lg"
              required
            />
            <div className="mt-2 flex items-center">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-700">
                Show Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 bg-opacity-30 backdrop-blur-md text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 hover:bg-opacity-50 transition duration-300 hover:shadow-2xl focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600 text-sm">
            New user?{" "}
            <a
              href="/signup"
              className="text-teal-600 font-semibold hover:underline"
            >
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
