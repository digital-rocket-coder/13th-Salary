import React from 'react';

const MoneyRain: React.FC = () => {
  // Only coins as requested
  const coin = '🪙';
  
  // Create a stream of coins
  const drops = Array.from({ length: 30 }).map((_, i) => ({
    left: Math.random() * 100, // Start horizontal position
    delay: Math.random() * 20, // Spread start times significantly for smoother density
    duration: Math.random() * 10 + 15, // 15-25s fall duration (Much slower/floating)
    size: Math.random() * 1.5 + 1, // 1-2.5rem size
    drift: Math.random() * 30 - 15, // Horizontal drift (-15vw to 15vw)
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
       <style>{`
         @keyframes coin-float {
           0% { 
             transform: translate3d(0, -10vh, 0) rotate(0deg); 
             opacity: 0; 
           }
           10% {
             opacity: 1;
           }
           90% {
             opacity: 1;
           }
           100% { 
             /* Fall to bottom with horizontal drift and rotation */
             transform: translate3d(var(--drift), 110vh, 0) rotate(360deg); 
             opacity: 0; 
           }
         }
       `}</style>
       {drops.map((drop, i) => (
         <div
            key={i}
            className="absolute -top-20 will-change-transform"
            style={{
               left: `${drop.left}%`,
               fontSize: `${drop.size}rem`,
               animation: `coin-float ${drop.duration}s linear infinite`,
               animationDelay: `-${drop.delay}s`,
               textShadow: '0 0 10px rgba(255, 215, 0, 0.4)', // Golden glow
               '--drift': `${drop.drift}vw`
            } as React.CSSProperties}
         >
           {coin}
         </div>
       ))}
    </div>
  );
};

export default MoneyRain;