import React, { createContext, useContext, ReactNode } from 'react';

interface TextureContextType {
  speed: number;
  setSpeed: (speed: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const TextureContext = createContext<TextureContextType | undefined>(undefined);

export const TextureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [speed, setSpeed] = React.useState(1);
  const [theme, setTheme] = React.useState('default');

  return (
    <TextureContext.Provider value={{ speed, setSpeed, theme, setTheme }}>
      {children}
    </TextureContext.Provider>
  );
};

export const useTextureContext = () => {
  const context = useContext(TextureContext);
  if (!context) {
    throw new Error('useTextureContext must be used within TextureProvider');
  }
  return context;
};