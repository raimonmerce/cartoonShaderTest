import React, { } from 'react';
import { useGLTF, Clone } from '@react-three/drei';
import { extend  } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import {ShadowToonShader} from '../shaders/shaders';
import * as THREE from 'three';

extend({ ShadowToonShader });

interface ComplexGlbAssetProps {
    url: string;
    lightPosition: THREE.Vector3;
}

const ComplexGlbAsset: React.FC<ComplexGlbAssetProps> = ({ url, lightPosition }) => {
    const { nodes, materials, scene } = useGLTF(url)

    const material =  new THREE.MeshToonMaterial({color: "blue"});
    const clonedScene = scene.clone();
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (!mesh.material.map && !mesh.material.transparent){
          mesh.material = new THREE.MeshToonMaterial({
            color: mesh.material.color,
          });
        } else {
          console.log(mesh.material)
        }
      }
    });
    console.log(nodes, materials, scene)

    const clonedComponent = (
      <Clone 
        object={clonedScene}
        castShadow 
        receiveShadow 
        position={[-6, 0, 0]}
      >
        <Outlines thickness={5} color="black" />
      </Clone>
    )
    console.log("clonedComponent", clonedComponent)
    return clonedComponent;
};

export default ComplexGlbAsset