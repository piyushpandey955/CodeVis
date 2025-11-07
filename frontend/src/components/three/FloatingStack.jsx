import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';

export default function FloatingStack() {
  const stackRef = useRef();
  
  // Rotate the stack slowly
  useFrame((state) => {
    if (stackRef.current) {
      stackRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
      stackRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
      stackRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const stackItems = [
    { value: 5, color: '#3B82F6' },
    { value: 3, color: '#8B5CF6' },
    { value: 8, color: '#EC4899' },
    { value: 1, color: '#F59E0B' },
  ];

  return (
    <group ref={stackRef} position={[0, 0, 0]}>
      {stackItems.map((item, index) => (
        <group key={index} position={[0, index * 0.7 - 1, 0]}>
          <Box
            args={[2, 0.6, 2]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial 
              color={item.color} 
              metalness={0.5}
              roughness={0.1}
              emissive={item.color}
              emissiveIntensity={0.3}
            />
          </Box>
          <Text
            position={[0, 0, 1.01]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {item.value}
          </Text>
        </group>
      ))}
    </group>
  );
}
