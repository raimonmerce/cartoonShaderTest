import React, { useRef } from 'react';
import { useGLTF, Clone } from '@react-three/drei';
import { useFrame, extend  } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import {ShadowToonShader} from '../shaders/shaders';
import * as THREE from 'three';

extend({ ShadowToonShader });

interface GlbAssetProps {
    url: string;
}

const GlbAsset: React.FC<GlbAssetProps> = ({ url }) => {
    // const { scene } = useGLTF(url);
    // return (
    //     <primitive 
    //         object={scene}
    //         castShadow 
    //         receiveShadow 
    //         position={[4,-2,0]}
    //         rotation={[0,0,0]}
    //         scale={[3,3,3]}
    //     >
    //     <Outlines thickness={50} color={"black"} />
    //     </primitive >
    // );


    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf')
    const materialRef = useRef<any>();
    // Update uniform 'uTime' for animation
    useFrame(({ clock }) => {
      if (materialRef.current) {
        materialRef.current.uTime = clock.getElapsedTime();
      }
    });

    const material =  new ShadowToonShader();
    material.uniforms.uColor = {value: new THREE.Color(0xff00ff)};
    material.uniforms.uLightPosition = {value: new THREE.Vector3(-3.0, 1.0, 1.0)};
    console.log(material)

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

export default GlbAsset