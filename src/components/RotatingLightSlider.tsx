import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Slider } from '@mui/material';

interface RotatingLightSliderProps {
    setLightPosition: any;
}

const RotatingLightSlider: React.FC<RotatingLightSliderProps> = ({ setLightPosition}) => {
  const initialRotation = new THREE.Vector3(2,2,2);

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') {
        // Convert the slider value (degrees) to radians
        const radians = THREE.MathUtils.degToRad(value);
  
        // Rotate around the Y-axis (or other axes depending on your need)
        const rotatedX = initialRotation.x * Math.cos(radians) - initialRotation.z * Math.sin(radians);
        const rotatedZ = initialRotation.x * Math.sin(radians) + initialRotation.z * Math.cos(radians);
  
        // Update the light position
        setLightPosition(new THREE.Vector3(rotatedX, initialRotation.y, rotatedZ));
    }
  };

  return (
    <div style={{ 
        display: "flex",
        alignItems: "center",
        width: '200px', 
        padding: '0 20px' 
    }}>
      <Slider
        defaultValue={0}
        min={0}
        max={360}
        step={1}
        onChange={handleSliderChange}
        aria-label="Rotation Slider"
      />
    </div>
  );
};

export default RotatingLightSlider;
