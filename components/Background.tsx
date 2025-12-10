import React from 'react';

const Background: React.FC = () => {
  // Generate random stars
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
  }));

  // Generate random floating money
  const moneyEmojis = ['💸', '💰', '💵', '💎', '🪙', '💶', '🤑'];
  const floatingMoney = Array.from({ length: 15 }).map((_, i) => ({
    emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 20 + 20, // 20-40s duration (slow drift)
    delay: Math.random() * 20,
    size: Math.random() * 3 + 2, // 2-5rem
    moveX: Math.random() * 200 - 100, // -100px to 100px
    moveY: Math.random() * 200 - 100, // -100px to 100px
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes float-money {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(var(--mx-1), var(--my-1)) rotate(120deg); }
          66% { transform: translate(var(--mx-2), var(--my-2)) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>

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

      {/* Floating Money */}
      {floatingMoney.map((item, i) => (
        <div
          key={`money-${i}`}
          className="absolute opacity-15 select-none"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.size}rem`,
            animation: `float-money ${item.duration}s infinite linear`,
            animationDelay: `-${item.delay}s`,
            '--mx-1': `${item.moveX}px`,
            '--my-1': `${item.moveY}px`,
            '--mx-2': `${-item.moveX}px`,
            '--my-2': `${-item.moveY}px`,
          } as React.CSSProperties}
        >
          {item.emoji}
        </div>
      ))}

      {/* Floating Space Objects */}
      <div className="absolute top-[10%] left-[5%] text-6xl opacity-40 animate-[bounce_8s_infinite]">
        🪐
      </div>
      <div className="absolute bottom-[20%] right-[10%] text-5xl opacity-30 animate-[bounce_6s_infinite] delay-1000">
        🛸
      </div>
      <div className="absolute top-[40%] right-[20%] text-4xl opacity-20 animate-pulse">
        ✨
      </div>
      <div className="absolute bottom-[10%] left-[15%] text-7xl opacity-20 rotate-12">
        🌛
      </div>

      {/* Nebula Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600/30 rounded-full blur-[100px]" />
    </div>
  );
};

export default Background;