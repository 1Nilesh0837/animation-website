"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { variants } from "@/data/variants";
import SoapCanvas from "@/components/SoapCanvas";
import { SectionOverlay } from "@/components/SectionOverlay";
import { Navigation } from "@/components/Navigation";
import { ProductInfo } from "@/components/ProductInfo";

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeVariant = variants[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % variants.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to top on variant change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeIdx]);

  return (
    <main className="relative bg-black min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVariant.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Scrollytelling Section */}
          <div className="relative h-[600vh] mb-[20vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
              <SoapCanvas themeColor={activeVariant.themeColor} folderPath={activeVariant.folderPath} frameCount={activeVariant.frameCount} />
              
              {/* Overlays */}
              {activeVariant.sections.map((section, i) => (
                <SectionOverlay key={i} index={i} section={section} />
              ))}
            </div>
          </div>

          {/* Reveal Content */}
          <ProductInfo variant={activeVariant} onNext={handleNext} />
        </motion.div>
      </AnimatePresence>

      <Navigation 
        variants={variants} 
        activeIdx={activeIdx} 
        setActiveIdx={setActiveIdx} 
      />
    </main>
  );
}
