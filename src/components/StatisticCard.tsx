import React from 'react';

interface StatisticCardProps {
  value: string;
  label: string;
  suffix?: string;
  className?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ value, label, suffix, className }) => {
  return (
    <div className={`p-6 text-center bg-white rounded-lg ${className || ''}`}>
      <div className="text-3xl md:text-4xl font-bold text-bpower-blue mb-2">
        {value}{suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const StatisticsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-bpower-blue">Our Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            B-Power Industries is transforming supply chain finance for MSMEs across India
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatisticCard
            value="63"
            label="Million MSMEs Empowered"
            suffix="M"
            className="shadow-lg hover:shadow-xl transition-shadow"
          />
          <StatisticCard
            value="48"
            label="Days Interest-Free Credit"
            className="shadow-lg hover:shadow-xl transition-shadow"
          />
          <StatisticCard
            value="1"
            label="Day Payment to MSMEs"
            className="shadow-lg hover:shadow-xl transition-shadow"
          />
          <StatisticCard
            value="24/7"
            label="Customer Support"
            className="shadow-lg hover:shadow-xl transition-shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;