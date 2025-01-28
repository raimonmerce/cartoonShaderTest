import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedGeometryProps {
  geometry: React.ElementType;
  material: string;
  lightPosition: THREE.Vector3;
}

const AnimatedGeometry: React.FC<AnimatedGeometryProps> = ({ geometry, material, lightPosition }) => {

  const GeometryComponent = geometry;
  
  const component = (
      <GeometryComponent 
      args={[1, 0.4, 128, 32]}         
      castShadow 
      receiveShadow 
    >
      {/* @ts-ignore */}
      {React.createElement(material, {
        attach: 'material',
        uColor: new THREE.Color(0xffff00),
        uLightPosition: lightPosition,
      })}
      <Outlines thickness={5} color="black" />
    </GeometryComponent>
  );

  return component;
};

export default AnimatedGeometry