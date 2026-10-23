import React, { useState } from 'react';
import { ASSETS } from '../data/assets';

interface EmblemProps {
  type: 'national' | 'mes';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
}

export const Emblem: React.FC<EmblemProps> = ({
  type,
  className = '',
  size = 'md',
  title
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }[size];

  const imageSrc = type === 'national' ? ASSETS.bdEmblem : ASSETS.mesEmblem;
  const altText = type === 'national' 
    ? 'Government of the People\'s Republic of Bangladesh Emblem' 
    : 'Military Engineer Services (MES) Bangladesh Crest';

  if (!hasError && imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={altText}
        title={title || altText}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`object-contain rounded-full shadow-sm shrink-0 ${sizeClasses} ${className}`}
      />
    );
  }

  // Graceful SVG Fallback Container (Zero-broken-image policy)
  if (type === 'national') {
    return (
      <div 
        title={title || altText}
        className={`flex items-center justify-center rounded-full bg-emerald-900 border-2 border-amber-400 text-amber-300 font-bold shadow-sm shrink-0 ${sizeClasses} ${className}`}
      >
        <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 fill-current">
          <circle cx="50" cy="50" r="46" fill="#0f5132" stroke="#d4af37" strokeWidth="4"/>
          {/* Water Lily Shape */}
          <path d="M50,22 C45,35 30,50 30,60 C30,70 40,75 50,75 C60,75 70,70 70,60 C70,50 55,35 50,22 Z" fill="#d4af37"/>
          <path d="M50,30 C48,42 42,55 38,62 C42,66 48,68 50,68 C52,68 58,66 62,62 C58,55 52,42 50,30 Z" fill="#0f5132"/>
          {/* Rice Sheaves arc */}
          <circle cx="30" cy="40" r="3" fill="#d4af37"/>
          <circle cx="70" cy="40" r="3" fill="#d4af37"/>
          <circle cx="50" cy="18" r="3" fill="#d4af37"/>
        </svg>
      </div>
    );
  }

  return (
    <div 
      title={title || altText}
      className={`flex items-center justify-center rounded-full bg-slate-900 border-2 border-amber-500 text-amber-400 font-bold shadow-sm shrink-0 ${sizeClasses} ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 fill-current">
        <path d="M50,15 L80,25 L80,60 C80,75 50,90 50,90 C50,90 20,75 20,60 L20,25 Z" fill="#1e3a5f" stroke="#d4af37" strokeWidth="3"/>
        {/* Dividers / Calipers & Castle */}
        <path d="M42,35 L50,60 L58,35" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <circle cx="50" cy="35" r="4" fill="#d4af37"/>
        <rect x="38" y="65" width="24" height="12" fill="#d4af37" rx="1"/>
      </svg>
    </div>
  );
};
