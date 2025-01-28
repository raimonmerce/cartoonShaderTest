import React, { useRef } from 'react';
import { useGLTF, Clone } from '@react-three/drei';
import { useFrame, extend  } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import {ShadowToonShader} from '../shaders/shaders';
import * as THREE from 'three';

extend({ ShadowToonShader });

interface ComplexGlbAssetProps {
    url: string;
    lightPosition: THREE.Vector3;
}

const ComplexGlbAsset: React.FC<ComplexGlbAssetProps> = ({ url, lightPosition }) => {
    const { nodes, materials } = useGLTF(url)
    const materialRef = useRef<any>();
    // Update uniform 'uTime' for animation
    useFrame(({ clock }) => {
      if (materialRef.current) {
        materialRef.current.uTime = clock.getElapsedTime();
      }
    });

    const material =  new ShadowToonShader();
    material.uniforms.uColor = {value: new THREE.Color(0xff00ff)};
    material.uniforms.uLightPosition = {value: lightPosition};
    //console.log(material)

    return (
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.Suzanne.geometry}
        material={material}
        position={[3, -1, 0]}
      >
        <Outlines thickness={5} angle={0} />
      </mesh>
    )
};

export default ComplexGlbAsset