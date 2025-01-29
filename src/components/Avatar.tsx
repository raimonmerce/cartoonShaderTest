import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh,  } from 'three';


interface AvatarAssetProps {
  url: string;
  name?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

const Avatar = React.forwardRef<Mesh, AvatarAssetProps>(({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}, ref) => {
  const scene = useGLTF(url);

  const avatar = (
    <primitive
      object={scene}
    />
  );
  return avatar;
});

export default Avatar;
