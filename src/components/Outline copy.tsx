import { extend, ReactThreeFiber, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import React, { ReactNode, useRef } from 'react';
import * as THREE from "three";

// Define the OutlineShaderMaterial
const OutlineShaderMaterial = shaderMaterial(
  {
    uOutlineColor: new THREE.Color(0x000000),
    uOutlineThickness: 1.1,
  },
  `
    void main() {
      vec3 thickenedPosition = position + normal * 0.001;
      vec4 mvPosition = modelViewMatrix * vec4(thickenedPosition, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  `
    uniform vec3 uOutlineColor;

    void main() {
      gl_FragColor = vec4(uOutlineColor, 1.0);
    }
  `
);

// Extend Drei to include the outline shader
extend({ OutlineShaderMaterial });

// Add type declaration for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      outlineShaderMaterial: ReactThreeFiber.Object3DNode<
        typeof OutlineShaderMaterial,
        typeof OutlineShaderMaterial
      >;
    }
  }
}
type OutlineProps = {
    color?: THREE.Color | string | number;
    scale?: number;
    children: ReactNode;
  };
  
  export const Outline: React.FC<OutlineProps> = ({
    color = 0x000000,
    scale = 1.1,
    children,
  }) => {
    const outlineRef = useRef<THREE.Mesh>(null);
  
    useFrame(() => {
      if (outlineRef.current) {
        outlineRef.current.scale.set(scale, scale, scale);
      }
    });

    const extractGeometry = (child: React.ReactNode): THREE.BufferGeometry | null => {
      if (React.isValidElement(child) && child.props?.geometry) {
        const geometry = child.props.geometry;
    
        // Check if geometry is a valid Three.js BufferGeometry
        if (geometry instanceof THREE.BufferGeometry) {
          return geometry;
        }
    
        console.error("Geometry is not an instance of BufferGeometry:", geometry);
      }
      return null;
    };
    
    return (
      <>
        {/* Render the original children */}
        {children}
  
        {/* Render the outline */}
        <mesh ref={outlineRef}>
          {React.isValidElement(children) &&
            (() => {
              console.log("Element to clone:", children);

              // Process the children array to replace the material
              console.log("children.props.geometry", children.props.geometry)
              const newChildren = React.Children.map(
                children.props.children,
                (child) => {
                  console.log("child.type:", child.type)
                  if (
                    // false && 
                    React.isValidElement(child) &&
                    child.type === "ShadowToonShader"
                  ) {
                    // Replace the material with a new one
                    return (
                      <outlineShaderMaterial
                        uOutlineColor={"black"}
                        side={THREE.BackSide}
                        // polygonOffset
                        // polygonOffsetFactor={1.0}
                        // polygonOffsetUnits={1.0}
                        // transparent
                        // depthWrite={false}
                      />
                    );
                  }
                  console.log("eend")
                  return child; // Keep other children as-is
                }
              );

              // Clone the mesh with the updated children
              const clonedElement = React.cloneElement(children as React.ReactElement, {
                children: newChildren,
              });

              console.log("Cloned element with new material:", clonedElement);
              return clonedElement;
            })()}
        </mesh>;
      </>
    );
  };