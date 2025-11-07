import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingTree = ({ levels = 3, size = 0.3 }) => {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    const temp = [];
    const createNode = (level, x, y) => {
      if (level > levels) return;
      temp.push({
        position: [x, y, 0],
        color: new THREE.Color().setHSL(level / levels, 0.7, 0.6),
      });
      const offset = Math.pow(2, levels - level) * size * 1.5;
      createNode(level + 1, x - offset, y - size * 3);
      createNode(level + 1, x + offset, y - size * 3);
    };
    createNode(1, 0, size * 3);
    return temp;
  }, [levels, size]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={node.color} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingTree;
