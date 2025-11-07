import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import FloatingStack from './FloatingStack';

export default function Scene3D() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas shadows style={{ pointerEvents: 'none' }}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#3B82F6" />
        
        {/* 3D Stack */}
        <FloatingStack />
        
        {/* Optional: allow user to rotate view */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
