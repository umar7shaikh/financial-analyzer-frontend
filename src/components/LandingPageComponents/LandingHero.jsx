import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/hero.webp'; // Change to hero.jpg if needed

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* BACKGROUND IMAGE - Full screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImg})`,
          filter: 'brightness(0.4) contrast(1.1)',
        }}
      ></div>

      {/* HEX GRID OVERLAY */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='0.3' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* GRADIENT OVERLAY for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen w-full px-6 py-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            {/* HEADLINE with inline "Financial" badge */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8">
              AI-Powered{' '}
              <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-full font-semibold text-4xl md:text-5xl shadow-lg">
                Financial
              </span>{' '}
              Document Analyzer
            </h1>

            {/* CTA BUTTON */}
            <button
              onClick={() => navigate('/signup')}
              className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition transform hover:scale-105 mb-8"
            >
              Start Analyzing Free
            </button>

            {/* DESCRIPTION */}
            <p className="text-base md:text-lg text-gray-300 max-w-md leading-relaxed">
              Upload financial PDFs and get instant market insights, investment recommendations, and risk assessments powered by multi-agent AI.
            </p>
          </div>
        </div>
      </div>

      {/* FLOATING BADGES - Same Blue Theme */}
      {/* Top Right */}
      <div className="absolute top-[20%] right-[15%] bg-blue-600/80 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border border-blue-400/30 transform rotate-3 animate-float">
        Multi-Agent AI
      </div>

      {/* Middle Right */}
      <div className="absolute top-[50%] right-[8%] bg-blue-600/80 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border border-blue-400/30 transform -rotate-2 animate-float-delayed">
        Real-Time Analysis
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-[25%] right-[12%] bg-blue-600/80 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border border-blue-400/30 transform rotate-1 animate-float">
        Verified Results
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[15%] left-[10%] bg-blue-600/80 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border border-blue-400/30 transform -rotate-3 animate-float-delayed">
        Market Insights
      </div>
    </div>
  );
};

export default LandingHero;
