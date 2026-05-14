import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Pause } from 'lucide-react';

export const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({ threshold: 0.8 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const chapters = [
    { time: 0, label: 'Introduction' },
    { time: 5, label: 'Projects' },
    { time: 10, label: 'Skills' },
  ];

  useEffect(() => {
    if (!videoRef.current) return;

    if (inView && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    } else if (!inView && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [inView, isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={ref} className="relative w-full h-screen flex items-center justify-center bg-slate-950 py-20">
      <motion.div
        className="relative w-full max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Video Container */}
        <div className="relative group">
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg"
            muted
            loop
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4"
              type="video/mp4"
            />
          </video>

          {/* Backdrop Blur Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 rounded-lg backdrop-blur-sm pointer-events-none"
            animate={{ opacity: isPlaying ? 0.2 : 0.5 }}
          />

          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition">
              {isPlaying ? <Pause size={40} className="text-white" /> : <Play size={40} className="text-white ml-2" />}
            </div>
          </motion.button>
        </div>

        {/* Chapter Markers */}
        <div className="mt-8 space-y-2">
          {chapters.map((chapter) => (
            <motion.div
              key={chapter.time}
              className="text-sm text-gray-400"
              animate={{
                opacity: Math.abs(currentTime - chapter.time) < 1 ? 1 : 0.5,
              }}
            >
              {chapter.label} - {chapter.time}s
            </motion.div>
          ))}
        </div>

        {/* Video Scrubber */}
        <div className="mt-6 space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = parseFloat(e.target.value);
                setCurrentTime(parseFloat(e.target.value));
              }
            }}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{Math.floor(currentTime)}s</span>
            <span>{Math.floor(duration)}s</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};