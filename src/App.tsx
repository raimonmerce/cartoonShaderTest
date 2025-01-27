import React, { useState, useRef } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Box, Sphere, Stats, useGLTF } from '@react-three/drei';
import Dropdown from './components/Dropdown';
import { Outline } from './components/Outline';
import * as THREE from 'three';
import * as Shaders from './shaders/shaders';

Object.entries(Shaders).forEach(([key, shader]) => {
  extend({ [key]: shader });
});

type GeometryType = 'TorusKnot' | 'Box' | 'Sphere';
type MaterialType = keyof typeof Shaders;

interface AnimatedGeometryProps {
  geometry: React.ElementType;
  material: string;
}

const AnimatedGeometry: React.FC<AnimatedGeometryProps> = ({ geometry, material }) => {
  const ref = useRef<any>();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
    }
  });

  const GeometryComponent = geometry;

  return (
    <GeometryComponent args={[1, 0.4, 128, 32]}>
      {/* @ts-ignore */}
      {React.createElement(material, { ref: ref, attach: 'material', uColor: new THREE.Color(0xff6600) })}
    </GeometryComponent>
  );
};

const App: React.FC = () => {
  const [selectedGeometry, setSelectedGeometry] = useState<GeometryType>('TorusKnot');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(Object.keys(Shaders)[0] as MaterialType);

  const geometries: Record<GeometryType, React.ElementType> = {
    TorusKnot: TorusKnot,
    Box: Box,
    Sphere: Sphere,
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(to bottom, #ffff00, #2a5298)' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}>
        <Dropdown
          label="Geometry"
          options={Object.keys(geometries)}
          value={selectedGeometry}
          onChange={(value) => setSelectedGeometry(value as GeometryType)}
        />
        <Dropdown
          label="Shader"
          options={Object.keys(Shaders)}
          value={selectedMaterial}
          onChange={(value) => setSelectedMaterial(value as MaterialType)}
        />
      </div>
      <Canvas>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Scene Contents */}
        <AnimatedGeometry
          geometry={geometries[selectedGeometry]}
          material={selectedMaterial}
        />

        {/* Controls */}
        <OrbitControls />

        {/* Stats */}
        <Stats />
      </Canvas>
    </div>
  );
};

export default App;