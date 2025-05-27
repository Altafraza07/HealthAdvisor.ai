import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Signup = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success("Registration successful! Please check your email to verify for login!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed, Please try again with correct details!"
      );
    }
  };

  return (
    <section
      id="signup"
      className="bg-white py-16 h-screen flex items-center justify-center relative"
    >
      {/* Subtle Glowing Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-50 via-teal-100 to-teal-200 opacity-30 blur-xl"></div>

      <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-2xl shadow-teal-500/50 relative z-10 w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        {/* Health Advisor Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-teal-700 mb-4">
          Health Advisor
        </h2>
        {/* Sign Up Text */}
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-black mb-6">
          Sign Up to explore
        </h3>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 shadow-sm hover:shadow-lg"
              required
            />
          </div>
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
                id="showPasswordSignup"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label
                htmlFor="showPasswordSignup"
                className="text-sm text-gray-700"
              >
                Show Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300 hover:shadow-2xl focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
