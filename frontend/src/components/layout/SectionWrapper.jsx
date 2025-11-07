import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const SectionWrapper = ({ children, threeComponent: ThreeComponent }) => {
  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            {ThreeComponent && <ThreeComponent />}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 container mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;
