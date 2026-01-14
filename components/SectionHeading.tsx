import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ number, title, subtitle, className = "", light = false }) => {
  return (
    <div className={`flex flex-col gap-4 mb-24 ${className}`}>
      <div className="flex items-center gap-4">
        <span className={`font-mono text-xs tracking-widest ${light ? 'text-white/40' : 'text-onyx/40'}`}>
          ({number})
        </span>
        <div className={`h-[1px] w-12 ${light ? 'bg-white/20' : 'bg-onyx/10'}`} />
      </div>
      <h2 className={`text-5xl md:text-7xl font-serif font-light leading-[0.9] tracking-tight ${light ? 'text-white' : 'text-onyx'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-mono text-xs max-w-sm mt-4 uppercase tracking-widest leading-relaxed ${light ? 'text-white/60' : 'text-onyx/60'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
