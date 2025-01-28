import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedGeometryProps {
  geometry: React.ElementType;
  material: string;
}

const AnimatedGeometry: React.FC<AnimatedGeometryProps> = ({ geometry, material }) => {

  const GeometryComponent = geometry;

  const component = (
    <GeometryComponent args={[1, 0.4, 128, 32]}>
      {/* @ts-ignore */}
      {React.createElement(material, {
        attach: 'material',
        uColor: new THREE.Color(0xff6600),
      })}
      <Outlines thickness={5} color="black" />
    </GeometryComponent>
  );

  //console.log('AnimatedGeometry Component:', component);

  return component;
};

export default AnimatedGeometry