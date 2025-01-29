import React, {useEffect} from 'react'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { useThree } from '@react-three/fiber';

const AnimatedGeometry: React.FC = () => {  
  const { scene } = useThree();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'p' || event.key === 'P') {
        exportScene();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [scene]);
  
  const exportScene = () => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene, 
      (result) => {
        const output = JSON.stringify(result);
        const blob = new Blob([output], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'scene.glb';
        link.click();
      },
      { binary: true }
    );
  };
  
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