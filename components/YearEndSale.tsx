import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';

const YearEndSale = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const xText = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[80vh] overflow-hidden flex items-center justify-center bg-red-900/20 border-t border-b border-white/5">
      
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" 
          alt="Sale Background" 
          className="w-full h-[140%] object-cover grayscale contrast-150 mix-blend-multiply opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-onyx" />
      </motion.div>

      {/* Scrolling Text Layer */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-10 opacity-20 overflow-hidden">
        <motion.div style={{ x: xText }} className="whitespace-nowrap text-[20vw] font-black font-serif leading-none text-red-500/50 mix-blend-overlay">
          PURGE SYSTEM PURGE SYSTEM
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center p-8 backdrop-blur-sm bg-black/30 border border-white/10 max-w-2xl"
      >
        <div className="flex justify-center mb-4">
           <span className="px-2 py-1 bg-red-600 text-black font-mono text-xs font-bold uppercase tracking-widest animate-pulse">
             Alert: Clearance Protocol
           </span>
        </div>
        <h2 className="text-6xl md:text-8xl font-serif text-white mb-6 tracking-tighter">
          YEAR END<br/>ARCHIVE
        </h2>
        <p className="font-mono text-white/70 mb-8 max-w-lg mx-auto">
          Authorized liquidation of FW23 prototypes and surplus shell units. Discounts calculated by wear-cycle algorithms.
        </p>
        <div className="flex justify-center items-center gap-4 text-3xl md:text-5xl font-serif text-red-500 mb-8">
          <span>UP TO 50% OFF</span>
        </div>
        <MagneticButton className="px-8 py-4 bg-white text-black font-mono text-sm uppercase hover:bg-red-600 hover:text-white transition-colors flex items-center gap-4 mx-auto">
          Access Sale
          <ArrowRight size={16} />
        </MagneticButton>
      </motion.div>

    </section>
  );
};

export default YearEndSale;