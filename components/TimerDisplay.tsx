import React from 'react';
import { TimeLeft } from '../types';

interface TimerDisplayProps {
  timeLeft: TimeLeft;
}

const TimeUnit: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => {
  const formattedValue = value < 10 ? `0${value}` : value;

  return (
    <div className="flex flex-col items-center mx-2 md:mx-4 transform hover:scale-110 transition-transform duration-300">
      <div className={`text-5xl md:text-7xl font-header font-black text-transparent bg-clip-text bg-gradient-to-b ${color} drop-shadow-sm`}>
        {formattedValue}
      </div>
      <div className="text-sm md:text-base font-bold text-white/80 bg-white/10 px-3 py-1 rounded-full mt-2 backdrop-blur-sm border border-white/10">
        {label}
      </div>
    </div>
  );
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  return (
    <div className="flex flex-wrap justify-center items-center py-10">
      <TimeUnit value={timeLeft.days} label="Суток" color="from-yellow-300 to-orange-500" />
      <div className="text-3xl md:text-5xl text-white/30 font-header pb-8 animate-bounce mx-1">:</div>
      <TimeUnit value={timeLeft.hours} label="Часов" color="from-pink-300 to-rose-500" />
      <div className="text-3xl md:text-5xl text-white/30 font-header pb-8 animate-bounce mx-1">:</div>
      <TimeUnit value={timeLeft.minutes} label="Минут" color="from-cyan-300 to-blue-500" />
      <div className="text-3xl md:text-5xl text-white/30 font-header pb-8 animate-bounce mx-1">:</div>
      <TimeUnit value={timeLeft.seconds} label="Сек" color="from-green-300 to-emerald-500" />
    </div>
  );
};

export default TimerDisplay;