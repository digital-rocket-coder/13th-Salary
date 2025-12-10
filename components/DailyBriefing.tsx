import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';
import { ShieldCheck, X } from 'lucide-react';
import CyberContainer from './CyberContainer';

interface DailyBriefingProps {
  timeLeft: TimeLeft;
  targetDate: Date;
}

const DailyBriefing: React.FC<DailyBriefingProps> = ({ timeLeft, targetDate }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if we already showed the briefing today
    const lastSeenDate = localStorage.getItem('daily_briefing_seen_date');
    const today = new Date().toDateString();

    if (lastSeenDate !== today) {
      // Delay slightly for effect
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Expand Telegram Web App if possible
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.expand();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as seen for today
    localStorage.setItem('daily_briefing_seen_date', new Date().toDateString());
  };

  if (!isOpen) return null;

  const isToday = timeLeft.days === 0 && timeLeft.hours < 24;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="max-w-md w-full relative animate-in zoom-in-95 duration-300">
        <CyberContainer glowColor="green" className="border-green-500/30">
            
            <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
                <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
                <div className="bg-green-500/20 p-4 rounded-full mb-4 border border-green-500/50 animate-pulse">
                    <ShieldCheck size={48} className="text-green-400" />
                </div>
                
                <h2 className="text-2xl font-header font-bold text-white mb-2 tracking-wider">
                    ЕЖЕДНЕВНЫЙ ДОКЛАД
                </h2>
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent my-4" />
                
                <p className="text-lg text-gray-200 mb-6">
                    Добро пожаловать на борт, командир! <br/>
                    Системы работают в штатном режиме.
                </p>

                <div className="bg-black/40 rounded-lg p-4 w-full border border-green-500/20 mb-6">
                    <p className="text-sm text-green-400 font-mono mb-1">СТАТУС МИССИИ:</p>
                    {isToday ? (
                        <p className="text-2xl font-bold text-yellow-400 animate-pulse">
                            🚨 ЦЕЛЬ ЗАХВАЧЕНА! ВЫПЛАТА СЕГОДНЯ!
                        </p>
                    ) : (
                        <p className="text-xl font-bold text-white">
                           До контакта с 13-й ЗП: <span className="text-green-300">{timeLeft.days} дн. {timeLeft.hours} ч.</span>
                        </p>
                    )}
                </div>

                <button
                    onClick={handleClose}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-[0_0_15px_rgba(22,163,74,0.5)]"
                >
                    ПРИНЯТЬ И ПРОДОЛЖИТЬ
                </button>
            </div>
        </CyberContainer>
      </div>
    </div>
  );
};

export default DailyBriefing;