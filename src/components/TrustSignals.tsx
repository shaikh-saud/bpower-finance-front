
import React from 'react';
import { cn } from "@/lib/utils";

type PartnerLogo = {
  id: number;
  name: string;
  logo: string;
};

const partners: PartnerLogo[] = [
  {
    id: 1,
    name: "Startup India",
    logo: "https://gujrdmvjqtkntkhmgbyb.supabase.co/storage/v1/object/public/test//image-removebg-preview%20(10).png"
  },
  {
    id: 2,
    name: "ICICI Bank",
    logo: "https://gujrdmvjqtkntkhmgbyb.supabase.co/storage/v1/object/public/test//image-removebg-preview%20(11).png"
  },
  {
    id: 3,
    name: "NSIC",
    logo: "https://gujrdmvjqtkntkhmgbyb.supabase.co/storage/v1/object/public/test//image-removebg-preview%20(12).png"
  },
  {
    id: 4,
    name: "RBI Registered",
    logo: "https://gujrdmvjqtkntkhmgbyb.supabase.co/storage/v1/object/public/test//image-removebg-preview%20(13).png"
  },

];

const TrustSignals = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-xl text-gray-600 mb-8 text-center">
            Trusted By Leading Organizations
          </h2>

          <div className="w-full overflow-hidden relative">
            <div className="flex items-center justify-around flex-wrap gap-8 md:gap-12">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center mx-4 filter  "
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 md:mt-16 text-center max-w-3xl">
            <p className="text-gray-700 italic mb-4">
              "B-Power Industries has revolutionized how we manage our cash flow. The 48-day interest-free credit has been a game-changer for our business growth."
            </p>
            <div>
              <p className="font-medium text-bpower-blue">Rajesh Kumar</p>
              <p className="text-sm text-gray-500">CEO, Sunrise Textiles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
