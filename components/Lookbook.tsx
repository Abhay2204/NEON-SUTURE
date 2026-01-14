import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Product } from '../types';

// Expanded to full Product objects for shoppability
const LOOKBOOK_PRODUCTS: (Product & { span: string })[] = [
  { 
    id: 'L01', 
    name: 'ASYMMETRIC COAT', 
    price: 'Rs. 9,499',
    collection: 'CAMPAIGN // 01',
    description: 'Oversized structured coat with asymmetric lapels.',
    details: ['Wool Blend', 'Oversized', 'Raw Hems'],
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-6 md:col-span-3' 
  },
  { 
    id: 'L02', 
    name: 'SILK TUNIC', 
    price: 'Rs. 4,200',
    collection: 'CAMPAIGN // 01',
    description: 'Sheer silk tunic with elongated cuffs.',
    details: ['100% Silk', 'Sheer', 'Elongated Cuffs'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-6 md:col-span-3 md:mt-12' 
  }, 
  { 
    id: 'L03', 
    name: 'TECH BLAZER', 
    price: 'Rs. 7,800',
    collection: 'CAMPAIGN // 01',
    description: 'Technical blazer with modular pocket system.',
    details: ['Nylon', 'Water Resistant', 'Modular'],
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-6 md:col-span-3' 
  },
  { 
    id: 'L04', 
    name: 'MESH LAYER', 
    price: 'Rs. 3,100',
    collection: 'CAMPAIGN // 01',
    description: 'Breathable mesh layer for thermal regulation.',
    details: ['Polyester Mesh', 'Breathable', 'Base Layer'],
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-6 md:col-span-3 md:mt-24' 
  },
  { 
    id: 'L05', 
    name: 'WRAP DRESS', 
    price: 'Rs. 6,500',
    collection: 'CAMPAIGN // 01',
    description: 'Architectural wrap dress with metallic accents.',
    details: ['Cotton', 'Metallic Thread', 'Wrap Closure'],
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1000&auto=format&fit=crop', // Updated: Dark moody fashion
    span: 'col-span-6 md:col-span-3' 
  },
  { 
    id: 'L06', 
    name: 'BONDED PARKA', 
    price: 'Rs. 12,000',
    collection: 'CAMPAIGN // 01',
    description: 'Heavy duty parka with bonded seams.',
    details: ['Gore-tex', 'Waterproof', 'Insulated'],
    image: 'https://images.unsplash.com/photo-1559582930-bb01987cf4dd?q=80&w=1000&auto=format&fit=crop', 
    span: 'col-span-6 md:col-span-3 md:mt-12' 
  },
  { 
    id: 'L07', 
    name: 'PLEATED SKIRT', 
    price: 'Rs. 5,200',
    collection: 'CAMPAIGN // 01',
    description: 'Asymmetric pleated skirt in technical fabric.',
    details: ['Polyester', 'Pleated', 'Asymmetric'],
    image: 'https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-6 md:col-span-3' 
  },
  { 
    id: 'L08', 
    name: 'UTILITY VEST', 
    price: 'Rs. 4,900',
    collection: 'CAMPAIGN // 01',
    description: 'Utility vest with multiple cargo pockets.',
    details: ['Canvas', 'Cargo Pockets', 'Utility'],
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-6 md:col-span-3 md:mt-6' 
  },
];

interface LensCardProps {
  product: Product & { span: string };
  onClick: (product: Product) => void;
}

const LensCard: React.FC<LensCardProps> = ({ product, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Keep the subtle scale parallax, but REMOVE blur so we can see the image
  // We will handle grayscale -> color via CSS group-hover
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <div ref={ref} className={`relative group ${product.span}`}>
      {/* Aspect Ratio 2:3 for Fashion Portrait */}
      <motion.div 
        style={{ scale }}
        className="aspect-[2/3] w-full relative overflow-hidden bg-onyx cursor-pointer"
        onClick={() => onClick(product)}
      >
        <motion.img 
          src={product.image} 
          className="w-full h-full object-cover will-change-transform filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        
        {/* Reflection Glare */}
        <motion.div 
          style={{ 
            top: useTransform(scrollYProgress, [0, 1], ["-100%", "200%"]),
            opacity: useTransform(scrollYProgress, [0.4, 0.6], [0.3, 0])
          }}
          className="absolute left-0 right-0 h-[20%] bg-gradient-to-b from-transparent via-white/10 to-transparent skew-y-12 pointer-events-none z-10"
        />

        {/* HOVER OVERLAY: Price & Details (Shoppable UI) */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 backdrop-blur-[2px]">
           <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-serif text-2xl text-white italic">{product.name}</h3>
                 <span className="font-mono text-sm text-white/90">{product.price}</span>
              </div>
              <p className="font-mono text-xs text-white/50 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white border border-white/30 px-3 py-1 bg-white/5">
                   VIEW ITEM
                </span>
              </div>
           </div>
        </div>

        {/* Micro UI Elements (Visible when not hovering, fade out on hover) */}
        <div className="absolute top-2 right-2 flex gap-1 group-hover:opacity-0 transition-opacity">
            <div className="w-1 h-1 bg-white/50 rounded-full" />
            <div className="w-1 h-1 bg-white/20 rounded-full" />
        </div>
        <div className="absolute bottom-4 left-4 group-hover:opacity-0 transition-opacity">
            <div className="font-mono text-[9px] text-white/50 bg-black/60 backdrop-blur-md px-2 py-1 border border-white/10">
              REF_{product.id} // RAW
            </div>
        </div>

      </motion.div>
    </div>
  );
};

interface LookbookProps {
  onProductSelect: (product: Product) => void;
}

const Lookbook: React.FC<LookbookProps> = ({ onProductSelect }) => {
  return (
    <section className="relative bg-onyx py-32 px-4 md:px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
           <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-serif text-white/90 leading-none mb-4">
                SUTURE CAMPAIGN
              </h2>
              <p className="font-mono text-xs text-white/50 tracking-widest uppercase">
                FW24 // SYSTEM SIMULATIONS
              </p>
           </div>
           <div className="text-right mt-8 md:mt-0">
             <SectionHeading 
               number="04" 
               title="VISUAL DATA" 
               subtitle="The ghost in the machine."
               light
             />
           </div>
        </div>

        {/* Dense Editorial Grid - 4 Columns */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-min">
          {LOOKBOOK_PRODUCTS.map((product) => (
             <LensCard key={product.id} product={product} onClick={onProductSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lookbook;