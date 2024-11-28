
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

// List of textures to load
const textures = [
  "/textures/landscape1.jpg",
  "/textures/landscape2.jpg",
  "/textures/landscape3.jpg",
  "/textures/landscape4.jpg",
  "/textures/landscape5.jpg",
  "/textures/landscape6.jpg",
];

// Sphere Component
const Sphere = ({ texturePath }) => {
  const [texture, setTexture] = useState(null);
  const meshRef = useRef();

  // Load texture when texturePath changes
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      texturePath,
      (loadedTexture) => setTexture(loadedTexture),
      undefined,
      (error) => console.error("Failed to load texture:", error)
    );
  }, [texturePath]);

  // Rotate the sphere over time
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 60, 40]} />
      {texture && <meshBasicMaterial map={texture} side={THREE.BackSide} />}
    </mesh>
  );
};

// Arrow Component
const Arrow = ({ onClick }) => {
  return (
    <mesh position={[0, 0, -400]} onClick={onClick}>
      <coneGeometry args={[5, 20, 3]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
  );
};

// Main PanoramaViewer Component
const PanoramaViewer = () => {
  const [textureIndex, setTextureIndex] = useState(0);

  const handleArrowClick = () => {
    setTextureIndex((prevIndex) => (prevIndex + 1) % textures.length);
  };

  return (
    <Canvas>
      {/* Camera Controls */}
      <OrbitControls enableZoom={false} enablePan={false} />

      {/* Scene */}
      <Sphere texturePath={textures[textureIndex]} />

      {/* Arrow */}
      <Arrow onClick={handleArrowClick} />
    </Canvas>
  );
};

export default PanoramaViewer;
