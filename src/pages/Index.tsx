
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ProductCarousel from "@/components/ProductCarousel";
import TrustSignals from "@/components/TrustSignals";
import CTAButton from "@/components/CTAButton";
import { Link, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import StatisticCard from "@/components/StatisticCard";
import { useNavigate } from "react-router-dom";
import ContactForm from "./ContatForm";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}


      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />


        <StatisticCard />

        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-bpower-blue">Explore Our Marketplace</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover thousands of products from MSME sellers across India.
            Get interest-free credit and support the local economy.
          </p>
          <Button className="bg-bpower-blue hover:bg-bpower-green" onClick={() => navigate('/marketplace')}>
            Browse Marketplace
          </Button>
        </div>

        {/* Video Section */}
        <VideoSection />

        {/* Product Carousel */}
        <ProductCarousel />

        {/* Trust Signals */}
        <TrustSignals />

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-bpower-blue to-bpower-darkGreen text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Ready to Transform Your Supply Chain Finance?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Join B-Power Industries today and experience seamless, efficient financing
                that helps your business grow and succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  text="Join Now"
                  variant="primary"
                  size="lg"
                  className="bg-bpower-gold text-bpower-blue hover:bg-bpower-gold/80"
                />
                <CTAButton
                  text="Contact Sales"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-bpower-blue"
                />
              </div>
            </div>
          </div>
        </section>



        <ContactForm/>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-bpower-blue mb-4">B-Power Industries</h3>
              <p className="text-gray-600 mb-4">
                Empowering MSMEs with innovative supply chain finance solutions.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-bpower-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-bpower-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-bpower-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Early Payment</a></li>
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Credit Line</a></li>
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Supply Chain Visibility</a></li>
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Risk Assessment</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-bpower-green">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              © 2025 B-Power Industries. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
