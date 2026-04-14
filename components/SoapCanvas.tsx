"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface SoapCanvasProps {
  themeColor: string;
  folderPath?: string;
  frameCount?: number;
}

const SoapCanvas: React.FC<SoapCanvasProps> = ({ themeColor, folderPath, frameCount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalFrames = frameCount ?? 194;
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const pad = (n: number) => String(n).padStart(3, "0");
      img.src = folderPath
        ? `${folderPath}/ezgif-frame-${pad(i)}.png`
        : `/images/tulsi/soap/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        count++;
        setLoadedCount(count);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [folderPath, totalFrames]);

  // Frame rendering logic
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const currentFrame = Math.round(frameIndex.get());
      const img = images[currentFrame];

      if (img && img.complete) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Responsive contain fit
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        let drawW, drawH, drawX, drawY;

        if (canvasAspect > imgAspect) {
          drawH = canvas.height;
          drawW = drawH * imgAspect;
          drawX = (canvas.width - drawW) / 2;
          drawY = 0;
        } else {
          drawW = canvas.width;
          drawH = drawW / imgAspect;
          drawX = 0;
          drawY = (canvas.height - drawH) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
      requestAnimationFrame(render);
    };

    const requestId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(requestId);
  }, [images, frameIndex]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Loading Progress */}
      {loadedCount < totalFrames && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] font-light mb-4 text-white/40"
          >
            Crafting Purity
          </motion.div>
          <div className="w-48 h-[1px] bg-white/10 relative">
            <motion.div 
              className="absolute h-full left-0 top-0 bg-white"
              style={{ width: `${(loadedCount / totalFrames) * 100}%` }}
            />
          </div>
          <div className="mt-4 text-[10px] font-mono text-white/20">
            {Math.round((loadedCount / totalFrames) * 100)}%
          </div>
        </div>
      )}

      {/* The Soap Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "contain",
        }}
        className="z-10"
      />

      {/* Theme Tint Overlay */}
      <motion.div
        key={themeColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ 
          backgroundColor: themeColor,
          mixBlendMode: "multiply" as any // "multiply" or "color" works well to tint white soap
        }}
      />
      
      {/* Secondary Soft Overlay for Depth */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60"
      />
    </div>
  );
};

export default SoapCanvas;
