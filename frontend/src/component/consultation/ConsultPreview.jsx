 import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ConsultPreview = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-gradient-to-br from-teal-50 via-white to-teal-100 py-24 px-6 z-0 overflow-hidden"
      id="consult"
    >
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/30 relative z-[5]">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          
          {/* Left Text Section */}
          <motion.div
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
              <span className="text-teal-600">Instant Health Advice</span> You Can Trust
            </h2>
            <p className="text-lg text-gray-700">
              Not feeling your best or just a bit concerned? Health Advisor.AI is your round-the-clock wellness companion.
              Our smart assistant listens and guides—fast, friendly, and tailored just for you.
            </p>
            <p className="text-md text-gray-600">
              Dive into a smarter way of staying healthy. It's free, it's fast—and it's designed for you.
            </p>

            <motion.button
              onClick={() => navigate("/consultation")}
              className="bg-teal-600 text-white py-3 px-10 rounded-full text-lg font-semibold shadow-md hover:bg-teal-700 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              💬 Take AI Consultation Now
            </motion.button>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            className="lg:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative group transition-all duration-300">
              <img
                src="/images/aiConsult.jpg"
                alt="Consult Illustration"
                className="w-full max-w-sm rounded-3xl shadow-lg group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500"
              />
              <div className="absolute -inset-1 bg-teal-300 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 z-[-1]"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConsultPreview;
