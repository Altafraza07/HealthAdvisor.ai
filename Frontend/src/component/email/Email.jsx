import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(false);
  const calledRef = useRef(false);  // To prevent multiple calls

  useEffect(() => {
    if (calledRef.current) return;  // Exit if already called
    calledRef.current = true;

    const verify = async () => {
      try {
        const res = await axios.get(`/api/user/verify-email/${token}`);
        console.log("Verify email response:", res.data);
        setMessage(res.data.message);
        setSuccess(true);
      } catch (error) {
        console.error("Verify email error:", error.response?.data);
        setMessage(error.response?.data?.message || "Verification failed");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-8">{message}</h2>
      {success && (
        <button className="inline-block px-8 py-3 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300" onClick={() => navigate("/login")}>Go to Login</button>
      )}
    </div>
  );
}
