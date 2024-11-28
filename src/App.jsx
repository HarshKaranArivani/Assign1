//   +++++++++++++ First Code +++++++++++++++
// import React, { useRef, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import { TextureLoader } from "three";

// // List of textures to load
// // vjbnkfcbweiuf
// const textures = [
//   "/textures/landscape1.jpg",
//   "/textures/landscape2.jpg",
//   "/textures/landscape3.jpg",
//   "/textures/landscape4.jpg",
//   "/textures/landscape5.jpg",
//   "/textures/landscape6.jpg",
// ];

// // Sphere Component
// const Sphere = ({ texturePath }) => {
//   const [texture, setTexture] = useState(null);
//   const meshRef = useRef();

//   // Load texture when texturePath changes
//   useEffect(() => {
//     const loader = new TextureLoader();
//     loader.load(
//       texturePath,
//       (loadedTexture) => setTexture(loadedTexture),
//       undefined,
//       (error) => console.error("Failed to load texture:", error)
//     );
//   }, [texturePath]);

//   // Rotate the sphere over time
//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += 0.002;
//     }
//   });

//   return (
//     <mesh ref={meshRef}>
//       <sphereGeometry args={[500, 60, 40]} />
//       {texture && <meshBasicMaterial map={texture} side={THREE.BackSide} />}
//     </mesh>
//   );
// };

// // Arrow Component
// const Arrow = ({ onClick }) => {
//   return (
//     <mesh position={[0, 0, -400]} onClick={onClick}>
//       <coneGeometry args={[5, 20, 3]} />
//       <meshBasicMaterial color="yellow" />
//     </mesh>
//   );
// };

// // Main PanoramaViewer Component
// const PanoramaViewer = () => {
//   const [textureIndex, setTextureIndex] = useState(0);

//   const handleArrowClick = () => {
//     setTextureIndex((prevIndex) => (prevIndex + 1) % textures.length);
//   };

//   return (
//     <Canvas>
//       {/* Camera Controls */}
//       <OrbitControls enableZoom={false} enablePan={false} />

//       {/* Scene */}
//       <Sphere texturePath={textures[textureIndex]} />

//       {/* Arrow */}
//       <Arrow onClick={handleArrowClick} />
//     </Canvas>
//   );
// };

// export default PanoramaViewer;



// //  +++++++ User add images +++++++++++++++++


import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

// List of default textures to load
const textures = [
  "/textures/landscape1.jpg",
  "/textures/landscape2.jpg",
  "/textures/landscape3.jpg",
  "/textures/landscape4.jpg",
  "/textures/landscape5.jpg",
  "/textures/landscape6.jpg",
];

const Sphere = ({ texturePath, isRotating }) => {
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

  // Rotate the sphere over time when isRotating is true
  useFrame(() => {
    if (meshRef.current && isRotating) {
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

const Arrow = ({ onClick }) => {
  return (
    <mesh position={[0, 0, -400]} onClick={onClick}>
      <torusKnotGeometry args={[8, 8, 3]} />
      <meshBasicMaterial color="white" />
    
    </mesh>
  );
};

const PanoramaViewer = () => {
  const [textureIndex, setTextureIndex] = useState(0);
  const [customTextures, setCustomTextures] = useState([]);
  const [isRotating, setIsRotating] = useState(true);  // State to control rotation

  // Handle file input change
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomTextures((prevTextures) => [
          ...prevTextures,
          e.target.result, // Add the new texture to the list
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle arrow click to cycle through all textures (default + custom)
  const handleArrowClick = () => {
    setTextureIndex((prevIndex) => (prevIndex + 1) % (textures.length + customTextures.length));
  };

  // Toggle rotation state for play/pause functionality
  const toggleRotation = () => {
    setIsRotating((prev) => !prev);
  };

  return (
    <div>
      {/* File input for loading custom scene (texture) */}
      <input type="file" accept="image/*" onChange={handleFileInputChange} style={{ marginBottom: "10px" }} />

      {/* Play/Pause Buttons */}
       {/* Play/Pause Buttons */}
       <button
        onClick={toggleRotation}
        style={{
          padding: "10px 20px",
          backgroundColor: isRotating ? "green" : "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
          cursor: "pointer",
          fontSize: "16px",
          zIndex: -1,
        }}
      >
        {isRotating ? "Pause" : "Play"}
      </button>
      
      <Canvas>
        {/* Camera Controls */}
        <OrbitControls enableZoom={false} enablePan={false} />

        {/* Scene */}
        <Sphere texturePath={customTextures[textureIndex] || textures[textureIndex]} isRotating={isRotating} />

        {/* Arrow */}
        <Arrow onClick={handleArrowClick} />
      </Canvas>
    </div> 
  );
};

export default PanoramaViewer;
