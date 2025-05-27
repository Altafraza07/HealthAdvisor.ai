import React, { useState } from "react";
import Consult from "../component/consultation/Consult";
import ConsultHindi from "../component/consultation/ConsultHindi";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Consultation = () => {

  return (
    <div>
      <Navbar />

      <Consult />

      <Footer />
    </div>
  );
};

export default Consultation;
