import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';

const DataNode = ({ position, color }) => (
  <Sphere position={position} args={[0.2, 16, 16]}>
    <meshStandardMaterial 
      color={color} 
      emissive={color} 
      emissiveIntensity={2} 
      roughness={0.2} 
      metalness={0.8}
    />
  </Sphere>
);

const DataEdge = ({ start, end }) => (
  <Line points={[start, end]} color="white" transparent opacity={0.2} />
);

export default function FloatingData({ count = 100 }) {
  const groupRef = useRef();

  const { nodes, edges } = useMemo(() => {
    const tempNodes = [];
    const tempEdges = [];
    const colors = ['#8A2BE2', '#4B0082', '#9400D3', '#9932CC', '#BA55D3'];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const color = colors[Math.floor(Math.random() * colors.length)];
      tempNodes.push({ position: new THREE.Vector3(x, y, z), color });
    }

    for (let i = 0; i < count / 2; i++) {
      const startNode = tempNodes[Math.floor(Math.random() * count)];
      const endNode = tempNodes[Math.floor(Math.random() * count)];
      if (startNode.position.distanceTo(endNode.position) < 5) {
        tempEdges.push({ start: startNode.position, end: endNode.position });
      }
    }

    return { nodes: tempNodes, edges: tempEdges };
  }, [count]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <DataNode key={i} {...node} />
      ))}
      {edges.map((edge, i) => (
        <DataEdge key={i} {...edge} />
      ))}
    </group>
  );
}
