import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingGraph = ({ count = 6, radius = 2 }) => {
  const groupRef = useRef();

  const { nodes, edges } = useMemo(() => {
    const tempNodes = [];
    const tempEdges = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      tempNodes.push({
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0],
        color: new THREE.Color().setHSL(i / count, 0.8, 0.7),
      });
    }

    for (let i = 0; i < count; i++) {
      const start = tempNodes[i].position;
      const end = tempNodes[(i + 1) % count].position;
      tempEdges.push({ start, end });
    }
    // Add a few more random edges
    for (let i = 0; i < count / 2; i++) {
        const start = tempNodes[Math.floor(Math.random() * count)].position;
        const end = tempNodes[Math.floor(Math.random() * count)].position;
        tempEdges.push({ start, end });
    }


    return { nodes: tempNodes, edges: tempEdges };
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={node.color} metalness={0.8} roughness={0.1} />
        </mesh>
      ))}
      {edges.map((edge, i) => (
        <line key={i}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...edge.start, ...edge.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="white" transparent opacity={0.5} />
        </line>
      ))}
    </group>
  );
};

export default FloatingGraph;
