import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const KingdomSection = () => {
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        pin: true,
      },
    });

    // Door opening animation
    tl.to(
      leftDoorRef.current,
      {
        rotationY: -105,
        duration: 2,
        ease: 'power3.inOut',
      },
      0
    ).to(
      rightDoorRef.current,
      {
        rotationY: 105,
        duration: 2,
        ease: 'power3.inOut',
      },
      0
    );

    // Shadow animation
    tl.to(
      contentRef.current,
      {
        boxShadow: '0 0 100px rgba(0, 0, 0, 0.8)',
        duration: 2,
      },
      0
    );

    // Shake effect at start
    gsap.to([leftDoorRef.current, rightDoorRef.current], {
      x: gsap.utils.unitize(5),
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top center',
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      <div ref={contentRef} className="relative w-full h-full flex items-center justify-center perspective">
        <div className="relative w-full max-w-4xl h-full mx-auto flex items-center justify-center" style={{ perspective: '1000px' }}>
          {/* Left Door */}
          <motion.div
            ref={leftDoorRef}
            className="absolute left-0 w-1/2 h-full bg-gradient-to-r from-purple-900 to-transparent flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <svg className="w-24 h-24 text-purple-300" fill="none" viewBox="0 0 100 100">
              {/* Car SVG Doodle */}
              <motion.path
                d="M20 60 Q50 40 80 60 L80 80 Q50 90 20 80 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                whileInView={{ strokeDashoffset: 0 }}
                transition={{ duration: 2 }}
              />
              <motion.circle cx="35" cy="80" r="5" fill="currentColor" />
              <motion.circle cx="65" cy="80" r="5" fill="currentColor" />
            </svg>
          </motion.div>

          {/* Right Door */}
          <motion.div
            ref={rightDoorRef}
            className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-purple-900 to-transparent flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <svg className="w-24 h-24 text-purple-300" fill="none" viewBox="0 0 100 100">
              {/* Crown SVG Doodle */}
              <motion.path
                d="M20 70 L30 40 L50 30 L70 40 L80 70 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                whileInView={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, delay: 0.2 }}
              />
              <motion.circle cx="50" cy="20" r="3" fill="currentColor" />
            </svg>
          </motion.div>

          {/* Center Content - Hidden initially */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-center z-10 bg-gradient-to-b from-purple-900/50 to-slate-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white">Beyond the Doors</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Innovative solutions crafted with precision and creativity
              </p>
            </div>
          </motion.div>

          {/* Particle Burst */}
          <ParticleBurst />
        </div>
      </div>
    </section>
  );
};

const ParticleBurst = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * Math.PI * 2,
    distance: 100,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            x: Math.cos(particle.angle) * particle.distance,
            y: Math.sin(particle.angle) * particle.distance,
          }}
          transition={{
            duration: 1.5,
            delay: 1.5,
            ease: 'easeOut',
          }}
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-2px',
            marginTop: '-2px',
          }}
        />
      ))}
    </div>
  );
};