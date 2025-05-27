import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "./LoaderContext";
import Loader from "../../component/Loader";

const GlobalLoader = () => {
  const { loading, showLoader, hideLoader } = useLoader();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname); // store previous path

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      showLoader(); // Show loader when route changes
      prevPathRef.current = location.pathname;
    }

    return () => hideLoader(); // Hide the loader immediately when location changes
  }, [location, showLoader, hideLoader]);

  return loading ? <Loader /> : null; // Show loader if loading is true
};

export default GlobalLoader;
