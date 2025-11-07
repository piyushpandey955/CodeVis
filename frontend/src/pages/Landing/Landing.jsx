import React from 'react';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import VisualDemo from './VisualDemo';
import Footer from './Footer';

const Landing = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <VisualDemo />
      <Footer />
    </div>
  );
};

export default Landing;
