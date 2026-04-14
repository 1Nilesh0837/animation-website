"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Variant } from "@/data/variants";
import { ShoppingBag, Truck, RefreshCw } from "lucide-react";

interface ProductInfoProps {
  variant: Variant;
  onNext: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ variant, onNext }) => {
  return (
    <div className="relative z-40 bg-black">
      {/* 100% Natural Stats Section */}
      <section className="py-32 px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {Object.entries(variant.stats).map(([label, value], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl font-playfair font-bold mb-2" style={{ color: variant.themeColor }}>
                {value}
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deep Details Section */}
      <section className="py-32 px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-playfair text-5xl mb-8 leading-tight">{variant.details.title}</h3>
            <p className="text-lg text-white/60 leading-relaxed mb-12">
              {variant.details.description}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {variant.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: variant.themeColor }} />
                  {f}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square relative rounded-2xl overflow-hidden glass group"
          >
             <div className="absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity group-hover:opacity-40" style={{ background: variant.gradient }} />
             <AnimatePresence mode="wait">
               <motion.div 
                 key={variant.id}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 transition={{ duration: 0.6, ease: "easeInOut" }}
                 className="absolute inset-0 flex items-center justify-center p-12"
               >
                 <div className="relative w-full h-full flex items-center justify-center">
                   <img 
                     src={variant.soapImage} 
                     alt={variant.details.imageAlt} 
                     className="w-[120%] h-[120%] max-w-none object-contain drop-shadow-2xl"
                   />
                 </div>
               </motion.div>
             </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Freshness Info */}
      <section className="py-32 px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-playfair text-4xl mb-6">{variant.freshness.title}</h3>
            <p className="text-lg text-white/50 leading-relaxed">
              {variant.freshness.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Buy Now Section */}
      <section className="py-48 px-12 border-t border-white/10 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="glass p-16 rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8">
              <div className="text-7xl font-playfair font-bold opacity-10" style={{ color: variant.themeColor }}>
                ₹{variant.price}
              </div>
            </div>

            <div className="relative z-10">
              <h2 className="text-6xl font-playfair font-bold mb-4">{variant.name}</h2>
              <p className="text-white/40 uppercase tracking-widest text-sm mb-12">{variant.unit}</p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {variant.buyNow.params.map(p => (
                  <span key={p} className="px-6 py-2 rounded-full border border-white/10 text-xs font-light">
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
                <button 
                  className="group relative px-12 py-6 rounded-full overflow-hidden transition-transform active:scale-95"
                  style={{ background: variant.gradient }}
                >
                  <span className="relative z-10 font-bold tracking-widest flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    ADD TO CART
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <Truck className="w-5 h-5 text-white/30 shrink-0" />
                  <p className="text-xs text-white/40 leading-relaxed">{variant.buyNow.delivery}</p>
                </div>
                <div className="flex gap-4">
                  <RefreshCw className="w-5 h-5 text-white/30 shrink-0" />
                  <p className="text-xs text-white/40 leading-relaxed">{variant.buyNow.returnInfo}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-32">
            <button 
              onClick={onNext}
              className="group flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity"
            >
              <div className="text-xs tracking-[0.4em] uppercase">Up Next</div>
              <div className="text-3xl font-playfair italic">Discover More Nature</div>
              <div className="w-12 h-[1px] bg-white transition-all group-hover:w-24 mt-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
