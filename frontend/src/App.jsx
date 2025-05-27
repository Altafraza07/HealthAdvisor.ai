import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./component/ProtectedRoute";
import Signup from "./Pages/Signup";
import Login from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Faq from "./Pages/FAQ";
import Consultation from "./Pages/Consultation";
import ContactUs from "./Pages/ContactUs";
import Privacy from "./Pages/Privacy"
import "@fortawesome/fontawesome-free/css/all.min.css";
import About from "./Pages/About";
import GlobalLoader from "./assets/loader/GlobalLoader";
import { LoaderProvider } from "./assets/loader/LoaderContext";
import UserProfilePage from "./Pages/UserProfilePage";
import VerifyEmail from "./component/email/Email";

function App() {
  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={5000}
        draggable
        pauseOnHover
        pauseOnFocusLoss
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        toastStyle={{
          backgroundColor: "#333",
          color: "#fff",
          borderRadius: "10px",
          padding: "15px",
        }}
      />
     <LoaderProvider>
      <GlobalLoader />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/FAQ" element={<Faq />} />
        <Route
          path="/consultation"
          element={
            <ProtectedRoute>
              <Consultation />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/profile" element={<UserProfilePage />} />
       <Route path="/verify-email/:token" element={<VerifyEmail />} />

      </Routes>
     
      </LoaderProvider>
    </>
  );
}

export default App;
