import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { KineticScene } from '../webgl/KineticScene';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const HERO_TEXT = 'Creative Developer & ML Engineer';
const KEYWORDS = ['ML Engineer', 'React Developer', 'Creative Coder', 'Open to Work'];

export const HeroSection = () => {
  const scrollPosition = useScrollPosition();
  const textRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Letter-by-letter scramble reveal
    const letters = textRef.current.querySelectorAll('span');
    letters.forEach((letter, index) => {
      gsap.fromTo(
        letter,
        {
          text: '@#$%&*',
          opacity: 0,
        },
        {
          text: letter.textContent,
          opacity: 1,
          duration: 0.3,
          delay: index * 0.05,
          ease: 'power2.out',
        }
      );
    });
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* 3D Kinetic Scene Background */}
      <div className="absolute inset-0 z-0">
        <KineticScene />
      </div>

      {/* Parallax overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950 z-10"
        style={{
          y: scrollPosition * 0.6,
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          ref={textRef}
          className="text-6xl md:text-7xl font-bold mb-8 font-space-grotesk tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {HERO_TEXT.split('').map((char, i) => (
            <span key={i} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </motion.div>

        {/* Marquee Ticker */}
        <div className="relative h-12 overflow-hidden mb-12" ref={marqueeRef}>
          <motion.div
            className="flex gap-8 whitespace-nowrap text-lg text-gray-400"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...KEYWORDS, ...KEYWORDS].map((keyword, i) => (
              <span key={i} className="font-medium">
                {keyword} ·
              </span>
            ))}
          </motion.div>
        </div>

        {/* CTA Button with Magnetic Effect */}
        <MagneticButton />
      </div>
    </section>
  );
};

const MagneticButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { x: mouseX, y: mouseY } = { x: 0, y: 0 }; // You'd use useMousePosition here

  return (
    <motion.button
      ref={buttonRef}
      className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:shadow-2xl transition-all data-cursor='view'"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-cursor="view"
    >
      Explore My Work
    </motion.button>
  );
};