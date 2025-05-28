
import React, { useState } from 'react';
import { Play } from 'lucide-react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    // In a real implementation, this would trigger the actual video to play
  };

  return (
    <section className="py-16 md:py-24 bg-bpower-lightBlue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-4">
            See How It Works
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Our platform bridges the gap between suppliers and buyers, creating a seamless
            supply chain financing experience that benefits everyone involved.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
          {!isPlaying ? (
            <div className="relative aspect-video bg-gradient-to-r from-bpower-blue to-bpower-darkGreen">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlayClick}
                  className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                  aria-label="Play video"
                >
                  <Play className="h-8 w-8 text-bpower-green ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-lg md:text-xl font-semibold">
                  B-Power Industries: Revolutionizing Supply Chain Finance
                </h3>
              </div>
              <div className="absolute top-4 left-4 text-xs font-semibold bg-white/80 text-bpower-blue px-2 py-1 rounded-full">
                2:45
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-black flex items-center justify-center">
              <p className="text-white text-lg">Video would play here in actual implementation</p>
              {/* In a real implementation, this would be replaced with an actual video player */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
