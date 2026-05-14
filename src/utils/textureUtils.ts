import * as THREE from 'three';

export const loadImage = async (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

export const createCanvasTexture = (
  width: number,
  height: number,
  drawFn: (ctx: CanvasRenderingContext2D) => void
): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context');
  
  drawFn(ctx);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  return texture;
};

export const disposeTexture = (texture: THREE.Texture) => {
  if (texture) {
    texture.dispose();
  }
};

export const disposeGeometry = (geometry: THREE.BufferGeometry) => {
  geometry.dispose();
};

export const disposeMaterial = (material: THREE.Material) => {
  material.dispose();
};
