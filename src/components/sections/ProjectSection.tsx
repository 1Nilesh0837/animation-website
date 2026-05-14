import { useRef } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'AI Safety Detection System',
    description: 'Real-time detection of safety equipment and hazards using YOLO',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4',
    tags: ['Computer Vision', 'YOLO', 'Python'],
  },
  {
    id: 2,
    title: 'MLOps Pipeline',
    description: 'End-to-end machine learning operations with monitoring',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    tags: ['MLOps', 'Docker', 'Kubernetes'],
  },
  {
    id: 3,
    title: 'Interactive Web Experience',
    description: 'Premium animated portfolio with 3D graphics',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    tags: ['React', 'Three.js', 'Framer Motion'],
  },
];

export const ProjectSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const { scrollY } = useViewportScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="relative w-full min-h-screen bg-slate-950 py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">Featured Projects</h2>

        {/* Progress Indicator */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
          {PROJECTS.map((_, index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full bg-gray-600"
              animate={{ scale: index === 0 ? 1.5 : 1, backgroundColor: index === 0 ? '#fff' : '#4b5563' }}
            />
          ))}
        </div>

        {/* Projects Container */}
        <div ref={containerRef} className="space-y-32">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} scrollY={scrollY} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
  index: number;
  scrollY: any;
}

const ProjectCard = ({ project, index, scrollY }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const rotate = useTransform(() => (index % 2 === 0 ? 5 : -5));

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative group"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Project Card */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
        <div className="relative h-64 md:h-80 overflow-hidden">
          {/* Image */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovering ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Hover Video Preview */}
          {isHovering && project.video && (
            <motion.video
              src={project.video}
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            animate={{ opacity: isHovering ? 0.6 : 0 }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-6">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          {/* Magnetic CTA Button */}
          <MagneticCTA />
        </div>
      </div>
    </motion.div>
  );
};

const MagneticCTA = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      ref={buttonRef}
      className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:shadow-lg transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      View Case Study
      <ExternalLink size={16} />
    </motion.button>
  );
};

import React from 'react';