import React, { useState, useRef, useEffect } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Box, Sphere, Stats, useGLTF, Outlines } from '@react-three/drei';
import Dropdown from './components/Dropdown';
import Checkbox from './components/Checkbox';
import AnimatedGeometry from './components/AnimatedGeometry';
import GlbAsset from './components/GlbAsset';
import RotatingLightSlider from './components/RotatingLightSlider';
import { EffectComposer, Bloom} from "@react-three/postprocessing";
import * as Shaders from './shaders/shaders';
import avatarGbl from './assets/avatar.glb';
import sofaGbl from './assets/sofa.glb';
import * as THREE from 'three';

Object.entries(Shaders).forEach(([key, shader]) => {
  extend({ [key]: shader });
});

type GeometryType = 'TorusKnot' | 'Box' | 'Sphere';
type MaterialType = keyof typeof Shaders;

const App: React.FC = () => {
  const [selectedGeometry, setSelectedGeometry] = useState<GeometryType>('TorusKnot');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(Object.keys(Shaders)[2] as MaterialType);
  const [useShaders, setUseShaders] = useState(false);
  const [lightPosition, setLightPosition] = useState(new THREE.Vector3(2,2,2));
  const { scene } = useGLTF(avatarGbl);

  const geometries: Record<GeometryType, React.ElementType> = {
    TorusKnot: TorusKnot,
    Box: Box,
    Sphere: Sphere,
  };

  const lightRef = useRef<THREE.PointLight>(null);

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(to bottom, #ffff00, #2a5298)' }}>
      <Canvas shadows>
        <ambientLight intensity={1.0} />
        <directionalLight angle={0.2} intensity={5} castShadow position={lightPosition} />
        {/* Scene Contents */}
        <AnimatedGeometry
          geometry={geometries[selectedGeometry]}
          material={selectedMaterial}
          lightPosition={lightPosition}
        />

        <GlbAsset 
          url={'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf'} 
          lightPosition={lightPosition}
        />

        <mesh 
          castShadow 
          receiveShadow 
          position={[-3, 0, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial color="red" />
            <>
              <Outlines thickness={9} color="aquamarine" />
              <Outlines thickness={9} color="#177e89" />
              <Outlines thickness={9} color="#ff9770" />
            </>
        </mesh>

        <mesh 
          position={[0, -1.5, 0]} 
          scale={1000} 
          rotation={[-Math.PI / 2, 0, 0]} 
          receiveShadow
        >
          <planeGeometry />
          <shadowMaterial />
        </mesh>

        {/* Controls */}
        <OrbitControls />

        {/* Stats */}
        <Stats />

        {/* Postprocessing Effects */}
        {useShaders && (
          <EffectComposer>
            <Bloom
              intensity={2}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        )}
      </Canvas>
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
        <Checkbox label="Shaders" setValue={setUseShaders} />
        <RotatingLightSlider setLightPosition={setLightPosition} />
      </div>
    </div>
  );
};

export default App;