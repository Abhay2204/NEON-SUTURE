import React, { useState } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence,
  MotionValue
} from 'framer-motion';
import { Menu, ArrowRight, X, ArrowDown, ShoppingBag } from 'lucide-react';
import MagneticButton from './components/MagneticButton';
import CollectionArchive from './components/CollectionArchive';
import MaterialScience from './components/MaterialScience';
import Lookbook from './components/Lookbook';
import YearEndSale from './components/YearEndSale';
import CartDrawer from './components/CartDrawer';
import { Product } from './types';

// --- DATA (Main Product Grid - "The Core") ---
// Updated: Carbon Cargo image fixed
const PRODUCTS: Product[] = [
  {
    id: '01',
    name: 'VOID TRENCH',
    collection: 'FW24 // SUTURE',
    price: 'Rs. 8,499',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop', 
    description: 'Constructed from Japanese technical nylon with memory-wire shaping. Features a detachable spinal guard and magnetic closure system.',
    details: ['Water-resistant Technical Nylon', 'Memory Wire Collar', 'Hidden Magnetic Clasps', 'Made in Italy']
  },
  {
    id: '02',
    name: 'ONYX SHELL',
    collection: 'FW24 // SUTURE',
    price: 'Rs. 6,999',
    image: 'https://images.unsplash.com/photo-1512353087810-25dfcd100962?q=80&w=1000&auto=format&fit=crop', 
    description: 'Semi-translucent bomber silhouette. Bonded seams and liquid-latex finish for extreme weather resistance and editorial sheen.',
    details: ['Translucent Bonded Polymer', 'Liquid Latex Finish', 'Oversized Fit', 'Cold-dyed Onyx']
  },
  {
    id: '03',
    name: 'KINETIC KNIT',
    collection: 'FW24 // SUTURE',
    price: 'Rs. 3,299',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop', 
    description: 'Heavyweight gauge wool blend with articulated elbows. Designed to stretch and recover based on wearer velocity.',
    details: ['Heavy Gauge Wool', 'Articulated Sleeves', 'Drop Shoulder', 'Elongated Cuffs']
  },
  {
    id: '04',
    name: 'CARBON CARGO',
    collection: 'FW24 // SUTURE',
    price: 'Rs. 5,499',
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000&auto=format&fit=crop', 
    description: 'Modular trousers with magnetic pockets and reinforced knee panels. Fabricated from abrasion-resistant carbon weave.',
    details: ['Carbon Weave', 'Magnetic Pockets', 'Reinforced Knees', 'Tapered Fit']
  }
];

// --- SHARED COMPONENTS ---

// Navigation (Glassmorphic)
const Navigation = ({ onOpenCart, cartCount }: { onOpenCart: () => void, cartCount: number }) => (
  <motion.nav 
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference text-gainsboro pointer-events-none"
  >
    <div className="pointer-events-auto">
      <h1 className="text-2xl font-serif font-bold tracking-tighter">NEON-SUTURE</h1>
    </div>
    <div className="pointer-events-auto flex items-center gap-8">
      <MagneticButton className="hidden md:block font-mono text-xs uppercase tracking-widest hover:text-white/70">
        Collection
      </MagneticButton>
      <MagneticButton className="hidden md:block font-mono text-xs uppercase tracking-widest hover:text-white/70">
        Archives
      </MagneticButton>
      
      {/* Cart Button */}
      <MagneticButton onClick={onOpenCart}>
        <div className="relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5">
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center border border-black">
              {cartCount}
            </div>
          )}
        </div>
      </MagneticButton>

      <MagneticButton>
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5">
          <Menu size={20} />
        </div>
      </MagneticButton>
    </div>
  </motion.nav>
);

// Parallax Background Layer
const ParallaxBackground = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.1, 0]);

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative whitespace-nowrap">
        <h1 className="text-[20vw] font-serif leading-none text-white/5 opacity-50 select-none">
          SUTURE
        </h1>
      </motion.div>
    </div>
  );
};

// Sliced Image Background Component
const SlicedImageBackground = () => {
  const slices = 6; // Number of vertical slices
  const variants = {
    hidden: (i: number) => ({
      y: i % 2 === 0 ? '-100%' : '100%',
    }),
    visible: (i: number) => ({
      y: '0%',
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.1,
      }
    })
  };

  return (
    <div className="absolute inset-0 flex pointer-events-none">
      {[...Array(slices)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="relative h-full flex-1 overflow-hidden"
        >
          <div 
             className="absolute top-0 h-full max-w-none"
             style={{ 
               width: '100vw',
               left: `-${i * (100 / slices)}vw` 
             }}
          >
             <img 
               src="https://images.unsplash.com/photo-1536924430914-91f9e2041b83?q=80&w=2788&auto=format&fit=crop"
               alt="Hero Background"
               className="w-full h-full object-cover filter grayscale contrast-125"
             />
             <div className="absolute inset-0 bg-black/30" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.5]);
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const filter = useTransform(scrollY, [0, 500], ["brightness(1) blur(0px)", "brightness(0.6) blur(10px)"]);

  return (
    <motion.section 
      style={{ scale, opacity, y, filter }}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10 bg-onyx"
    >
      {/* Sliced Background Animation */}
      <SlicedImageBackground />

      <div className="relative z-20 text-center mix-blend-difference">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          className="text-8xl md:text-[12rem] font-serif leading-none tracking-tighter text-white"
        >
          SUTURE
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-8 flex justify-center gap-12 font-mono text-xs uppercase tracking-[0.3em] text-white"
        >
          <span>Est. 2024</span>
          <span>Editorial Glass</span>
          <span>System 01</span>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ArrowDown size={24} />
      </motion.div>
    </motion.section>
  );
};

// Product Overlay
const ProductOverlay = ({ 
  product, 
  onClose, 
  onAddToCart 
}: { 
  product: Product | null, 
  onClose: () => void,
  onAddToCart: (product: Product) => void
}) => {
  return (
    <AnimatePresence>
      {product && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-onyx/90 backdrop-blur-2xl"
          onClick={onClose}
        >
          <div className="relative w-full h-full md:w-[90%] md:h-[90%] bg-black overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 text-white mix-blend-difference p-2 hover:opacity-50 transition-opacity"
            >
              <X size={32} />
            </button>
            <div className="w-full md:w-1/2 h-[50%] md:h-full relative overflow-hidden bg-gray-900">
               <motion.img 
                layoutId={`product-image-${product.id}`}
                src={product.image} 
                alt={product.name}
                // Removed filter grayscale so overlay shows color
                className="w-full h-full object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"
              />
            </div>
            <div className="w-full md:w-1/2 h-[50%] md:h-full p-8 md:p-20 flex flex-col justify-center bg-[#0a0a0a]">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
                  <span className="font-mono text-xs text-white/50">{product.collection}</span>
                  <span className="font-mono text-xl text-white">{product.price}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif font-light text-white mb-6 tracking-tight">
                  {product.name}
                </h2>
                <p className="font-serif text-lg md:text-xl text-white/70 mb-12 leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {product.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white/40 font-mono text-xs uppercase">
                      <div className="w-1 h-1 bg-white/40 rounded-full" />
                      {detail}
                    </div>
                  ))}
                </div>
                <MagneticButton 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full md:w-auto px-8 py-4 border border-white/20 text-white font-mono text-sm uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-4 group"
                >
                  Add to Cart
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main App Layout
const App = () => {
  // Store full product object instead of just ID to support diverse sources
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  const { scrollYProgress } = useScroll();

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="bg-onyx text-gainsboro min-h-screen selection:bg-white selection:text-black">
      <Navigation onOpenCart={() => setIsCartOpen(true)} cartCount={cartItems.length} />
      
      <ParallaxBackground scrollYProgress={scrollYProgress} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart} 
      />

      <motion.main className="relative z-10 w-full origin-center">
        
        {/* SECTION 1: HERO */}
        <Hero />

        {/* SECTION 2: COLLECTION ARCHIVE (Horizontal Scroll) */}
        <CollectionArchive />
        
        {/* SECTION 3: YEAR END SALE */}
        <YearEndSale />

        {/* SECTION 4: THE CORE COLLECTION (Original Grid) */}
        <section className="relative z-20 bg-onyx py-32 px-4 md:px-12 border-t border-white/10">
           {/* Grid Intro */}
           <div className="max-w-[1600px] mx-auto mb-24 flex flex-col md:flex-row justify-between items-end pb-8 border-b border-white/10">
              <h2 className="text-4xl md:text-6xl font-serif text-white max-w-xl leading-tight">
                Architectural silhouettes.
              </h2>
              <div className="mt-8 md:mt-0 font-mono text-xs text-white/50 text-right">
                <p>SYSTEM 01</p>
                <p>CORE ITEMS</p>
              </div>
           </div>

           {/* The Invisible Grid - 12 Columns */}
           <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-32 gap-x-8">
              {PRODUCTS.map((product, index) => (
                <div 
                  key={product.id}
                  className={`relative group ${
                    index % 2 === 0 
                      ? 'md:col-span-5 md:col-start-1 lg:col-span-3 lg:col-start-3' 
                      : 'md:col-span-5 md:col-start-7 lg:col-span-3 lg:col-start-8 md:mt-32'
                  }`}
                >
                  <motion.div
                    layoutId={`product-card-${product.id}`}
                    onClick={() => setSelectedProduct(product)}
                    className="cursor-none md:cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-900">
                      <motion.img 
                        layoutId={`product-image-${product.id}`}
                        src={product.image}
                        alt={product.name}
                        // Updated hover effect: Grayscale -> Color (no blur)
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                         <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-white">
                           VIEW ASSET
                         </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-start border-t border-white/10 pt-4">
                      <div>
                        <h3 className="text-2xl font-serif text-white mb-1 group-hover:italic transition-all">{product.name}</h3>
                        <p className="font-mono text-xs text-white/50">{product.collection}</p>
                      </div>
                      <span className="font-mono text-sm text-white">{product.price}</span>
                    </div>
                  </motion.div>
                </div>
              ))}
           </div>
        </section>

        {/* SECTION 5: MATERIAL SCIENCE (Sticky Split) */}
        <MaterialScience />

        {/* SECTION 6: LOOKBOOK (Masonry + Lens) */}
        <Lookbook onProductSelect={setSelectedProduct} />

        {/* FOOTER */}
        <footer className="relative z-20 bg-black border-t border-white/10 pt-24 pb-12 px-6 md:px-24">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
              
              {/* Brand Column */}
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-serif text-white tracking-tighter">NEON-SUTURE</h3>
                <p className="font-mono text-xs text-white/40 leading-relaxed max-w-xs">
                  Redefining the boundaries between organic form and technical function. A study in post-modern armor.
                </p>
                <div className="mt-4">
                   <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-2">Global Headquarters</h4>
                   <p className="font-serif text-white/60 text-sm">
                     800 Traction Ave<br/>
                     Arts District<br/>
                     Los Angeles, CA 90013
                   </p>
                </div>
                <div className="mt-auto">
                   <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                     EST. 2024 — SYSTEM 01
                   </div>
                </div>
              </div>

              {/* Client Services */}
              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-xs text-white/60 uppercase tracking-widest mb-4">Client Services</h4>
                {['Shipping & Returns', 'Size Guide', 'Garment Care', 'Track Order', 'FAQ'].map((link) => (
                  <a key={link} href="#" className="font-serif text-lg text-white/60 hover:text-white hover:italic transition-all">
                    {link}
                  </a>
                ))}
                <div className="mt-4">
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">Concierge</p>
                  <p className="font-serif text-white/60 text-lg">+1 (213) 555-0199</p>
                </div>
              </div>

              {/* Legal & Info */}
              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-xs text-white/60 uppercase tracking-widest mb-4">Legal & Corporate</h4>
                {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Careers', 'Press Inquiries'].map((link) => (
                  <a key={link} href="#" className="font-serif text-lg text-white/60 hover:text-white hover:italic transition-all">
                    {link}
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-xs text-white/60 uppercase tracking-widest mb-4">System Updates</h4>
                <p className="font-mono text-xs text-white/40 mb-4">
                  Subscribe to receive notifications about new protocols and archive releases.
                </p>
                <div className="flex border-b border-white/20 pb-2">
                  <input 
                    type="email" 
                    placeholder="ENTER EMAIL" 
                    className="bg-transparent border-none outline-none text-white font-mono text-sm w-full placeholder:text-white/20"
                  />
                  <button className="text-white hover:text-white/50 transition-colors uppercase font-mono text-xs">
                    Join
                  </button>
                </div>
                <div className="flex gap-4 mt-8">
                  {['INSTAGRAM', 'TWITTER', 'ARE.NA'].map((social) => (
                     <a key={social} href="#" className="font-mono text-[10px] text-white/40 hover:text-white transition-colors border border-white/10 px-2 py-1">
                       {social}
                     </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8">
               <h2 className="text-[10vw] md:text-[8vw] font-serif leading-none text-white/5 select-none pointer-events-none">
                 FUTURE
               </h2>
               <div className="font-mono text-[10px] text-white/30 text-right mt-4 md:mt-0">
                 © 2024 NEON-SUTURE INC. <br/>
                 ALL RIGHTS RESERVED.
               </div>
            </div>
          </div>
        </footer>

      </motion.main>

      <ProductOverlay 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default App;