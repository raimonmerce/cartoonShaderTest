import React, { } from 'react';
import { useGLTF } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import {ShadowToonShader} from '../shaders/shaders';
import * as THREE from 'three';

extend({ ShadowToonShader });

interface ComplexGlbAssetProps {
    url: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
}

const ComplexGlbAsset: React.FC<ComplexGlbAssetProps> = ({ 
  url, 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) => {
    const { nodes, scene } = useGLTF(url)

    const getToonMaterials = (material: THREE.Material) => {
      return new THREE.MeshToonMaterial({
        map: material.map,
        color: material.color,
      });
    };

    const iteratTree = (nodes: any) => {
      return (
        <>
          {Object.entries(nodes).map(([key, node]) => {
            if (node instanceof THREE.Mesh) {
              if (node.material.transparent) return; //Temp
              return (
                <mesh 
                  key={key} 
                  castShadow 
                  receiveShadow 
                  geometry={node.geometry} 
                  material={getToonMaterials(node.material)}
                  position={node.position}
                  scale={node.scale}
                  rotation={node.rotation}  
                >
                  <Outlines thickness={1} color="black" />
                </mesh>
              );
            } else if (node instanceof THREE.Object3D) {
              return (
                <group 
                  position={node.position}
                  scale={node.scale}
                  rotation={node.rotation} 
                >
                  {iteratTree(node.children)}
                </group>
              )
            }
            return null;
          })}
        </>
      )
    };

    console.log(nodes, scene)
    const clonedComponent = (
      <group
        position={position}
        scale={scale}
        rotation={rotation}
      >
        <group
          position={scene.position}
          scale={scene.scale}
          rotation={scene.rotation}
        >
          {iteratTree(scene.children)}
        </group>
      </group>
    )
    console.log("clonedComponent", clonedComponent)
    return clonedComponent;
};

export default ComplexGlbAsset