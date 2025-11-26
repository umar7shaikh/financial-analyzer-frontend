import React from 'react';
import Step1Img from '../../assets/Step1.webp'; // Update filename if needed
import Step2Img from '../../assets/Step2.webp';
import Step3Img from '../../assets/Step3.webp';

const steps = [
  {
    img: Step1Img,
    title: "Upload Your Document",
    description: "Drag and drop your financial PDF—earnings reports, investment summaries, or balance sheets.",
  },
  {
    img: Step2Img,
    title: "AI Multi-Agent Analysis",
    description: "Our specialized AI analyzes your document, extracts key data, and merges market research.",
  },
  {
    img: Step3Img,
    title: "Get Actionable Insights",
    description: "Receive a clear report with investment recommendations and risk assessment.",
  }
];

const HowItWorks = () => (
  <section className="w-full bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">How it works?</h2>
      <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-12 font-normal">
        Get instant financial insights from your documents in just three steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 items-start">
        {steps.map(({ img, title, description }, i) => (
          <div key={title} className="flex flex-col items-center transition hover:scale-[1.04]">
            <div className="mb-6 sm:mb-8 relative w-[100px] sm:w-[120px] md:w-[140px] h-[100px] sm:h-[120px] md:h-[140px] rounded-full overflow-hidden flex items-center justify-center">
              {/* Blue-tinted overlay */}
              <img
                src={img}
                alt={title}
                className="w-full h-full object-contain z-10 relative"
                style={{ filter: 'drop-shadow(0px 0px 20px #263d57)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-transparent to-black/70 opacity-80 z-20 pointer-events-none rounded-full"></div>
            </div>
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xs">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
