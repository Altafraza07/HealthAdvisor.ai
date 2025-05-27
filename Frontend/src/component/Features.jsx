 import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      id: 1,
      img: "/images/ai.jpg",
      title: "Personalized Suggestions with AI",
      desc: "The app learns about you and your habits.",
      alt: "AI feature illustration",
    },
    {
      id: 2,
      img: "/images/expert.jpg",
      title: "Expert Advice",
      desc: "Get answers to your health questions from experts.",
      alt: "Expert advice illustration",
    },
    {
      id: 3,
      img: "/images/24.jpg",
      title: "24/7 Access",
      desc: "Your health advisor is always available whenever you need it.",
      alt: "24/7 access illustration",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // New variant for the whole section fade/slide animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="services"
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(to top left, black, #0f172a, #064e3b)",
      }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Glowing Circles Background */}
      <div className="absolute w-72 h-72 bg-teal-500 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse pointer-events-none"></div>
      <div className="absolute w-80 h-80 bg-cyan-400 opacity-20 rounded-full blur-3xl bottom-20 right-20 animate-pulse pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-serif text-5xl font-extrabold text-teal-400 mb-8 tracking-wide drop-shadow-lg"
        >
          What Makes Us Different
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="text-lg max-w-3xl mx-auto text-teal-200 mb-16 drop-shadow"
        >
          Discover the features designed to bring a warm, personal touch to your health journey.
        </motion.p>

        <div className="flex flex-col md:flex-row md:space-x-10 space-y-12 md:space-y-0">
          {features.map(({ id, img, title, desc, alt }, index) => (
            <motion.div
              key={id}
              className="relative bg-gray-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center cursor-pointer
                border border-transparent hover:border-teal-400
                transition-all duration-400"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 30px rgba(20,184,129,0.6)",
                borderColor: "#14B881",
              }}
            >
              <motion.div
                className="w-40 h-40 rounded-full overflow-hidden mb-6 shadow-lg"
                whileHover={{
                  scale: 1.15,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(20,184,129,0.8)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
              >
                <img
                  src={img}
                  alt={alt}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </motion.div>

              <h3 className="text-2xl font-semibold font-serif mb-2 text-teal-400 drop-shadow-lg">
                {title}
              </h3>
              <p className="text-teal-200 max-w-xs drop-shadow">{desc}</p>

              <motion.div
                className="h-1 bg-teal-400 rounded-full mt-6 w-0"
                whileHover={{ width: "3.5rem" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
