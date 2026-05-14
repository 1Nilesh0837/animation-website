import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTextureContext } from '../context/TextureContext';

interface TextureManagerConfig {
  marqueeItems: string[];
  canvasWidth?: number;
  canvasHeight?: number;
}

export const useTextureManager = (config: TextureManagerConfig) => {
  const { marqueeItems, canvasWidth = 2048, canvasHeight = 512 } = config;
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { marqueeColor } = useTextureContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const createMarqueeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvasRef.current = canvas;

      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Clear with transparent background
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw marquee text
      const text = marqueeItems.join(' · ');
      const fontSize = 80;
      ctx.font = `bold ${fontSize}px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = marqueeColor;
      ctx.textBaseline = 'middle';

      // Measure text width
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;

      // Draw text multiple times for seamless loop
      const repeats = Math.ceil(canvas.width / textWidth) + 1;
      for (let i = 0; i < repeats; i++) {
        ctx.fillText(text, i * textWidth, canvas.height / 2);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;

      textureRef.current = texture;
      setIsReady(true);
      return texture;
    };

    createMarqueeTexture();
  }, [marqueeItems, marqueeColor, canvasWidth, canvasHeight]);

  const getTexture = () => textureRef.current;
  const disposeTexture = () => {
    if (textureRef.current) {
      textureRef.current.dispose();
      textureRef.current = null;
    }
  };

  return { getTexture, disposeTexture, isReady };
};
