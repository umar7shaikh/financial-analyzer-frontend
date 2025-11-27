import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "About", to: "/about" },
  { name: "Pricing", to: "/pricing" },
  { name: "Solutions", to: "/solutions" },
  { name: "Help", to: "/help" },
];

const Nav = ({ openLogin, openSignup, navigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full flex justify-center items-center py-6">
      <div className="flex items-center w-[90vw] max-w-4xl mx-auto px-6 py-2 rounded-2xl bg-gradient-to-r from-neutral-900/70 via-neutral-800/60 to-neutral-900/70 shadow-xl backdrop-blur-md border border-neutral-700/70">
        {/* Logo and Brand */}
        <button
          className="flex items-center gap-2 mr-10 flex-shrink-0"
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

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex flex-1 justify-center gap-8">
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex flex-1 justify-end mr-4">
          <button
            className="p-2 text-gray-200 hover:text-blue-400 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex gap-4 ml-8">
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

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-neutral-900/95 via-neutral-800/90 to-neutral-900/95 backdrop-blur-md border border-neutral-700/70 rounded-2xl mx-4 mt-2 shadow-2xl py-4 z-50">
            <div className="flex flex-col items-center gap-3 px-4">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.to);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-200 hover:text-blue-400 font-medium py-2 px-4 w-full text-left rounded-lg hover:bg-neutral-800/50 transition"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col sm:flex-row gap-3 w-full px-2 pt-2 border-t border-neutral-700/50">
                <button
                  className="flex-1 text-gray-100 hover:text-blue-400 font-medium py-3 px-4 text-center rounded-lg hover:bg-neutral-800/50 transition"
                  onClick={() => {
                    openLogin();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="flex-1 bg-gray-200 hover:bg-white text-gray-800 font-semibold rounded-lg px-4 py-3 transition shadow-sm"
                  onClick={() => {
                    openSignup();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
