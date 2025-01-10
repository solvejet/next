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
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 10);
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
    const colors = new Float32Array(rows * cols * 3);
    const spacing = 0.1;

    const color = new THREE.Color("#186ebc");
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        positions[i] = (x - cols / 2) * spacing;
        positions[i + 1] = 0;
        positions[i + 2] = (z - rows / 2) * spacing;

        // Add color variation based on position
        const intensity = 0.5 + Math.random() * 0.5;
        colors[i] = color.r * intensity;
        colors[i + 1] = color.g * intensity;
        colors[i + 2] = color.b * intensity;

        i += 3;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Create points material
    const material = new THREE.PointsMaterial({
      size: 0.015,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
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
      const time = Date.now() * 0.002; // Increased speed

      let i = 0;
      for (let x = 0; x < cols; x++) {
        for (let z = 0; z < rows; z++) {
          const xPos = positions[i];
          const zPos = positions[i + 2];

          // More dramatic mountain-like wave pattern
          positions[i + 1] =
            Math.sin(xPos * 0.5 + time * 2) * 0.5 + // Increased amplitude and speed
            Math.sin(zPos * 0.5 + time * 1.5) * 0.5 +
            Math.sin(Math.sqrt(xPos * xPos + zPos * zPos) * 0.3 + time) * 1;

          i += 3;
        }
      }

      // Smooth rotation interpolation
      currentRotationRef.current.x +=
        (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      currentRotationRef.current.y +=
        (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;

      pointsRef.current.rotation.x = currentRotationRef.current.x;
      pointsRef.current.rotation.y = currentRotationRef.current.y;

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotationRef.current.x = mouseRef.current.y * 0.3;
      targetRotationRef.current.y = mouseRef.current.x * 0.3;
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
        cursor: "default",
      }}
    />
  );
}

export default Scene;
