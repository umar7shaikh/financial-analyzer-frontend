import React from 'react';

const features = [
  {
    step: '1/4',
    title: 'Actionable Insights',
    description: 'Ultra-fast, clear analysis delivers market signals, trends, and recommendations for your financial PDFs.',
    color: 'bg-cyan-500',
    image: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&w=400&q=80',
  },
  {
    step: '2/4',
    title: 'Multi-Agent AI',
    description: 'Three specialized AI agents collaborate for deeper and risk-adjusted guidance.',
    color: 'bg-rose-400',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=400&q=80',
  },
  {
    step: '3/4',
    title: 'Smart Recommendations',
    description: 'Receive buy/hold/sell advice with risk assessment and company performance context.',
    color: 'bg-purple-500',
    image: 'https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg?auto=compress&w=400&q=80',
  },
  {
    step: '4/4',
    title: 'Verified Results',
    description: 'Our multi-agent system cross-checks every report for high confidence and reliability.',
    color: 'bg-blue-700',
    image: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&w=400&q=80',
  },
];

const CARD_WIDTH = 340; // px

const Features = () => {
  return (
    <section className="relative w-full bg-[#191920] py-20">
      {/* Subtle background radial gradient for depth */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10"
        style={{
          width: '900px',
          height: '420px',
          background: 'radial-gradient(circle at 50% 55%, #60a5fa 0%, transparent 80%)',
          transform: 'translate(-50%,-60%)',
          filter: 'blur(60px)',
          opacity: 0.29,
        }}
      />
      <div className="max-w-full px-0">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8 px-8">
          {/* Left: Section Titles */}
          <div className="md:w-2/5 flex flex-col justify-between min-w-[300px]">
            <h2 className="text-white text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              One space to craft it all
            </h2>
            <p className="text-gray-300 text-lg mb-8 md:mb-0">
              Effortlessly analyze complex PDFs and receive actionable financial insights, all in one tool.
            </p>
          </div>

          {/* Right: Enhanced Horizontal Carousel */}
          <div className="md:w-3/5 overflow-x-auto scrollbar-hide relative">
            <div
              className="flex gap-8 w-max snap-x snap-mandatory overflow-x-auto scrollbar-hide"
              style={{
                overflowY: 'hidden',
                scrollBehavior: 'smooth',
              }}
            >
              {features.map(({ step, title, description, color, image }, idx) => (
                <div
                  key={idx}
                  className={`relative flex-shrink-0 snap-center flex flex-col rounded-3xl
                    shadow-2xl ${color} bg-opacity-80
                    backdrop-blur-lg p-8 h-[440px]
                    transition-transform hover:scale-105 hover:shadow-[0_16px_48px_0_rgba(59,130,246,0.25)]
                    duration-300`}
                  style={{ minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH }}
                >
                  <div className="mb-3 text-lg font-extrabold text-white/80 tracking-widest">{step}</div>
                  <div className="text-slate-100 text-3xl font-black mb-3 leading-tight">{title}</div>
                  <p className="text-white text-base mb-7">{description}</p>
                  <div className="mt-auto w-full h-32 bg-white/30 rounded-2xl shadow-cyan-200/20 overflow-hidden flex items-center justify-center">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover rounded-2xl shadow-md"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Hide scrollbar, works for most setups */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Features;
