import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { MaterialSpec } from '../types';

// Updated images to show Clothing items representing the material
const MATERIALS: (MaterialSpec & { image: string })[] = [
  {
    id: 'm1',
    title: 'GRAPHENE WEAVE',
    description: 'A proprietary interlocking weave reinforced with atomic-layer graphene. Provides 200x strength of steel at 15% weight. The fabric regulates thermal conductivity based on ambient exposure.',
    chemical_formula: 'C₆₆₀-HEX',
    properties: ['Ballistic Resistance', 'Thermal Regulation', 'Conductive Mesh'],
    image: 'https://images.unsplash.com/photo-1614916852946-df06e94881a5?q=80&w=1000&auto=format&fit=crop' // Updated: High detail black woven texture
  },
  {
    id: 'm2',
    title: 'MEMORY RESIN',
    description: 'Non-Newtonian fluid polymer cured into a flexible solid. The material hardens instantly upon impact or high-velocity stress, returning to a liquid-like drape in static states.',
    chemical_formula: '(C₅H₈)n-O',
    properties: ['Impact Hardening', 'Fluid Drape', 'Self-Healing'],
    image: 'https://images.unsplash.com/photo-1516083693247-f089753e804f?q=80&w=1000&auto=format&fit=crop' // Updated: Abstract glossy liquid/resin
  },
  {
    id: 'm3',
    title: 'AERO-GEL INSULATION',
    description: 'Silica-based ultralight insulation capturing 99.8% air volume. Originally developed for orbital re-entry suits, now adapted for urban winter survival without bulk.',
    chemical_formula: 'SiO₂-GEL',
    properties: ['Zero Thermal Loss', 'Hydrophobic', 'Ultralight'],
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop' // White/Puffy structured layer
  }
];

const MaterialScience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scanline effect driven by scroll progress of the entire section
  const scanLine = useTransform(scrollYProgress, [0, 1], ["0%", "400%"]);

  return (
    <section ref={containerRef} className="relative bg-white text-onyx">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT: Sticky Visual (6 cols) */}
        <div className="lg:col-span-6 h-screen sticky top-0 flex items-center justify-center bg-gray-50/50 overflow-hidden">
             
             {/* Reduced Size Image Container */}
             <div className="relative w-[60%] aspect-[3/4] bg-onyx overflow-hidden shadow-2xl border border-black/5 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMaterial}
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                     <img 
                       src={MATERIALS[activeMaterial].image} 
                       alt={MATERIALS[activeMaterial].title}
                       className="w-full h-full object-cover grayscale contrast-125 opacity-80" 
                     />
                     {/* Overlay Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Technical Overlays */}
                <div className="absolute inset-0 p-6 border border-white/10 flex flex-col justify-between pointer-events-none z-10">
                   <div className="flex justify-between text-[10px] font-mono tracking-widest text-white/70 mix-blend-difference">
                      <span>IMG_REF_0{activeMaterial + 1}</span>
                      <span>{MATERIALS[activeMaterial].chemical_formula}</span>
                   </div>
                   <div className="flex justify-between items-end">
                      <div className="text-[10px] font-mono tracking-widest text-white/50">
                        LAT: {35 + activeMaterial}.0024<br/>
                        LON: {139 - activeMaterial}.4042
                      </div>
                      <div className="text-[10px] font-mono tracking-widest text-white/70 animate-pulse">
                          SYS.ANALYSIS
                      </div>
                   </div>
                </div>

                {/* Animated Scroll Scan Line */}
                <motion.div 
                  style={{ top: scanLine }}
                  className="absolute left-0 right-0 h-[1px] bg-red-500/80 shadow-[0_0_20px_rgba(255,0,0,0.5)] z-20"
                />
             </div>

             {/* Background Noise/Grid for the sticky area */}
             <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-onyx/5" />
        </div>

        {/* RIGHT: Scrolling Content (6 cols) */}
        <div className="lg:col-span-6 relative z-10 px-6 py-24 md:px-24 bg-white">
          <SectionHeading 
            number="03" 
            title="MATERIAL SCIENCE" 
            subtitle="Molecular engineering for the post-modern wearer."
            className="mb-32"
          />

          <div className="flex flex-col pb-[20vh]"> 
            {MATERIALS.map((mat, index) => (
              <motion.div 
                key={mat.id} 
                className="relative min-h-[80vh] flex flex-col justify-center"
                onViewportEnter={() => setActiveMaterial(index)}
                viewport={{ margin: "-50% 0px -50% 0px" }}
              >
                 <div 
                   className={`relative p-8 md:p-12 border-l-2 pl-8 transition-colors duration-500 ${activeMaterial === index ? 'border-onyx' : 'border-onyx/10'}`}
                 >
                   <div className="absolute -top-12 -left-3 font-mono text-8xl text-onyx/5 font-bold select-none -z-10">
                     0{index + 1}
                   </div>

                   <h3 className={`text-4xl font-serif mb-6 transition-opacity duration-500 ${activeMaterial === index ? 'opacity-100' : 'opacity-30'}`}>
                    {mat.title}
                   </h3>
                   <p className="font-serif text-lg leading-relaxed text-onyx/70 mb-8 max-w-md">
                     {mat.description}
                   </p>

                   <div className="flex flex-wrap gap-3">
                     {mat.properties.map(prop => (
                       <span key={prop} className="px-3 py-1 border border-onyx/20 text-onyx text-[10px] uppercase tracking-widest font-mono">
                         {prop}
                       </span>
                     ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialScience;