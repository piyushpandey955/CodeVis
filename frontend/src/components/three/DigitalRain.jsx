import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DigitalRain = ({ count = 200 }) => {
  const groupRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(20);
      const y = THREE.MathUtils.randFloatSpread(20);
      const z = THREE.MathUtils.randFloat(-30, -10);
      temp.push({ x, y, z });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    groupRef.current.children.forEach(particle => {
      particle.position.y -= delta * 2;
      if (particle.position.y < -10) {
        particle.position.y = 10;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <boxGeometry args={[0.02, 0.2, 0.02]} />
          <meshBasicMaterial color="#2a0d45" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

export default DigitalRain;
