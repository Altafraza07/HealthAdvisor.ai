 import React, { useContext, useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext) || {}; // fallback
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/aboutus" },
    { name: "Consultation", to: "/consultation" },
    { name: "Contact Us", to: "/contactus" },
    { name: "FAQ", to: "/FAQ" },
  ];

  return (
    <header className="w-full bg-white shadow-md z-50">
      <div className="mx-auto flex items-center justify-between px-6 lg:px-20 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-teal-700 tracking-wide select-none hover:text-teal-900 transition transform hover:scale-105 duration-300"
          onClick={() => setMenuOpen(false)}
        >
          HealthAdvisor.<span className="text-teal-500">AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 font-semibold text-teal-700 items-center">
          {navLinks.map(({ name, to }) => (
            <Link
              key={name}
              to={to}
              className={`relative group hover:text-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                location.pathname === to ? "text-teal-500" : ""
              }`}
            >
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-500 transition-all group-hover:w-full"></span>
              <span className="relative">{name}</span>
            </Link>
          ))}
             {/* Right icons */}
        <div className="items-center space-x-4 lg:flex hidden">
          {user ? (
            <Link
              to="/profile"
              className="text-teal-700 border-2 border-teal-700 rounded-full p-2 hover:border-teal-500 transition-colors"
              onClick={() => setMenuOpen(false)}
              title="Profile"
            >
              <FaUser size={24} />
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="hidden sm:block"
            >
              <button className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300">
                Login
              </button>
            </Link>
          )}
          </div>
        </nav>

     

          <div className="lg:hidden inline-block">
          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-teal-700 hover:text-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
          </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`lg:hidden bg-white text-teal-700 transition-max-height duration-500 overflow-hidden shadow-md ${
          menuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6 font-semibold">
          {navLinks.map(({ name, to }) => (
            <li key={name} className="ml-3">
              <Link
                to={to}
                className="block hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}

          <li className="flex justify-start">
            {user ? (
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-2 justify-center border-2 border-teal-700 rounded-full p-2 hover:border-teal-500 transition-colors"
              >
                <FaUser size={22} />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="block text-teal-600 font-semibold text-center"
                onClick={() => setMenuOpen(false)}
              >
                <button className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300">
                  Login
                </button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
