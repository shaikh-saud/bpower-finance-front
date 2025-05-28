import React from 'react';
import CTAButton from './CTAButton';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-bpower-blue to-bpower-darkGreen">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_#ffffff_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Empowering <span className="text-bpower-gold">63 Million MSMEs</span> with Seamless Supply Chain Finance
          </h1>
          <p className="text-lg text-white/90 mb-10 max-w-2xl">
            Unlock 48-day interest-free credit and ensure 1-day payment cycles for your business. Join B-Power Industries to revolutionize your cash flow management.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton 
              text="Join Now" 
              variant="primary" 
              size="lg"
            />
            <CTAButton 
              text="Learn More" 
              variant="outline" 
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;