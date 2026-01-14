import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { ArchiveItem } from '../types';

const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'a1', year: '2023', code: 'SYS-01', name: 'ISOLATION SUIT',
    image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1000&auto=format&fit=crop', // Hoodie
    specs: { weight: '1200gsm', origin: 'KYOTO, JP', composition: 'Nylon/Ceramic' }
  },
  {
    id: 'a2', year: '2023', code: 'SYS-02', name: 'NEBULA PARKA',
    image: 'https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?q=80&w=1000&auto=format&fit=crop', // Dark Jacket
    specs: { weight: '800gsm', origin: 'COMO, IT', composition: 'Polyethylene' }
  },
  {
    id: 'a3', year: '2024', code: 'SYS-03', name: 'VOID WALKER',
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000&auto=format&fit=crop', // Accessory
    specs: { weight: '450gsm', origin: 'SEOUL, KR', composition: 'Gore-Tex Pro' }
  },
  {
    id: 'a4', year: '2024', code: 'SYS-04', name: 'AERO SHELL',
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1000&auto=format&fit=crop', // Updated: Clean structural shirt/shell
    specs: { weight: '200gsm', origin: 'PORTLAND, US', composition: 'Dyneema' }
  },
  {
    id: 'a5', year: '2024', code: 'SYS-05', name: 'KINETIC VEST',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', // Fashion
    specs: { weight: '600gsm', origin: 'BERLIN, DE', composition: 'Kevlar/Wool' }
  },
];

const GlassPrismCard: React.FC<{ item: ArchiveItem }> = ({ item }) => {
  return (
    <motion.div 
      className="group relative w-[350px] h-[55vh] flex-shrink-0 bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:bg-white/10"
    >
      {/* Background Image - Darkened */}
      <div className="absolute inset-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-80 group-hover:grayscale-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Header (Always Visible) */}
        <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-4">
          <div className="flex justify-between items-baseline mb-2 text-white/50 font-mono text-xs">
            <span>{item.code}</span>
            <span>// {item.year}</span>
          </div>
          <h3 className="text-3xl font-serif text-white">{item.name}</h3>
        </div>

        {/* Unfolding Specs (Hidden by default, slides up/unfolds on hover) */}
        <div className="relative z-10 h-0 overflow-hidden group-hover:h-auto transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
          <div className="pt-6 border-t border-white/20 mt-4 grid grid-cols-2 gap-y-4 text-xs font-mono text-white/70">
            <div>
              <span className="block text-white/30 mb-1">WEIGHT</span>
              {item.specs.weight}
            </div>
            <div>
              <span className="block text-white/30 mb-1">ORIGIN</span>
              {item.specs.origin}
            </div>
            <div className="col-span-2">
              <span className="block text-white/30 mb-1">COMPOSITION</span>
              {item.specs.composition}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CollectionArchive = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Transform vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-onyx">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header positioned absolutely within sticky container */}
        <div className="absolute top-12 left-8 z-20 md:left-24">
           <SectionHeading 
             number="02" 
             title="THE ARCHIVE" 
             subtitle="Historical artifacts from the SUTURE program."
             light
           />
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex gap-12 pl-[5vw] md:pl-[25vw] pr-[5vw] items-center">
           {ARCHIVE_ITEMS.map((item) => (
             <GlassPrismCard key={item.id} item={item} />
           ))}
           {/* End Card */}
           <div className="w-[300px] h-[55vh] flex-shrink-0 flex items-center justify-center border border-white/10 rounded-none text-white/20 font-serif italic text-4xl">
             End of Line
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollectionArchive;