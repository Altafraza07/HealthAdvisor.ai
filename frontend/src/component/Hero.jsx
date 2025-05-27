 import React from 'react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-[100vh] w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-slate-900 to-teal-950 px-4"
    >
      {/* Glowing Circles Background */}
      <div className="absolute w-72 h-72 bg-teal-500 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-cyan-400 opacity-20 rounded-full blur-3xl bottom-20 right-20 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl space-y-6 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Welcome to <span className="text-teal-400">HealthAdvisor.AI</span>
        </h1>

        {/* Heartbeat line */}
        <div className="mt-6 mb-6 overflow-hidden h-16 w-full max-w-md mx-auto">
          <svg
            viewBox="0 0 240 40"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              className="heartbeat-line"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="3"
              points="0,20 40,20 50,10 60,30 70,10 80,20 240,20"
            />
          </svg>
        </div>

        <p className="text-lg md:text-xl text-gray-300">
          Your personalized AI-powered guide for smarter, healthier decisions.
        </p>
        <a
          href="#consult"
          className="inline-block px-8 py-3 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300"
        >
          Get Started
        </a>
      </div>

      <style>{`
        .heartbeat-line {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
          animation: heartbeatMove 3s linear infinite;
        }
        @keyframes heartbeatMove {
          0% {
            stroke-dashoffset: 240;
            transform: translateY(0);
          }
          25% {
            transform: translateY(-10px);
          }
          50% {
            stroke-dashoffset: 0;
            transform: translateY(0);
          }
          75% {
            transform: translateY(10px);
          }
          100% {
            stroke-dashoffset: 240;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
