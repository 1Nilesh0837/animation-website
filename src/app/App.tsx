import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './components/sections/HeroSection';
import { KineticScene } from './components/webgl/KineticScene';
import { ControlPanel } from './components/ControlPanel';
import { VideoSection } from './components/sections/VideoSection';
import { KingdomSection } from './components/sections/KingdomSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectSection } from './components/sections/ProjectSection';
import { ContactSection } from './components/sections/ContactSection';
import { TextureProvider } from './context/TextureContext';

export const App = (): ReactNode => {
  return (
    <TextureProvider>
      <CustomCursor />
      <motion.main className="w-full bg-slate-950 text-white overflow-hidden">
        <HeroSection />
        <VideoSection />
        <KingdomSection />
        <AboutSection />
        <ProjectSection />
        <ContactSection />
        <ControlPanel />
      </motion.main>
    </TextureProvider>
  );
};

export default App;
