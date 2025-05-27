import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import Features from "../component/Features";

import Footer from "../component/Footer";
import ConsultPreview from "../component/consultation/ConsultPreview";
import { toast } from "react-toastify";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const justLoggedIn = localStorage.getItem("justLoggedIn");
    if (user && user.name && justLoggedIn) {
      toast.success(`Welcome ${user.name}`);
      localStorage.removeItem("justLoggedIn"); // so it doesn't repeat
    }
  }, [user]);
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <ConsultPreview />
      <Footer />
    </div>
  );
};

export default Home;
