import React, { useState, useEffect, useCallback } from 'react';
import Background from './components/Background';
import CyberContainer from './components/CyberContainer';
import TimerDisplay from './components/TimerDisplay';
import Celebration from './components/Celebration';
import MoneyRain from './components/MoneyRain';
import NotificationManager from './components/NotificationManager';
import DailyBriefing from './components/DailyBriefing';
import { TimeLeft, AppState } from './types';
import { Rocket, Satellite, Telescope, Info } from 'lucide-react';

// Add type definition for Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        expand: () => void;
        ready: () => void;
      };
    };
  }
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.COUNTDOWN);
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  
  useEffect(() => {
    // Notify Telegram that the Mini App is ready
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);
  
  // Initialize Timer logic
  const calculateTargetDate = useCallback(() => {
    const now = new Date();
    // Logic: Find the next 16th
    let target = new Date(now.getFullYear(), now.getMonth(), 16, 0, 0, 0);
    
    // If today is past the 16th (e.g. 17th), set target to next month
    if (now.getTime() > target.getTime()) {
      target = new Date(now.getFullYear(), now.getMonth() + 1, 16, 0, 0, 0);
    }
    return target;
  }, []);

  const calculateTimeLeft = useCallback((target: Date): TimeLeft | null => {
    const difference = +target - +new Date();
    
    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Setup Effect
  useEffect(() => {
    const target = calculateTargetDate();
    setTargetDate(target);

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(target);
      if (remaining) {
        setTimeLeft(remaining);
        setAppState(AppState.COUNTDOWN);
      } else {
        setAppState(AppState.CELEBRATION);
        clearInterval(timer);
      }
    }, 1000);

    // Initial check
    const initialRemaining = calculateTimeLeft(target);
    if (!initialRemaining) {
       setAppState(AppState.CELEBRATION);
    } else {
      setTimeLeft(initialRemaining);
    }

    return () => clearInterval(timer);
  }, [calculateTargetDate, calculateTimeLeft]);


  const forceCelebration = () => {
    setAppState(AppState.CELEBRATION);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <Background />
      <MoneyRain />
      
      {/* Daily Briefing Modal - Shows on first launch of the day */}
      <DailyBriefing timeLeft={timeLeft} targetDate={targetDate} />

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        
        {/* Header / Status Bar - Fun Space Version */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-purple-300 font-bold mb-6 px-4 py-2 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 gap-4 md:gap-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Satellite size={18} className="animate-spin-slow text-cyan-400" />
                <span className="hidden sm:inline">СВЯЗЬ С КОСМОСОМ: ОТЛИЧНАЯ</span>
            </div>
            {/* Notification Manager Integration (Keep for browser users) */}
            <NotificationManager targetDate={targetDate} />
          </div>

          <div className="flex items-center gap-2">
             <span className="text-yellow-400 animate-pulse">ЦЕЛЬ: 13-Я ЗП 🛸</span>
          </div>
        </div>

        {appState === AppState.COUNTDOWN ? (
          <CyberContainer className="w-full text-center" glowColor="cyan">
            
            {/* Title Section */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg mb-6 transform -rotate-1 hover:rotate-1 transition-transform">
                <Telescope size={16} />
                <span>Радар обнаружил поступление: {targetDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</span>
              </div>
              
              <h1 className="text-8xl md:text-9xl font-header font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-pink-300 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] mb-4 animate-[pulse_3s_infinite]">
                13
              </h1>
              
              <div className="bg-white/5 inline-block px-6 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-purple-200 text-lg flex items-center gap-2">
                  <Info size={18} className="text-cyan-400"/>
                   До столкновения с богатством осталось:
                </p>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm mx-auto max-w-3xl">
               <TimerDisplay timeLeft={timeLeft} />
            </div>

            {/* Funny Footer */}
            <div className="mt-8 text-gray-400 text-sm italic">
               * Погрешность прибытия зависит от настроения бухгалтерии
            </div>

          </CyberContainer>
        ) : (
          <Celebration />
        )}
        
        {/* Reset Button */}
        {appState === AppState.CELEBRATION && (
             <button 
               onClick={() => window.location.reload()}
               className="mt-8 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-bold transition-colors flex items-center gap-2 z-50 relative"
             >
               <Rocket size={16} />
               Запустить миссию заново
             </button>
        )}
        
        {/* Secret Button */}
        {appState === AppState.COUNTDOWN && (
            <div 
              className="fixed bottom-0 right-0 w-20 h-20 z-50 cursor-pointer opacity-0"
              onClick={forceCelebration}
              title="Нажми для мгновенного богатства"
            />
        )}
        
      </main>
      
      <style>{`
        .animate-spin-slow {
            animation: spin 10s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;