import React from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "About", to: "/about" },
  { name: "Pricing", to: "/pricing" },
  { name: "Solutions", to: "/solutions" },
  { name: "Help", to: "/help" },
];

const Nav = ({ openLogin, openSignup, navigate }) => {

  return (
    <nav className="w-full flex justify-center items-center py-6">
      <div className="flex items-center w-[90vw] max-w-4xl mx-auto px-6 py-2 rounded-2xl bg-gradient-to-r from-neutral-900/70 via-neutral-800/60 to-neutral-900/70 shadow-xl backdrop-blur-md border border-neutral-700/70">
        {/* Logo and Brand */}
        <button
          className="flex items-center gap-2 mr-10"
          onClick={() => navigate("/")}
        >
          {/* Example SVG—swap for your logo if needed */}
          <span className="w-6 h-6 inline-block">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#a3e635" />
              <text x="7" y="17" fontSize="10" fill="#222">AI</text>
            </svg>
          </span>
          <span className="font-bold text-lg text-white tracking-wider">FinanceAI</span>
        </button>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => navigate(link.to)}
              className="text-gray-200 hover:text-blue-400 font-medium transition px-2 py-1"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 ml-8">
          <button
            className="text-gray-100 hover:text-blue-400 font-medium px-4 py-2"
            onClick={openLogin}
          >
            Login
          </button>
          <button
            className="bg-gray-200 hover:bg-white text-gray-800 font-semibold rounded-md px-5 py-2 transition shadow"
            onClick={openSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
