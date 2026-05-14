import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface TextureContextType {
  textureSpeed: number;
  setTextureSpeed: (speed: number) => void;
  marqueeColor: string;
  setMarqueeColor: (color: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  fps: number;
  setFps: (fps: number) => void;
}

const TextureContext = createContext<TextureContextType | undefined>(undefined);

export const TextureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [textureSpeed, setTextureSpeed] = useState(0.5);
  const [marqueeColor, setMarqueeColor] = useState('#ff00ff');
  const [isLoading, setIsLoading] = useState(false);
  const [fps, setFps] = useState(60);

  const value: TextureContextType = {
    textureSpeed,
    setTextureSpeed,
    marqueeColor,
    setMarqueeColor,
    isLoading,
    setIsLoading,
    fps,
    setFps,
  };

  return (
    <TextureContext.Provider value={value}>
      {children}
    </TextureContext.Provider>
  );
};

export const useTextureContext = () => {
  const context = useContext(TextureContext);
  if (context === undefined) {
    throw new Error('useTextureContext must be used within TextureProvider');
  }
  return context;
};
