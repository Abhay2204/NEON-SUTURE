import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import MagneticButton from './MagneticButton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove }) => {
  // Helper to parse price string "Rs. 24,500" -> 24500
  const getNumericPrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  };

  const total = items.reduce((acc, item) => acc + getNumericPrice(item.price), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0A0A0A] border-l border-white/10 z-[100] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10 bg-white/5">
              <div className="font-mono text-xs uppercase tracking-widest text-white/50">
                SYSTEM STORAGE // ({items.length})
              </div>
              <button onClick={onClose} className="text-white hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/30 font-mono text-sm text-center">
                  <p className="mb-2">STORAGE EMPTY</p>
                  <p>INITIATE ACQUISITION</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <motion.div 
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className="w-24 h-32 flex-shrink-0 overflow-hidden border border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-xl text-white">{item.name}</h4>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-white/30 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="font-mono text-xs text-white/50 mt-1">{item.collection}</p>
                      </div>
                      <div className="font-mono text-sm text-white">{item.price}</div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/10 bg-white/5 space-y-6">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-white/50">TOTAL ESTIMATE</span>
                <span className="font-serif text-3xl text-white">Rs. {total.toLocaleString()}</span>
              </div>
              <MagneticButton className="w-full py-4 bg-white text-black font-mono text-sm uppercase hover:bg-gainsboro transition-colors flex justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;