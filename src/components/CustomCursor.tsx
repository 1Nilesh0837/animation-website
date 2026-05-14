import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

export const CustomCursor = () => {
  const mousePosition = useMousePosition();
  const [isVisible, setIsVisible] = useState(true);
  const [cursor, setCursor] = useState('default');
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsVisible(true);
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    
    idleTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.getAttribute('data-cursor')) {
        setCursor(target.getAttribute('data-cursor') || 'default');
      } else if (target.closest('a, button')) {
        setCursor('pointer');
      } else {
        setCursor('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Cursor halo/trailer */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Cursor label for interactive elements */}
      {cursor !== 'default' && (
        <motion.div
          className="fixed px-3 py-1 bg-white text-black text-xs font-semibold rounded-full pointer-events-none z-50"
          animate={{
            x: mousePosition.x + 20,
            y: mousePosition.y + 20,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {cursor}
        </motion.div>
      )}
    </>
  );
};