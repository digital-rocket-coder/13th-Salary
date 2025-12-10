import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import CyberContainer from './CyberContainer';
import { Rocket, Gem, PartyPopper } from 'lucide-react';

const Celebration: React.FC = () => {
  
  useEffect(() => {
    const duration = 30 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // Fireworks Logic
      const particleCount = 50;
      
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'], // Rainbow fireworks
        shapes: ['circle', 'square'],
        scalar: 1.2
      });

      // Occasional "Gold" Burst
      if (Math.random() > 0.7) {
        confetti({
            startVelocity: 45,
            spread: 360,
            ticks: 90,
            zIndex: 100,
            particleCount: 100,
            origin: { x: Math.random(), y: Math.random() * 0.5 },
            colors: ['#FFD700', '#FFA500'], // Gold
            shapes: ['star'],
            scalar: 1.5,
            gravity: 1.2,
            drift: 0,
        });
      }

    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-in zoom-in duration-500 w-full max-w-3xl">
      <CyberContainer glowColor="fuchsia" className="text-center">
        
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
           <div className="bg-yellow-400 text-black p-4 rounded-full border-4 border-[#0f0c29] animate-bounce">
              <PartyPopper size={48} />
           </div>
        </div>

        <div className="mt-8">
            <h1 className="text-4xl md:text-7xl font-header font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500 mb-4 drop-shadow-sm">
            БАБКИ НА БАЗЕ!
            </h1>
            <h2 className="text-xl md:text-3xl font-bold text-cyan-300 mb-8">
            Хьюстон, финансовые проблемы решены! 🚀
            </h2>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-center space-x-4 mb-4">
                    <Rocket className="text-orange-400" size={32} />
                    <span className="text-2xl font-bold">Отчет миссии:</span>
                    <Gem className="text-pink-400" size={32} />
                </div>
                <p className="text-lg text-gray-200">
                    13-я зарплата успешно приземлилась на ваш банковский счет. 
                    <br/>
                    <span className="text-yellow-300 font-bold italic">Приготовьтесь к неконтролируемому шопингу!</span>
                </p>
            </div>

            <div className="mt-8 text-sm text-purple-300 font-mono">
                STATUS: RICH_AND_HAPPY ✨
            </div>
        </div>
      </CyberContainer>
    </div>
  );
};

export default Celebration;