import React, { ReactNode } from 'react';

interface CyberContainerProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'green' | 'fuchsia';
}

const CyberContainer: React.FC<CyberContainerProps> = ({ children, className = '', glowColor = 'cyan' }) => {
  // Mapping old props to new fun colors
  const styles = {
    cyan: 'border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.2)] from-slate-900/80 to-slate-800/80',
    green: 'border-green-400/50 shadow-[0_0_30px_rgba(74,222,128,0.2)] from-green-900/80 to-slate-900/80',
    fuchsia: 'border-fuchsia-400/50 shadow-[0_0_30px_rgba(232,121,249,0.2)] from-fuchsia-900/80 to-slate-900/80',
  };

  const selectedStyle = styles[glowColor] || styles.cyan;

  return (
    <div className={`relative rounded-3xl border-2 backdrop-blur-xl bg-gradient-to-b ${selectedStyle} p-8 ${className} transition-all duration-500 hover:scale-[1.01]`}>
      
      {/* Fun header dots */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CyberContainer;