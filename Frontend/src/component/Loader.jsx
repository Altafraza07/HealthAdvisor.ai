import Lottie from "react-lottie"; 
import { useLoader } from "../assets/loader/loaderContext"; 

import loaderAnimation from "../assets/loader/loader.json"; 

const Loader = () => {
  const { loading } = useLoader(); 

  if (!loading) return null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    loading && (
      <div className={`loader-overlay ${loading ? "visible" : ""}`}>
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
    )
  );
};

export default Loader;
