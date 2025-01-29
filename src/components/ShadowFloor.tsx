import React from 'react'

const AnimatedGeometry: React.FC = () => {  
  return (
    <mesh 
        position={[0, -1.5, 0]} 
        scale={1000} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
    >
        <planeGeometry />
        <shadowMaterial />
    </mesh>
  );
};

export default AnimatedGeometry