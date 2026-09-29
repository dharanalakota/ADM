import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showDescriptor?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showDescriptor = true
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Abstract memory/decision geometric emblem: interconnected memory nodes & loop in Sahara terracotta & gold */}
      <div 
        className="relative flex items-center justify-center rounded-xl bg-[#522912] shadow-sm shrink-0"
        style={{ width: iconSize + 10, height: iconSize + 10 }}
        aria-hidden="true"
      >
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dual overlapping faceted memory anchors */}
          <path
            d="M6 10C6 7.79086 7.79086 6 10 6H16C18.2091 6 20 7.79086 20 10V16C20 18.2091 18.2091 20 16 20H10C7.79086 20 6 18.2091 6 16V10Z"
            fill="#D97706"
            fillOpacity="0.85"
          />
          <path
            d="M12 16C12 13.7909 13.7909 12 16 12H22C24.2091 12 26 13.7909 26 16V22C26 24.2091 24.2091 26 22 26H16C13.7909 26 12 24.2091 12 22V16Z"
            fill="#C26732"
          />
          {/* Central intersecting memory junction */}
          <circle cx="16" cy="16" r="3.5" fill="#FAF7F2" />
          <circle cx="16" cy="16" r="1.5" fill="#7C2D12" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold tracking-tight text-[#1C1917] font-sans">
            ADM
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#B45309] uppercase">
            ENTERPRISE
          </span>
        </div>
        {showDescriptor && (
          <span className="text-xs text-[#78716C] font-normal tracking-normal -mt-0.5">
            Adaptive Decision Memory
          </span>
        )}
      </div>
    </div>
  );
};
