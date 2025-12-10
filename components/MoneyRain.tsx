import React from 'react';

const MoneyRain: React.FC = () => {
  const money = ['💸', '💰', '💵', '💎', '🪙', '🚀', '🤑', '💳'];
  
  // Create a dense stream
  const drops = Array.from({ length: 40 }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4, // 4-7s fall duration (slower = smoother feel)
    emoji: money[Math.floor(Math.random() * money.length)],
    size: Math.random() * 2 + 1, // 1-3rem
    sway: Math.random() * 100 - 50, // -50px to 50px sway
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
       <style>{`
         @keyframes money-fall {
           0% { 
             transform: translate3d(0, -10vh, 0) rotate(0deg); 
             opacity: 0; 
           }
           10% {
             opacity: 1;
           }
           50% {
             transform: translate3d(var(--sway), 50vh, 0) rotate(180deg); 
             opacity: 1;
           }
           90% {
             opacity: 1;
           }
           100% { 
             transform: translate3d(0, 110vh, 0) rotate(360deg); 
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
               animation: `money-fall ${drop.duration}s linear infinite`,
               animationDelay: `-${drop.delay}s`,
               textShadow: '0 0 10px rgba(255,255,255,0.5)',
               '--sway': `${drop.sway}px`
            } as React.CSSProperties}
         >
           {drop.emoji}
         </div>
       ))}
    </div>
  );
};

export default MoneyRain;