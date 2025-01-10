// src/components/pages/Home/HeroSection/WaveScene.tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create points geometry
    const rows = 100;
    const cols = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(rows * cols * 3);
    const spacing = 0.1;

    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        positions[i] = (x - cols / 2) * spacing;
        positions[i + 1] = 0;
        positions[i + 2] = (z - rows / 2) * spacing;
        i += 3;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Create points material
    const material = new THREE.PointsMaterial({
      color: "#186ebc",
      size: 0.008,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Create points mesh
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Animation function
    const animate = () => {
      if (
        !pointsRef.current ||
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current
      )
        return;

      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      const time = Date.now() * 0.001;

      let i = 0;
      for (let x = 0; x < cols; x++) {
        for (let z = 0; z < rows; z++) {
          const xPos = positions[i];
          const zPos = positions[i + 2];

          positions[i + 1] =
            Math.sin(xPos * 0.5 + time * 0.3) * 0.2 +
            Math.sin(zPos * 0.5 + time * 0.2) * 0.2 +
            Math.sin(Math.sqrt(xPos * xPos + zPos * zPos) * 0.3 + time * 0.4) *
              0.2;

          i += 3;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      if (pointsRef.current) {
        pointsRef.current.geometry.dispose();
        (pointsRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default Scene;
