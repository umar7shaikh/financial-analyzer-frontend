import React from "react";

// Use your preferred Unsplash/Pexels image!
const CTA_IMG =
  "https://images.unsplash.com/photo-1759885697855-52d11c41b19b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CtaSection = () => (
  <section className="relative min-h-[65vh] w-full bg-black flex items-center overflow-hidden">
    {/* BACKGROUND IMAGE */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${CTA_IMG})`,
        filter: "brightness(0.45) contrast(1.07)",
      }}
    ></div>

    {/* HEX GRID OVERLAY */}
    <div className="absolute inset-0 opacity-25 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='0.3' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      ></div>
    </div>

    {/* GRADIENT OVERLAY for depth */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90"></div>

    {/* CTA CONTENT */}
    <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 flex items-center justify-center">
      <div className="max-w-2xl text-center mx-auto">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-7 drop-shadow-lg">
          Ready to transform how you analyze financial documents?
        </h2>
        <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 font-medium">
          Start in seconds—get multi-agent AI insights and market context with one free upload!
        </p>
        <a
          href="/signup"
          className="inline-block bg-white hover:bg-blue-100 text-blue-800 font-bold px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg shadow-xl transition transform hover:scale-105"
        >
          Get Started Free
        </a>
      </div>
    </div>

    {/* OPTIONAL FLOATING BADGES FOR CTA */}
    <div className="absolute bottom-[18%] left-[8%] bg-blue-600/80 backdrop-blur text-white px-5 py-3 rounded-full text-sm font-bold shadow-2xl border border-blue-400/30 transform -rotate-2 animate-float">
      Secure Uploads
    </div>
    <div className="absolute top-[25%] right-[10%] bg-blue-600/80 backdrop-blur text-white px-5 py-3 rounded-full text-sm font-bold shadow-2xl border border-blue-400/30 transform rotate-2 animate-float-delayed">
      No Credit Card Required
    </div>
  </section>
);

export default CtaSection;



