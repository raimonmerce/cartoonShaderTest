import React, { useState, useRef } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Box, Sphere, Stats, useGLTF, Outlines } from '@react-three/drei';
import Dropdown from './components/Dropdown';
import Checkbox from './components/Checkbox';
import AnimatedGeometry from './components/AnimatedGeometry';
import GlbAssetProps from './components/GlbAsset';
import { EffectComposer, Bloom} from "@react-three/postprocessing";
import * as Shaders from './shaders/shaders';
import avatarGbl from './assets/avatar.glb';

Object.entries(Shaders).forEach(([key, shader]) => {
  extend({ [key]: shader });
});

type GeometryType = 'TorusKnot' | 'Box' | 'Sphere';
type MaterialType = keyof typeof Shaders;

const App: React.FC = () => {
  const [selectedGeometry, setSelectedGeometry] = useState<GeometryType>('TorusKnot');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(Object.keys(Shaders)[2] as MaterialType);
  const [useShaders, setUseShaders] = useState(false);
  const { scene } = useGLTF(avatarGbl);

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
        <Checkbox label="Shaders" setValue={setUseShaders} />
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

        <GlbAssetProps url={avatarGbl}/>

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
    </div>
  );
};

export default App;