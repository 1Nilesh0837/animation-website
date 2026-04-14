"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Variant } from "@/data/variants";

interface SectionOverlayProps {
  section: { title: string; subtitle: string };
  index: number;
}

export const SectionOverlay: React.FC<SectionOverlayProps> = ({ section, index }) => {
  const { scrollYProgress } = useScroll();
  
  // Define scroll range for each section (4 sections over 0 to 1)
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    scrollYProgress,
    [start, mid - 0.05, mid + 0.05, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [50, 0, -50]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-30"
    >
      <h2 className="font-playfair text-6xl md:text-8xl mb-6 font-bold leading-tight">
        {section.title}
      </h2>
      <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light tracking-wide">
        {section.subtitle}
      </p>
    </motion.div>
  );
};
