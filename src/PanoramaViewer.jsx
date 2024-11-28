// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';

// const PanoramaViewer = () => {
//   const containerRef = useRef(null); // Reference for the container div
//   const rendererRef = useRef(null);  // Reference for the renderer

//   useEffect(() => {
//     let camera, scene, renderer;
//     let isUserInteracting = false,
//         onPointerDownMouseX = 0,
//         onPointerDownMouseY = 0,
//         lon = 0,
//         onPointerDownLon = 0,
//         lat = 0,
//         onPointerDownLat = 0,
//         phi = 0,
//         theta = 0;

//     // Initialize the scene
//     const init = () => {
//       const container = containerRef.current;

//       // Camera setup
//       camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

//       // Scene setup
//       scene = new THREE.Scene();

//       // Sphere geometry
//       const geometry = new THREE.SphereGeometry(500, 60, 40);
//       geometry.scale(-1, 1, 1); // Invert the sphere to face inward

//       // Texture loader src\textures\landscape1.jpg
//       const texture = new THREE.TextureLoader().load('/textures/landscape1.jpg');
//       texture.colorSpace = THREE.SRGBColorSpace;
        
//       const material = new THREE.MeshBasicMaterial({ map: texture });
//       const mesh = new THREE.Mesh(geometry, material);

//       scene.add(mesh);

//       // Renderer setup
//       renderer = new THREE.WebGLRenderer();
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       container.appendChild(renderer.domElement);
//       rendererRef.current = renderer;

//       // Event listeners
//       container.style.touchAction = 'none';
//       container.addEventListener('pointerdown', onPointerDown);
//       document.addEventListener('wheel', onDocumentMouseWheel);
//       window.addEventListener('resize', onWindowResize);
//     };

//     // Event listener functions
//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     const onPointerDown = (event) => {
//       if (!event.isPrimary) return;

//       isUserInteracting = true;

//       onPointerDownMouseX = event.clientX;
//       onPointerDownMouseY = event.clientY;

//       onPointerDownLon = lon;
//       onPointerDownLat = lat;

//       document.addEventListener('pointermove', onPointerMove);
//       document.addEventListener('pointerup', onPointerUp);
//     };

//     const onPointerMove = (event) => {
//       if (!event.isPrimary) return;

//       lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
//       lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
//     };

//     const onPointerUp = () => {
//       isUserInteracting = false;
//       document.removeEventListener('pointermove', onPointerMove);
//       document.removeEventListener('pointerup', onPointerUp);
//     };

//     const onDocumentMouseWheel = (event) => {
//       const fov = camera.fov + event.deltaY * 0.05;
//       camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
//       camera.updateProjectionMatrix();
//     };

//     const animate = () => {
//       if (!isUserInteracting) lon += 0.1;

//       lat = Math.max(-85, Math.min(85, lat));
//       phi = THREE.MathUtils.degToRad(90 - lat);
//       theta = THREE.MathUtils.degToRad(lon);

//       const x = 500 * Math.sin(phi) * Math.cos(theta);
//       const y = 500 * Math.cos(phi);
//       const z = 500 * Math.sin(phi) * Math.sin(theta);

//       camera.lookAt(x, y, z);

//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };

//     // Initialize the scene and start animation
//     init();
//     animate();

//     // Cleanup
//     return () => {
//       rendererRef.current?.dispose();
//       window.removeEventListener('resize', onWindowResize);
//       document.removeEventListener('wheel', onDocumentMouseWheel);
//     };
//   }, []);

//   return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
// };

// export default PanoramaViewer;


// import React, { useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { TextureLoader } from "three";
// import * as THREE from 'three';
// import { OrbitControls } from "@react-three/drei";

// const textures = [
//   "/textures/landscape1.jpg",
//   "/textures/landscape2.jpg",
//   "/textures/landscape3.jpg",
// ];

// const Sphere = ({ texturePath }) => {
//   const [texture, setTexture] = useState(() => new TextureLoader().load(texturePath));
//   const meshRef = useRef();

//   // Animate the sphere to rotate slightly over time
//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += 0.002;
//     }
//   });

//   return (
//     <mesh ref={meshRef}>
//       <sphereGeometry args={[500, 60, 40]} />
//       <meshBasicMaterial map={texture} side={THREE.BackSide} />
//     </mesh>
//   );
// };

// const Arrow = ({ onClick }) => {
//   return (
//     <mesh position={[0, 0, -490]} onClick={onClick}>
//       <coneGeometry args={[5, 20, 3]} />
//       <meshBasicMaterial color="yellow" />
//     </mesh>
//   );
// };

// const PanoramaViewer = () => {
//   const [textureIndex, setTextureIndex] = useState(0);

//   // Function to handle arrow click and cycle textures
//   const handleArrowClick = () => {
//     setTextureIndex((prevIndex) => (prevIndex + 1) % textures.length);
//   };

//   return (
//     <Canvas>
//       {/* Camera Controls */}
//       <OrbitControls enableZoom={true} />

//       {/* Scene */}
//       <Sphere texturePath={textures[textureIndex]} />

//       {/* Arrow */}
//       <Arrow onClick={handleArrowClick} />
//     </Canvas>
//   );
// };

// export default PanoramaViewer;
