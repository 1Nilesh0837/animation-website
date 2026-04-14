"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Variant } from "@/data/variants";
import { cn } from "@/utils/cn";

interface NavProps {
  variants: Variant[];
  activeIdx: number;
  setActiveIdx: (idx: number) => void;
}

export const Navigation: React.FC<NavProps> = ({ variants, activeIdx, setActiveIdx }) => {
  const next = () => setActiveIdx((activeIdx + 1) % variants.length);
  const prev = () => setActiveIdx((activeIdx - 1 + variants.length) % variants.length);

  return (
    <>
      {/* Side Arrows */}
      <div className="fixed inset-y-0 left-8 z-[100] flex items-center">
        <button 
          onClick={prev}
          className="p-4 rounded-full border border-white/10 hover:bg-white/10 transition-colors group"
        >
          <ChevronLeft className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
        </button>
      </div>
      <div className="fixed inset-y-0 right-8 z-[100] flex items-center">
        <button 
          onClick={next}
          className="p-4 rounded-full border border-white/10 hover:bg-white/10 transition-colors group"
        >
          <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Bottom Pill Menu */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100]">
        <div className="glass px-2 py-2 rounded-full flex gap-1 items-center">
          {variants.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "relative px-6 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-500",
                activeIdx === i ? "text-black" : "text-white/40 hover:text-white/70"
              )}
            >
              {activeIdx === i && (
                <motion.div
                  layoutId="pill-bg"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {v.name.split(" & ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Top Brand Logo */}
      <div className="fixed top-12 left-12 z-[100]">
        <div className="uppercase tracking-[0.4em] text-sm font-playfair font-bold">
          Godrej <span className="text-white/40 font-light">No.1</span>
        </div>
      </div>
    </>
  );
};
