import React from 'react';

const Background: React.FC = () => {
  // Generate random stars
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#240b36] via-[#1a0b2e] to-[#0f0c29]" />
      
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="star absolute bg-white rounded-full shadow-[0_0_5px_#fff]"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}

      {/* Nebula Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600/30 rounded-full blur-[100px]" />
    </div>
  );
};

export default Background;