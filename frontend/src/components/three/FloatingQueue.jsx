import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingQueue = ({ count = 8, size = 0.5, gap = 0.2 }) => {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    const temp = [];
    const totalWidth = count * size + (count - 1) * gap;
    const startX = -totalWidth / 2;
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [startX + i * (size + gap), 0, 0],
        color: new THREE.Color().setHSL(0.5 + i / count * 0.5, 0.7, 0.6), // Cyan to Blue gradient
      });
    }
    return temp;
  }, [count, size, gap]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.z = Math.sin(clock.getElapsedTime()) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial color={node.color} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingQueue;
