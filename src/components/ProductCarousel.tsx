
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CTAButton from './CTAButton';

type ProductItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
};

const products: ProductItem[] = [
  {
    id: 1,
    title: "Early Payment Solutions",
    description: "Get paid within 24 hours for your approved invoices, improving cash flow and working capital.",
    icon: "💰",
    color: "from-blue-500/10 to-blue-600/10 border-blue-500/20"
  },
  {
    id: 2,
    title: "48-Day Credit Line",
    description: "Access interest-free credit for up to 48 days, helping you manage seasonal demands.",
    icon: "📅",
    color: "from-green-500/10 to-green-600/10 border-green-500/20"
  },
  {
    id: 3,
    title: "Supply Chain Visibility",
    description: "Track payments, invoices, and credit utilization in real-time through our intuitive dashboard.",
    icon: "📊",
    color: "from-purple-500/10 to-purple-600/10 border-purple-500/20"
  },
  {
    id: 4,
    title: "AI-Powered Risk Assessment",
    description: "Our advanced algorithms ensure fair credit decisions based on transaction history and business performance.",
    icon: "🤖",
    color: "from-orange-500/10 to-orange-600/10 border-orange-500/20"
  },
  {
    id: 5,
    title: "Multilingual Support",
    description: "Access our platform in multiple Indian languages, making financing accessible to all MSMEs.",
    icon: "🗣️",
    color: "from-red-500/10 to-red-600/10 border-red-500/20"
  },
  {
    id: 6,
    title: "Digital Documentation",
    description: "Paperless processing of all your supply chain finance needs with secure digital documentation.",
    icon: "📱",
    color: "from-cyan-500/10 to-cyan-600/10 border-cyan-500/20"
  }
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsToShow >= products.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - itemsToShow : prevIndex - 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-4">
            Our Products
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Comprehensive financial solutions designed specifically for MSMEs to optimize their supply chain operations.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 md:-left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 md:p-3"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-bpower-blue" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute -right-4 md:-right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 md:p-3"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-bpower-blue" />
          </button>

          {/* Carousel container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-3"
                >
                  <Card className={`h-full border bg-gradient-to-br ${product.color} hover:shadow-lg transition-shadow`}>
                    <CardContent className="flex flex-col h-full p-6">
                      <div className="text-4xl mb-4">{product.icon}</div>
                      <h3 className="text-xl font-semibold text-bpower-blue mb-3">{product.title}</h3>
                      <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                      <CTAButton 
                        text="Learn More" 
                        variant="outline"
                        size="sm"
                        icon={false}
                        className="mt-auto w-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(products.length / itemsToShow) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsToShow)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex >= index * itemsToShow && currentIndex < (index + 1) * itemsToShow
                    ? "w-6 bg-bpower-green"
                    : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <CTAButton text="Join Now" size="lg" />
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
