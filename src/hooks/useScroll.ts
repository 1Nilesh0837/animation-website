import { useEffect, useRef } from 'react';
import { useMotionValueEvent, useScroll as useFramerScroll } from 'framer-motion';

export const useScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useFramerScroll({
    container: scrollContainerRef,
  });

  return { scrollY, scrollYProgress, scrollContainerRef };
};

export const useScrollProgress = (callback: (progress: number) => void) => {
  const { scrollYProgress } = useFramerScroll();

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    callback(latest);
  });

  return scrollYProgress;
};
