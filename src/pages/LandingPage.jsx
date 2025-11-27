import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHero from '../components/LandingPageComponents/LandingHero';
import HowItWorks from '../components/LandingPageComponents/HowItWorks';
import Nav from '../components/CommonComponents/Nav';
import Features from '../components/LandingPageComponents/Features';
import CtaSection from '../components/LandingPageComponents/CtaSection';
import Footer from '../components/CommonComponents/Footer';


// Accept openLogin and openSignup as props from App.jsx
const LandingPage = ({ openLogin, openSignup }) => {
  const navigate = useNavigate(); // Get router navigation function

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Glass Nav overlaps */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 w-[90vw] max-w-4xl">
        <Nav
          openLogin={openLogin}
          openSignup={openSignup}
          navigate={navigate}
        />
      </div>
      <LandingHero />
      <HowItWorks />
      <Features />
      <CtaSection openSignup={openSignup} />
      <Footer />
    </div>
  );
};

export default LandingPage;
