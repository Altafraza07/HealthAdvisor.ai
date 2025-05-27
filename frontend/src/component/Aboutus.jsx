 import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="relative bg-gradient-to-r from-teal-600 to-teal-500 py-20 px-6 overflow-hidden z-0">

      {/* Floating Icons */}
      <i className="fas fa-heart text-teal-100 text-6xl absolute top-20 left-10 animate-pulse opacity-10 z-0"></i>
      <i className="fas fa-brain text-teal-100 text-5xl absolute bottom-20 right-16 animate-spin-slow opacity-10 z-0"></i>
      <i className="fas fa-stethoscope text-teal-100 text-4xl absolute top-1/2 left-1/2 animate-bounce opacity-10 z-0"></i>

      {/* About Website Section */}
      <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-lg p-12 rounded-3xl shadow-xl border border-white/30 relative z-[5] mb-20">
        <motion.h2
          className="text-5xl font-extrabold text-gray-800 text-center mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What is Health Advisor.AI?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Health Advisor.AI is your intelligent virtual health companion. It empowers users with instant, personalized health insights through a smart symptom checker, AI-powered recommendations, and expert consultation booking — all in one place.
        </motion.p>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {[
            {
              title: 'Smart Symptom Checker',
              icon: 'fas fa-stethoscope',
              text: 'Describe your symptoms and get instant feedback.',
            },
            {
              title: 'AI Recommendations',
              icon: 'fas fa-brain',
              text: 'AI analyzes symptoms and suggests probable causes.',
            },
            {
              title: 'Easy Consultations',
              icon: 'fas fa-user-md',
              text: 'Book consultations with certified health experts.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(13, 148, 136, 0.6)',
              }}
              className="relative bg-white/40 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 text-center transition duration-300 hover:shadow-teal-300 before:content-[''] before:absolute before:inset-0 before:rounded-xl before:border before:border-teal-400 before:animate-pulse before:opacity-30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.2, duration: 0.8 }}
            >
              <i className={`${item.icon} text-4xl text-teal-500 mb-4`} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Developer Section */}
      <div className="max-w-5xl mx-auto text-center relative z-[5]">
        <motion.h2
          className="text-5xl font-extrabold text-white mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet the Developer
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Passionate about crafting innovative solutions, I combine creativity with cutting-edge technology to make digital health tools smarter and more accessible.
        </motion.p>

        {/* Developer Profile Card */}
        <motion.div
          className="max-w-md mx-auto bg-white/60 backdrop-blur-lg p-12 rounded-3xl shadow-xl border border-white/30 relative z-[10] transition duration-300 hover:scale-[1.02] hover:shadow-teal-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <img
              src="https://avatars.githubusercontent.com/u/50503777?v=4"
              alt="Aryan Sharma"
              className="w-36 h-36 rounded-full border-4 border-white shadow-md hover:shadow-teal-300 transition-all duration-300"
            />
            <h3 className="text-2xl font-extrabold text-gray-800 mb-2">Aryan Sharma</h3>
            <p className="text-teal-500 font-medium">Full Stack Developer & AI Innovator</p>
            <p className="text-gray-600 text-center max-w-md">
              I’m focused on building intuitive, AI-driven solutions like Health Advisor.AI to empower users with instant health insights. Let’s build the future of digital wellness together.
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/aryanastic "
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-800 text-xl transition"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/aryanastic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-800 text-xl transition"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="/portfolio"
                className="text-teal-600 hover:text-teal-800 text-xl transition"
              >
                <i className="fas fa-globe"></i>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a
            href="/contactus"
            className="inline-block bg-teal-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:bg-teal-600 hover:shadow-lg transition-all duration-300"
          >
            Hire me!
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
