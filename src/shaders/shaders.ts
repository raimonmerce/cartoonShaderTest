import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

import standardVert from "./vertex/StandardVert.glsl"; 
import normalVert from "./vertex/NormalVert.glsl"; 
import sinVert from "./fragment/SinEffectFrag.glsl"; 
import cosVert from "./fragment/CosEffectFrag.glsl"; 
import shadowVert from "./fragment/ShadowFrag.glsl"; 
import cartoonVert from "./fragment/CartoonFrag.glsl"; 

export const SinShader = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0xff6600),
  },
  standardVert,
  sinVert
);

export const CosShader = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0x00ff00),
  },
  standardVert,
  cosVert
);

export const ShadowGradientShader = shaderMaterial(
  {
    uTime: 0,
    uLightPosition: new THREE.Vector3(1.0, 1.0, 1.0),
    uColor: new THREE.Color(0xffffff),
  },
  normalVert,
  shadowVert
);

export const ShadowToonShader = shaderMaterial(
    {
      uTime: 0,
      uLightPosition: new THREE.Vector3(3.0, 1.0, 1.0),
      uColor: new THREE.Color(0xffffff),
    },   
    normalVert,
    cartoonVert
  );