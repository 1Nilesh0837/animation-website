import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SKILLS = [
  { name: 'Machine Learning', level: 90 },
  { name: 'React & Frontend', level: 95 },
  { name: 'TypeScript', level: 92 },
  { name: '3D Graphics (Three.js)', level: 85 },
  { name: 'Full-Stack Development', level: 88 },
];

const CARDS = [
  {
    id: 1,
    title: 'ML Engineer',
    description: 'Building intelligent systems with deep learning and computer vision',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    title: 'React Developer',
    description: 'Creating interactive and performant web applications',
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 3,
    title: 'Creative Technologist',
    description: 'Merging art and technology for immersive experiences',
    color: 'from-amber-600 to-orange-500',
  },
];

export const AboutSection = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3 });

  const handleDragEnd = (e: { delta: { x: number } }) => {
    if (e.delta.x < -50) {
      setCurrentCard((prev) => (prev + 1) % CARDS.length);
    } else if (e.delta.x > 50) {
      setCurrentCard((prev) => (prev - 1 + CARDS.length) % CARDS.length);
    }
  };

  return (
    <section ref={ref} className="relative w-full min-h-screen bg-slate-950 py-20 overflow-hidden">
      {/* Background Image with Mix Blend */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-exclusion opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">About Me</h2>

        {/* Draggable Card Stack */}
        <div className="relative h-96 mb-20">
          {CARDS.map((card, index) => {
            const isActive = index === currentCard;
            const offset = index - currentCard;
            const isNext = offset === 1;

            return (
              <motion.div
                key={card.id}
                drag
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{
                  opacity: isActive ? 1 : isNext ? 0.1 : 0,
                  scale: isActive ? 1 : 0.9,
                  y: isActive ? 0 : 50,
                  zIndex: CARDS.length - Math.abs(offset),
                }}
                className="absolute w-full h-full cursor-grab active:cursor-grabbing"
              >
                <div
                  className={`h-full rounded-2xl p-8 bg-gradient-to-br ${card.color} flex flex-col justify-between text-white shadow-2xl`}
                >
                  {/* Ghost preview of next card */}
                  {isActive && isNext && (
                    <motion.div
                      className="absolute inset-4 rounded-xl border-2 border-white/20 opacity-10 pointer-events-none"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}

                  <div>
                    <h3 className="text-4xl font-bold mb-4">{card.title}</h3>
                    <p className="text-lg text-white/90">{card.description}</p>
                  </div>

                  {/* Haptic feedback tint on drag */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-4 border-green-400 pointer-events-none"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Card Navigation Dots */}
        <div className="flex justify-center gap-3 mb-20">
          {CARDS.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentCard(index)}
              className={`w-3 h-3 rounded-full transition ${index === currentCard ? 'bg-white' : 'bg-gray-600'}`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Skill Bars */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold mb-8">Skills & Expertise</h3>
          {SKILLS.map((skill) => (
            <motion.div key={skill.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="flex justify-between mb-2">
                <span className="text-lg font-semibold">{skill.name}</span>
                <span className="text-gray-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};