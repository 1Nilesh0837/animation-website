import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTextureContext } from '../../context/TextureContext';
import { useMousePosition } from '../../hooks/useMousePosition';

export const KineticScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const cylindersRef = useRef<THREE.Mesh[]>([]);
  const { speed } = useTextureContext();
  const mousePosition = useMousePosition();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x0f172a, 0.1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Group for 3D scene
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Create cylinders
    const cylinderCount = 5;
    const geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);

    for (let i = 0; i < cylinderCount; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(i / cylinderCount, 0.8, 0.5),
        metalness: 0.7,
        roughness: 0.2,
      });

      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.position.y = -1 + (i * 2) / cylinderCount;
      cylinder.rotation.x = Math.PI / 6;
      cylinder.castShadow = true;

      group.add(cylinder);
      cylindersRef.current.push(cylinder);
    }

    // Particle field
    const particleCount = 250;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.05,
      transparent: true,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate cylinders based on speed
      cylindersRef.current.forEach((cylinder, i) => {
        cylinder.rotation.z += 0.005 * speed;
        cylinder.position.x = Math.sin(Date.now() * 0.0005 * speed + i) * 0.5;
      });

      // Mouse-based tilt
      if (groupRef.current) {
        const maxTilt = Math.PI / 36; // 5 degrees
        const targetRotationX = -(mousePosition.y / window.innerHeight - 0.5) * maxTilt;
        const targetRotationY = (mousePosition.x / window.innerWidth - 0.5) * maxTilt;

        groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
      }

      // Particle animation
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [speed, mousePosition]);

  return <div ref={containerRef} className="w-full h-full" />;
};