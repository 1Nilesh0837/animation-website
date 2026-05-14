import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X } from 'lucide-react';
import { useTextureContext } from '../context/TextureContext';

const THEMES = [
  { name: 'default', color: '#06b6d4' },
  { name: 'purple', color: '#a855f7' },
  { name: 'orange', color: '#f97316' },
  { name: 'pink', color: '#ec4899' },
];

export const ControlPanel = () => {
  const { speed, setSpeed, theme, setTheme } = useTextureContext();
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);

  // Calculate FPS
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFps);
    };

    measureFps();
  }, []);

  // Keyboard shortcut for panel toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white text-black hover:shadow-2xl transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="open"
      >
        <Settings size={24} />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-8 right-24 z-50 w-72 bg-slate-900 border border-gray-700 rounded-2xl p-6 backdrop-blur-lg shadow-2xl"
            initial={{ opacity: 0, y: 20, blur: 10 }}
            animate={{ opacity: 1, y: 0, blur: 0 }}
            exit={{ opacity: 0, y: 20, blur: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold mb-6">Control Panel</h3>

            {/* FPS Counter */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">FPS</span>
                <span className="text-sm font-semibold text-cyan-400">{fps}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  animate={{ width: `${Math.min(fps, 120) / 120 * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Speed Control */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Animation Speed</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0.5x</span>
                <span className="font-semibold text-white">{speed.toFixed(1)}x</span>
                <span>2x</span>
              </div>
            </div>

            {/* Theme Picker */}
            <div>
              <label className="block text-sm font-semibold mb-3">Theme Color</label>
              <div className="grid grid-cols-4 gap-3">
                {THEMES.map((t) => (
                  <motion.button
                    key={t.name}
                    onClick={() => setTheme(t.name)}
                    className={`w-full h-10 rounded-lg transition ${
                      theme === t.name ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''
                    }`}
                    style={{
                      backgroundColor: t.color,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </div>

            {/* Keyboard Shortcut Hint */}
            <div className="mt-6 pt-6 border-t border-gray-700 text-xs text-gray-500 text-center">
              Press <span className="font-semibold">Cmd/Ctrl + K</span> to toggle
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};