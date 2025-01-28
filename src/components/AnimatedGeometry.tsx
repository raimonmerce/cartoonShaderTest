import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import * as THREE from 'three';

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

  const component = (
    <GeometryComponent args={[1, 0.4, 128, 32]}>
      {/* @ts-ignore */}
      {React.createElement(material, {
        ref: ref,
        attach: 'material',
        uColor: new THREE.Color(0xff6600),
      })}
      <Outlines thickness={5} color="black" />
    </GeometryComponent>
  );

  // Log the component
  console.log('AnimatedGeometry Component:', component);

  return component;
};

export default AnimatedGeometry